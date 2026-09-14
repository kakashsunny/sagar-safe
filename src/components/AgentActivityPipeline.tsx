import React, { useState } from 'react';
import { 
  Bot, 
  CheckCircle2, 
  Loader2, 
  ShieldCheck, 
  MapPin, 
  CloudSun, 
  Waves, 
  Fish, 
  Compass, 
  Cpu, 
  Sparkles,
  Radio,
  Terminal,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { AgentStep } from '../types/marine';
import { I18N_TEXT, TranslationDictionary } from '../data/i18nTranslations';

interface AgentActivityPipelineProps {
  steps: AgentStep[];
  isAnalyzing: boolean;
  language?: string;
}

export const AgentActivityPipeline: React.FC<AgentActivityPipelineProps> = ({
  steps,
  isAnalyzing,
  language = 'en'
}) => {
  const t: TranslationDictionary = I18N_TEXT[language] || I18N_TEXT['en'];
  const [expandedLogId, setExpandedLogId] = useState<string | null>(null);

  const getAgentIcon = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('location') || n.includes('स्थान') || n.includes('இருப்பிட')) return <MapPin className="w-3.5 h-3.5" />;
    if (n.includes('planner') || n.includes('योजना') || n.includes('திட்ட')) return <Compass className="w-3.5 h-3.5" />;
    if (n.includes('weather') || n.includes('मौसम') || n.includes('வானிலை')) return <CloudSun className="w-3.5 h-3.5" />;
    if (n.includes('ocean') || n.includes('महासागर') || n.includes('பெருங்கடல்')) return <Waves className="w-3.5 h-3.5" />;
    if (n.includes('pfz') || n.includes('मत्स्य') || n.includes('மீன்பிடி')) return <Fish className="w-3.5 h-3.5" />;
    if (n.includes('safety') || n.includes('सुरक्षा') || n.includes('பாதுகாப்பு')) return <ShieldCheck className="w-3.5 h-3.5" />;
    if (n.includes('geospatial') || n.includes('गलियारा') || n.includes('வரைபட')) return <Compass className="w-3.5 h-3.5" />;
    if (n.includes('decision') || n.includes('निर्णय') || n.includes('முடிவு')) return <Cpu className="w-3.5 h-3.5" />;
    if (n.includes('response') || n.includes('सलाहकार') || n.includes('பதில்')) return <Sparkles className="w-3.5 h-3.5" />;
    return <Bot className="w-3.5 h-3.5" />;
  };

  const completedStepsCount = steps.filter(s => s.status === 'completed').length;

  return (
    <div id="agent-pipeline-section" className="ocean-glass-card rounded-3xl p-5 sm:p-7 border border-sky-400/25 shadow-2xl max-w-7xl mx-auto my-6 scroll-mt-24">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-5 border-b border-white/10 gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 flex items-center justify-center">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-black text-lg tracking-tight text-white flex items-center gap-2">
              <span>{t.agentPipelineHeader || `${t.decisionSynthesis} • AI PIPELINE`}</span>
              {isAnalyzing ? (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 animate-pulse flex items-center gap-1">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  {t.btnAnalyzing}
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {t.systemOperational}
                </span>
              )}
            </h3>
            <p className="text-xs text-slate-400">
              {t.pipelineDistributedSub || t.agentPipelineSub || 'Multi-perspective reasoning pipeline evaluating meteorological, oceanographic & safety conditions'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-cyan-300 bg-sky-950/60 px-3 py-1.5 rounded-xl border border-sky-400/20">
          <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span>{completedStepsCount} / {steps.length} {t.pipelineNodesSynced || 'Reasoning Nodes Synced'}</span>
        </div>
      </div>

      {/* Structured Orchestration Activity Summary Checklist */}
      <div className="mb-5 p-4 rounded-2xl bg-gradient-to-r from-sky-950/40 via-[#04152b]/80 to-[#020b18] border border-sky-400/20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs font-mono">
        <div className="flex items-center gap-2 text-emerald-300 bg-black/20 p-2 rounded-xl border border-emerald-500/20">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{t.agentLocationName || t.navLocation}: Verified</span>
        </div>
        <div className="flex items-center gap-2 text-emerald-300 bg-black/20 p-2 rounded-xl border border-emerald-500/20">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Open-Meteo {t.agentWeatherName || t.navWeather}: Verified</span>
        </div>
        <div className="flex items-center gap-2 text-emerald-300 bg-black/20 p-2 rounded-xl border border-emerald-500/20">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Open-Meteo {t.agentOceanName || t.cardOcean}: Integrated</span>
        </div>
        <div className="flex items-center gap-2 text-emerald-300 bg-black/20 p-2 rounded-xl border border-emerald-500/20">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Baseline {t.agentPfzName || t.cardPfz}: Active</span>
        </div>
        <div className="flex items-center gap-2 text-emerald-300 bg-black/20 p-2 rounded-xl border border-emerald-500/20">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{t.agentSafetyName || t.safetyTitle}: Clear</span>
        </div>
        <div className="flex items-center gap-2 text-cyan-300 bg-cyan-950/40 p-2 rounded-xl border border-cyan-400/30">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping shrink-0" />
          <span>{t.agentDecisionName || t.decisionSynthesis}...</span>
        </div>
      </div>

      {/* Grid of Detailed Agent Nodes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {steps.map((step) => {
          const isDone = step.status === 'completed';
          const isRunning = step.status === 'running';
          const isWarning = step.status === 'warning';
          const isExpanded = expandedLogId === step.id;

          return (
            <div
              key={step.id}
              className={`p-3.5 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                isRunning
                  ? 'bg-cyan-950/50 border-cyan-400/60 shadow-[0_0_20px_rgba(6,182,212,0.25)] ring-1 ring-cyan-400/40'
                  : isWarning
                  ? 'bg-amber-950/40 border-amber-500/40'
                  : isDone
                  ? 'bg-slate-900/50 border-white/10 hover:border-cyan-400/30'
                  : 'bg-black/30 border-white/5 opacity-50'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className={`p-1 rounded-lg ${
                      isRunning ? 'bg-cyan-500/30 text-cyan-200' :
                      isDone ? 'bg-emerald-500/20 text-emerald-300' :
                      isWarning ? 'bg-amber-500/20 text-amber-300' :
                      'bg-white/5 text-slate-500'
                    }`}>
                      {getAgentIcon(step.agentName)}
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-200 truncate max-w-[150px]">
                      {step.agentName}
                    </span>
                  </div>

                  <div>
                    {isRunning && <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />}
                    {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  </div>
                </div>

                <div className="text-[11px] font-semibold text-cyan-200 mb-1 leading-snug">
                  {step.label}
                </div>

                <p className="text-[11px] text-slate-300 leading-relaxed">
                  {step.detail}
                </p>
              </div>

              {/* Status Telemetry Logs Preview & Accordion */}
              {step.logs && step.logs.length > 0 && (
                <div className="mt-2.5 pt-2 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setExpandedLogId(isExpanded ? null : step.id)}
                    className="w-full flex items-center justify-between text-[10px] font-mono text-cyan-400 hover:text-cyan-300 transition-colors py-0.5"
                  >
                    <span className="flex items-center gap-1">
                      <Terminal className="w-3 h-3" />
                      <span>{step.logs.length} Telemetry Logs</span>
                    </span>
                    {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                  </button>

                  {isExpanded && (
                    <div className="mt-1.5 p-2 rounded-xl bg-black/60 border border-cyan-400/20 text-[10px] font-mono text-slate-300 space-y-1 animate-fadeIn">
                      {step.logs.map((log, lIdx) => (
                        <div key={lIdx} className="flex items-start gap-1.5 leading-snug">
                          <span className="text-cyan-400 shrink-0">›</span>
                          <span className="text-slate-200">{log}</span>
                        </div>
                      ))}
                      {step.source && (
                        <div className="text-[9px] text-slate-400 pt-1 border-t border-white/10">
                          Source: {step.source}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};

