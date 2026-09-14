export interface LiveMarineTelemetry {
  lat: number;
  lng: number;
  locationName?: string;
  ocean: {
    sstCelsius: number;
    waveHeightMeters: number;
    wavePeriodSeconds: number;
    swellHeightMeters: number;
    currentSpeedKnots: number;
    currentDirectionDeg: number;
    currentDirectionText: string;
    salinityPsu: number;
    chlorophyllMgM3: number;
    tideStatus: string;
    tideHeightMeters: number;
    timestamp: string;
    observedAt: string;
    fetchedAt: string;
    source: string;
    isLive: boolean;
    chlorophyllStatus: 'Demo / Estimated';
    salinityStatus: 'Demo / Estimated';
    tideStatusNote: 'Demo / Estimated';
  };
  weather: {
    airTempCelsius: number;
    feelsLikeCelsius: number;
    condition: string;
    windSpeedKmh: number;
    windDirectionText: string;
    windDirectionDeg: number;
    windGustKmh: number;
    humidityPercent: number;
    pressureHpa: number;
    precipitationProb: number;
    visibilityKm: number;
    uvIndex: number;
    timestamp: string;
    observedAt: string;
    fetchedAt: string;
    source: string;
    isLive: boolean;
  };
  cachedAt?: string;
}

// In-memory cache for live telemetry (5-minute TTL)
interface CacheEntry {
  data: LiveMarineTelemetry;
  expiry: number;
}

const telemetryCache = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

function degToCompass(num: number): string {
  const val = Math.floor((num / 22.5) + 0.5);
  const arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  return arr[(val % 16)];
}

