import { MarineLocation, OceanTelemetry, WeatherTelemetry } from '../types/marine';
import { getOceanTelemetry, getWeatherTelemetry } from '../data/marineData';

export interface LiveTelemetryResult {
  ocean: OceanTelemetry;
  weather: WeatherTelemetry;
  isLive: boolean;
  sourceName: string;
  fetchedAt: string;
}

const clientTelemetryCache = new Map<string, { data: LiveTelemetryResult; timestamp: number }>();
const CLIENT_CACHE_TTL = 3 * 60 * 1000; // 3 minutes

export async function fetchLiveTelemetry(
  location: MarineLocation,
  isDemoMode = false
): Promise<LiveTelemetryResult> {
  const fallbackOcean = getOceanTelemetry(location, isDemoMode);
  const fallbackWeather = getWeatherTelemetry(location, isDemoMode);

  if (isDemoMode || !location.isCoastal) {
    return {
      ocean: fallbackOcean,
      weather: fallbackWeather,
      isLive: !isDemoMode && location.isCoastal,
      sourceName: isDemoMode ? 'Synthetic Demo Mode' : 'Inland Meteorological Station',
      fetchedAt: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) + ' IST'
    };
  }

  const cacheKey = `${location.id}_${location.lat.toFixed(2)}_${location.lng.toFixed(2)}`;
  const now = Date.now();
  const cached = clientTelemetryCache.get(cacheKey);

  if (cached && now - cached.timestamp < CLIENT_CACHE_TTL) {
    return cached.data;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const url = `/api/telemetry/live?lat=${location.lat}&lng=${location.lng}&name=${encodeURIComponent(location.name)}`;
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`HTTP error ${res.status}`);
    }

    const json = await res.json();
    if (!json.success || !json.data) {
      throw new Error('Invalid telemetry API response');
    }

    const liveData = json.data;

    // Normalize tideStatus to valid literal type
    let safeTideStatus: 'High Tide' | 'Low Tide' | 'Incoming' | 'Ebbing' = 'High Tide';
    if (liveData.ocean.tideStatus?.toLowerCase().includes('low')) {
      safeTideStatus = 'Low Tide';
    } else if (liveData.ocean.tideStatus?.toLowerCase().includes('incom')) {
      safeTideStatus = 'Incoming';
    } else if (liveData.ocean.tideStatus?.toLowerCase().includes('ebb')) {
      safeTideStatus = 'Ebbing';
    }

    const orcaFetchedAt = liveData.ocean.fetchedAt || (new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) + ' IST');

    const ocean: OceanTelemetry = {
      sstCelsius: liveData.ocean.sstCelsius ?? fallbackOcean.sstCelsius,
      sstAnomaly: 0.3,
      waveHeightMeters: liveData.ocean.waveHeightMeters ?? fallbackOcean.waveHeightMeters,
      wavePeriodSeconds: liveData.ocean.wavePeriodSeconds ?? fallbackOcean.wavePeriodSeconds,
      swellHeightMeters: liveData.ocean.swellHeightMeters ?? fallbackOcean.swellHeightMeters,
      currentSpeedKnots: liveData.ocean.currentSpeedKnots ?? fallbackOcean.currentSpeedKnots,
      currentDirectionDeg: liveData.ocean.currentDirectionDeg ?? fallbackOcean.currentDirectionDeg,
      currentDirectionText: liveData.ocean.currentDirectionText ?? fallbackOcean.currentDirectionText,
      chlorophyllMgM3: liveData.ocean.chlorophyllMgM3 ?? fallbackOcean.chlorophyllMgM3,
      salinityPsu: liveData.ocean.salinityPsu ?? fallbackOcean.salinityPsu,
      visibilityKm: liveData.ocean.visibilityKm ?? fallbackOcean.visibilityKm,
      tideStatus: safeTideStatus,
      tideHeightMeters: liveData.ocean.tideHeightMeters ?? fallbackOcean.tideHeightMeters,
      timestamp: liveData.ocean.timestamp ?? fallbackOcean.timestamp,
      observedAt: liveData.ocean.observedAt ?? liveData.ocean.timestamp,
      fetchedAt: orcaFetchedAt,
      chlorophyllStatus: 'Demo / Estimated',
      salinityStatus: 'Demo / Estimated',
      tideStatusNote: 'Demo / Estimated',
      source: liveData.ocean.source ?? 'Source: Open-Meteo Marine API',
      isLive: liveData.ocean.isLive ?? true,
      coverage: 'High'
    };

    const weather: WeatherTelemetry = {
      airTempCelsius: liveData.weather.airTempCelsius ?? fallbackWeather.airTempCelsius,
      feelsLikeCelsius: liveData.weather.feelsLikeCelsius ?? fallbackWeather.feelsLikeCelsius,
      condition: liveData.weather.condition ?? fallbackWeather.condition,
      windSpeedKmh: liveData.weather.windSpeedKmh ?? fallbackWeather.windSpeedKmh,
      windDirectionText: liveData.weather.windDirectionText ?? fallbackWeather.windDirectionText,
      windGustKmh: liveData.weather.windGustKmh ?? fallbackWeather.windGustKmh,
      humidityPercent: liveData.weather.humidityPercent ?? fallbackWeather.humidityPercent,
      pressureHpa: liveData.weather.pressureHpa ?? fallbackWeather.pressureHpa,
      precipitationProb: liveData.weather.precipitationProb ?? fallbackWeather.precipitationProb,
      uvIndex: liveData.weather.uvIndex ?? fallbackWeather.uvIndex,
      timestamp: liveData.weather.timestamp ?? fallbackWeather.timestamp,
      observedAt: liveData.weather.observedAt ?? liveData.weather.timestamp,
      fetchedAt: orcaFetchedAt,
      source: liveData.weather.source ?? 'Source: Open-Meteo Weather API',
      isLive: liveData.weather.isLive ?? true
    };

    const result: LiveTelemetryResult = {
      ocean,
      weather,
      isLive: true,
      sourceName: 'Source: Open-Meteo Marine & Forecast APIs',
      fetchedAt: orcaFetchedAt
    };

    clientTelemetryCache.set(cacheKey, { data: result, timestamp: now });
    return result;

  } catch (error) {
    console.warn('Live telemetry fallback applied:', error);
    const nowStr = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) + ' IST';
    return {
      ocean: {
        ...fallbackOcean,
        source: 'Demo / Estimated (Static Baseline)',
        observedAt: 'Static Regional Baseline (Non-Live)',
        fetchedAt: nowStr,
        chlorophyllStatus: 'Demo / Estimated',
        salinityStatus: 'Demo / Estimated',
        tideStatusNote: 'Demo / Estimated',
        isLive: false
      },
      weather: {
        ...fallbackWeather,
        source: 'Demo / Estimated (Static Baseline)',
        observedAt: 'Static Regional Baseline (Non-Live)',
        fetchedAt: nowStr,
        isLive: false
      },
      isLive: false,
      sourceName: 'Demo / Estimated (Static Regional Baseline)',
      fetchedAt: nowStr
    };
  }
}
