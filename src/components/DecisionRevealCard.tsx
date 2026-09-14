import React from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  ShieldCheck, 
  Fish, 
  ArrowUpRight,
  Cpu,
  Layers
} from 'lucide-react';
import { DecisionAnalysis, MarineLocation } from '../types/marine';
import { I18N_TEXT, TranslationDictionary } from '../data/i18nTranslations';

interface DecisionRevealCardProps {
  analysis: DecisionAnalysis;
  location: MarineLocation;
  language?: string;
  onFocusMapZone?: () => void;
}

export const DecisionRevealCard: React.FC<DecisionRevealCardProps> = ({
  analysis,
  location,
  language = 'en',
  onFocusMapZone
}) => {
  const t: TranslationDictionary = I18N_TEXT[language] || I18N_TEXT['en'];
  const isSafetyRed = analysis.safetyStatus === 'RED';
  const isCaution = analysis.safetyStatus === 'YELLOW';
  const confidenceScore = analysis.confidence ? Math.round(analysis.confidence * 100) : 94;

  return (
    <div 
      id="decision-reveal-card"
      className={`floating-glass-card rounded-2xl p-5 sm:p-7 max-w-7xl mx-auto my-5 border transition-all duration-300 relative overflow-hidden ${
        isSafetyRed 
          ? 'border-rose-500/60 bg-gradient-to-b from-rose-950/40 via-[#0a1226]/90 to-[#020b18] shadow-[0_0_50px_rgba(244,63,94,0.25)] ring-1 ring-rose-500/50' 
          : isCaution
          ? 'border-amber-500/50 bg-gradient-to-b from-amber-950/30 via-[#0a182c]/90 to-[#020b18] shadow-[0_0_40px_rgba(245,158,11,0.2)]'
          : 'border-cyan-400/40 bg-gradient-to-b from-cyan-950/30 via-[#041d38]/90 to-[#020b18] shadow-[0_0_45px_rgba(6,182,212,0.2)] animate-directive-breathe'
      }`}
    >
      
      {/* Background Accent Halo */}
      <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20 opacity-25 ${
        isSafetyRed ? 'bg-rose-500' : isCaution ? 'bg-amber-500' : 'bg-cyan-400'
      }`} />

      {/* Top Banner Telemetry Tag */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-white/10 relative z-10">
        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${
            isSafetyRed ? 'bg-rose-500 animate-ping shadow-[0_0_10px_#f43f5e]' : isCaution ? 'bg-amber-400' : 'bg-emerald-400 animate-ping'
          }`} />
          <span className="font-mono text-xs uppercase tracking-widest text-cyan-200/90 font-bold flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            {t.decisionSynthesis}
          </span>
        </div>

        <span className="font-mono text-[11px] text-slate-400">
          Generated: <span className="text-slate-200">{analysis.timestamp}</span> • <span className="text-cyan-300">{analysis.dataSourceSummary}</span>
        </span>
      </div>

      {/* SAFETY OVERRIDES OPPORTUNITY ALERT BANNER (If Safety is RED) */}
      {analysis.safetyOverride && (
        <div className="mb-5 p-4 rounded-xl bg-rose-500/20 border border-rose-500/50 text-rose-100 flex items-start gap-3.5 shadow-lg shadow-rose-950/50 animate-in fade-in">
          <ShieldAlert className="w-6 h-6 text-rose-400 shrink-0 mt-0.5 animate-pulse" />
          <div>
            <div className="font-display font-black text-sm sm:text-base tracking-tight text-white flex items-center gap-2">
              <span>{t.safetyOverrides}</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/40 text-rose-100 uppercase font-mono font-bold">
                {t.safetyOverrideDirective}
              </span>
            </div>
            <p className="text-xs text-rose-200/90 font-medium mt-1 leading-relaxed">
              {t.safetyOverrideMsg}
            </p>
          </div>
        </div>
      )}

      {/* Main Recommendation Callout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center relative z-10">
        
        {/* Left Status Hero */}
        <div className="lg:col-span-5 text-center lg:text-left space-y-3">
          
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-[11px] font-bold font-mono bg-white/5 border border-white/10">
            <span className="text-slate-400">{t.sectorLabel}:</span>
            <span className="text-cyan-300">{location.name} ({location.state})</span>
          </div>

          <div className="flex items-center justify-center lg:justify-start gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center border shadow-xl shrink-0 ${
              isSafetyRed 
                ? 'bg-rose-500/20 border-rose-400 text-rose-300' 
                : isCaution 
                ? 'bg-amber-500/20 border-amber-400 text-amber-300' 
                : 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
            }`}>
              {isSafetyRed ? (
                <ShieldAlert className="w-7 h-7" />
              ) : isCaution ? (
                <AlertTriangle className="w-7 h-7" />
              ) : (
                <ShieldCheck className="w-7 h-7" />
              )}
            </div>

            <div>
              <h2 className={`font-display font-black text-xl sm:text-2xl tracking-tight leading-none ${
                isSafetyRed 
                  ? 'text-rose-400' 
                  : isCaution 
                  ? 'text-amber-300' 
                  : 'text-emerald-300'
              }`}>
                {analysis.safetyTitle}
              </h2>
              <p className="text-xs text-slate-300/90 font-medium mt-1">
                {analysis.safetySummary}
              </p>
            </div>
          </div>

          {/* Quick Dual Status Pills */}
          <div className="pt-1 flex flex-wrap items-center justify-center lg:justify-start gap-2">
            <div className="px-3 py-1 rounded-xl bg-[#031830]/80 border border-cyan-400/20 flex items-center gap-2 text-xs font-semibold text-slate-200">
              <Fish className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-slate-400 text-[11px] font-mono">{t.potentialLabel}:</span>
              <span className="text-cyan-300 font-bold">{analysis.fishingPotential}</span>
            </div>

            <div className={`px-3 py-1 rounded-xl border flex items-center gap-2 text-xs font-semibold ${
              isSafetyRed 
                ? 'bg-rose-950/60 border-rose-500/40 text-rose-200' 
                : isCaution
                ? 'bg-amber-950/60 border-amber-500/40 text-amber-200'
                : 'bg-emerald-950/60 border-emerald-500/40 text-emerald-200'
            }`}>
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="text-slate-300 text-[11px] font-mono">{t.statusLabel}:</span>
              <span className="font-bold">{analysis.safetyStatus}</span>
            </div>

            <div className="px-3 py-1 rounded-xl bg-[#031830]/80 border border-cyan-400/20 flex items-center gap-1.5 text-xs font-mono text-cyan-300 font-bold">
              <span>{t.confidence}:</span>
              <span className="text-white">{confidenceScore}%</span>
            </div>
          </div>
        </div>

        {/* Right Rationale Checklist */}
        <div className="lg:col-span-7 bg-[#031428]/70 rounded-xl p-4 border border-cyan-400/20 space-y-2.5">
          
          <div className="flex items-center justify-between pb-1.5 border-b border-white/10">
            <span className="text-[11px] font-bold font-mono uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              {t.decisionRationale}
            </span>
            {analysis.suggestedZone && (
              <button
                onClick={onFocusMapZone}
                className="text-[11px] text-cyan-300 hover:text-cyan-200 flex items-center gap-1 font-semibold hover:underline"
              >
                <span>{t.viewOnMap}</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Checkpoints */}
          <div className="space-y-1.5 text-xs">
            
            {/* Positive Indicators */}
            {analysis.reasons.positive.map((r, i) => (
              <div key={i} className="flex items-start gap-2 text-emerald-200/90">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-snug">{r}</span>
              </div>
            ))}

            {/* Caution items */}
            {analysis.reasons.caution.map((r, i) => (
              <div key={i} className="flex items-start gap-2 text-amber-200/90">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span className="leading-snug">{r}</span>
              </div>
            ))}

            {/* Critical Warnings */}
            {analysis.reasons.critical.map((r, i) => (
              <div key={i} className="flex items-start gap-2 text-rose-200 font-medium">
                <ShieldAlert className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                <span className="leading-snug">{r}</span>
              </div>
            ))}
          </div>

          {/* Advisory Box */}
          <div className="pt-2 border-t border-white/10 text-xs text-slate-300 font-medium leading-relaxed font-mono">
            <span className="text-cyan-300 font-bold uppercase text-[10px]">{t.operationalDirective}: </span>
            <span className="text-slate-200">{analysis.advisoryMessage}</span>
          </div>

          {/* Detailed Telemetry Report */}
          {analysis.detailedReport && (
            <div className="pt-2 border-t border-white/10 text-xs text-slate-300 leading-relaxed">
              <span className="text-cyan-300 font-bold font-mono uppercase text-[10px] block mb-1">{t.decisionRationale}:</span>
              <p className="text-slate-200">{analysis.detailedReport}</p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
