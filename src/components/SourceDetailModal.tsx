import React from 'react';
import { 
  Database, 
  X, 
  CheckCircle2, 
  Clock, 
  ExternalLink, 
  ShieldCheck, 
  Activity,
  Layers
} from 'lucide-react';
import { ParameterTelemetryDetail } from '../types/marine';
import { useLanguage } from '../context/LanguageContext';

interface SourceDetailModalProps {
  detail: ParameterTelemetryDetail | null;
  onClose: () => void;
}

export const SourceDetailModal: React.FC<SourceDetailModalProps> = ({ detail, onClose }) => {
  const { pageI18n } = useLanguage();

  if (!detail) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      <div className="relative w-full max-w-lg ocean-glass rounded-3xl p-6 sm:p-7 border border-cyan-400/30 shadow-2xl z-10 animate-in fade-in zoom-in-95">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-300">
                {pageI18n.scientificProvenance || 'SCIENTIFIC DATA PROVENANCE'}
              </span>
              <h2 className="font-display font-bold text-base sm:text-lg text-white">
                {detail.parameter}
              </h2>
            </div>
          </div>

          <button
            id="btn-close-source-detail-modal"
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Value Hero */}
        <div className="bg-sky-950/60 rounded-2xl p-4 border border-sky-400/20 mb-5 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 font-mono">Calibrated Reading:</span>
            <div className="font-display font-black text-2xl text-cyan-200 mt-0.5">
              {detail.value}
            </div>
          </div>

          <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 ${
            detail.status === 'LIVE'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
          }`}>
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            {detail.status} TELEMETRY
          </span>
        </div>

        {/* Breakdown details */}
        <div className="space-y-3 text-xs mb-6">
          <div className="flex items-center justify-between py-1.5 border-b border-white/5">
            <span className="text-slate-400">Measurement Unit:</span>
            <span className="font-mono text-slate-200 font-bold">{detail.unit}</span>
          </div>

          <div className="flex items-center justify-between py-1.5 border-b border-white/5">
            <span className="text-slate-400">Primary Source Agency:</span>
            <span className="font-mono text-cyan-300 font-semibold">{detail.source}</span>
          </div>

          <div className="flex items-center justify-between py-1.5 border-b border-white/5">
            <span className="text-slate-400">Observation Timestamp:</span>
            <span className="font-mono text-slate-200">{detail.dataTimestamp}</span>
          </div>

          <div className="flex items-center justify-between py-1.5 border-b border-white/5">
            <span className="text-slate-400">Pipeline Ingestion:</span>
            <span className="font-mono text-slate-200">{detail.retrievedTimestamp}</span>
          </div>

          <div className="flex items-center justify-between py-1.5 border-b border-white/5">
            <span className="text-slate-400">Sensor Confidence / Coverage:</span>
            <span className="font-mono text-emerald-300 font-bold">{detail.confidence}</span>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white/5 rounded-xl p-3.5 border border-white/10 text-xs text-slate-300 leading-relaxed mb-4">
          <span className="text-cyan-200 font-semibold block mb-1">Methodology & Context:</span>
          {detail.description}
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-200 border border-cyan-400/40 text-xs font-bold transition-all"
        >
          Close Provenance Inspector
        </button>

      </div>
    </div>
  );
};
