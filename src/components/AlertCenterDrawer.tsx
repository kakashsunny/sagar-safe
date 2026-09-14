import React from 'react';
import { 
  ShieldAlert, 
  AlertTriangle, 
  Info, 
  X, 
  ExternalLink, 
  Clock, 
  Wind, 
  Waves,
  MapPin
} from 'lucide-react';
import { MarineAlert } from '../types/marine';
import { useLanguage } from '../context/LanguageContext';

interface AlertCenterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  alerts: MarineAlert[];
}

export const AlertCenterDrawer: React.FC<AlertCenterDrawerProps> = ({
  isOpen,
  onClose,
  alerts
}) => {
  const { pageI18n, t } = useLanguage();

  if (!isOpen) return null;

  const criticalAlerts = alerts.filter(a => a.severity === 'CRITICAL');
  const cautionAlerts = alerts.filter(a => a.severity === 'CAUTION');
  const infoAlerts = alerts.filter(a => a.severity === 'INFO');

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md ocean-glass border-l border-sky-400/30 p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
          
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-400/30 flex items-center justify-center">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-lg text-white uppercase">
                    {pageI18n.activeAlertsTitle}
                  </h2>
                  <p className="text-[11px] text-slate-400 font-mono">
                    Real-time IMD, INCOIS & Coast Guard Bulletins
                  </p>
                </div>
              </div>

              <button
                id="btn-close-alert-drawer"
                onClick={onClose}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Alert List */}
            <div className="space-y-4">
              
              {/* Critical Alerts (🔴) */}
              {criticalAlerts.map((alert) => (
                <div 
                  key={alert.id}
                  className="rounded-2xl p-4 bg-rose-950/40 border border-rose-500/50 shadow-lg shadow-rose-950/50 space-y-2.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-500/30 text-rose-200 border border-rose-500/50 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
                      CRITICAL • FISHERMEN WARNING
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">{alert.issuedAt}</span>
                  </div>

                  <h3 className="font-display font-bold text-sm text-white leading-snug">
                    {alert.title}
                  </h3>

                  <p className="text-xs text-rose-100/90 leading-relaxed">
                    {alert.summary}
                  </p>

                  <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-300 gap-2">
                    <span className="text-cyan-300">Agency: {alert.source}</span>
                    <span className="text-slate-400">Coast: {alert.affectedCoastline}</span>
                  </div>
                </div>
              ))}

              {/* Caution Alerts (🟡) */}
              {cautionAlerts.map((alert) => (
                <div 
                  key={alert.id}
                  className="rounded-2xl p-4 bg-amber-950/30 border border-amber-500/40 shadow-lg space-y-2.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/30 text-amber-200 border border-amber-500/50 flex items-center gap-1.5">
                      <AlertTriangle className="w-3 h-3 text-amber-300" />
                      CAUTION ADVISORY
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">{alert.issuedAt}</span>
                  </div>

                  <h3 className="font-display font-bold text-sm text-white leading-snug">
                    {alert.title}
                  </h3>

                  <p className="text-xs text-slate-200/90 leading-relaxed">
                    {alert.summary}
                  </p>

                  <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-300 gap-2">
                    <span className="text-cyan-300">Agency: {alert.source}</span>
                    <span className="text-slate-400">Valid: {alert.validUntil}</span>
                  </div>
                </div>
              ))}

              {/* Info Alerts (🔵) */}
              {infoAlerts.map((alert) => (
                <div 
                  key={alert.id}
                  className="rounded-2xl p-4 bg-sky-950/30 border border-sky-400/25 space-y-2.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-sky-500/20 text-sky-300 border border-sky-400/30 flex items-center gap-1.5">
                      <Info className="w-3 h-3 text-sky-300" />
                      OCEAN STATE BULLETIN
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">{alert.issuedAt}</span>
                  </div>

                  <h3 className="font-display font-bold text-sm text-white leading-snug">
                    {alert.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {alert.summary}
                  </p>

                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span className="text-cyan-300">Agency: {alert.source}</span>
                    <span>Coast: {alert.affectedCoastline}</span>
                  </div>
                </div>
              ))}

            </div>
          </div>

          {/* Footer Official Link */}
          <div className="pt-6 border-t border-white/10 text-center text-xs text-slate-400 space-y-2">
            <p>Direct feed from IMD Coastal Weather & INCOIS Early Warning Systems</p>
            <div className="flex justify-center gap-4 text-cyan-300 font-mono text-[11px]">
              <span>IMD.gov.in</span>
              <span>•</span>
              <span>INCOIS.gov.in</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
