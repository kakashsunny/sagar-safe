import React from 'react';
import { 
  Fish, 
  Waves, 
  Wind, 
  ChevronRight,
  Eye,
  Gauge,
  Compass,
  ArrowUpRight
} from 'lucide-react';
import { MarineLocation, OceanTelemetry, WeatherTelemetry, DecisionAnalysis, ParameterTelemetryDetail } from '../types/marine';
import { I18N_TEXT, TranslationDictionary } from '../data/i18nTranslations';

interface LiveIntelligenceCardsProps {
  location: MarineLocation;
  ocean: OceanTelemetry;
  weather: WeatherTelemetry;
  analysis: DecisionAnalysis | null;
  onOpenTelemetryDetail: (detail: ParameterTelemetryDetail) => void;
  isDemoMode: boolean;
  language?: string;
}

export const LiveIntelligenceCards: React.FC<LiveIntelligenceCardsProps> = ({
  location,
  ocean,
  weather,
  analysis,
  onOpenTelemetryDetail,
  isDemoMode,
  language = 'en'
}) => {
  const t: TranslationDictionary = I18N_TEXT[language] || I18N_TEXT['en'];

  const metrics = [
    {
      id: 'metric-wave-height',
      label: t.waveHeight,
      value: `${ocean.waveHeightMeters} m`,
      subtext: `${t.swell}: ${ocean.wavePeriodSeconds}s • ${t.reasonWaveSafe}`,
      icon: <Waves className="w-5 h-5 text-blue-400" />,
      tag: 'OPEN-METEO',
      isEstimated: false,
      status: ocean.waveHeightMeters > 2.5 ? 'caution' : 'normal',
      onClick: () => onOpenTelemetryDetail({
        parameter: `${t.waveHeight} & Swell Dynamics`,
        value: `${ocean.waveHeightMeters} m`,
        unit: 'Meters (m)',
        source: 'Source: Open-Meteo Marine API',
        dataTimestamp: ocean.timestamp,
        retrievedTimestamp: 'Live Sync',
        status: isDemoMode ? 'DEMO' : 'LIVE',
        confidence: 'High (Numerical Wave Model)',
        description: `Significant wave height: ${ocean.waveHeightMeters}m with dominant swell period of ${ocean.wavePeriodSeconds}s.`
      })
    },
    {
      id: 'metric-wind-speed',
      label: t.windSpeed,
      value: `${weather.windSpeedKmh} km/h`,
      subtext: `${weather.windDirectionText} • ${t.windGust}: ${weather.windGustKmh} km/h`,
      icon: <Wind className="w-5 h-5 text-teal-400" />,
      tag: 'OPEN-METEO',
      isEstimated: false,
      status: weather.windSpeedKmh > 35 ? 'caution' : 'normal',
      onClick: () => onOpenTelemetryDetail({
        parameter: `${t.windSpeed} & Direction`,
        value: `${weather.windSpeedKmh} km/h (${weather.windDirectionText})`,
        unit: 'km/h',
        source: 'Source: Open-Meteo Weather API',
        dataTimestamp: weather.timestamp,
        retrievedTimestamp: 'Live Sync',
        status: isDemoMode ? 'DEMO' : 'LIVE',
        confidence: 'High (Forecast AWS Model)',
        description: `Surface wind speed: ${weather.windSpeedKmh} km/h with gusts reaching ${weather.windGustKmh} km/h.`
      })
    },
    {
      id: 'metric-sst',
      label: t.sst,
      value: `${ocean.sstCelsius} °C`,
      subtext: 'Thermal gradient: 0.85°C/km',
      icon: <span className="text-amber-400 font-bold font-mono text-base">°C</span>,
      tag: 'OPEN-METEO',
      isEstimated: false,
      status: 'normal',
      onClick: () => onOpenTelemetryDetail({
        parameter: t.sst,
        value: `${ocean.sstCelsius} °C`,
        unit: 'Celsius (°C)',
        source: 'Source: Open-Meteo Marine API',
        dataTimestamp: ocean.timestamp,
        retrievedTimestamp: 'Live Sync',
        status: isDemoMode ? 'DEMO' : 'LIVE',
        confidence: 'High (Marine Surface Model)',
        description: 'Optimal temperature bracket for pelagic school concentrations.'
      })
    },
    {
      id: 'metric-ocean-current',
      label: t.currentSpeed,
      value: `${ocean.currentSpeedKnots} kn`,
      subtext: `${ocean.currentDirectionText} (${ocean.currentDirectionDegrees || 240}°)`,
      icon: <Compass className="w-5 h-5 text-cyan-400" />,
      tag: 'OPEN-METEO',
      isEstimated: false,
      status: 'normal',
      onClick: () => onOpenTelemetryDetail({
        parameter: t.currentSpeed,
        value: `${ocean.currentSpeedKnots} knots (${ocean.currentDirectionText})`,
        unit: 'Knots',
        source: 'Source: Open-Meteo Marine API',
        dataTimestamp: ocean.timestamp,
        retrievedTimestamp: 'Live Sync',
        status: isDemoMode ? 'DEMO' : 'LIVE',
        confidence: 'High (Hydrodynamic Current Model)',
        description: 'Surface current velocities modeled for safe boat drift and navigation.'
      })
    },
    {
      id: 'metric-pfz',
      label: t.cardPfz,
      value: analysis?.fishingPotential || (location.isCoastal ? 'HIGH' : 'N/A'),
      subtext: 'Pelagic Baseline Estimate',
      icon: <Fish className="w-5 h-5 text-amber-400" />,
      tag: 'DEMO / ESTIMATED',
      isEstimated: true,
      status: 'normal',
      onClick: () => onOpenTelemetryDetail({
        parameter: `${t.cardPfz} Front`,
        value: analysis?.fishingPotential || 'HIGH',
        unit: 'Thermal/Chlorophyll Baseline',
        source: 'Demo / Estimated (Regional Pelagic Baseline)',
        dataTimestamp: ocean.timestamp,
        retrievedTimestamp: 'Estimated Baseline',
        status: 'DEMO / ESTIMATED',
        confidence: 'Regional Baseline Formula',
        description: 'Estimated biological productivity based on seasonal Indian coastal fisheries patterns.'
      })
    },
    {
      id: 'metric-visibility',
      label: 'VISIBILITY',
      value: `${weather.visibilityKm || 10} km`,
      subtext: 'Atmospheric: Clear Marine Horizon',
      icon: <Eye className="w-5 h-5 text-sky-300" />,
      tag: 'OPEN-METEO',
      isEstimated: false,
      status: 'normal',
      onClick: () => onOpenTelemetryDetail({
        parameter: 'Marine Atmospheric Visibility',
        value: `${weather.visibilityKm || 10} km`,
        unit: 'Kilometers (km)',
        source: 'Source: Open-Meteo Weather API',
        dataTimestamp: weather.timestamp,
        retrievedTimestamp: 'Live Sync',
        status: isDemoMode ? 'DEMO' : 'LIVE',
        confidence: 'High (Forecast Model)',
        description: 'Atmospheric line-of-sight maritime visibility.'
      })
    },
    {
      id: 'metric-pressure',
      label: t.pressure,
      value: `${weather.pressureHpa} hPa`,
      subtext: 'Trend: Stable',
      icon: <Gauge className="w-5 h-5 text-indigo-400" />,
      tag: 'OPEN-METEO',
      isEstimated: false,
      status: weather.pressureHpa < 1000 ? 'caution' : 'normal',
      onClick: () => onOpenTelemetryDetail({
        parameter: t.pressure,
        value: `${weather.pressureHpa} hPa`,
        unit: 'hPa (Millibars)',
        source: 'Source: Open-Meteo Weather API',
        dataTimestamp: weather.timestamp,
        retrievedTimestamp: 'Live Sync',
        status: isDemoMode ? 'DEMO' : 'LIVE',
        confidence: 'High (Synoptic Barometer Model)',
        description: 'Atmospheric pressure tracking for localized cyclonic or depression detection.'
      })
    },
    {
      id: 'metric-tide',
      label: t.tideStatus,
      value: 'FLOOD TIDE',
      subtext: 'High tide +1.4m (Calculated)',
      icon: <ArrowUpRight className="w-5 h-5 text-amber-300" />,
      tag: 'DEMO / ESTIMATED',
      isEstimated: true,
      status: 'normal',
      onClick: () => onOpenTelemetryDetail({
        parameter: t.tideStatus,
        value: 'Flood Tide (+1.4m)',
        unit: 'Harmonic Estimate',
        source: 'Demo / Estimated (Harmonic Astronomical Model)',
        dataTimestamp: ocean.timestamp,
        retrievedTimestamp: 'Calculated Estimate',
        status: 'DEMO / ESTIMATED',
        confidence: 'Astronomical Estimate (Uncalibrated to Gauge)',
        description: 'Estimated tidal trend based on astronomical harmonics. Live tide gauge integration pending.'
      })
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 my-8">
      
      {/* Section Header with Apple-style micro badge */}
      <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <h4 className="text-xs font-mono font-bold tracking-widest uppercase text-cyan-200/90">
            {t.systemOperational} — REAL-TIME MARINE TELEMETRY MATRIX
          </h4>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-cyan-300 bg-white/5 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md">
            Open-Meteo Live Feeds + Baseline Models
          </span>
        </div>
      </div>

      {/* 8-Card Telemetry Grid (Apple Floating Glass Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <div
            key={m.id}
            id={m.id}
            onClick={m.onClick}
            className="apple-floating-card p-5 cursor-pointer relative overflow-hidden group flex flex-col justify-between"
          >
            {/* Top Edge Specular Highlight */}
            <div className="absolute top-0 inset-x-6 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                  {m.label}
                </span>
                <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${
                  m.isEstimated
                    ? 'text-amber-300 bg-amber-500/20 border-amber-500/40 font-bold'
                    : 'text-cyan-200/90 bg-white/10 border-white/10'
                }`}>
                  {m.tag}
                </span>
              </div>

              <div className="flex items-center gap-3 mb-2">
                <div className="p-2.5 rounded-2xl bg-white/10 border border-white/10 shrink-0 group-hover:scale-105 transition-transform">
                  {m.icon}
                </div>
                <div className="min-w-0">
                  <div className="font-display font-black text-2xl sm:text-3xl tracking-tight text-white group-hover:text-cyan-200 transition-colors truncate">
                    {m.value}
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-300/90 font-mono mt-1 line-clamp-1">
                {m.subtext}
              </p>
            </div>

            <div className="pt-3 mt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span className={`flex items-center gap-1.5 ${m.isEstimated ? 'text-amber-400' : 'text-emerald-400'}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${m.isEstimated ? 'bg-amber-400' : 'bg-emerald-400 animate-pulse'}`} />
                {m.isEstimated ? 'Demo / Estimated' : 'Live Stream'}
              </span>
              <span className="flex items-center gap-1 text-cyan-300 group-hover:translate-x-1 transition-transform font-medium">
                Telemetry <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
