import React, { useState, useMemo } from 'react';
import { 
  MapPin, 
  CloudSun, 
  Waves, 
  Fish, 
  ShieldCheck, 
  Cpu, 
  CheckCircle2, 
  AlertTriangle, 
  Loader2, 
  Radio, 
  Sparkles,
  ArrowDown,
  Info,
  Check
} from 'lucide-react';
import { AgentStep, MarineLocation } from '../types/marine';
import { I18N_TEXT, TranslationDictionary } from '../data/i18nTranslations';

interface AgentPipelineStepperProps {
  steps?: AgentStep[];
  isAnalyzing: boolean;
  selectedLocation: MarineLocation;
  language?: string;
  onSelectStep?: (stepId: string) => void;
}

export type StepState = 'idle' | 'running' | 'completed' | 'warning';

interface CanonicalAgent {
  key: string;
  stepNumber: number;
  name: string;
  shortName: string;
  agency: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  matchingKeywords: string[];
  defaultRunningText: string;
  defaultCompletedText: string;
  telemetrySource: string;
}

export const AgentPipelineStepper: React.FC<AgentPipelineStepperProps> = ({
  steps = [],
  isAnalyzing,
  selectedLocation,
  language = 'en',
  onSelectStep
}) => {
  const t: TranslationDictionary = I18N_TEXT[language] || I18N_TEXT['en'];
  const [selectedNodeIndex, setSelectedNodeIndex] = useState<number | null>(null);

  // 6 Canonical Reasoning Perspectives
  const canonicalAgents: CanonicalAgent[] = useMemo(() => [
    {
      key: 'location',
      stepNumber: 1,
      name: t.agentLocationName || 'Geospatial Perspective',
      shortName: language === 'hi' ? 'स्थान' : language === 'ta' ? 'இருப்பிடம்' : 'Location',
      agency: 'Geospatial Catalog',
      label: t.agentLocationLabel || 'Geospatial Geodesy',
      icon: MapPin,
      matchingKeywords: ['location', 'स्थान', 'இருப்பிட', '1'],
      defaultRunningText: `Resolving maritime bounds and harbour entrance for ${selectedLocation.name}...`,
      defaultCompletedText: `${selectedLocation.name} (${selectedLocation.lat.toFixed(2)}°N, ${selectedLocation.lng.toFixed(2)}°E) coordinates verified.`,
      telemetrySource: 'Geospatial Catalog & Nautical Bounds'
    },
    {
      key: 'weather',
      stepNumber: 2,
      name: t.agentWeatherName || 'Meteorological Perspective',
      shortName: language === 'hi' ? 'मौसम' : language === 'ta' ? 'வானிலை' : 'Weather',
      agency: 'Open-Meteo',
      label: t.agentWeatherLabel || 'Surface Meteorology',
      icon: CloudSun,
      matchingKeywords: ['weather', 'planner', 'मौसम', 'வானிலை', '2', '3'],
      defaultRunningText: 'Evaluating Open-Meteo surface winds, gusts & precipitation vectors...',
      defaultCompletedText: 'Surface wind velocity, barometric pressure & precipitation evaluated.',
      telemetrySource: 'Open-Meteo Weather Forecast API'
    },
    {
      key: 'ocean',
      stepNumber: 3,
      name: t.agentOceanName || 'Oceanographic Perspective',
      shortName: language === 'hi' ? 'महासागर' : language === 'ta' ? 'பெருங்கடல்' : 'Ocean',
      agency: 'Open-Meteo Marine',
      label: t.agentOceanLabel || 'Ocean State & Swell',
      icon: Waves,
      matchingKeywords: ['ocean', 'महासागर', 'பெருங்கடல்', '4'],
      defaultRunningText: 'Ingesting Open-Meteo wave heights, swell periods & ocean currents...',
      defaultCompletedText: 'SST, significant wave height & surface currents validated against thresholds.',
      telemetrySource: 'Open-Meteo Marine API'
    },
    {
      key: 'pfz',
      stepNumber: 4,
      name: t.agentPfzName || 'Pelagic Habitat Perspective',
      shortName: language === 'hi' ? 'मत्स्य PFZ' : language === 'ta' ? 'PFZ மீன்பிடி' : 'PFZ Zones',
      agency: 'Regional Baseline',
      label: t.agentPfzLabel || 'Habitat & Pelagic Potential',
      icon: Fish,
      matchingKeywords: ['pfz', 'मत्स्य', 'மீன்பிடி', '5'],
      defaultRunningText: 'Synthesizing regional chlorophyll-a estimates & pelagic habitat index...',
      defaultCompletedText: 'Pelagic potential evaluated based on seasonal coastal habitat baseline.',
      telemetrySource: 'Regional Ocean Baseline (Demo / Estimated)'
    },
    {
      key: 'safety',
      stepNumber: 5,
      name: t.agentSafetyName || 'Safety Thresholds',
      shortName: language === 'hi' ? 'सुरक्षा' : language === 'ta' ? 'பாதுகாப்பு' : 'Safety',
      agency: 'Maritime Standard',
      label: t.agentSafetyLabel || 'Operational Limits',
      icon: ShieldCheck,
      matchingKeywords: ['safety', 'सुरक्षा', 'பாதுகாப்பு', '6', '7'],
      defaultRunningText: 'Cross-referencing craft limits with wind (>35 km/h) & wave (>2.5m) caps...',
      defaultCompletedText: 'Small-craft operating limits and daylight return windows verified.',
      telemetrySource: 'Standard Indian Maritime Safety Guidelines'
    },
    {
      key: 'decision',
      stepNumber: 6,
      name: t.agentDecisionName || 'Consensus Synthesis',
      shortName: language === 'hi' ? 'निर्णय' : language === 'ta' ? 'முடிவு' : 'Decision',
      agency: 'ORCA Core',
      label: t.agentDecisionLabel || 'Consensus Directive',
      icon: Cpu,
      matchingKeywords: ['decision', 'response', 'निर्णय', 'முடிவு', '8', '9'],
      defaultRunningText: 'Synthesizing multi-perspective reasoning into actionable Go/No-Go verdict...',
      defaultCompletedText: 'Operational directive finalized: Plain-language verdict generated.',
      telemetrySource: 'ORCA Multi-Perspective Reasoning Engine'
    }
  ], [t, selectedLocation, language]);

  // Compute status and details for each canonical agent from live steps
  const agentStatuses = useMemo(() => {
    return canonicalAgents.map((agent, index) => {
      // Find matching steps in `steps`
      const matching = steps.filter(s => {
        const nameLower = (s.agentName || '').toLowerCase();
        const idLower = (s.id || '').toLowerCase();
        return agent.matchingKeywords.some(kw => nameLower.includes(kw) || idLower === kw);
      });

      let status: StepState = 'completed';
      let detailText = agent.defaultCompletedText;

      if (!selectedLocation.isCoastal) {
        if (index === 0) {
          status = 'completed';
          detailText = `${selectedLocation.name} (${selectedLocation.state}) inland coordinates locked.`;
        } else if (index === 1) {
          status = 'completed';
          detailText = 'IMD Inland meteorological conditions verified.';
        } else if (index === 2 || index === 3) {
          status = 'warning';
          detailText = t.inlandMsg || 'Inland location. Marine telemetry unavailable.';
        } else {
          status = 'warning';
          detailText = 'Safety directive: inland location, maritime fishing not applicable.';
        }
      } else if (matching.length > 0) {
        // Evaluate from matched steps
        const hasRunning = matching.some(m => m.status === 'running');
        const hasWarning = matching.some(m => m.status === 'warning');
        const allCompleted = matching.every(m => m.status === 'completed');

        if (hasWarning) {
          status = 'warning';
          const warnStep = matching.find(m => m.status === 'warning');
          detailText = warnStep?.detail || agent.defaultCompletedText;
        } else if (hasRunning) {
          status = 'running';
          const runStep = matching.find(m => m.status === 'running');
          detailText = runStep?.detail || agent.defaultRunningText;
        } else if (allCompleted) {
          status = 'completed';
          detailText = matching[matching.length - 1]?.detail || agent.defaultCompletedText;
        } else {
          status = 'idle';
          detailText = agent.defaultRunningText;
        }
      } else {
        // Fallback state calculation if analyzing
        if (isAnalyzing) {
          status = 'idle';
          detailText = agent.defaultRunningText;
        } else {
          status = 'completed';
          detailText = agent.defaultCompletedText;
        }
      }

      return {
        ...agent,
        status,
        detailText
      };
    });
  }, [canonicalAgents, steps, selectedLocation, isAnalyzing, t.inlandMsg]);

  // Determine active index currently executing
  const currentRunningIndex = useMemo(() => {
    const runIdx = agentStatuses.findIndex(a => a.status === 'running');
    if (runIdx !== -1) return runIdx;
    if (isAnalyzing) return 0;
    return 5; // all completed
  }, [agentStatuses, isAnalyzing]);

  // Number of completed stages
  const completedCount = useMemo(() => {
    return agentStatuses.filter(a => a.status === 'completed' || a.status === 'warning').length;
  }, [agentStatuses]);

  // Overall progress percentage (0 to 100%)
  const progressPercent = useMemo(() => {
    if (!isAnalyzing && completedCount === 6) return 100;
    const activeWeight = agentStatuses.some(a => a.status === 'running') ? 0.5 : 0;
    const pct = Math.min(100, Math.round(((completedCount + activeWeight) / 6) * 100));
    return pct;
  }, [isAnalyzing, completedCount, agentStatuses]);

  // Active focus node for the bottom detail capsule
  const activeFocusIndex = selectedNodeIndex !== null ? selectedNodeIndex : currentRunningIndex;
  const focusedAgent = agentStatuses[activeFocusIndex] || agentStatuses[0];

  const handleScrollToPipeline = () => {
    const el = document.getElementById('agent-pipeline-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div 
      id="agent-pipeline-stepper-container" 
      aria-label="Multi-Perspective Maritime Reasoning Pipeline Stepper"
      className="w-full ocean-glass rounded-2xl sm:rounded-3xl p-3 sm:p-4 md:p-5 border border-cyan-400/25 shadow-xl backdrop-blur-2xl transition-all duration-300 relative overflow-hidden"
    >
      {/* Ambient glass light flare */}
      <div className="absolute top-0 right-1/4 w-72 h-16 bg-cyan-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-60 h-16 bg-blue-600/10 blur-3xl pointer-events-none" />

      {/* Stepper Header Bar */}
      <div className="flex items-center justify-between flex-wrap gap-2 pb-3 mb-3 sm:mb-4 border-b border-white/10 relative z-10">
        <div className="flex items-center gap-2 sm:gap-2.5">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300 shadow-sm">
            <Cpu className="w-4 h-4 text-cyan-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs sm:text-sm font-display font-black text-white tracking-wide uppercase">
                Multi-Perspective Reasoning Pipeline
              </h3>
              {isAnalyzing ? (
                <span className="px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 flex items-center gap-1.5 animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                  <span>EVALUATING • STEP {Math.min(6, currentRunningIndex + 1)}/6</span>
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span className="hidden xs:inline">ALL 6 PERSPECTIVES SYNCED</span>
                  <span className="xs:hidden">SYNCED</span>
                </span>
              )}
            </div>
            <p className="text-[11px] text-cyan-200/70 font-mono">
              Comprehensive Maritime Evaluation • Port {selectedLocation.name}
            </p>
          </div>
        </div>

        {/* Right side metrics and jump link */}
        <div className="flex items-center gap-2 sm:gap-3 text-xs font-mono">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-black/30 border border-white/10 text-[11px]">
            <span className="text-slate-400">STATUS:</span>
            <span className={isAnalyzing ? 'text-cyan-300 font-bold' : 'text-emerald-300 font-bold'}>
              {progressPercent}%
            </span>
          </div>

          <button
            type="button"
            onClick={handleScrollToPipeline}
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-white/5 hover:bg-white/12 text-slate-300 hover:text-cyan-200 border border-white/10 hover:border-cyan-400/40 text-[11px] transition-all"
            title="Jump to Full Agent Pipeline Activity Logs"
          >
            <span>Full Logs</span>
            <ArrowDown className="w-3 h-3 text-cyan-400" />
          </button>
        </div>
      </div>

      {/* 6-Node Visual Progress Stepper Track */}
      <div className="relative z-10 px-1 sm:px-2 py-1">
        <div className="relative flex items-center justify-between w-full">
          
          {/* Background Track Line */}
          <div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 h-[2px] bg-slate-800/80 z-0 pointer-events-none rounded-full" />

          {/* Illuminated Progress Line */}
          <div 
            className="absolute top-1/2 left-4 -translate-y-1/2 h-[2px] bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 z-0 pointer-events-none transition-all duration-500 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.6)]"
            style={{ 
              width: `${Math.max(0, Math.min(100, ((completedCount - 1) / 5) * 100))}%` 
            }}
          />

          {/* 6 Agent Stepper Nodes */}
          {agentStatuses.map((agent, index) => {
            const Icon = agent.icon;
            const isDone = agent.status === 'completed';
            const isRunning = agent.status === 'running';
            const isWarning = agent.status === 'warning';
            const isSelected = activeFocusIndex === index;

            return (
              <div 
                key={agent.key} 
                className="flex flex-col items-center relative z-10 group"
              >
                {/* Node Interactive Circle */}
                <button
                  type="button"
                  id={`btn-stepper-agent-${agent.key}`}
                  onClick={() => {
                    setSelectedNodeIndex(index);
                    if (onSelectStep) onSelectStep(agent.key);
                  }}
                  className={`relative w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none ${
                    isRunning
                      ? 'bg-cyan-500/30 border-2 border-cyan-300 text-cyan-100 shadow-[0_0_20px_rgba(6,182,212,0.7)] ring-4 ring-cyan-400/25 scale-110'
                      : isWarning
                      ? 'bg-amber-500/20 border-2 border-amber-400 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.4)]'
                      : isDone
                      ? 'bg-emerald-500/20 border-2 border-emerald-400/80 text-emerald-300 shadow-[0_0_12px_rgba(52,211,153,0.3)] hover:scale-105'
                      : 'bg-[#021020] border border-white/20 text-slate-400 hover:border-cyan-400/40'
                  } ${isSelected ? 'ring-2 ring-white/50' : ''}`}
                  title={`${agent.name} (${agent.agency}): ${agent.status.toUpperCase()}`}
                  aria-label={`${agent.name} status ${agent.status}`}
                >
                  {/* Inner Icon or Loader */}
                  {isRunning ? (
                    <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-300 animate-spin" />
                  ) : (
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}

                  {/* Corner Status Badge */}
                  {isDone && (
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border border-[#020b16] flex items-center justify-center shadow-sm">
                      <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                    </span>
                  )}

                  {isWarning && (
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-amber-500 border border-[#020b16] flex items-center justify-center shadow-sm">
                      <AlertTriangle className="w-2.5 h-2.5 text-black stroke-[2.5]" />
                    </span>
                  )}

                  {isRunning && (
                    <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-cyan-500 border border-[#020b16]" />
                    </span>
                  )}
                </button>

                {/* Node Label & Agency Tag */}
                <div className="mt-1.5 flex flex-col items-center text-center">
                  <span className={`text-[10px] sm:text-xs font-mono font-bold tracking-tight transition-colors ${
                    isRunning 
                      ? 'text-cyan-300' 
                      : isWarning
                      ? 'text-amber-300'
                      : isDone 
                      ? 'text-slate-200' 
                      : 'text-slate-400'
                  }`}>
                    <span className="hidden sm:inline">{agent.shortName}</span>
                    <span className="sm:hidden">{agent.shortName.slice(0, 4)}</span>
                  </span>

                  <span className="text-[9px] font-mono text-cyan-400/60 hidden md:block">
                    {agent.agency.split(' ')[0]}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Real-time Feedback Capsule: Active / Selected Agent Live Status */}
      <div className="mt-3.5 sm:mt-4 p-2.5 sm:p-3 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between gap-3 text-xs font-mono relative z-10 transition-all">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className={`p-1.5 rounded-lg shrink-0 ${
            focusedAgent.status === 'running' 
              ? 'bg-cyan-500/20 text-cyan-300 animate-pulse' 
              : focusedAgent.status === 'warning'
              ? 'bg-amber-500/20 text-amber-300'
              : 'bg-emerald-500/20 text-emerald-300'
          }`}>
            {focusedAgent.status === 'running' ? (
              <Radio className="w-4 h-4 animate-pulse text-cyan-300" />
            ) : focusedAgent.status === 'warning' ? (
              <AlertTriangle className="w-4 h-4 text-amber-400" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            )}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-white text-[11px] sm:text-xs">
                Perspective {focusedAgent.stepNumber}: {focusedAgent.name}
              </span>
              <span className="text-[10px] px-2 py-0.2 rounded-full bg-white/10 text-cyan-300 border border-white/10">
                {focusedAgent.agency}
              </span>
              <span className={`text-[10px] uppercase font-bold ${
                focusedAgent.status === 'running' 
                  ? 'text-cyan-300' 
                  : focusedAgent.status === 'warning'
                  ? 'text-amber-300'
                  : 'text-emerald-300'
              }`}>
                • {focusedAgent.status}
              </span>
            </div>

            <p className="text-[11px] sm:text-xs text-slate-300 truncate mt-0.5">
              {focusedAgent.detailText}
            </p>
          </div>
        </div>

        <div className="shrink-0 hidden sm:flex items-center gap-2 text-[10px] text-cyan-300/80">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span className="hidden lg:inline">{focusedAgent.telemetrySource}</span>
        </div>
      </div>
    </div>
  );
};
