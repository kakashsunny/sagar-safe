import React, { useState } from 'react';
import { 
  X, 
  Anchor, 
  Ship, 
  Waves, 
  Wind, 
  Sun, 
  Gauge, 
  Building2, 
  Layers, 
  ShieldAlert, 
  Radio, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Clock, 
  Compass, 
  Maximize2, 
  MapPin, 
  Eye, 
  Fish, 
  Navigation,
  FileText,
  Activity,
  BarChart3,
  Satellite
} from 'lucide-react';
import { IndianPort } from '../types/marine';

interface MaritimeGisSidePanelProps {
  port: IndianPort;
  onClose: () => void;
  onCenterPort: (port: IndianPort) => void;
  onSetZoomLevel: (level: number) => void;
}

export const MaritimeGisSidePanel: React.FC<MaritimeGisSidePanelProps> = ({
  port,
  onClose,
  onCenterPort,
  onSetZoomLevel
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'vessels' | 'cargo' | 'berths' | 'weather' | 'satellite'>('overview');

  // Marker color determination
  const getPortTypeBadge = () => {
    switch (port.detailedType) {
      case 'Commercial Port':
        return { text: 'Commercial', color: '#10b981', bg: 'bg-emerald-500/20', border: 'border-emerald-500/30' };
      case 'Container Port':
        return { text: 'Container', color: '#3b82f6', bg: 'bg-blue-500/20', border: 'border-blue-500/30' };
      case 'Fishing Harbour':
        return { text: 'Fishing', color: '#f97316', bg: 'bg-orange-500/20', border: 'border-orange-500/30' };
      case 'Oil & LNG Terminal':
        return { text: 'LNG / Oil', color: '#a855f7', bg: 'bg-purple-500/20', border: 'border-purple-500/30' };
      case 'Naval Facility':
        return { text: 'Naval', color: '#ef4444', bg: 'bg-red-500/20', border: 'border-red-500/30' };
      case 'Inland Waterway':
        return { text: 'Inland Waterway', color: '#eab308', bg: 'bg-yellow-500/20', border: 'border-yellow-500/30' };
      default:
        return { text: 'Major Commercial', color: '#10b981', bg: 'bg-emerald-500/20', border: 'border-emerald-500/30' };
    }
  };

  const badge = getPortTypeBadge();

  return (
    <div className="absolute top-4 right-4 bottom-4 w-full max-w-[460px] bg-[#020e1f]/95 backdrop-blur-2xl rounded-3xl border border-cyan-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.85)] z-40 flex flex-col overflow-hidden animate-in slide-in-from-right-8 duration-200 text-slate-200">
      
      {/* 1. TOP HEADER */}
      <div className="p-5 border-b border-cyan-500/20 bg-gradient-to-b from-[#061830] to-transparent">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className={`font-mono text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${badge.bg} ${badge.border}`} style={{ color: badge.color }}>
                {badge.text}
              </span>
              <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded-md bg-cyan-950/80 text-cyan-300 border border-cyan-400/30">
                {port.portCode}
              </span>
              <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {port.liveStatus}
              </span>
            </div>

            <h2 className="font-display font-black text-xl text-white tracking-tight leading-snug">
              {port.name}
            </h2>
            <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>{port.state}, India</span>
              <span>•</span>
              <span className="font-mono text-cyan-300">{port.lat.toFixed(4)}°N, {port.lng.toFixed(4)}°E</span>
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-cyan-500/10 transition-colors border border-transparent hover:border-cyan-500/20"
            title="Close Panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-2 mt-4">
          <button
            onClick={() => onCenterPort(port)}
            className="flex-1 py-1.5 px-3 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/30 text-cyan-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
          >
            <Navigation className="w-3.5 h-3.5 text-cyan-400" />
            <span>Center on Port</span>
          </button>
          <button
            onClick={() => {
              onCenterPort(port);
              onSetZoomLevel(5);
            }}
            className="py-1.5 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-750 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
            title="Inspect Berths at Level 5 Zoom"
          >
            <Gauge className="w-3.5 h-3.5 text-amber-400" />
            <span>Berth Zoom (L5)</span>
          </button>
        </div>
      </div>

      {/* 2. TAB NAVIGATION BAR */}
      <div className="flex items-center gap-1 px-4 py-2 border-b border-cyan-500/15 overflow-x-auto scrollbar-none bg-[#020b18]/60 text-xs font-medium">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
            activeTab === 'overview'
              ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm shadow-cyan-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('vessels')}
          className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
            activeTab === 'vessels'
              ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm shadow-cyan-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          AIS Vessels ({port.vesselCount})
        </button>
        <button
          onClick={() => setActiveTab('berths')}
          className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
            activeTab === 'berths'
              ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm shadow-cyan-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Berths ({port.berthOccupancyPercent}%)
        </button>
        <button
          onClick={() => setActiveTab('cargo')}
          className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
            activeTab === 'cargo'
              ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm shadow-cyan-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Cargo
        </button>
        <button
          onClick={() => setActiveTab('weather')}
          className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
            activeTab === 'weather'
              ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm shadow-cyan-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Tides & Weather
        </button>
        <button
          onClick={() => setActiveTab('satellite')}
          className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
            activeTab === 'satellite'
              ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm shadow-cyan-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Satellite
        </button>
      </div>

      {/* 3. SCROLLABLE TAB CONTENT */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        
        {/* =============================================================== */}
        {/* TAB 1: OVERVIEW */}
        {/* =============================================================== */}
        {activeTab === 'overview' && (
          <div className="space-y-4">
            {/* Critical Telemetry Metric Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="bg-[#04162e]/70 p-3 rounded-2xl border border-cyan-500/20">
                <span className="text-[10px] font-mono text-slate-400 uppercase block">Total Vessels in Sector</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-display font-black text-white">{port.vesselCount}</span>
                  <span className="text-xs font-mono text-cyan-300">AIS Active</span>
                </div>
                <div className="mt-2 text-[10px] font-mono text-slate-300 flex justify-between">
                  <span>Docked: <strong className="text-emerald-400">{port.inPortCount}</strong></span>
                  <span>Anchor: <strong className="text-amber-400">{port.anchorageCount}</strong></span>
                </div>
              </div>

              <div className="bg-[#04162e]/70 p-3 rounded-2xl border border-cyan-500/20">
                <span className="text-[10px] font-mono text-slate-400 uppercase block">Berth Occupancy</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-display font-black text-cyan-300">{port.berthOccupancyPercent}%</span>
                  <span className="text-xs font-mono text-slate-400">/ {port.totalBerths} Berths</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2.5 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      port.berthOccupancyPercent > 85 ? 'bg-amber-400' : 'bg-cyan-400'
                    }`}
                    style={{ width: `${port.berthOccupancyPercent}%` }}
                  />
                </div>
              </div>

              <div className="bg-[#04162e]/70 p-3 rounded-2xl border border-cyan-500/20">
                <span className="text-[10px] font-mono text-slate-400 uppercase block">Max Permissible Draft</span>
                <div className="flex items-baseline gap-1.5 mt-1">
                  <span className="text-2xl font-display font-black text-white">{port.maxDraftMeters}</span>
                  <span className="text-xs font-mono text-cyan-300">meters</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400 mt-1 block">
                  Fairway: {port.channelDepthMeters || (port.maxDraftMeters + 1.2)}m CD
                </span>
              </div>

              <div className="bg-[#04162e]/70 p-3 rounded-2xl border border-cyan-500/20">
                <span className="text-[10px] font-mono text-slate-400 uppercase block">Annual Cargo Throughput</span>
                <div className="flex items-baseline gap-1.5 mt-1">
                  <span className="text-xl font-display font-bold text-white line-clamp-1">{port.annualTonnage}</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400 mt-1 block">
                  MoPSW Official Rating
                </span>
              </div>
            </div>

            {/* Safety Alert Banner */}
            {port.safetyAlert && (
              <div className="p-3.5 rounded-2xl bg-rose-950/40 border border-rose-500/40 flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-rose-200">Active Harbor Navigational Warning</h4>
                  <p className="text-xs text-rose-300/90 mt-0.5 leading-relaxed">{port.safetyAlert}</p>
                </div>
              </div>
            )}

            {/* Maritime Authority & Infrastructure Specs */}
            <div className="bg-[#04162e]/50 rounded-2xl p-4 border border-cyan-500/15 space-y-2.5 text-xs font-mono">
              <div className="flex justify-between pb-2 border-b border-white/5">
                <span className="text-slate-400">Maritime Authority</span>
                <span className="font-semibold text-white text-right">{port.authority}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-white/5">
                <span className="text-slate-400">Coastline Zone</span>
                <span className="font-semibold text-cyan-200">{port.zone}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-white/5">
                <span className="text-slate-400">Breakwater Arm</span>
                <span className="font-semibold text-amber-300">{port.breakwaterLengthMeters ? `${port.breakwaterLengthMeters} meters` : 'Natural Deep Harbor'}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-white/5">
                <span className="text-slate-400">Rail Connectivity</span>
                <span className="font-semibold text-white text-right max-w-[220px] line-clamp-2">{port.railConnectivity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Storage Capacity</span>
                <span className="font-semibold text-white text-right max-w-[220px] line-clamp-2">{port.storageCapacity}</span>
              </div>
            </div>
          </div>
        )}

        {/* =============================================================== */}
        {/* TAB 2: AIS VESSELS */}
        {/* =============================================================== */}
        {activeTab === 'vessels' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                Live Inbound / Outbound Vessel Queue
              </h3>
              <span className="text-[11px] font-mono text-cyan-300">{port.etaArrivals?.length || 0} Ships Tracked</span>
            </div>

            <div className="space-y-2.5">
              {port.etaArrivals?.map((ship) => (
                <div key={ship.id} className="p-3.5 rounded-2xl bg-[#04162e]/70 border border-cyan-500/20 hover:border-cyan-400/40 transition-all">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-sm text-white flex items-center gap-2">
                      <Ship className="w-4 h-4 text-cyan-400" />
                      {ship.vesselName}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                      {ship.timeFormatted}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-300 mt-2">
                    <div>
                      <span className="text-slate-500 block text-[9px]">TYPE / FLAG</span>
                      <span>{ship.vesselType} • {ship.flag}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[9px]">DEADWEIGHT</span>
                      <span className="text-cyan-200">{ship.dwtTonnage.toLocaleString()} DWT</span>
                    </div>
                  </div>

                  <div className="mt-2 text-[11px] font-mono text-slate-400 flex items-center justify-between pt-2 border-t border-white/5">
                    <span>Route: <strong className="text-slate-200">{ship.originDestination}</strong></span>
                    <span className="text-emerald-400 font-semibold">{ship.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =============================================================== */}
        {/* TAB 3: BERTHS */}
        {/* =============================================================== */}
        {activeTab === 'berths' && (
          <div className="space-y-4">
            <div className="bg-[#04162e]/70 p-4 rounded-2xl border border-cyan-500/20">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-white">Quay Wall Berth Allocation</span>
                <span className="text-xs font-mono text-cyan-300">{port.totalBerths} Active Berths</span>
              </div>

              {/* Graphical Berth Schematic Grid */}
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {Array.from({ length: port.totalBerths }).map((_, i) => {
                  const isOccupied = i < Math.round(port.totalBerths * (port.berthOccupancyPercent / 100));
                  return (
                    <div
                      key={i}
                      className={`p-2 rounded-xl border text-center transition-all ${
                        isOccupied
                          ? 'bg-cyan-950/80 border-cyan-400/50 text-cyan-200 shadow-sm'
                          : 'bg-slate-900/50 border-slate-800 text-slate-500'
                      }`}
                    >
                      <span className="block text-[9px] font-mono uppercase text-slate-400">B-{i + 1}</span>
                      <span className="block text-[11px] font-bold mt-0.5">
                        {isOccupied ? 'Occupied' : 'Vacant'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-[#04162e]/50 rounded-2xl p-4 border border-cyan-500/15 space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-slate-400">Total Operational Berths</span>
                <span className="font-bold text-white">{port.totalBerths}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Vessels Currently Berthed</span>
                <span className="font-bold text-emerald-400">{port.inPortCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Vessels at Roadstead Anchorage</span>
                <span className="font-bold text-amber-400">{port.anchorageCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Channel Turning Basin</span>
                <span className="font-bold text-cyan-200">{port.channelWidthMeters || 240}m Diameter</span>
              </div>
            </div>
          </div>
        )}

        {/* =============================================================== */}
        {/* TAB 4: CARGO */}
        {/* =============================================================== */}
        {activeTab === 'cargo' && (
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Commodity Breakdown</h3>
            
            <div className="space-y-3">
              {port.cargoBreakdown?.map((item) => (
                <div key={item.name} className="p-3 rounded-2xl bg-[#04162e]/70 border border-cyan-500/15">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="font-semibold text-white">{item.name}</span>
                    <span className="font-mono text-cyan-300 font-bold">{item.percentage}% ({item.mmt})</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-cyan-400 to-teal-400 h-full rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Species / Fishing info */}
            {port.primarySpecies && port.primarySpecies.length > 0 && (
              <div className="bg-[#04162e]/50 rounded-2xl p-4 border border-cyan-500/15">
                <div className="flex items-center gap-2 mb-2">
                  <Fish className="w-4 h-4 text-orange-400" />
                  <h4 className="text-xs font-bold text-white">Fisheries & Marine Species Landings</h4>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {port.primarySpecies.map((s) => (
                    <span key={s} className="px-2.5 py-1 rounded-lg bg-orange-500/15 border border-orange-500/30 text-orange-200 text-xs font-mono">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* =============================================================== */}
        {/* TAB 5: WEATHER & TIDES */}
        {/* =============================================================== */}
        {activeTab === 'weather' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2.5 text-xs font-mono">
              <div className="p-3 rounded-2xl bg-[#04162e]/70 border border-cyan-500/20">
                <span className="text-[10px] text-slate-400 block">AIR TEMPERATURE</span>
                <div className="flex items-center gap-1.5 mt-1">
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span className="text-lg font-bold text-white">{port.weatherSnapshot.tempC}°C</span>
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">{port.weatherSnapshot.condition}</span>
              </div>

              <div className="p-3 rounded-2xl bg-[#04162e]/70 border border-cyan-500/20">
                <span className="text-[10px] text-slate-400 block">WIND SPEED & HEADING</span>
                <div className="flex items-center gap-1.5 mt-1">
                  <Wind className="w-4 h-4 text-teal-400" />
                  <span className="text-lg font-bold text-white">{port.weatherSnapshot.windSpeedKnots} kts</span>
                </div>
                <span className="text-[10px] text-teal-300 mt-1 block">Direction: {port.weatherSnapshot.windDirection}</span>
              </div>

              <div className="p-3 rounded-2xl bg-[#04162e]/70 border border-cyan-500/20">
                <span className="text-[10px] text-slate-400 block">SIG WAVE HEIGHT</span>
                <div className="flex items-center gap-1.5 mt-1">
                  <Waves className="w-4 h-4 text-cyan-400" />
                  <span className="text-lg font-bold text-cyan-200">{port.weatherSnapshot.waveHeightMeters} m</span>
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">Coastal Waters</span>
              </div>

              <div className="p-3 rounded-2xl bg-[#04162e]/70 border border-cyan-500/20">
                <span className="text-[10px] text-slate-400 block">TIDAL AMPLITUDE</span>
                <div className="flex items-center gap-1.5 mt-1">
                  <Gauge className="w-4 h-4 text-blue-400" />
                  <span className="text-lg font-bold text-blue-200">+{port.weatherSnapshot.tideHeightM} m</span>
                </div>
                <span className="text-[10px] text-emerald-400 mt-1 block">{port.weatherSnapshot.tideStatus}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-cyan-950/40 border border-cyan-400/30 text-xs font-mono text-cyan-200 flex items-center justify-between">
              <span>Next Astronomical Tide:</span>
              <strong className="text-white">{port.weatherSnapshot.nextTideTime}</strong>
            </div>
          </div>
        )}

        {/* =============================================================== */}
        {/* TAB 6: SATELLITE / DOCK VIEW */}
        {/* =============================================================== */}
        {activeTab === 'satellite' && (
          <div className="space-y-4">
            <div className="rounded-2xl overflow-hidden border border-cyan-500/30 relative h-48 bg-[#020b18]">
              {/* Satellite dock raster map */}
              <img
                src="/src/assets/images/india_satellite_map_1788934258770.jpg"
                alt={`${port.name} satellite aerial image`}
                className="w-full h-full object-cover object-center filter contrast-125 brightness-90"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-[#020b18] via-transparent to-transparent" />
              
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-white bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-cyan-500/20">
                <span>Coordinates: {port.lat.toFixed(3)}°N, {port.lng.toFixed(3)}°E</span>
                <span className="text-cyan-300">MoPSW Hydrographic</span>
              </div>
            </div>

            <div className="text-xs text-slate-300 font-mono space-y-1.5 p-3 rounded-2xl bg-[#04162e]/50 border border-cyan-500/15">
              <p>• Outer Breakwater Protection: <strong>{port.breakwaterLengthMeters || 1200}m</strong></p>
              <p>• Channel Width: <strong>{port.channelWidthMeters || 260}m</strong></p>
              <p>• Channel Depth: <strong>{port.channelDepthMeters || 15.5}m Chart Datum</strong></p>
            </div>
          </div>
        )}

      </div>

      {/* 4. FOOTER STATUS BAR */}
      <div className="p-3 px-5 border-t border-cyan-500/20 bg-[#020b18]/80 text-[11px] font-mono text-slate-400 flex items-center justify-between">
        <span>SAGAR-SAFE GIS • WGS84</span>
        <span className="text-cyan-300">INCOIS / MoPSW Certified</span>
      </div>

    </div>
  );
};
