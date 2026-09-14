import React, { useState, useRef, useEffect, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Compass, 
  LayoutDashboard, 
  ShieldAlert, 
  Anchor,
  Newspaper,
  CloudSun,
  AlertOctagon,
  Radio
} from 'lucide-react';
import { useMobileBottomNavI18n } from '../context/LanguageContext';
import { getLocalizedNewsItems } from '../data/localizedNewsData';

interface MobileBottomNavProps {
  onOpenAlerts: () => void;
  onOpenHistory: () => void;
  onTriggerSos: () => void;
  criticalAlertsCount: number;
  language?: string;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = React.memo(({
  onOpenAlerts,
  onTriggerSos,
  criticalAlertsCount,
  language: propLanguage
}) => {
  // Memoized hook strictly bound to LanguageProvider context
  const { activeLanguage: activeLang, pageI18n } = useMobileBottomNavI18n(propLanguage);

  const [holdingSos, setHoldingSos] = useState<boolean>(false);
  const [holdProgress, setHoldProgress] = useState<number>(0);
  const [showHoldTip, setShowHoldTip] = useState<boolean>(false);
  const holdTimerRef = useRef<number | null>(null);
  const progressIntervalRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const HOLD_DURATION_MS = 3000;

  // Check if breaking news exists (memoized on language change)
  const hasBreakingNews = useMemo(() => {
    return getLocalizedNewsItems(activeLang).some(n => n.importance === 'BREAKING');
  }, [activeLang]);

  // Clear timers on unmount
  useEffect(() => {
    return () => {
      if (holdTimerRef.current) window.clearTimeout(holdTimerRef.current);
      if (progressIntervalRef.current) window.clearInterval(progressIntervalRef.current);
    };
  }, []);

  const startSosHold = (e: React.TouchEvent | React.MouseEvent) => {
    setHoldingSos(true);
    setHoldProgress(0);
    setShowHoldTip(false);
    startTimeRef.current = Date.now();

    // Haptic feedback start
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate(50);
      } catch {
        // ignore
      }
    }

    // Interval for smooth radial/linear progress
    progressIntervalRef.current = window.setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.min(100, (elapsed / HOLD_DURATION_MS) * 100);
      setHoldProgress(pct);
    }, 40);

    // Timeout for 3-second completion
    holdTimerRef.current = window.setTimeout(() => {
      if (progressIntervalRef.current) window.clearInterval(progressIntervalRef.current);
      setHoldingSos(false);
      setHoldProgress(100);

      // Strong haptic alert on trigger
      if ('vibrate' in navigator) {
        try {
          navigator.vibrate([200, 100, 300, 100, 400]);
        } catch {
          // ignore
        }
      }

      onTriggerSos();
    }, HOLD_DURATION_MS);
  };

  const cancelSosHold = () => {
    const elapsed = Date.now() - startTimeRef.current;
    if (holdTimerRef.current) {
      window.clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
    if (progressIntervalRef.current) {
      window.clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }

    if (holdingSos && elapsed < HOLD_DURATION_MS) {
      // User tapped or released before 3 seconds
      setShowHoldTip(true);
      setTimeout(() => setShowHoldTip(false), 3200);
    }

    setHoldingSos(false);
    setHoldProgress(0);
  };

  const remainingSeconds = Math.max(0.1, ((HOLD_DURATION_MS - (holdProgress / 100) * HOLD_DURATION_MS) / 1000)).toFixed(1);

  return (
    <nav 
      id="mobile-bottom-navigation"
      aria-label="Mobile Navigation Bar"
      className="lg:hidden fixed bottom-2 inset-x-2 sm:inset-x-4 max-w-lg mx-auto z-40 select-none pointer-events-auto"
    >
      {/* Tap Feedback Tooltip */}
      {showHoldTip && (
        <div className="mb-2 p-2.5 rounded-xl bg-rose-950/95 border border-rose-500/50 shadow-2xl text-center text-xs font-mono text-rose-200 animate-fadeIn backdrop-blur-md flex items-center justify-center gap-2">
          <AlertOctagon className="w-4 h-4 text-rose-400 animate-pulse shrink-0" />
          <span>{pageI18n.holdSos3s || 'Hold for 3 seconds to broadcast SOS'}</span>
        </div>
      )}

      {/* SOS Active Hold Overlay Banner */}
      {holdingSos && (
        <div className="mb-2 p-2.5 rounded-xl bg-gradient-to-r from-rose-900/95 via-red-900/95 to-rose-950/95 border-2 border-rose-500 shadow-[0_0_30px_rgba(244,63,94,0.6)] text-center text-xs font-mono text-white animate-pulse backdrop-blur-md flex items-center justify-between px-3">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-rose-300 animate-spin shrink-0" />
            <span className="font-bold uppercase tracking-wider text-[11px]">
              {pageI18n.distressSos || 'DISTRESS BEACON'}:
            </span>
          </div>
          <span className="text-sm font-black text-amber-300">{remainingSeconds}s</span>
        </div>
      )}

      <div className="ocean-glass rounded-2xl p-1 sm:p-1.5 flex items-center justify-between gap-0.5 shadow-2xl border border-sky-400/25 backdrop-blur-2xl">
        
        {/* 1. Home */}
        <NavLink
          id="mobile-nav-dashboard"
          to="/"
          end
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center py-1.5 px-0.5 rounded-xl text-[9px] sm:text-[10px] font-semibold transition-all ${
              isActive
                ? 'bg-cyan-500/20 text-cyan-300 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`
          }
        >
          <LayoutDashboard className="w-4 h-4 mb-0.5" />
          <span className="truncate max-w-[48px]">{pageI18n.homeNav}</span>
        </NavLink>

        {/* 2. Map */}
        <NavLink
          id="mobile-nav-map"
          to="/map"
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center py-1.5 px-0.5 rounded-xl text-[9px] sm:text-[10px] font-semibold transition-all ${
              isActive
                ? 'bg-cyan-500/20 text-cyan-300 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`
          }
        >
          <Compass className="w-4 h-4 mb-0.5" />
          <span className="truncate max-w-[48px]">{pageI18n.mapNav}</span>
        </NavLink>

        {/* 3. News (with breaking indicator) */}
        <NavLink
          id="mobile-nav-news"
          to="/news"
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center py-1.5 px-0.5 rounded-xl text-[9px] sm:text-[10px] font-semibold transition-all relative ${
              isActive
                ? 'bg-cyan-500/20 text-cyan-300 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`
          }
        >
          <div className="relative">
            <Newspaper className="w-4 h-4 mb-0.5" />
            {hasBreakingNews && (
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            )}
          </div>
          <span className="truncate max-w-[48px]">{pageI18n.newsNav || 'News'}</span>
        </NavLink>

        {/* 4. 🚨 SAFETY SOS CENTER BUTTON (3-SECOND HOLD) */}
        <div className="relative flex flex-col items-center px-1 shrink-0">
          <button
            id="mobile-nav-safety-sos"
            onTouchStart={startSosHold}
            onTouchEnd={cancelSosHold}
            onTouchCancel={cancelSosHold}
            onMouseDown={startSosHold}
            onMouseUp={cancelSosHold}
            onMouseLeave={cancelSosHold}
            onContextMenu={(e) => e.preventDefault()}
            className={`relative -mt-3.5 sm:-mt-4 w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex flex-col items-center justify-center font-black tracking-wider transition-all select-none touch-none ${
              holdingSos
                ? 'bg-rose-600 text-white scale-110 shadow-[0_0_30px_rgba(225,29,72,0.9)] ring-4 ring-rose-400'
                : 'bg-gradient-to-br from-rose-600 via-red-600 to-rose-800 text-white shadow-[0_0_16px_rgba(244,63,94,0.45)] border border-rose-400/50 hover:scale-105 active:scale-95'
            }`}
            title="Hold 3s to broadcast Maritime Distress SOS"
          >
            {/* SVG Circular Progress Ring */}
            {holdingSos && (
              <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  fill="none"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="3.5"
                />
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="3.5"
                  strokeDasharray="125.6"
                  strokeDashoffset={125.6 - (125.6 * holdProgress) / 100}
                  strokeLinecap="round"
                />
              </svg>
            )}

            <AlertOctagon className={`w-4 h-4 text-white ${holdingSos ? 'animate-spin' : 'animate-pulse'}`} />
            <span className="text-[8px] font-mono font-black -mt-0.5 tracking-tighter">SOS</span>
          </button>
          <span className="text-[8px] font-mono font-bold text-rose-400 mt-0.5 tracking-wider">
            {holdingSos ? `${remainingSeconds}s` : 'HOLD'}
          </span>
        </div>

        {/* 5. Weather */}
        <NavLink
          id="mobile-nav-weather"
          to="/weather"
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center py-1.5 px-0.5 rounded-xl text-[9px] sm:text-[10px] font-semibold transition-all ${
              isActive
                ? 'bg-cyan-500/20 text-cyan-300 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`
          }
        >
          <CloudSun className="w-4 h-4 mb-0.5" />
          <span className="truncate max-w-[48px]">{pageI18n.weatherNav}</span>
        </NavLink>

        {/* 6. Ports */}
        <NavLink
          id="mobile-nav-ports"
          to="/ports"
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center py-1.5 px-0.5 rounded-xl text-[9px] sm:text-[10px] font-semibold transition-all ${
              isActive
                ? 'bg-cyan-500/20 text-cyan-300 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`
          }
        >
          <Anchor className="w-4 h-4 mb-0.5" />
          <span className="truncate max-w-[48px]">{pageI18n.portsNav}</span>
        </NavLink>

        {/* 7. Alerts */}
        <button
          id="mobile-nav-alerts"
          onClick={onOpenAlerts}
          className="flex-1 relative flex flex-col items-center py-1.5 px-0.5 rounded-xl text-[9px] sm:text-[10px] font-semibold text-slate-400 hover:text-white transition-all"
        >
          <div className="relative">
            <ShieldAlert className="w-4 h-4 mb-0.5 text-amber-400" />
            {criticalAlertsCount > 0 && (
              <span className="absolute -top-1.5 -right-2.5 w-3.5 h-3.5 rounded-full bg-rose-500 text-white text-[8px] font-bold flex items-center justify-center animate-pulse">
                {criticalAlertsCount}
              </span>
            )}
          </div>
          <span className="truncate max-w-[48px]">{pageI18n.alertsNav}</span>
        </button>

      </div>
    </nav>
  );
});

MobileBottomNav.displayName = 'MobileBottomNav';
