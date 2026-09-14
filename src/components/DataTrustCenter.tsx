import React from 'react';
import { 
  Database, 
  Waves, 
  CloudSun, 
  ShieldCheck, 
  Activity
} from 'lucide-react';
import { DATA_SOURCES } from '../data/marineData';

interface DataTrustCenterProps {
  isDemoMode: boolean;
}

export const DataTrustCenter: React.FC<DataTrustCenterProps> = ({ isDemoMode }) => {
  return (
    <section className="ocean-glass-card rounded-3xl p-6 sm:p-8 max-w-7xl mx-auto my-8 border border-sky-400/20 shadow-2xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 flex items-center justify-center">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-display font-black text-xl sm:text-2xl text-white tracking-tight flex items-center gap-2.5">
              <span>DATA TRUST CENTER & TRANSPARENCY</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 font-mono">
                GROUNDED IN SCIENTIFIC FEEDS
              </span>
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              ORCA distinguishes between genuine live operational telemetry and regional baseline estimations.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-cyan-300 bg-sky-950/60 px-3 py-1.5 rounded-xl border border-sky-400/20 shrink-0">
          <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>Open-Meteo Gateway: Synced</span>
        </div>
      </div>

      {/* Grid of Data Source Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {DATA_SOURCES.map((source) => (
          <div
            key={source.id}
            className="ocean-glass-subtle rounded-2xl p-5 border border-sky-400/20 space-y-3.5 hover:border-cyan-400/40 transition-all"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-cyan-300 border border-sky-400/30 flex items-center justify-center">
                  {source.id.includes('weather') ? (
                    <CloudSun className="w-5 h-5" />
                  ) : source.id.includes('safety') ? (
                    <ShieldCheck className="w-5 h-5" />
                  ) : source.id.includes('baseline') ? (
                    <Activity className="w-5 h-5" />
                  ) : (
                    <Waves className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-white">{source.name}</h3>
                  <p className="text-[11px] text-slate-400 leading-tight">{source.agency}</p>
                </div>
              </div>

              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold flex items-center gap-1.5 ${
                source.status === 'LIVE'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : source.status === 'DEMO / ESTIMATED'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
              }`}>
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />
                {source.status}
              </span>
            </div>

            <p className="text-xs text-slate-300/90 leading-relaxed font-normal">
              {source.description}
            </p>

            <div className="space-y-1.5 pt-2 border-t border-white/10">
              <span className="text-[10px] uppercase font-mono tracking-wider text-cyan-300 block">
                Integrated Parameters:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {source.parameters.map((param, pIdx) => (
                  <span
                    key={pIdx}
                    className="text-[11px] px-2 py-0.5 rounded-md bg-white/5 text-slate-200 border border-white/10 font-mono"
                  >
                    ✓ {param}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-slate-400 border-t border-white/5">
              <span>Updated: {source.lastUpdated}</span>
              <span>Coverage: <strong className="text-emerald-300">{source.coverage}</strong></span>
              <span>Latency: {source.latencyMs}ms</span>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
