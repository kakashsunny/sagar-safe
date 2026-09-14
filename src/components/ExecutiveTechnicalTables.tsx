import React from 'react';
import { 
  Anchor, 
  Ship, 
  Waves, 
  Activity, 
  Gauge, 
  BarChart3, 
  CheckCircle2, 
  AlertCircle, 
  Compass,
  Layers,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { 
  EXECUTIVE_BERTH_OCCUPANCY, 
  EXECUTIVE_AIS_TARGET_BREAKDOWN, 
  EXECUTIVE_SYNOPTIC_WAVE_DATA,
  MOPSW_STATISTICS 
} from '../data/maritimeData';
import { MarineLocation } from '../types/marine';

interface ExecutiveTechnicalTablesProps {
  selectedLocation: MarineLocation;
}

export const ExecutiveTechnicalTables: React.FC<ExecutiveTechnicalTablesProps> = ({
  selectedLocation
}) => {
  return (
    <div id="executive-command-suite" className="space-y-6 animate-fadeIn">
      {/* Executive Command Bridge Header */}
      <div className="ocean-glass rounded-2xl p-5 border border-cyan-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.25)] shrink-0">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-black text-base sm:text-lg text-white tracking-wide uppercase">
                  EXECUTIVE COMMAND SUITE • TECHNICAL TELEMETRY
                </h3>
                <span className="bg-cyan-500/20 text-cyan-300 text-[10px] font-mono px-2 py-0.5 rounded-full border border-cyan-400/30">
                  MoPSW AUDIT GRADE
                </span>
              </div>
              <p className="text-xs text-slate-300 font-mono mt-0.5">
                Real-time synchronized hydrographic buoys, AIS target telemetry & berth allocation index for {selectedLocation.name}.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="px-3 py-1.5 rounded-xl bg-slate-900/80 border border-cyan-500/30 text-[11px] font-mono text-cyan-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>TOTAL LIVE TARGETS: <strong className="text-white">{EXECUTIVE_AIS_TARGET_BREAKDOWN.totalLiveAisTargets}</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* 1. SUB-TABLE A: BERTH OCCUPANCY TELEMETRY */}
      <div className="ocean-glass rounded-2xl p-5 border border-cyan-500/20 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-cyan-500/20 pb-3">
          <div className="flex items-center gap-2.5">
            <Anchor className="w-4 h-4 text-cyan-400" />
            <h4 className="font-bold text-sm text-white tracking-wide">
              1. BERTH OCCUPANCY & TURNAROUND TELEMETRY
            </h4>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span>Operational Berths: <strong className="text-cyan-300">5 Monitored</strong></span>
            <span>•</span>
            <span>Avg Occupancy: <strong className="text-emerald-300">69%</strong></span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-200">
            <thead className="bg-[#020e1f]/80 text-[11px] font-mono text-cyan-300 uppercase border-b border-cyan-500/30">
              <tr>
                <th className="py-2.5 px-3">Berth ID & Facility</th>
                <th className="py-2.5 px-3">Length (m)</th>
                <th className="py-2.5 px-3">Max Draft</th>
                <th className="py-2.5 px-3">Occupying Vessel</th>
                <th className="py-2.5 px-3">Cargo Classification</th>
                <th className="py-2.5 px-3">Turnaround Target</th>
                <th className="py-2.5 px-3">Capacity</th>
                <th className="py-2.5 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyan-500/10 font-mono">
              {EXECUTIVE_BERTH_OCCUPANCY.map((berth) => (
                <tr key={berth.berthId} className="hover:bg-cyan-500/5 transition-colors">
                  <td className="py-2.5 px-3 font-semibold text-white">
                    <span className="text-cyan-400 font-bold mr-1.5">{berth.berthId}</span>
                    <span>{berth.berthName}</span>
                  </td>
                  <td className="py-2.5 px-3">{berth.lengthMeters}m</td>
                  <td className="py-2.5 px-3 text-cyan-300">{berth.draftMeters}m</td>
                  <td className="py-2.5 px-3 text-slate-100">
                    <div>{berth.currentVessel}</div>
                    <div className="text-[10px] text-slate-400">{berth.vesselImo}</div>
                  </td>
                  <td className="py-2.5 px-3 text-slate-300">{berth.cargoClass}</td>
                  <td className="py-2.5 px-3">{berth.turnaroundTargetHrs} hrs</td>
                  <td className="py-2.5 px-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 rounded-full bg-slate-800 overflow-hidden border border-slate-700">
                        <div 
                          className={`h-full rounded-full ${
                            berth.occupancyPercent > 80 
                              ? 'bg-rose-500' 
                              : berth.occupancyPercent > 0 
                                ? 'bg-emerald-400' 
                                : 'bg-slate-600'
                          }`}
                          style={{ width: `${berth.occupancyPercent}%` }}
                        />
                      </div>
                      <span className="text-[11px]">{berth.occupancyPercent}%</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                      berth.status === 'Occupied'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    }`}>
                      {berth.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. SUB-TABLE B: AIS LIVE TARGET COUNTS & FLEET DYNAMICS */}
      <div className="ocean-glass rounded-2xl p-5 border border-cyan-500/20 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-cyan-500/20 pb-3">
          <div className="flex items-center gap-2.5">
            <Ship className="w-4 h-4 text-cyan-400" />
            <h4 className="font-bold text-sm text-white tracking-wide">
              2. AIS LIVE TARGET COUNTS & FLEET CATEGORIZATION
            </h4>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-slate-400">Collision Risk Index:</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
              {EXECUTIVE_AIS_TARGET_BREAKDOWN.collisionRiskIndex} (NORMAL)
            </span>
          </div>
        </div>

        {/* Metric Pill Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 pt-1">
          <div className="bg-[#020b16]/70 border border-cyan-500/20 rounded-xl p-3 text-center">
            <div className="text-[10px] font-mono text-cyan-300/80 uppercase">Cargo Carriers</div>
            <div className="text-xl font-bold font-mono text-white mt-1">{EXECUTIVE_AIS_TARGET_BREAKDOWN.commercialCargo}</div>
            <div className="text-[9px] text-slate-400 mt-0.5">Bulk / General</div>
          </div>
          <div className="bg-[#020b16]/70 border border-cyan-500/20 rounded-xl p-3 text-center">
            <div className="text-[10px] font-mono text-cyan-300/80 uppercase">Crude Tankers</div>
            <div className="text-xl font-bold font-mono text-cyan-200 mt-1">{EXECUTIVE_AIS_TARGET_BREAKDOWN.crudeTankers}</div>
            <div className="text-[9px] text-slate-400 mt-0.5">VLCC / Aframax</div>
          </div>
          <div className="bg-[#020b16]/70 border border-cyan-500/20 rounded-xl p-3 text-center">
            <div className="text-[10px] font-mono text-cyan-300/80 uppercase">Container Ships</div>
            <div className="text-xl font-bold font-mono text-emerald-300 mt-1">{EXECUTIVE_AIS_TARGET_BREAKDOWN.containerLiners}</div>
            <div className="text-[9px] text-slate-400 mt-0.5">Scheduled Liners</div>
          </div>
          <div className="bg-[#020b16]/70 border border-cyan-500/20 rounded-xl p-3 text-center">
            <div className="text-[10px] font-mono text-cyan-300/80 uppercase">Fishing Vessels</div>
            <div className="text-xl font-bold font-mono text-amber-300 mt-1">{EXECUTIVE_AIS_TARGET_BREAKDOWN.coastalFishingCraft}</div>
            <div className="text-[9px] text-slate-400 mt-0.5">Class B Craft</div>
          </div>
          <div className="bg-[#020b16]/70 border border-cyan-500/20 rounded-xl p-3 text-center">
            <div className="text-[10px] font-mono text-cyan-300/80 uppercase">Naval / SAR</div>
            <div className="text-xl font-bold font-mono text-blue-300 mt-1">{EXECUTIVE_AIS_TARGET_BREAKDOWN.navalCoastGuard}</div>
            <div className="text-[9px] text-slate-400 mt-0.5">Coast Guard Cutters</div>
          </div>
          <div className="bg-[#020b16]/70 border border-cyan-500/20 rounded-xl p-3 text-center">
            <div className="text-[10px] font-mono text-cyan-300/80 uppercase">Tugs & Pilots</div>
            <div className="text-xl font-bold font-mono text-purple-300 mt-1">{EXECUTIVE_AIS_TARGET_BREAKDOWN.portTugsPilots}</div>
            <div className="text-[9px] text-slate-400 mt-0.5">Harbour Escort</div>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-2 px-1">
          <div>Underway: <span className="text-emerald-400 font-bold">{EXECUTIVE_AIS_TARGET_BREAKDOWN.underwayTargets}</span></div>
          <div>At Anchor: <span className="text-amber-400 font-bold">{EXECUTIVE_AIS_TARGET_BREAKDOWN.anchoredTargets}</span></div>
          <div>Feed Latency: <span className="text-cyan-300">0.8 sec (Direct NMEA 0183 / AIS Transponder Stream)</span></div>
        </div>
      </div>

      {/* 3. SUB-TABLE C: SYNOPTIC WAVE TELEMETRY */}
      <div className="ocean-glass rounded-2xl p-5 border border-cyan-500/20 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-cyan-500/20 pb-3">
          <div className="flex items-center gap-2.5">
            <Waves className="w-4 h-4 text-cyan-400" />
            <h4 className="font-bold text-sm text-white tracking-wide">
              3. SYNOPTIC WAVE TELEMETRY & HYDROGRAPHIC BUOY STREAM
            </h4>
          </div>
          <span className="text-xs font-mono text-cyan-300/80">
            Source: INCOIS Moored Buoy Network & Oceansat-3 Scatterometer
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-200">
            <thead className="bg-[#020e1f]/80 text-[11px] font-mono text-cyan-300 uppercase border-b border-cyan-500/30">
              <tr>
                <th className="py-2.5 px-3">Ocean Station & Sector</th>
                <th className="py-2.5 px-3">Source Buoy</th>
                <th className="py-2.5 px-3">Sig. Wave Height (Hs)</th>
                <th className="py-2.5 px-3">Peak Period (Tp)</th>
                <th className="py-2.5 px-3">Wave Dir.</th>
                <th className="py-2.5 px-3">Swell / Sea Split</th>
                <th className="py-2.5 px-3">Current Drift</th>
                <th className="py-2.5 px-3 text-right">Sea State</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyan-500/10 font-mono">
              {EXECUTIVE_SYNOPTIC_WAVE_DATA.map((wave, idx) => (
                <tr key={idx} className="hover:bg-cyan-500/5 transition-colors">
                  <td className="py-2.5 px-3 font-semibold text-white">{wave.stationName}</td>
                  <td className="py-2.5 px-3 text-cyan-300">{wave.sourceBuoy}</td>
                  <td className="py-2.5 px-3 font-bold text-white">
                    <span className={wave.sigWaveHeightHs >= 2.0 ? 'text-amber-400' : 'text-emerald-300'}>
                      {wave.sigWaveHeightHs} m
                    </span>
                  </td>
                  <td className="py-2.5 px-3">{wave.peakPeriodTp} s</td>
                  <td className="py-2.5 px-3">{wave.meanWaveDirectionDeg}° True</td>
                  <td className="py-2.5 px-3 text-slate-300">
                    Swell: {wave.swellComponentMeters}m | Sea: {wave.windSeaComponentMeters}m
                  </td>
                  <td className="py-2.5 px-3 text-cyan-200">
                    {wave.currentDriftKnots} kts @ {wave.currentHeadingDeg}°
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                      wave.seaStateClassification === 'Rough'
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                        : wave.seaStateClassification === 'Moderate'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    }`}>
                      {wave.seaStateClassification}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
