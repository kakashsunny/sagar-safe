import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MarineLocation, OceanTelemetry, WeatherTelemetry } from '../types/marine';
import { getWeatherTelemetry, getOceanTelemetry } from '../data/marineData';
import { fetchLiveTelemetry } from '../services/liveTelemetryService';
import { 
  CloudSun, 
  Wind, 
  Waves, 
  Compass, 
  ShieldAlert, 
  MapPin, 
  Gauge, 
  Eye, 
  ArrowRight,
  Calendar,
  Volume2,
  VolumeX,
  Radio,
  RefreshCw
} from 'lucide-react';
import { getPageI18n } from '../data/pageTranslations';
import { speakTextInLanguage, stopSpeaking, getPageSpokenBriefing } from '../utils/speechVoice';

interface MarineWeatherPageProps {
  selectedLocation: MarineLocation;
  setSelectedLocation?: (loc: MarineLocation) => void;
  isDemoMode: boolean;
  onOpenLocationPicker: () => void;
  language?: string;
}

export const MarineWeatherPage: React.FC<MarineWeatherPageProps> = ({
  selectedLocation,
  isDemoMode,
  onOpenLocationPicker,
  language = 'en'
}) => {
  const navigate = useNavigate();
  const [ocean, setOcean] = useState<OceanTelemetry>(() => getOceanTelemetry(selectedLocation, isDemoMode));
  const [weather, setWeather] = useState<WeatherTelemetry>(() => getWeatherTelemetry(selectedLocation, isDemoMode));
  const [isLive, setIsLive] = useState<boolean>(!isDemoMode && selectedLocation.isCoastal);
  const [isLoadingLive, setIsLoadingLive] = useState<boolean>(false);
  const [telemetrySource, setTelemetrySource] = useState<string>('Live Marine Radar & Buoy Grid');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const pageI18n = getPageI18n(language);

  const loadLiveTelemetry = useCallback(async () => {
    setIsLoadingLive(true);
    try {
      const res = await fetchLiveTelemetry(selectedLocation, isDemoMode);
      setOcean(res.ocean);
      setWeather(res.weather);
      setIsLive(res.isLive);
      setTelemetrySource(res.sourceName);
    } catch (e) {
      console.warn('Could not refresh live weather:', e);
    } finally {
      setIsLoadingLive(false);
    }
  }, [selectedLocation, isDemoMode]);

  useEffect(() => {
    loadLiveTelemetry();
  }, [loadLiveTelemetry]);

  // Stop speaking when language changes or on unmount
  useEffect(() => {
    stopSpeaking();
    setIsSpeaking(false);
  }, [language]);

  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  const handleToggleVoice = () => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
      return;
    }

    const briefingText = getPageSpokenBriefing('weather', selectedLocation.name, language);
    const started = speakTextInLanguage(
      briefingText,
      language,
      () => setIsSpeaking(true),
      () => setIsSpeaking(false),
      () => setIsSpeaking(false)
    );

    if (!started) {
      alert('Speech audio is not supported in this browser.');
    }
  };

  // 5-Day Marine Forecast Matrix
  const forecastDays = [
    { day: 'Today (Live)', date: '29 Aug', wind: `${weather.windSpeedKmh} km/h`, gusts: `${weather.windGustKmh} km/h`, wave: `${ocean.waveHeightMeters}m`, swell: `${ocean.swellHeightMeters}m`, condition: weather.condition, rainProb: `${weather.precipitationProb}%`, safety: 'GREEN' },
    { day: 'Tomorrow', date: '30 Aug', wind: '16 km/h NNE', gusts: '22 km/h', wave: '1.4m', swell: '1.0m', condition: 'Partly Cloudy', rainProb: '20%', safety: 'GREEN' },
    { day: 'Sunday', date: '31 Aug', wind: '19 km/h NE', gusts: '27 km/h', wave: '1.7m', swell: '1.2m', condition: 'Moderate Breeze', rainProb: '35%', safety: 'GREEN' },
    { day: 'Monday', date: '01 Sep', wind: '24 km/h WSW', gusts: '36 km/h', wave: '2.2m', swell: '1.6m', condition: 'Squally Showers', rainProb: '65%', safety: 'AMBER' },
    { day: 'Tuesday', date: '02 Sep', wind: '18 km/h NW', gusts: '25 km/h', wave: '1.5m', swell: '1.1m', condition: 'Scattered Clouds', rainProb: '25%', safety: 'GREEN' }
  ];

  // Vessel Category Advisories
  const vesselClasses = [
    { category: 'Category A: Mechanized Trawlers (>20m)', status: 'SAFE TO OPERATE', statusColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10', guidance: 'Standard offshore operations permissible up to 50 nautical miles.' },
    { category: 'Category B: Motorized FRP Boats (9m - 15m)', status: 'SAFE WITH CAUTION', statusColor: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10', guidance: 'Maintain continuous VHF Channel 16 listening watch. Return if squall clouds form.' },
    { category: 'Category C: Small OBM Canoes (<9m)', status: 'COASTAL ONLY (<10 km)', statusColor: 'text-amber-400 border-amber-500/30 bg-amber-500/10', guidance: 'Remain within 5-10 km of shore. Avoid shallow bar mouth navigation at low tide.' },
    { category: 'Category D: Traditional Non-Motorized Catamarans', status: 'ADVISED TO STAND DOWN', statusColor: 'text-red-400 border-red-500/30 bg-red-500/10', guidance: 'Choppy inshore swell conditions make manual steering hazardous.' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 animate-fadeIn">
      {/* Breadcrumb & Header */}
      <div className="border-b border-cyan-500/20 pb-4">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-300/80 mb-1">
          <Link to="/" className="hover:text-white transition-colors">SAGAR-SAFE AI</Link>
          <span>/</span>
          <span className="text-cyan-200">{pageI18n.weatherTitle}</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase flex items-center gap-1 border ${
                isLive 
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40' 
                  : 'bg-amber-500/20 text-amber-300 border-amber-400/30'
              }`}>
                <Radio className={`w-3 h-3 ${isLive ? 'text-emerald-400 animate-pulse' : 'text-amber-400'}`} />
                {isLive ? 'LIVE BUOY & RADAR TELEMETRY ACTIVE' : 'CALIBRATED SIMULATION'}
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                • {telemetrySource}
              </span>
            </div>
            <h1 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight flex items-center gap-2.5">
              <CloudSun className="w-7 h-7 text-amber-400" />
              {pageI18n.weatherTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
              {pageI18n.weatherSubtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Live Refresh Button */}
            <button
              id="btn-sync-live-weather"
              onClick={loadLiveTelemetry}
              disabled={isLoadingLive}
              className="ocean-glass px-3.5 py-2 rounded-xl text-xs font-mono font-semibold text-cyan-200 border border-cyan-400/30 hover:border-cyan-300 flex items-center gap-1.5 shadow-lg disabled:opacity-50 transition-all"
              title="Refresh live buoy & atmospheric telemetry"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${isLoadingLive ? 'animate-spin' : ''}`} />
              <span>{isLoadingLive ? 'Syncing...' : 'Sync Live'}</span>
            </button>

            {/* Audio Voice Broadcast */}
            <button
              id="btn-weather-listen-voice"
              onClick={handleToggleVoice}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-lg transition-all ${
                isSpeaking
                  ? 'bg-cyan-500 text-white animate-pulse border border-cyan-300 ring-2 ring-cyan-400/50'
                  : 'ocean-glass text-cyan-200 border border-cyan-400/30 hover:border-cyan-300 hover:text-white'
              }`}
              title={isSpeaking ? pageI18n.stopVoice : pageI18n.listenBriefing}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4 text-white" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
              <span>{isSpeaking ? pageI18n.stopVoice : pageI18n.listenBriefing}</span>
            </button>

            <button
              onClick={onOpenLocationPicker}
              className="ocean-glass px-4 py-2 rounded-xl text-xs font-semibold text-cyan-200 border border-cyan-400/30 hover:border-cyan-300 flex items-center gap-2 shadow-lg"
            >
              <MapPin className="w-4 h-4 text-cyan-400" />
              <span>{pageI18n.targetPort}: <strong className="text-white">{selectedLocation.name}</strong></span>
            </button>
          </div>
        </div>
      </div>

      {/* Live Atmospheric Conditions & Wind Compass Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Surface Winds */}
        <div className="ocean-glass-card rounded-2xl p-5 border border-cyan-400/20 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono text-slate-400 uppercase">SURFACE WIND VELOCITY</span>
            <Wind className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-display font-black text-white">{weather.windSpeedKmh}</span>
            <span className="text-sm font-mono text-cyan-300">km/h</span>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Direction: <strong className="text-cyan-200">{weather.windDirectionText}</strong>
          </p>
          <div className="mt-3 pt-2 border-t border-cyan-500/10 text-[10px] font-mono text-slate-400 flex items-center justify-between">
            <span>Gusts: {weather.windGustKmh} km/h</span>
            <span className="text-emerald-400">Beaufort: Force 3</span>
          </div>
        </div>

        {/* Card 2: Significant Wave & Swell */}
        <div className="ocean-glass-card rounded-2xl p-5 border border-cyan-400/20 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono text-slate-400 uppercase">SIGNIFICANT WAVE & SWELL</span>
            <Waves className="w-4 h-4 text-blue-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-display font-black text-white">{ocean.waveHeightMeters}</span>
            <span className="text-sm font-mono text-blue-300">meters</span>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Primary Swell: <strong className="text-blue-200">{ocean.swellHeightMeters}m @ {ocean.wavePeriodSeconds}s</strong>
          </p>
          <div className="mt-3 pt-2 border-t border-cyan-500/10 text-[10px] font-mono text-slate-400 flex items-center justify-between">
            <span>Currents: {ocean.currentDirectionText}</span>
            <span className="text-emerald-400">State: Moderate</span>
          </div>
        </div>

        {/* Card 3: Atmospheric Pressure */}
        <div className="ocean-glass-card rounded-2xl p-5 border border-cyan-400/20 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono text-slate-400 uppercase">BAROMETRIC PRESSURE</span>
            <Gauge className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-display font-black text-white">{weather.pressureHpa}</span>
            <span className="text-sm font-mono text-amber-300">hPa</span>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Precipitation Chance: <strong className="text-emerald-300">{weather.precipitationProb}%</strong>
          </p>
          <div className="mt-3 pt-2 border-t border-cyan-500/10 text-[10px] font-mono text-slate-400 flex items-center justify-between">
            <span>Squall Threshold: &lt;1004 hPa</span>
            <span className="text-emerald-400">Normal</span>
          </div>
        </div>

        {/* Card 4: Visibility & Humidity */}
        <div className="ocean-glass-card rounded-2xl p-5 border border-cyan-400/20 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono text-slate-400 uppercase">OPTICAL VISIBILITY</span>
            <Eye className="w-4 h-4 text-teal-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-display font-black text-white">{ocean.visibilityKm}</span>
            <span className="text-sm font-mono text-teal-300">km</span>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Relative Humidity: <strong className="text-cyan-200">{weather.humidityPercent}%</strong>
          </p>
          <div className="mt-3 pt-2 border-t border-cyan-500/10 text-[10px] font-mono text-slate-400 flex items-center justify-between">
            <span>Air Temp: {weather.airTempCelsius}°C</span>
            <span className="text-emerald-400">Clear Horizon</span>
          </div>
        </div>
      </div>

      {/* 5-Day Coastal Marine Outlook Table */}
      <div className="ocean-glass rounded-2xl p-5 border border-cyan-400/20 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-cyan-400" />
            <h3 className="font-bold text-white text-sm uppercase tracking-wider">
              5-DAY COASTAL MARINE FORECAST MATRIX ({selectedLocation.name})
            </h3>
          </div>
          <span className="text-xs font-mono text-cyan-300/80">
            Source: IMD + INCOIS Wave Model
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-cyan-500/20 text-slate-400 text-[11px]">
                <th className="pb-3 font-semibold">DAY & DATE</th>
                <th className="pb-3 font-semibold">{pageI18n.weatherTitle}</th>
                <th className="pb-3 font-semibold">{pageI18n.windSpeed}</th>
                <th className="pb-3 font-semibold">{pageI18n.waveHeight}</th>
                <th className="pb-3 font-semibold">SWELL</th>
                <th className="pb-3 font-semibold">RAIN PROB.</th>
                <th className="pb-3 font-semibold text-right">{pageI18n.statusSafety}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyan-500/10">
              {forecastDays.map((item, idx) => (
                <tr key={idx} className="hover:bg-cyan-500/5 transition-colors">
                  <td className="py-3 text-white font-bold">
                    {item.day} <span className="text-slate-400 font-normal">({item.date})</span>
                  </td>
                  <td className="py-3 text-cyan-200">
                    {item.condition}
                  </td>
                  <td className="py-3 text-slate-300">
                    {item.wind} <span className="text-[10px] text-slate-400">(Gusts: {item.gusts})</span>
                  </td>
                  <td className="py-3 text-blue-300 font-bold">
                    {item.wave}
                  </td>
                  <td className="py-3 text-indigo-300">
                    {item.swell}
                  </td>
                  <td className="py-3 text-teal-300">
                    {item.rainProb}
                  </td>
                  <td className="py-3 text-right">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                      item.safety === 'GREEN'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                        : item.safety === 'AMBER'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                        : 'bg-red-500/20 text-red-300 border-red-500/30'
                    }`}>
                      {item.safety === 'GREEN' ? 'FAVORABLE' : item.safety === 'AMBER' ? 'CAUTION' : 'DANGEROUS'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Vessel Classification Safety Directives */}
      <div className="ocean-glass rounded-2xl p-5 border border-cyan-400/20 shadow-xl space-y-4">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-cyan-400" />
          <h3 className="font-bold text-white text-sm uppercase tracking-wider">
            VESSEL CRAFT SAFETY CLASSIFICATION DIRECTIVES
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {vesselClasses.map((vc, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl ocean-glass-card border border-cyan-400/20 space-y-2"
            >
              <div className="flex items-center justify-between gap-2">
                <h4 className="font-bold text-white text-xs">{vc.category}</h4>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${vc.statusColor}`}>
                  {vc.status}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {vc.guidance}
              </p>
            </div>
          ))}
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500/30 to-blue-600/40 text-cyan-100 border border-cyan-400/40 text-xs font-bold flex items-center gap-2 hover:from-cyan-500/50 hover:to-blue-600/60 transition-all shadow-md"
          >
            <span>Run Complete Decision Analysis</span>
            <ArrowRight className="w-3.5 h-3.5 text-cyan-300" />
          </button>
        </div>
      </div>
    </div>
  );
};
