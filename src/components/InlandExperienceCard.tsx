import React from 'react';
import { 
  MapPin, 
  CloudSun, 
  Compass, 
  ArrowRight, 
  Waves, 
  Info, 
  AlertCircle, 
  Thermometer, 
  Wind, 
  Droplets,
  Anchor
} from 'lucide-react';
import { MarineLocation } from '../types/marine';

interface InlandExperienceCardProps {
  location: MarineLocation;
  onExploreCoastal: () => void;
}

export const InlandExperienceCard: React.FC<InlandExperienceCardProps> = ({
  location,
  onExploreCoastal
}) => {
  return (
    <div className="ocean-glass-card rounded-3xl p-6 sm:p-8 max-w-4xl mx-auto my-8 border border-amber-400/30 shadow-2xl relative overflow-hidden text-left">
      
      {/* Background soft amber aura */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-400/30 flex items-center justify-center">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-display font-black text-2xl text-white tracking-tight flex items-center gap-2">
              <span>📍 {location.name.toUpperCase()}</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono">
                INLAND REGION ({location.distanceFromCoastKm} km from Coast)
              </span>
            </h2>
            <p className="text-xs text-slate-300">
              {location.state}, {location.country} • Coordinates: {location.lat.toFixed(2)}°N, {location.lng.toFixed(2)}°E
            </p>
          </div>
        </div>

        <button
          id="btn-inland-explore-coastal-top"
          onClick={onExploreCoastal}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/25 transition-all"
        >
          <Compass className="w-4 h-4" />
          <span>Explore Coastal Areas</span>
        </button>
      </div>

      {/* General Inland Terrestrial Weather */}
      <div className="mb-6">
        <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-cyan-300 mb-3 flex items-center gap-2">
          <CloudSun className="w-4 h-4 text-cyan-400" />
          GENERAL TERRESTRIAL WEATHER
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-white/5 rounded-xl p-3 border border-white/10">
            <span className="text-[10px] text-slate-400 block font-mono">Temperature</span>
            <div className="flex items-center gap-1.5 mt-1">
              <Thermometer className="w-4 h-4 text-amber-400" />
              <span className="font-display font-bold text-lg text-white">26.5°C</span>
            </div>
            <span className="text-[10px] text-slate-400">Clear Sky</span>
          </div>

          <div className="bg-white/5 rounded-xl p-3 border border-white/10">
            <span className="text-[10px] text-slate-400 block font-mono">Wind Speed</span>
            <div className="flex items-center gap-1.5 mt-1">
              <Wind className="w-4 h-4 text-teal-400" />
              <span className="font-display font-bold text-lg text-white">12 km/h</span>
            </div>
            <span className="text-[10px] text-slate-400">Easterly Breeze</span>
          </div>

          <div className="bg-white/5 rounded-xl p-3 border border-white/10">
            <span className="text-[10px] text-slate-400 block font-mono">Humidity</span>
            <div className="flex items-center gap-1.5 mt-1">
              <Droplets className="w-4 h-4 text-sky-400" />
              <span className="font-display font-bold text-lg text-white">52%</span>
            </div>
            <span className="text-[10px] text-slate-400">Comfortable</span>
          </div>

          <div className="bg-white/5 rounded-xl p-3 border border-white/10">
            <span className="text-[10px] text-slate-400 block font-mono">Precipitation</span>
            <div className="flex items-center gap-1.5 mt-1">
              <CloudSun className="w-4 h-4 text-emerald-400" />
              <span className="font-display font-bold text-lg text-white">0%</span>
            </div>
            <span className="text-[10px] text-slate-400">No rain expected</span>
          </div>
        </div>
      </div>

      {/* Dedicated Marine Fishing Glass Callout Card */}
      <div className="bg-sky-950/40 rounded-2xl p-5 border border-sky-400/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 flex items-center justify-center shrink-0">
            <Waves className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-display font-bold text-base text-white flex items-center gap-2">
              <span>🌊 MARINE FISHING & OCEANOGRAPHY</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-slate-300 font-mono">
                Not Applicable
              </span>
            </h4>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed max-w-xl">
              This location is located inland. Marine fishing zone (PFZ) intelligence, ocean state forecasts, and coastal advisories are unavailable here.
            </p>
          </div>
        </div>

        <button
          id="btn-inland-explore-coastal-bottom"
          onClick={onExploreCoastal}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/30 shrink-0 transition-all active:scale-95"
        >
          <Anchor className="w-4 h-4" />
          <span>Switch to Coastal Hub</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
