import React, { useState } from 'react';
import { IndianPort } from '../types/marine';
import { 
  X, 
  Compass, 
  MapPin, 
  Anchor, 
  Ship, 
  Wind, 
  Waves, 
  Thermometer, 
  Eye, 
  Gauge, 
  TrendingUp, 
  ShieldAlert, 
  ShieldCheck, 
  Layers, 
  Activity, 
  Clock, 
  Fish, 
  Box, 
  Train, 
  Warehouse, 
  ArrowUpRight, 
  ArrowDownLeft, 
  ExternalLink,
  Navigation,
  CheckCircle2,
  AlertTriangle,
  FileCheck
} from 'lucide-react';

interface PortDetailsModalProps {
  port: IndianPort | null;
  onClose: () => void;
  onViewOnMap?: (port: IndianPort) => void;
}

export const PortDetailsModal: React.FC<PortDetailsModalProps> = ({
  port,
  onClose,
  onViewOnMap
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'vessels' | 'traffic' | 'weather' | 'cargo'>('overview');

  if (!port) return null;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Operational':
        return 'bg-emerald-500/15 text-emerald-300 border-emerald-400/30';
      case 'High Congestion':
        return 'bg-amber-500/15 text-amber-300 border-amber-400/30';
      case 'Advisory Alert':
        return 'bg-rose-500/15 text-rose-300 border-rose-400/30';
      default:
        return 'bg-cyan-500/15 text-cyan-300 border-cyan-400/30';
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'Major Port':
        return 'bg-blue-500/20 text-blue-300 border-blue-400/40';
      case 'Container Port':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40';
      case 'Commercial Port':
        return 'bg-indigo-500/20 text-indigo-300 border-indigo-400/40';
      case 'Fishing Harbour':
        return 'bg-amber-500/20 text-amber-300 border-amber-400/40';
      case 'Oil & LNG Terminal':
        return 'bg-orange-500/20 text-orange-300 border-orange-400/40';
      case 'Naval Facility':
        return 'bg-violet-500/20 text-violet-300 border-violet-400/40';
      case 'Inland Waterway':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40';
      default:
        return 'bg-slate-500/20 text-slate-300 border-slate-400/40';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-[#020b16]/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-5xl max-h-[92vh] flex flex-col bg-[#051329] border border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-950/70 overflow-hidden text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Satellite Banner Accent */}
        <div className="relative border-b border-cyan-500/20 bg-gradient-to-r from-[#071d3a] via-[#09254a] to-[#051329] px-5 py-4">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                {port.portCode ? (
                  <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-200 border border-cyan-400/40" title="Verified UN/LOCODE">
                    UN/LOCODE: {port.portCode}
                  </span>
                ) : (
                  <span className="font-mono text-[11px] px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700/60" title="Purely fisheries/landing facility without commercial UN/LOCODE">
                    No UN/LOCODE (Fisheries/Landing Facility)
                  </span>
                )}
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${getTypeBadge(port.facilityType || port.detailedType)}`}>
                  {port.facilityType || port.detailedType}
                </span>
                <span className={`text-xs font-mono px-2.5 py-0.5 rounded-full border flex items-center gap-1.5 ${getStatusBadge(port.operationalStatus || port.liveStatus)}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />
                  {port.operationalStatus || port.liveStatus}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {port.state} • {port.zone}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-display font-black text-white tracking-wide flex items-center gap-2">
                <Anchor className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                <span>{port.name}</span>
              </h2>

              <div className="flex flex-wrap items-center gap-2 text-xs text-cyan-300/80 font-mono">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{port.lat.toFixed(4)}°N, {port.lng.toFixed(4)}°E</span>
                </span>
                <span>•</span>
                <span>Authority: {port.authority}</span>
              </div>

              {port.officialSource && (
                <div className="inline-flex items-center gap-1.5 text-[11px] font-mono bg-[#020b16]/80 text-cyan-300 px-2.5 py-1 rounded-md border border-cyan-500/20">
                  <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Verified Source: <strong className="text-white">{port.officialSource}</strong></span>
                </div>
              )}

              {port.facilityCategories && port.facilityCategories.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[10px] uppercase font-mono text-slate-400">Classifications:</span>
                  {port.facilityCategories.map((c, i) => (
                    <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/70 text-cyan-300 border border-cyan-500/30">
                      {c}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Actions & Close */}
            <div className="flex items-center gap-2">
              {onViewOnMap && (
                <button
                  onClick={() => {
                    onViewOnMap(port);
                    onClose();
                  }}
                  className="px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-200 border border-cyan-400/40 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
                >
                  <Navigation className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="hidden sm:inline">View on Satellite Map</span>
                </button>
              )}
              <button
                onClick={onClose}
                className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-600/40 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 mt-4 text-xs font-mono">
            <div className="bg-[#030d1a]/80 p-2 rounded-lg border border-cyan-500/15">
              <span className="text-slate-400 block text-[10px] uppercase">Active Vessels</span>
              <span className="text-sm font-bold text-cyan-200">{port.vesselCount} Ships</span>
            </div>
            <div className="bg-[#030d1a]/80 p-2 rounded-lg border border-cyan-500/15">
              <span className="text-slate-400 block text-[10px] uppercase">Berth Occupancy</span>
              <span className="text-sm font-bold text-emerald-300">{port.berthOccupancyPercent}%</span>
            </div>
            <div className="bg-[#030d1a]/80 p-2 rounded-lg border border-cyan-500/15">
              <span className="text-slate-400 block text-[10px] uppercase">Max Draft</span>
              <span className="text-sm font-bold text-blue-300">{port.maxDraftMeters} m</span>
            </div>
            <div className="bg-[#030d1a]/80 p-2 rounded-lg border border-cyan-500/15">
              <span className="text-slate-400 block text-[10px] uppercase">Total Berths</span>
              <span className="text-sm font-bold text-white">{port.totalBerths} Berths</span>
            </div>
            <div className="bg-[#030d1a]/80 p-2 rounded-lg border border-cyan-500/15">
              <span className="text-slate-400 block text-[10px] uppercase">Wave / Swell</span>
              <span className="text-sm font-bold text-cyan-300">{port.weatherSnapshot.waveHeightMeters} m</span>
            </div>
            <div className="bg-[#030d1a]/80 p-2 rounded-lg border border-cyan-500/15">
              <span className="text-slate-400 block text-[10px] uppercase">Wind Speed</span>
              <span className="text-sm font-bold text-amber-300">{port.weatherSnapshot.windSpeedKnots} kts</span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 mt-4 border-t border-cyan-500/15 pt-3 overflow-x-auto scrollbar-none text-xs">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'overview'
                  ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-cyan-500/10'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Overview & Dock Layout</span>
            </button>
            <button
              onClick={() => setActiveTab('vessels')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'vessels'
                  ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-cyan-500/10'
              }`}
            >
              <Ship className="w-3.5 h-3.5" />
              <span>Vessel Movements ({port.etaArrivals.length + port.etdDepartures.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('traffic')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'traffic'
                  ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-cyan-500/10'
              }`}
            >
              <Gauge className="w-3.5 h-3.5" />
              <span>AIS Traffic & Utilization</span>
            </button>
            <button
              onClick={() => setActiveTab('weather')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'weather'
                  ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-cyan-500/10'
              }`}
            >
              <Waves className="w-3.5 h-3.5" />
              <span>Weather & Tide Analytics</span>
            </button>
            <button
              onClick={() => setActiveTab('cargo')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'cargo'
                  ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-cyan-500/10'
              }`}
            >
              <Box className="w-3.5 h-3.5" />
              <span>Cargo & Fisheries</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* TAB 1: OVERVIEW & DOCK LAYOUT */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Satellite Dock Simulation Card */}
              <div className="relative rounded-2xl overflow-hidden border border-cyan-500/30 bg-[#030c18] p-5 shadow-xl">
                <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-cyan-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                      Dock Infrastructure & Satellite Contours
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
                    High-Res Bathymetry & Docks
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2 relative h-56 rounded-xl overflow-hidden border border-cyan-500/30 bg-slate-900 flex items-center justify-center">
                    {/* Realistic Satellite-like Canvas Texture */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage: `radial-gradient(circle at 40% 50%, rgba(14, 165, 233, 0.25) 0%, rgba(2, 6, 23, 0.95) 75%), url('https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80')`,
                        backgroundBlendMode: 'overlay'
                      }}
                    />
                    
                    {/* Geometric Dock & Breakwater Schematics Overlay */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 600 240">
                      {/* Coastline Contour */}
                      <path d="M 0,90 Q 150,110 260,85 T 480,120 T 600,105" fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="4 2" />
                      {/* Breakwater Arms */}
                      {port.breakwaterLengthMeters && port.breakwaterLengthMeters > 0 && (
                        <>
                          <line x1="220" y1="85" x2="310" y2="150" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" />
                          <line x1="390" y1="120" x2="330" y2="160" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" />
                          <text x="320" y="180" fill="#fcd34d" fontSize="10" fontFamily="monospace" textAnchor="middle">Breakwater ({port.breakwaterLengthMeters}m)</text>
                        </>
                      )}
                      {/* Navigation Channel */}
                      <path d="M 320,230 L 320,165" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="3 3" />
                      {/* Port Basins */}
                      <rect x="230" y="55" width="80" height="28" rx="3" fill="#0284c7" fillOpacity="0.4" stroke="#38bdf8" strokeWidth="1.5" />
                      <text x="270" y="73" fill="#e0f2fe" fontSize="10" fontFamily="monospace" textAnchor="middle">Inner Basin</text>
                      {/* Coordinates Pin */}
                      <circle cx="320" cy="110" r="6" fill="#06b6d4" className="animate-ping" />
                      <circle cx="320" cy="110" r="4" fill="#ffffff" />
                      <text x="320" y="132" fill="#a5f3fc" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                        {port.portCode ? `${port.portCode} • ` : ''}{port.name.split(' ')[0]}
                      </text>
                    </svg>

                    <div className="absolute bottom-2 left-2 bg-[#020b16]/85 px-2.5 py-1 rounded-md text-[11px] font-mono text-cyan-200 border border-cyan-400/30">
                      Depth: {port.maxDraftMeters}m CD • Channel: {port.channelDepthMeters || port.maxDraftMeters + 1}m
                    </div>
                  </div>

                  {/* Port Infrastructure Specs */}
                  <div className="space-y-3 font-mono text-xs">
                    <div className="bg-[#020b16]/70 p-3 rounded-xl border border-cyan-500/20 space-y-1">
                      <span className="text-slate-400 text-[10px] block uppercase flex items-center gap-1.5">
                        <Train className="w-3 h-3 text-cyan-400" />
                        Rail Connectivity
                      </span>
                      <p className="text-slate-200 text-[11px] leading-relaxed">
                        {port.railConnectivity || 'Feeder road and rail transport linkages'}
                      </p>
                    </div>

                    <div className="bg-[#020b16]/70 p-3 rounded-xl border border-cyan-500/20 space-y-1">
                      <span className="text-slate-400 text-[10px] block uppercase flex items-center gap-1.5">
                        <Warehouse className="w-3 h-3 text-cyan-400" />
                        Storage & Capacity
                      </span>
                      <p className="text-slate-200 text-[11px] leading-relaxed">
                        {port.storageCapacity || 'Full cargo sheds, reefer points, and container yards'}
                      </p>
                    </div>

                    <div className="bg-[#020b16]/70 p-3 rounded-xl border border-cyan-500/20 space-y-1">
                      <span className="text-slate-400 text-[10px] block uppercase flex items-center gap-1.5">
                        <TrendingUp className="w-3 h-3 text-cyan-400" />
                        Annual Throughput
                      </span>
                      <p className="text-emerald-300 font-bold text-xs">
                        {port.annualTonnage}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Safety Advisory Banner */}
              <div className={`p-4 rounded-2xl border flex items-start gap-3.5 ${
                port.safetyAdvisory.level === 'RED'
                  ? 'bg-rose-950/40 border-rose-500/40 text-rose-200'
                  : port.safetyAdvisory.level === 'YELLOW'
                  ? 'bg-amber-950/40 border-amber-500/40 text-amber-200'
                  : 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
              }`}>
                {port.safetyAdvisory.level === 'RED' ? (
                  <ShieldAlert className="w-6 h-6 text-rose-400 flex-shrink-0 mt-0.5" />
                ) : port.safetyAdvisory.level === 'YELLOW' ? (
                  <AlertTriangle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
                ) : (
                  <ShieldCheck className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                )}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs uppercase tracking-wide">
                      {port.safetyAdvisory.headline}
                    </span>
                    <span className="text-[10px] font-mono opacity-80">
                      • Issued by: {port.safetyAdvisory.issuedBy} ({port.safetyAdvisory.timestamp})
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {port.safetyAdvisory.advisoryText}
                  </p>
                </div>
              </div>

              {/* Primary Species for Fishing & Marine */}
              {port.primarySpecies && port.primarySpecies.length > 0 && (
                <div className="ocean-glass-card rounded-2xl p-4 border border-cyan-500/20 space-y-2">
                  <div className="flex items-center gap-2">
                    <Fish className="w-4 h-4 text-cyan-400" />
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      Coastal & Marine Pelagic Species
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {port.primarySpecies.map((species, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-cyan-950/50 text-cyan-200 border border-cyan-500/30 text-xs font-mono flex items-center gap-1.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        {species}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: VESSEL MOVEMENTS (ETA / ETD) */}
          {activeTab === 'vessels' && (
            <div className="space-y-6">
              {/* Arrivals */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ArrowDownLeft className="w-4 h-4 text-emerald-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                      Expected Arrivals (ETA)
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                    {port.etaArrivals.length} Vessels En Route
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  {port.etaArrivals.map((vessel) => (
                    <div
                      key={vessel.id}
                      className="p-3.5 rounded-xl bg-[#030e1f] border border-cyan-500/20 hover:border-cyan-400/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">
                          <Ship className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-white">{vessel.vesselName}</span>
                            <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                              {vessel.vesselType}
                            </span>
                            <span className="text-xs text-slate-400">{vessel.flag}</span>
                          </div>
                          <p className="text-xs text-slate-400 font-mono mt-0.5">
                            From: <strong className="text-cyan-200">{vessel.originDestination}</strong>
                            {vessel.dwtTonnage && ` • ${vessel.dwtTonnage.toLocaleString()} DWT`}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 sm:text-right font-mono text-xs">
                        <div>
                          <span className="text-[10px] text-slate-400 block uppercase">ETA Schedule</span>
                          <span className="text-emerald-300 font-bold">{vessel.timeFormatted}</span>
                        </div>
                        <span className="px-2.5 py-1 rounded-md bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-[11px]">
                          {vessel.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Departures */}
              <div className="space-y-3 pt-4 border-t border-cyan-500/15">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ArrowUpRight className="w-4 h-4 text-cyan-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                      Scheduled Departures (ETD)
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">
                    {port.etdDepartures.length} Vessels Outbound
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  {port.etdDepartures.map((vessel) => (
                    <div
                      key={vessel.id}
                      className="p-3.5 rounded-xl bg-[#030e1f] border border-cyan-500/20 hover:border-cyan-400/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">
                          <Ship className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-white">{vessel.vesselName}</span>
                            <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                              {vessel.vesselType}
                            </span>
                            <span className="text-xs text-slate-400">{vessel.flag}</span>
                          </div>
                          <p className="text-xs text-slate-400 font-mono mt-0.5">
                            Dest: <strong className="text-cyan-200">{vessel.originDestination}</strong>
                            {vessel.berth && ` • Berth: ${vessel.berth}`}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 sm:text-right font-mono text-xs">
                        <div>
                          <span className="text-[10px] text-slate-400 block uppercase">ETD Schedule</span>
                          <span className="text-cyan-300 font-bold">{vessel.timeFormatted}</span>
                        </div>
                        <span className="px-2.5 py-1 rounded-md bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 text-[11px]">
                          {vessel.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: AIS TRAFFIC & UTILIZATION */}
          {activeTab === 'traffic' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-[#030e1f] border border-cyan-500/20">
                  <span className="text-slate-400 text-xs font-mono block mb-1">BERTH OCCUPANCY</span>
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-bold font-mono text-emerald-400">{port.berthOccupancyPercent}%</span>
                    <span className="text-xs text-slate-400 mb-1">Capacity utilized</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-3">
                    <div 
                      className="bg-emerald-400 h-full rounded-full transition-all duration-500" 
                      style={{ width: `${port.berthOccupancyPercent}%` }} 
                    />
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 mt-2 block">
                    {Math.round((port.totalBerths * port.berthOccupancyPercent) / 100)} of {port.totalBerths} active berths occupied
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-[#030e1f] border border-cyan-500/20">
                  <span className="text-slate-400 text-xs font-mono block mb-1">IN-PORT VESSELS</span>
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-bold font-mono text-cyan-300">{port.inPortCount}</span>
                    <span className="text-xs text-slate-400 mb-1">Inside basins & jetties</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-3">
                    <div 
                      className="bg-cyan-400 h-full rounded-full" 
                      style={{ width: `${(port.inPortCount / (port.inPortCount + port.anchorageCount)) * 100}%` }} 
                    />
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 mt-2 block">
                    Discharging & loading at docks
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-[#030e1f] border border-cyan-500/20">
                  <span className="text-slate-400 text-xs font-mono block mb-1">OUTER ANCHORAGE</span>
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-bold font-mono text-amber-300">{port.anchorageCount}</span>
                    <span className="text-xs text-slate-400 mb-1">Waiting in roadstead</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-3">
                    <div 
                      className="bg-amber-400 h-full rounded-full" 
                      style={{ width: `${(port.anchorageCount / (port.inPortCount + port.anchorageCount)) * 100}%` }} 
                    />
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 mt-2 block">
                    Average wait time ~4.2 hours
                  </span>
                </div>
              </div>

              {/* VTS & Traffic Management Details */}
              <div className="p-4 rounded-xl bg-[#020b16] border border-cyan-500/20 space-y-3 font-mono text-xs">
                <h4 className="text-sm font-bold text-white uppercase flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-400" />
                  Vessel Traffic Service (VTS) Operations
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-[11px]">
                  <div className="p-2.5 rounded bg-slate-900/60 border border-slate-700/50">
                    <span className="text-slate-400 block text-[10px]">VHF CALL CHANNEL</span>
                    <span className="text-white font-bold">VHF Ch 16 / Ch 12 (Port Control)</span>
                  </div>
                  <div className="p-2.5 rounded bg-slate-900/60 border border-slate-700/50">
                    <span className="text-slate-400 block text-[10px]">PILOTAGE STATUS</span>
                    <span className="text-emerald-300 font-bold">Compulsory 24x7</span>
                  </div>
                  <div className="p-2.5 rounded bg-slate-900/60 border border-slate-700/50">
                    <span className="text-slate-400 block text-[10px]">TUG ASSISTANCE</span>
                    <span className="text-cyan-300 font-bold">4 to 6 Harbor Tugs on Standby</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: WEATHER & TIDE ANALYTICS */}
          {activeTab === 'weather' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 font-mono">
                <div className="p-3.5 rounded-xl bg-[#030e1f] border border-cyan-500/20">
                  <span className="text-slate-400 text-xs block mb-1">AIR TEMP</span>
                  <div className="flex items-center gap-2">
                    <Thermometer className="w-5 h-5 text-amber-400" />
                    <span className="text-xl font-bold text-white">{port.weatherSnapshot.tempC}°C</span>
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 block">{port.weatherSnapshot.condition}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#030e1f] border border-cyan-500/20">
                  <span className="text-slate-400 text-xs block mb-1">SIGNIFICANT WAVE</span>
                  <div className="flex items-center gap-2">
                    <Waves className="w-5 h-5 text-cyan-400" />
                    <span className="text-xl font-bold text-cyan-200">{port.weatherSnapshot.waveHeightMeters} m</span>
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 block">Inshore calm waters</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#030e1f] border border-cyan-500/20">
                  <span className="text-slate-400 text-xs block mb-1">WIND VELOCITY</span>
                  <div className="flex items-center gap-2">
                    <Wind className="w-5 h-5 text-teal-400" />
                    <span className="text-xl font-bold text-teal-200">{port.weatherSnapshot.windSpeedKnots} kts</span>
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 block">Direction: {port.weatherSnapshot.windDirection}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#030e1f] border border-cyan-500/20">
                  <span className="text-slate-400 text-xs block mb-1">VISIBILITY</span>
                  <div className="flex items-center gap-2">
                    <Eye className="w-5 h-5 text-blue-400" />
                    <span className="text-xl font-bold text-blue-200">{port.weatherSnapshot.visibilityKm} km</span>
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 block">Pressure: {port.weatherSnapshot.pressureHpa} hPa</span>
                </div>
              </div>

              {/* Tide Information Card */}
              <div className="p-4 rounded-xl bg-[#020b16] border border-cyan-500/25 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white uppercase flex items-center gap-2">
                    <Waves className="w-4 h-4 text-cyan-400" />
                    Tide Curve & Permissible Draught
                  </h4>
                  <span className="text-xs font-mono text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
                    Live INCOIS Gauge
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                  <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-700/50">
                    <span className="text-slate-400 text-[10px] block">CURRENT TIDE STATE</span>
                    <span className="text-emerald-300 font-bold text-base">{port.weatherSnapshot.tideStatus}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-700/50">
                    <span className="text-slate-400 text-[10px] block">TIDAL HEIGHT</span>
                    <span className="text-cyan-300 font-bold text-base">+{port.weatherSnapshot.tideHeightM} meters</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-700/50">
                    <span className="text-slate-400 text-[10px] block">NEXT WINDOW</span>
                    <span className="text-white font-bold text-xs">{port.weatherSnapshot.nextTideTime}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: CARGO & FISHERIES */}
          {activeTab === 'cargo' && (
            <div className="space-y-6">
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Box className="w-4 h-4 text-cyan-400" />
                  Cargo Throughput Distribution
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {port.cargoBreakdown.map((item, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-[#030e1f] border border-cyan-500/20">
                      <div className="flex items-center justify-between mb-1 font-mono">
                        <span className="text-xs font-bold text-white">{item.name}</span>
                        <span className="text-xs font-bold text-cyan-300">{item.percentage}%</span>
                      </div>
                      <span className="text-xs text-slate-400 font-mono block mb-2">{item.mmt}</span>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-cyan-400 h-full rounded-full" 
                          style={{ width: `${item.percentage}%` }} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Handled Cargo Types */}
              <div className="space-y-2">
                <span className="text-xs text-slate-400 uppercase font-mono block">Commodity Categories Handled:</span>
                <div className="flex flex-wrap gap-2">
                  {port.cargoTypes?.map((c, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg bg-cyan-950/40 text-cyan-200 border border-cyan-500/20 text-xs font-mono"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-cyan-500/20 bg-[#030c18] flex items-center justify-between text-xs text-slate-400 font-mono">
          <span>Port ID: {port.id}</span>
          <div className="flex items-center gap-3">
            <span>SAGAR-SAFE Dynamic Maritime Infrastructure</span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
