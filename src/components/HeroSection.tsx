import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Fish, 
  Waves, 
  CloudSun, 
  ShieldAlert, 
  ShieldCheck, 
  ArrowRight, 
  Loader2, 
  Radio
} from 'lucide-react';
import { MarineLocation, DecisionAnalysis, AgentStep } from '../types/marine';
import { I18N_TEXT, getOceanTelemetry, getWeatherTelemetry } from '../data/marineData';
import { FishermanDecisionReport } from './FishermanDecisionReport';
import { AgentPipelineStepper } from './AgentPipelineStepper';

interface HeroSectionProps {
  selectedLocation: MarineLocation;
  analysis?: DecisionAnalysis | null;
  onOpenLocationPicker: () => void;
  onRunQuery: (query: string, forceDanger?: boolean) => void;
  onQuickAction: (actionType: 'fishing' | 'ocean' | 'weather' | 'alerts' | 'safety') => void;
  onTriggerSos?: () => void;
  isAnalyzing: boolean;
  language: string;
  steps?: AgentStep[];
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  selectedLocation,
  analysis,
  onOpenLocationPicker,
  onRunQuery,
  onQuickAction,
  isAnalyzing,
  language,
  steps = []
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [suggestionIndex, setSuggestionIndex] = useState(0);

  const t = I18N_TEXT[language] || I18N_TEXT.en;
  const ocean = getOceanTelemetry(selectedLocation);
  const weather = getWeatherTelemetry(selectedLocation);

