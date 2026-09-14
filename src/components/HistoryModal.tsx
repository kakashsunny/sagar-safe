import React from 'react';
import { 
  History, 
  X, 
  MapPin, 
  Fish, 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle, 
  ArrowRight,
  Trash2
} from 'lucide-react';
import { AnalysisHistoryItem } from '../types/marine';
import { useLanguage } from '../context/LanguageContext';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  history: AnalysisHistoryItem[];
  onSelectHistoryItem: (item: AnalysisHistoryItem) => void;
  onClearHistory: () => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  history,
  onSelectHistoryItem,
  onClearHistory
}) => {
  const { pageI18n, t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      <div className="relative w-full max-w-2xl ocean-glass rounded-3xl p-6 border border-cyan-400/30 shadow-2xl z-10 animate-in fade-in zoom-in-95">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 flex items-center justify-center">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg text-white uppercase">
                {pageI18n.historyTitle}
              </h2>
              <p className="text-xs text-slate-400">
                Previously generated marine decision pipelines and safety audits
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {history.length > 0 && (
              <button
                onClick={onClearHistory}
                className="p-1.5 rounded-xl text-slate-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors text-xs flex items-center gap-1"
                title="Clear History"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Clear</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* History List */}
        {history.length === 0 ? (
          <div className="py-12 text-center text-slate-400 space-y-3">
            <div className="w-16 h-16 rounded-full bg-white/5 mx-auto flex items-center justify-center text-slate-500">
              <History className="w-8 h-8" />
            </div>
            <p className="text-sm">Your marine analyses will appear here.</p>
            <p className="text-xs text-slate-500">Run a search query or demo flow to generate records.</p>
          </div>
        ) : (
          <div className="max-h-96 overflow-y-auto space-y-3 pr-1">
            {history.map((item) => {
              const isRed = item.safetyStatus === 'RED';
              const isYellow = item.safetyStatus === 'YELLOW';

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectHistoryItem(item);
                    onClose();
                  }}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all hover:scale-[1.01] ${
                    isRed 
                      ? 'bg-rose-950/20 border-rose-500/30 hover:border-rose-400/60' 
                      : isYellow
                      ? 'bg-amber-950/20 border-amber-500/30 hover:border-amber-400/60'
                      : 'bg-sky-950/30 border-sky-400/20 hover:border-cyan-400/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-cyan-400" />
                      <span className="font-bold text-sm text-white">{item.location.name}</span>
                      <span className="text-xs text-slate-400">({item.location.state})</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                        isRed 
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' 
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      }`}>
                        {item.safetyStatus}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                        {item.fishingPotential}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 font-medium mb-2.5 line-clamp-1">
                    "{item.query}"
                  </p>

                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>{item.timestamp}</span>
                    <span className="flex items-center gap-1 text-cyan-300 font-semibold">
                      Re-open Analysis <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};
