import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MarineLocation, PFZZone } from '../types/marine';
import { LOCATIONS_DB, PFZ_ZONES_DATABASE, getOceanTelemetry } from '../data/marineData';
import { 
  Fish, 
  Sparkles, 
  MapPin, 
  Layers, 
  Satellite, 
  Flame, 
  Fuel, 
  TrendingUp, 
  ShieldCheck, 
  Compass, 
  ArrowRight,
  Info,
  Calendar,
  Waves,
  Volume2,
  VolumeX
} from 'lucide-react';
import { getPageI18n } from '../data/pageTranslations';
import { speakTextInLanguage, stopSpeaking, getPageSpokenBriefing } from '../utils/speechVoice';

interface PfzEcologyPageProps {
  selectedLocation: MarineLocation;
  setSelectedLocation: (loc: MarineLocation) => void;
  isDemoMode: boolean;
  onOpenLocationPicker: () => void;
  language?: string;
}

export const PfzEcologyPage: React.FC<PfzEcologyPageProps> = ({
  selectedLocation,
  setSelectedLocation,
  isDemoMode,
  onOpenLocationPicker,
  language = 'en'
}) => {
  const navigate = useNavigate();
  const ocean = getOceanTelemetry(selectedLocation, isDemoMode);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const pageI18n = getPageI18n(language);

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

    const briefingText = getPageSpokenBriefing('pfz', selectedLocation.name, language);
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

  // Get active PFZ zones for this location or fallback to mangaluru
  const locationKey = selectedLocation.id.includes('mangal') || selectedLocation.name.toLowerCase().includes('mangal')
    ? 'mangaluru'
    : selectedLocation.id.includes('kochi') || selectedLocation.name.toLowerCase().includes('kochi')
    ? 'kochi'
    : selectedLocation.id.includes('vizag') || selectedLocation.name.toLowerCase().includes('visakha')
    ? 'visakhapatnam'
    : 'mangaluru';

  const pfzZones: PFZZone[] = PFZ_ZONES_DATABASE[locationKey] || PFZ_ZONES_DATABASE['mangaluru'];

  // Interactive Fuel & Catch Calculator state
  const [boatLengthMeters, setBoatLengthMeters] = useState<number>(14);
  const [dieselPricePerLiter, setDieselPricePerLiter] = useState<number>(92);

  // Calculated economics
  const blindScoutingHours = 7.5;
  const pfzGuidedHours = 3.2;
  const litersPerHour = boatLengthMeters > 15 ? 32 : 18;
  const litersSaved = Math.round((blindScoutingHours - pfzGuidedHours) * litersPerHour);
  const rupeesSaved = Math.round(litersSaved * dieselPricePerLiter);
  const co2ReducedKg = Math.round(litersSaved * 2.68); // 2.68 kg CO2 per liter diesel

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 animate-fadeIn">
      {/* Breadcrumb & Header */}
      <div className="border-b border-cyan-500/20 pb-4">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-300/80 mb-1">
          <Link to="/" className="hover:text-white transition-colors">SAGAR-SAFE AI</Link>
          <span>/</span>
          <span className="text-cyan-200">{pageI18n.pfzTitle}</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight flex items-center gap-2.5">
              <Fish className="w-7 h-7 text-emerald-400" />
              {pageI18n.pfzTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
              {pageI18n.pfzSubtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Audio Voice Broadcast */}
            <button
              id="btn-pfz-listen-voice"
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

      {/* Main PFZ Live Zones Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Active PFZ Targets */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <h3 className="font-bold text-white text-sm uppercase tracking-wider">
                ACTIVE SATELLITE-IDENTIFIED PFZ ADVISORIES ({pfzZones.length} ZONES)
              </h3>
            </div>
            <span className="text-xs font-mono text-cyan-300/80">
              Valid: Today 23:59 IST
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pfzZones.map((zone) => (
              <div
                key={zone.id}
                className="ocean-glass-card rounded-2xl p-5 border border-emerald-500/25 space-y-3.5 shadow-xl hover:border-emerald-400/50 transition-all group"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono text-emerald-300 font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30">
                      {zone.potential} POTENTIAL
                    </span>
                    <h4 className="font-bold text-white text-base mt-1.5 group-hover:text-emerald-200 transition-colors">
                      {zone.name}
                    </h4>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono text-cyan-300 font-bold block">{zone.distanceKm} km</span>
                    <span className="text-[10px] font-mono text-slate-400">Bearing: {zone.bearingDeg}°</span>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-[#03152d]/60 p-2.5 rounded-xl border border-cyan-500/15">
                  <div>
                    <span className="text-[10px] text-slate-400 block">SST Gradient:</span>
                    <span className="font-bold text-cyan-200">{zone.sstGradient} °C/km</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Chlorophyll Index:</span>
                    <span className="font-bold text-emerald-300">{zone.chlorophyllIndex}/100</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Depth Range:</span>
                    <span className="text-slate-200">{zone.depthRange}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Center Coordinates:</span>
                    <span className="text-slate-300">{zone.centerLat.toFixed(2)}°N, {zone.centerLng.toFixed(2)}°E</span>
                  </div>
                </div>

                {/* Target Species Chips */}
                <div>
                  <span className="text-[10px] font-mono text-slate-400 block mb-1.5 uppercase">Pelagic Fish Schools:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {zone.targetFish.map((fish, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-cyan-950/60 text-cyan-200 border border-cyan-500/20 flex items-center gap-1"
                      >
                        <Fish className="w-3 h-3 text-cyan-400" />
                        <span>{fish}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action button */}
                <div className="pt-2 border-t border-cyan-500/10 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-400">
                    Source: {zone.source}
                  </span>
                  <button
                    onClick={() => navigate('/map')}
                    className="text-xs font-semibold text-emerald-300 hover:text-white flex items-center gap-1 group/btn"
                  >
                    <span>View on Map</span>
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-400 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Oceanic Ecosystem Health Card */}
          <div className="ocean-glass rounded-2xl p-5 border border-cyan-400/20 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Waves className="w-4 h-4 text-cyan-400" />
                <h4 className="font-bold text-white text-xs uppercase tracking-wider">
                  COASTAL PLANKTONIC & UPWELLING TELEMETRY ({selectedLocation.name})
                </h4>
              </div>
              <span className="text-[10px] font-mono text-emerald-300">
                Oceansat-3 Multi-Spectral Data
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 rounded-xl bg-[#03152d]/60 border border-cyan-500/15">
                <span className="text-[10px] font-mono text-slate-400 block">SST</span>
                <span className="text-xl font-bold font-mono text-white">{ocean.sstCelsius}°C</span>
                <span className="text-[9px] text-emerald-400 block mt-0.5">Optimal Thermal Band</span>
              </div>
              <div className="p-3 rounded-xl bg-[#03152d]/60 border border-cyan-500/15">
                <span className="text-[10px] font-mono text-slate-400 block">CHLOROPHYLL-A</span>
                <span className="text-xl font-bold font-mono text-emerald-300">{ocean.chlorophyllMgM3} mg/m³</span>
                <span className="text-[9px] text-emerald-400 block mt-0.5">High Primary Productivity</span>
              </div>
              <div className="p-3 rounded-xl bg-[#03152d]/60 border border-cyan-500/15">
                <span className="text-[10px] font-mono text-slate-400 block">SALINITY</span>
                <span className="text-xl font-bold font-mono text-cyan-300">{ocean.salinityPsu} PSU</span>
                <span className="text-[9px] text-cyan-400 block mt-0.5">Marine Normative</span>
              </div>
              <div className="p-3 rounded-xl bg-[#03152d]/60 border border-cyan-500/15">
                <span className="text-[10px] font-mono text-slate-400 block">SURFACE CURRENT</span>
                <span className="text-xl font-bold font-mono text-sky-300">{ocean.currentSpeedKnots} kts</span>
                <span className="text-[9px] text-sky-400 block mt-0.5">Dir: {ocean.currentDirectionText}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Fuel Savings & Return on Investment Calculator */}
        <div className="space-y-4">
          <div className="ocean-glass-card rounded-2xl p-5 border border-emerald-500/30 shadow-xl space-y-4">
            <div className="flex items-center gap-2">
              <Fuel className="w-5 h-5 text-emerald-400" />
              <h3 className="font-bold text-white text-sm uppercase tracking-wider">
                {pageI18n.fuelSavingsTitle}
              </h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {pageI18n.fuelSavingsSub}
            </p>

            {/* Slider 1: Boat Length */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">{pageI18n.boatLength}:</span>
                <strong className="text-cyan-300">{boatLengthMeters} meters ({Math.round(boatLengthMeters * 3.28)} ft)</strong>
              </div>
              <input
                type="range"
                min="8"
                max="24"
                step="1"
                value={boatLengthMeters}
                onChange={(e) => setBoatLengthMeters(Number(e.target.value))}
                className="w-full accent-cyan-400 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Slider 2: Diesel Price */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">{pageI18n.dieselPrice}:</span>
                <strong className="text-emerald-300">₹{dieselPricePerLiter}</strong>
              </div>
              <input
                type="range"
                min="75"
                max="105"
                step="1"
                value={dieselPricePerLiter}
                onChange={(e) => setDieselPricePerLiter(Number(e.target.value))}
                className="w-full accent-emerald-400 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Economics Output Box */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-950/40 via-[#031d2e]/60 to-[#020b16] border border-emerald-500/40 space-y-3">
              <div className="flex items-baseline justify-between">
                <span className="text-xs font-mono text-slate-300">{pageI18n.estimatedRupeesSaved}:</span>
                <span className="text-2xl font-black font-display text-emerald-300">₹{rupeesSaved.toLocaleString('en-IN')}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-2 border-t border-emerald-500/20">
                <div>
                  <span className="text-[10px] text-slate-400 block">{pageI18n.litersSaved}:</span>
                  <span className="text-emerald-200 font-bold">{litersSaved} L</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">{pageI18n.co2Avoided}:</span>
                  <span className="text-teal-200 font-bold">{co2ReducedKg} kg CO2e</span>
                </div>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 space-y-1 leading-relaxed">
              <div className="flex items-center gap-1.5 text-emerald-300 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>CPUE (Catch Per Unit Effort) Boost: +180% - 240%</span>
              </div>
              <p>
                Based on ICAR-CMFRI and INCOIS empirical validation studies across Malabar and Konkan fishing fleets.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
