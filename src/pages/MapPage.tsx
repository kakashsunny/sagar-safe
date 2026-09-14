import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MarineMap } from '../components/MarineMap';
import { LiveIntelligenceCards } from '../components/LiveIntelligenceCards';
import { MarineLocation, DecisionAnalysis, ParameterTelemetryDetail, OceanTelemetry, WeatherTelemetry } from '../types/marine';
import { LOCATIONS_DB, ACTIVE_MARINE_ALERTS, getOceanTelemetry, getWeatherTelemetry } from '../data/marineData';
import { 
  Compass, 
  MapPin, 
  Layers, 
  Radio, 
  Anchor, 
  ChevronDown, 
  ShieldAlert, 
  Waves,
  Eye,
  Info,
  Maximize2,
  Navigation,
  ArrowRight,
  Volume2,
  VolumeX
} from 'lucide-react';
import { getPageI18n } from '../data/pageTranslations';
import { speakTextInLanguage, stopSpeaking, getFishermanSpokenReport } from '../utils/speechVoice';

interface MapPageProps {
  selectedLocation: MarineLocation;
  setSelectedLocation: (loc: MarineLocation) => void;
  analysis: DecisionAnalysis | null;
  isDemoMode: boolean;
  language?: string;
  onOpenLocationPicker: () => void;
  onOpenTelemetryDetail: (detail: ParameterTelemetryDetail) => void;
}