  const suggestions = [
    `Can I safely go fishing today near ${selectedLocation.name}?`,
    `Find high-catch fishing zones near ${selectedLocation.name}.`,
    `Show sea wave height and wind warning for ${selectedLocation.state}.`,
    `What time should fishermen return to harbour today?`,
    `Simulate extreme squall alert (Safety Override Test)`
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setSuggestionIndex((prev) => (prev + 1) % suggestions.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [suggestions.length]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const queryToRun = searchInput.trim() ? searchInput.trim() : suggestions[suggestionIndex];
    const isDangerTest = queryToRun.toLowerCase().includes('storm') || 
                         queryToRun.toLowerCase().includes('danger') || 
                         queryToRun.toLowerCase().includes('cyclone') ||
                         queryToRun.toLowerCase().includes('squall') ||
                          queryToRun.toLowerCase().includes('gale');
    onRunQuery(queryToRun, isDangerTest);
  };

  return (
    <section className="w-full max-w-5xl mx-auto px-3 sm:px-6 py-3 sm:py-6 flex flex-col items-stretch gap-5 sm:gap-7 box-border">
      
      {/* 1. APPLE WWDC 2026 FLOATING CAPSULE STATUS BAR */}
      <div className="w-full flex items-center justify-between flex-wrap gap-2 px-4 py-2.5 rounded-full apple-capsule-pill border border-white/12 shadow-xl backdrop-blur-2xl">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500" />
          </span>
          <span className="text-[11px] font-mono tracking-widest text-cyan-200 font-bold uppercase">
            MARITIME COMMAND CENTER • SATELLITE FLEET TELEMETRY
          </span>
        </div>

        <div className="flex items-center gap-3 text-[11px] font-mono">
          <div className="hidden sm:flex items-center gap-1.5 text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>ISRO Oceansat-3</span>
          </div>
          <div className="hidden md:flex items-center gap-1.5 text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>INCOIS Wave Buoys</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-full border border-white/10">
            <span className="text-slate-400">PORT:</span>
            <button 
              id="btn-hero-change-port"
              onClick={onOpenLocationPicker}
              className="text-cyan-300 font-bold hover:text-white transition-colors truncate max-w-[130px]"
            >
              {selectedLocation.name}
            </button>
          </div>
        </div>
      </div>

      {/* 2. REAL-TIME 6-AGENT MARITIME PIPELINE PROGRESS STEPPER */}
      <AgentPipelineStepper
        steps={steps}
        isAnalyzing={isAnalyzing}
        selectedLocation={selectedLocation}
        language={language}
      />

      {/* 3. HERO HEADLINE: CLEAR VALUE PROPOSITION */}
      <div className="w-full flex flex-col items-center text-center gap-2 pt-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/25 text-[11px] font-mono text-cyan-300 tracking-wider uppercase">
          <Radio className="w-3.5 h-3.5 animate-pulse text-cyan-300" />
          <span>COMPLEX DATA → AI ANALYSIS → SIMPLE FISHERMAN DECISION</span>
        </div>

        <h1 className="font-display font-black text-2xl sm:text-3xl md:text-4xl lg:text-[38px] tracking-tight leading-snug text-center max-w-3xl">
          <span className="text-white block">{t.heroLine1 || 'AUTONOMOUS OCEAN INTELLIGENCE'}</span>
          <span className="bg-gradient-to-r from-cyan-300 via-sky-200 to-teal-200 bg-clip-text text-transparent block mt-0.5">
            {t.heroLine2 || 'FOR COASTAL FISHERMEN'}
          </span>
        </h1>

        <p className="text-xs sm:text-sm text-slate-300 font-normal text-center max-w-2xl leading-relaxed">
          {t.heroSub || 'Converting complex satellite SST, ISRO Oceansat-3 chlorophyll, INCOIS wave rider buoys, and IMD Doppler radars into clear, life-saving Go/No-Go decisions in plain language.'}
        </p>
      </div>

      {/* 3. TODAY'S FISHING REPORT: THE PRIMARY USER INTENT CENTERPIECE */}
      <FishermanDecisionReport
        location={selectedLocation}
        analysis={analysis || null}
        ocean={ocean}
        weather={weather}
        language={language}
        onOpenLocationPicker={onOpenLocationPicker}
        onRunScenario={(scenario) => {
          if (scenario === 'danger') {
            onRunQuery('Simulate severe cyclone warning with rough squalls and high waves', true);
          } else if (scenario === 'caution') {
            onRunQuery('Simulate moderate afternoon swell and choppy sea conditions', false);
          } else {
            onRunQuery(`Evaluate normal fishing conditions and pelagic zone near ${selectedLocation.name}`, false);
          }
        }}
        isAnalyzing={isAnalyzing}
        onFocusMapZone={() => onQuickAction('fishing')}
      />

      {/* 4. APPLE SPOTLIGHT / SIRI-INSPIRED MARITIME AI COMMAND BAR */}
      <div className="w-full flex flex-col items-center gap-2.5">
        <form onSubmit={handleSearchSubmit} className="w-full">
          <div className="w-full flex items-center gap-2.5 p-2 sm:p-2.5 rounded-full apple-frosted-glass border border-white/18 shadow-2xl focus-within:border-cyan-400/80 focus-within:ring-4 focus-within:ring-cyan-400/15 transition-all">
            
            <div className="pl-3 sm:pl-4 text-cyan-400 shrink-0 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-cyan-300 animate-pulse" />
            </div>

            <input
              id="hero-marine-search-input"
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder={t.searchPlaceholder || `Ask about fishing & sea conditions in ${selectedLocation.name}...`}
              disabled={isAnalyzing}
              className="flex-1 min-w-0 bg-transparent text-xs sm:text-sm text-white placeholder-slate-400/80 focus:outline-none py-1.5 px-2 font-mono"
            />

            <button
              id="btn-hero-submit-query"
              type="submit"
              disabled={isAnalyzing}
              className="shrink-0 px-4 py-2 sm:px-6 sm:py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-mono font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 disabled:opacity-50 transition-all active:scale-95 uppercase tracking-wider"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="hidden sm:inline">COMPUTING...</span>
                </>
              ) : (
                <>
                  <span>ANALYZE</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Suggestion Chips */}
        <div className="w-full flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400 px-1">
          <span className="text-[10px] text-cyan-300/80 font-mono tracking-wider shrink-0 uppercase">TELEMETRY BENCHMARKS:</span>
          {suggestions.slice(0, 3).map((s, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSearchInput(s);
                const isDangerTest = s.toLowerCase().includes('storm') || s.toLowerCase().includes('danger') || s.toLowerCase().includes('squall');
                onRunQuery(s, isDangerTest);
              }}
              className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/12 border border-white/10 hover:border-cyan-400/50 text-slate-200 hover:text-cyan-200 text-[11px] font-mono truncate max-w-[220px] sm:max-w-[280px] transition-all cursor-pointer backdrop-blur-md"
              title={s}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* 5. MISSION ACTION MODULES (24px–28px Rounded Apple Floating Cards) */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3">
        
        {/* Module 1: Find Fishing Zones */}
        <button
          id="quick-action-pfz"
          onClick={() => onQuickAction('fishing')}
          className="apple-floating-card p-3.5 text-left group focus:outline-none cursor-pointer"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Fish className="w-4 h-4" />
            </div>
            <span className="text-[9px] font-mono text-emerald-300 bg-emerald-500/15 px-2 py-0.5 rounded-full border border-emerald-500/30 font-bold">
              READY
            </span>
          </div>
          <div className="font-display font-bold text-xs text-slate-100 group-hover:text-cyan-200 transition-colors truncate">
            {t.quickActionFish || 'FISHING ZONES'}
          </div>
          <div className="text-[10px] text-slate-400 font-medium line-clamp-1 mt-0.5">
            Oceansat-3 PFZ maps
          </div>
        </button>

        {/* Module 2: Check Ocean Dynamics */}
        <button
          id="quick-action-ocean"
          onClick={() => onQuickAction('ocean')}
          className="apple-floating-card p-3.5 text-left group focus:outline-none cursor-pointer"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-300 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Waves className="w-4 h-4" />
            </div>
            <span className="text-[9px] font-mono text-cyan-300 bg-cyan-500/15 px-2 py-0.5 rounded-full border border-cyan-500/30 font-bold">
              LIVE
            </span>
          </div>
          <div className="font-display font-bold text-xs text-slate-100 group-hover:text-cyan-200 transition-colors truncate">
            {t.quickActionOcean || 'CHECK OCEAN'}
          </div>
          <div className="text-[10px] text-slate-400 font-medium line-clamp-1 mt-0.5">
            Waves & currents
          </div>
        </button>

        {/* Module 3: Marine Weather */}
        <button
          id="quick-action-weather"
          onClick={() => onQuickAction('weather')}
          className="apple-floating-card p-3.5 text-left group focus:outline-none cursor-pointer"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center group-hover:scale-110 transition-transform">
              <CloudSun className="w-4 h-4" />
            </div>
            <span className="text-[9px] font-mono text-amber-300 bg-amber-500/15 px-2 py-0.5 rounded-full border border-amber-500/30 font-bold">
              ACTIVE
            </span>
          </div>
          <div className="font-display font-bold text-xs text-slate-100 group-hover:text-cyan-200 transition-colors truncate">
            {t.quickActionWeather || 'MARINE WEATHER'}
          </div>
          <div className="text-[10px] text-slate-400 font-medium line-clamp-1 mt-0.5">
            IMD radar & squalls
          </div>
        </button>

        {/* Module 4: Marine Alerts */}
        <button
          id="quick-action-alerts"
          onClick={() => onQuickAction('alerts')}
          className="apple-floating-card p-3.5 text-left group focus:outline-none cursor-pointer"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-300 flex items-center justify-center group-hover:scale-110 transition-transform">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <span className="text-[9px] font-mono text-rose-300 bg-rose-500/15 px-2 py-0.5 rounded-full border border-rose-500/30 font-bold">
              SYNCED
            </span>
          </div>
          <div className="font-display font-bold text-xs text-slate-100 group-hover:text-cyan-200 transition-colors truncate">
            {t.quickActionAlerts || 'MARINE ALERTS'}
          </div>
          <div className="text-[10px] text-slate-400 font-medium line-clamp-1 mt-0.5">
            Real-time warnings
          </div>
        </button>

        {/* Module 5: Safety Protocol Check */}
        <button
          id="quick-action-safety"
          onClick={() => onQuickAction('safety')}
          className="apple-floating-card p-3.5 text-left group focus:outline-none col-span-2 sm:col-span-1 cursor-pointer"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span className="text-[9px] font-mono text-emerald-300 bg-emerald-500/15 px-2 py-0.5 rounded-full border border-emerald-500/30 font-bold">
              VERIFIED
            </span>
          </div>
          <div className="font-display font-bold text-xs text-slate-100 group-hover:text-cyan-200 transition-colors truncate">
            {t.quickActionSafety || 'SAFETY CHECK'}
          </div>
          <div className="text-[10px] text-slate-400 font-medium line-clamp-1 mt-0.5">
            Multi-factor matrix
          </div>
        </button>

      </div>

    </section>
  );
};