export async function fetchLiveMarineTelemetry(lat: number, lng: number, locationName = "Offshore Sector"): Promise<LiveMarineTelemetry> {
  const cacheKey = `${lat.toFixed(2)}_${lng.toFixed(2)}`;
  const now = Date.now();

  const cached = telemetryCache.get(cacheKey);
  if (cached && cached.expiry > now) {
    return { ...cached.data, cachedAt: new Date(cached.expiry - CACHE_TTL_MS).toISOString() };
  }

  try {
    // 1. Fetch real-time Marine Telemetry from Open-Meteo Marine API
    const marineUrl = `https://marine-api.open-meteo.com/v1/marine?latitude=${lat}&longitude=${lng}&current=wave_height,wave_direction,wave_period,wind_wave_height,swell_wave_height,swell_wave_period,ocean_current_velocity,ocean_current_direction,sea_surface_temperature&timezone=Asia%2FKolkata`;
    
    // 2. Fetch real-time Weather Telemetry from Open-Meteo Weather API
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m,visibility&timezone=Asia%2FKolkata`;

    const [marineRes, weatherRes] = await Promise.allSettled([
      fetch(marineUrl, { headers: { 'User-Agent': 'ORCA-Marine-Intelligence/2.0' } }),
      fetch(weatherUrl, { headers: { 'User-Agent': 'ORCA-Marine-Intelligence/2.0' } })
    ]);

    let oceanData: any = null;
    let weatherData: any = null;

    if (marineRes.status === 'fulfilled' && marineRes.value.ok) {
      oceanData = await marineRes.value.json();
    }
    if (weatherRes.status === 'fulfilled' && weatherRes.value.ok) {
      weatherData = await weatherRes.value.json();
    }

    const orcaFetchedAt = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) + ' IST';
    const orcaFetchedIso = new Date().toISOString();

    // Parse marine metrics or apply realistic coastal baseline
    const curMarine = oceanData?.current || {};
    const marineObservedAt = curMarine.time ? `${curMarine.time} (Model Run / Open-Meteo)` : 'Model Run Baseline';
    const waveHeight = typeof curMarine.wave_height === 'number' ? Number(curMarine.wave_height.toFixed(1)) : 1.4;
    const wavePeriod = typeof curMarine.wave_period === 'number' ? Number(curMarine.wave_period.toFixed(1)) : 7.2;
    const swellHeight = typeof curMarine.swell_wave_height === 'number' ? Number(curMarine.swell_wave_height.toFixed(1)) : 1.0;
    const sst = typeof curMarine.sea_surface_temperature === 'number' ? Number(curMarine.sea_surface_temperature.toFixed(1)) : 28.6;
    
    // Velocity: km/h or m/s to knots
    const currentVelocityMs = typeof curMarine.ocean_current_velocity === 'number' ? curMarine.ocean_current_velocity : 0.6;
    const currentSpeedKnots = Number((currentVelocityMs * 1.94384).toFixed(1));
    const currentDirDeg = curMarine.ocean_current_direction || 240;

    // Parse weather metrics
    const curWeather = weatherData?.current || {};
    const weatherObservedAt = curWeather.time ? `${curWeather.time} (Model Run / Open-Meteo)` : 'Model Run Baseline';
    const airTemp = typeof curWeather.temperature_2m === 'number' ? Number(curWeather.temperature_2m.toFixed(1)) : 29.5;
    const feelsLike = typeof curWeather.apparent_temperature === 'number' ? Number(curWeather.apparent_temperature.toFixed(1)) : 33.2;
    const windSpeed = typeof curWeather.wind_speed_10m === 'number' ? Number(curWeather.wind_speed_10m.toFixed(1)) : 16.0;
    const windGust = typeof curWeather.wind_gusts_10m === 'number' ? Number(curWeather.wind_gusts_10m.toFixed(1)) : 22.5;
    const windDirDeg = curWeather.wind_direction_10m || 230;
    const humidity = curWeather.relative_humidity_2m || 78;
    const pressure = curWeather.surface_pressure || 1011;
    const visibilityKm = typeof curWeather.visibility === 'number' ? Number((curWeather.visibility / 1000).toFixed(1)) : 10.0;

    // Interpret WMO weather code
    const wCode = curWeather.weather_code || 0;
    let condition = "Fair & Sunny Marine Horizon";
    if (wCode >= 80) condition = "Rain Showers & Marine Squall";
    else if (wCode >= 60) condition = "Moderate Coastal Rain";
    else if (wCode >= 50) condition = "Coastal Drizzle / Mist";
    else if (wCode >= 1 && wCode <= 3) condition = "Partly Cloudy Marine Skies";

    const isOceanLive = Boolean(oceanData && typeof curMarine.wave_height === 'number');
    const isWeatherLive = Boolean(weatherData && typeof curWeather.wind_speed_10m === 'number');

    const liveResult: LiveMarineTelemetry = {
      lat,
      lng,
      locationName,
      ocean: {
        sstCelsius: sst,
        waveHeightMeters: waveHeight,
        wavePeriodSeconds: wavePeriod,
        swellHeightMeters: swellHeight,
        currentSpeedKnots: Math.max(0.2, currentSpeedKnots),
        currentDirectionDeg: currentDirDeg,
        currentDirectionText: degToCompass(currentDirDeg),
        salinityPsu: 35.2,
        chlorophyllMgM3: 1.45,
        tideStatus: "High Tide (+1.3m)",
        tideHeightMeters: 1.3,
        timestamp: orcaFetchedAt,
        observedAt: marineObservedAt,
        fetchedAt: orcaFetchedAt,
        source: isOceanLive ? "Source: Open-Meteo Marine API" : "Open-Meteo Marine (Regional Baseline)",
        isLive: isOceanLive,
        chlorophyllStatus: "Demo / Estimated",
        salinityStatus: "Demo / Estimated",
        tideStatusNote: "Demo / Estimated"
      },
      weather: {
        airTempCelsius: airTemp,
        feelsLikeCelsius: feelsLike,
        condition,
        windSpeedKmh: windSpeed,
        windDirectionText: degToCompass(windDirDeg),
        windDirectionDeg: windDirDeg,
        windGustKmh: windGust,
        humidityPercent: humidity,
        pressureHpa: Math.round(pressure),
        precipitationProb: curWeather.precipitation ? Math.min(100, curWeather.precipitation * 20) : 10,
        visibilityKm,
        uvIndex: 7,
        timestamp: orcaFetchedAt,
        observedAt: weatherObservedAt,
        fetchedAt: orcaFetchedAt,
        source: isWeatherLive ? "Source: Open-Meteo Weather API" : "Open-Meteo Forecast (Regional Baseline)",
        isLive: isWeatherLive
      },
      cachedAt: orcaFetchedIso
    };

    // Cache the result
    telemetryCache.set(cacheKey, { data: liveResult, expiry: now + CACHE_TTL_MS });
    return liveResult;

  } catch (error) {
    console.error("Live telemetry fetch error:", error);
    const orcaFetchedAt = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) + ' IST';
    // Fallback baseline
    return {
      lat,
      lng,
      locationName,
      ocean: {
        sstCelsius: 28.5,
        waveHeightMeters: 1.5,
        wavePeriodSeconds: 7.5,
        swellHeightMeters: 1.1,
        currentSpeedKnots: 1.2,
        currentDirectionDeg: 245,
        currentDirectionText: "WSW",
        salinityPsu: 35.0,
        chlorophyllMgM3: 1.2,
        tideStatus: "High Tide (+1.2m)",
        tideHeightMeters: 1.2,
        timestamp: orcaFetchedAt,
        observedAt: 'Static Regional Baseline (Non-Live)',
        fetchedAt: orcaFetchedAt,
        source: "Demo / Estimated (Open-Meteo Unreachable)",
        isLive: false,
        chlorophyllStatus: "Demo / Estimated",
        salinityStatus: "Demo / Estimated",
        tideStatusNote: "Demo / Estimated"
      },
      weather: {
        airTempCelsius: 29.0,
        feelsLikeCelsius: 32.5,
        condition: "Partly Cloudy Marine Horizon",
        windSpeedKmh: 18.0,
        windDirectionText: "WNW",
        windDirectionDeg: 290,
        windGustKmh: 24.0,
        humidityPercent: 76,
        pressureHpa: 1012,
        precipitationProb: 15,
        visibilityKm: 10.0,
        uvIndex: 6,
        timestamp: orcaFetchedAt,
        observedAt: 'Static Regional Baseline (Non-Live)',
        fetchedAt: orcaFetchedAt,
        source: "Demo / Estimated (Open-Meteo Unreachable)",
        isLive: false
      }
    };
  }
}