export const MapPage: React.FC<MapPageProps> = ({
  selectedLocation,
  setSelectedLocation,
  analysis,
  isDemoMode,
  language = 'en',
  onOpenLocationPicker,
  onOpenTelemetryDetail,
}) => {
  const [selectedStation, setSelectedStation] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const pageI18n = getPageI18n(language);

  // Stop speaking on language change or unmount
  React.useEffect(() => {
    stopSpeaking();
    setIsSpeaking(false);
  }, [language]);

  React.useEffect(() => {
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

    const safety = analysis?.safetyStatus || 'GREEN';
    const speechText = getFishermanSpokenReport(selectedLocation.name, safety, language);

    const started = speakTextInLanguage(
      speechText,
      language,
      () => setIsSpeaking(true),
      () => setIsSpeaking(false),
      () => setIsSpeaking(false)
    );

    if (!started) {
      alert('Speech audio is not supported in this browser.');
    }
  };

  const ocean = getOceanTelemetry(selectedLocation, isDemoMode);
  const weather = getWeatherTelemetry(selectedLocation, isDemoMode);

  // Moored buoy telemetry array
  const oceanBuoys = [
    { id: 'OOM-1', name: 'INCOIS OOM-1 (South-West Coast)', lat: 12.85, lng: 74.20, sst: '28.5°C', wave: '1.6m', swell: '1.1m', current: '0.42 m/s SE', status: 'Online • Real-time' },
    { id: 'CB-02', name: 'INCOIS Coastal Buoy CB-02 (Kochi Shelf)', lat: 9.95, lng: 75.90, sst: '28.9°C', wave: '1.8m', swell: '1.3m', current: '0.38 m/s S', status: 'Online • Real-time' },
    { id: 'BD-08', name: 'INCOIS Deep Sea Buoy BD-08 (Bay of Bengal)', lat: 17.50, lng: 89.10, sst: '29.2°C', wave: '2.1m', swell: '1.5m', current: '0.51 m/s ENE', status: 'Online • Real-time' },
    { id: 'AD-03', name: 'INCOIS Arabian Deep Sea AD-03 (Off Mumbai)', lat: 18.50, lng: 70.80, sst: '28.1°C', wave: '1.4m', swell: '0.9m', current: '0.29 m/s SSE', status: 'Online • Real-time' }
  ];

  return (
    <div className="w-full max-w-[1720px] mx-auto px-2 sm:px-4 lg:px-6 py-4 space-y-6 animate-fadeIn">
      {/* Breadcrumb & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-cyan-500/20 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-300/80 mb-1">
            <Link to="/" className="hover:text-white transition-colors">SAGAR-SAFE AI</Link>
            <span>/</span>
            <span className="text-cyan-200">{pageI18n.mapTitle}</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight flex items-center gap-2.5">
            <Compass className="w-7 h-7 text-cyan-400" />
            {pageI18n.mapTitle}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
            {pageI18n.mapSubtitle}
          </p>
        </div>

        {/* Location Switcher & Action */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Audio voice broadcast button */}
          <button
            id="btn-map-listen-voice"
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
            <ChevronDown className="w-3.5 h-3.5" />
          </button>

          <Link
            to="/ports"
            className="ocean-glass px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white border border-cyan-400/20 hover:border-cyan-400/40 flex items-center gap-1.5"
          >
            <Anchor className="w-3.5 h-3.5 text-blue-400" />
            <span>{pageI18n.allPortsBtn}</span>
          </Link>
        </div>
      </div>

      {/* Main Geospatial Ocean Map Container */}
      <div className="ocean-glass rounded-2xl p-1 sm:p-2 md:p-3 border border-cyan-500/30 shadow-2xl overflow-hidden">
        <MarineMap
          selectedLocation={selectedLocation}
          onSelectLocation={(loc) => setSelectedLocation(loc)}
          analysis={analysis}
          activeAlerts={ACTIVE_MARINE_ALERTS}
          isDemoMode={isDemoMode}
          language={language}
        />
      </div>

      {/* Live Ocean Telemetry Dock for Selected Location */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-white tracking-wide uppercase flex items-center gap-2">
            <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
            {pageI18n.liveCoastalTelemetry} • {selectedLocation.name} ({selectedLocation.state})
          </h2>
          <span className="text-[11px] font-mono text-cyan-300/80">
            {pageI18n.coordinates}: {selectedLocation.lat.toFixed(2)}°N, {selectedLocation.lng.toFixed(2)}°E
          </span>
        </div>

        <LiveIntelligenceCards
          location={selectedLocation}
          ocean={ocean}
          weather={weather}
          analysis={analysis}
          onOpenTelemetryDetail={onOpenTelemetryDetail}
          isDemoMode={isDemoMode}
        />
      </div>

      {/* Moored Ocean Buoys Telemetry Feed (OOM Network) */}
      <div className="ocean-glass rounded-2xl p-5 border border-cyan-400/20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Waves className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white">
              {pageI18n.buoyArrayTitle}
            </h3>
          </div>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
            {pageI18n.stationsTransmitting}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {oceanBuoys.map((buoy) => (
            <div
              key={buoy.id}
              onClick={() => setSelectedStation(buoy.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                selectedStation === buoy.id
                  ? 'bg-cyan-950/60 border-cyan-400/70 shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-400/50'
                  : 'ocean-glass-card border-cyan-400/20 hover:border-cyan-400/50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-bold text-cyan-300 bg-cyan-500/20 px-2 py-0.5 rounded border border-cyan-400/30">
                  {buoy.id}
                </span>
                <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Active
                </span>
              </div>
              <h4 className="text-xs font-semibold text-white line-clamp-1">{buoy.name}</h4>
              
              <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] font-mono">
                <div className="bg-[#020b16]/60 p-1.5 rounded border border-cyan-500/10">
                  <span className="text-slate-400 block text-[9px]">SST</span>
                  <span className="font-bold text-cyan-200">{buoy.sst}</span>
                </div>
                <div className="bg-[#020b16]/60 p-1.5 rounded border border-cyan-500/10">
                  <span className="text-slate-400 block text-[9px]">WAVE (SIG)</span>
                  <span className="font-bold text-blue-200">{buoy.wave}</span>
                </div>
                <div className="bg-[#020b16]/60 p-1.5 rounded border border-cyan-500/10">
                  <span className="text-slate-400 block text-[9px]">SWELL</span>
                  <span className="font-bold text-indigo-200">{buoy.swell}</span>
                </div>
                <div className="bg-[#020b16]/60 p-1.5 rounded border border-cyan-500/10">
                  <span className="text-slate-400 block text-[9px]">CURRENT</span>
                  <span className="font-bold text-teal-200">{buoy.current}</span>
                </div>
              </div>

              <div className="mt-2.5 text-[10px] text-slate-400 font-mono flex items-center justify-between">
                <span>{buoy.lat}°N, {buoy.lng}°E</span>
                <span className="text-cyan-300/80">INCOIS OOM</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
