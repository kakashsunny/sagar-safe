import React, { useState, useEffect, useRef, useMemo } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { 
  Waves, 
  LayoutDashboard,
  Compass, 
  Anchor,
  Fish,
  CloudSun,
  Radio,
  ShieldCheck,
  MapPin,
  Volume2,
  VolumeX,
  Languages,
  ChevronDown,
  Menu,
  X,
  SlidersHorizontal,
  Bell,
  Sparkles,
  User as UserIcon,
  LogOut,
  ChevronRight,
  Newspaper,
  AlertOctagon
} from 'lucide-react';

import { MarineLocation } from '../types/marine';
import { speakTextInLanguage, stopSpeaking, getFishermanSpokenReport, getPageSpokenBriefing } from '../utils/speechVoice';
import { useNavbarI18n } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

export interface NavbarProps {
  selectedLocation: MarineLocation;
  onOpenLocationPicker: () => void;
  onOpenAlerts: () => void;
  onOpenHistory: () => void;
  onRunDemoFlow?: () => void;
  onTriggerSos?: () => void;
  isDemoMode: boolean;
  setIsDemoMode: (val: boolean) => void;
  currentLanguage?: string;
  setCurrentLanguage?: (lang: string) => void;
  criticalAlertsCount: number;
  marineLifeEnabled?: boolean;
  onToggleMarineLife?: () => void;
  onOpenSettings?: () => void;
}

interface NavLinkItem {
  to: string;
  label: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  exact?: boolean;
  id: string;
}

const NAV_PILL =
  'h-8 inline-flex items-center justify-center gap-1.5 rounded-full text-xs font-semibold transition-all focus:outline-none shrink-0 whitespace-nowrap';

const getLocationShortLabel = (name: string) => {
  const withoutParen = name.replace(/\s*\([^)]*\)\s*$/, '').trim();
  return withoutParen.length > 0 ? withoutParen : name;
};

export const Navbar: React.FC<NavbarProps> = React.memo(({
  selectedLocation,
  onOpenLocationPicker,
  onOpenAlerts,
  onOpenHistory,
  onTriggerSos,
  isDemoMode,
  setIsDemoMode,
  currentLanguage: propLanguage,
  setCurrentLanguage: propSetLanguage,
  criticalAlertsCount,
  marineLifeEnabled = true,
  onToggleMarineLife,
  onOpenSettings
}) => {
  // Memoized hook strictly bound to LanguageProvider context
  const { 
    activeLanguage: currentLanguage, 
    setLanguage: contextSetLanguage, 
    t, 
    pageI18n, 
    supportedLanguages 
  } = useNavbarI18n(propLanguage);

  const handleSetLanguage = (code: string) => {
    contextSetLanguage(code);
    if (propSetLanguage) {
      propSetLanguage(code);
    }
  };

  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const location = useLocation();

  const { user, openAuthModal, signOutUser, loading: authLoading } = useAuth();

  const langMenuRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Stop ongoing voice broadcast if language changes or on unmount
  useEffect(() => {
    stopSpeaking();
    setIsSpeaking(false);
  }, [currentLanguage]);

  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  // Accessibility: Audio Voice Synthesizer Toggle for Fishermen
  const handleToggleGlobalAudio = () => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
      return;
    }

    let speechText = '';
    const path = location.pathname;
    if (path === '/news') {
      speechText = getPageSpokenBriefing('news', selectedLocation.name, currentLanguage);
    } else if (path === '/map') {
      speechText = getPageSpokenBriefing('map', selectedLocation.name, currentLanguage);
    } else if (path === '/ports') {
      speechText = getPageSpokenBriefing('ports', selectedLocation.name, currentLanguage);
    } else if (path === '/pfz') {
      speechText = getPageSpokenBriefing('pfz', selectedLocation.name, currentLanguage);
    } else if (path === '/weather') {
      speechText = getPageSpokenBriefing('weather', selectedLocation.name, currentLanguage);
    } else if (path === '/sources') {
      speechText = getPageSpokenBriefing('trust', selectedLocation.name, currentLanguage);
    } else {
      speechText = getFishermanSpokenReport(selectedLocation.name, 'GREEN', currentLanguage);
    }

    const started = speakTextInLanguage(
      speechText,
      currentLanguage,
      () => setIsSpeaking(true),
      () => setIsSpeaking(false),
      () => setIsSpeaking(false)
    );
    if (!started) {
      console.warn('Speech synthesis not initialized or unsupported.');
    }
  };

  // Close menus when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setLangMenuOpen(false);
    setUserMenuOpen(false);
  }, [location.pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target as Node)) {
        setLangMenuOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const languages = [
    { code: 'en', label: 'English', region: 'All India' },
    { code: 'hi', label: 'हिन्दी (Hindi)', region: 'National' },
    { code: 'kn', label: 'ಕನ್ನಡ (Kannada)', region: 'Karnataka Coast' },
    { code: 'ml', label: 'മലയാളം (Malayalam)', region: 'Kerala Coast' },
    { code: 'ta', label: 'தமிழ் (Tamil)', region: 'Tamil Nadu Coast' },
    { code: 'te', label: 'తెలుగు (Telugu)', region: 'Andhra Coast' },
    { code: 'mr', label: 'मराठी (Marathi)', region: 'Maharashtra Coast' },
    { code: 'bn', label: 'বাংলা (Bengali)', region: 'Bengal Coast' },
    { code: 'od', label: 'ଓଡ଼ିଆ (Odia)', region: 'Odisha Coast' },
    { code: 'gu', label: 'ગુજરાતી (Gujarati)', region: 'Gujarat Coast' }
  ];

  // Primary Navigation Items with exact labels and concise tablet shortLabels
  const navLinks: NavLinkItem[] = useMemo(() => [
    { to: '/', label: t.navDashboard || 'Dashboard', shortLabel: 'Dashboard', icon: LayoutDashboard, exact: true, id: 'nav-item-dashboard' },
    { to: '/map', label: t.navMap || 'Marine Map', shortLabel: 'Map', icon: Compass, id: 'nav-item-map' },
    { to: '/ports', label: t.navPorts || 'Ports Directory', shortLabel: 'Ports', icon: Anchor, id: 'nav-item-ports' },
    { to: '/pfz', label: t.navPfz || 'PFZ Zones', shortLabel: 'PFZ', icon: Fish, id: 'nav-item-pfz' },
    { to: '/weather', label: t.navWeather || 'Weather', shortLabel: 'Weather', icon: CloudSun, id: 'nav-item-weather' },
    { to: '/news', label: t.navNews || 'Dispatches', shortLabel: 'News', icon: Radio, id: 'nav-item-dispatches' },
    { to: '/sources', label: t.navTrust || 'Data Trust', shortLabel: 'Trust', icon: ShieldCheck, id: 'nav-item-trust' },
  ], [t]);

  return (
    <header 
      id="nav-main-header"
      className="sticky top-2 sm:top-3 z-50 w-full px-2 sm:px-4 md:px-6 max-w-7xl mx-auto transition-all select-none pointer-events-auto"
    >
      {/* 1. TOP MAIN NAVBAR CONTAINER */}
      <div 
        id="navbar-top-capsule"
        className="w-full bg-[#020b16]/85 backdrop-blur-xl border border-sky-500/25 rounded-full px-2.5 sm:px-4 md:px-5 py-1.5 sm:py-2 flex items-center gap-2 sm:gap-3 shadow-2xl shadow-black/60 relative min-h-[52px] sm:min-h-[56px]"
      >
        {/* Specular Ambient Edge Glow */}
        <div className="absolute top-0 inset-x-8 sm:inset-x-12 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent pointer-events-none rounded-full" />

        {/* LEFT SECTION: Brand Lockup & Status Micro-Badge */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 min-w-0">
          <Link 
            id="nav-logo-btn"
            to="/"
            className="flex items-center gap-2 sm:gap-2.5 group focus:outline-none shrink-0"
            aria-label="SAGAR-SAFE AI Command Deck Home"
          >
            {/* Animated Wave Icon Badge */}
            <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-cyan-500/30 via-blue-600/30 to-[#020b16] border border-cyan-400/40 flex items-center justify-center shadow-lg shadow-cyan-500/25 group-hover:scale-105 group-hover:border-cyan-300 transition-all shrink-0">
              <Waves className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-cyan-300 animate-pulse shrink-0" />
            </div>

            {/* Brand Typography & Micro-Badge */}
            <div className="flex flex-col justify-center min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-display font-black text-xs sm:text-sm md:text-base tracking-wider text-white uppercase whitespace-nowrap drop-shadow-sm">
                  SAGAR-SAFE AI
                </span>
                
                {/* Glowing Micro-Badge: COMMAND DECK - HIDDEN ON MOBILE */}
                <span className="hidden md:inline-block bg-emerald-500/15 text-emerald-400 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full border border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.3)] tracking-wider uppercase shrink-0">
                  DECK
                </span>
              </div>

              {/* Secondary Status Subtitle */}
              <span className="hidden 2xl:inline-block text-[10px] text-cyan-300/70 font-mono tracking-tight truncate">
                Marine Decision Intelligence
              </span>
            </div>
          </Link>
        </div>

        {/* CENTER SECTION: Primary nav — visible when there is room for the full capsule */}
        <nav 
          id="nav-center-capsule"
          aria-label="Command Bridge Primary Navigation"
          className="hidden xl:flex items-center justify-center flex-1 min-w-0 px-1 overflow-x-auto scrollbar-none"
        >
          <div className="bg-slate-900/80 border border-slate-800/90 rounded-full p-1 flex items-center gap-0.5 2xl:gap-1 shadow-inner backdrop-blur-xl mx-auto">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.to}
                  id={link.id}
                  to={link.to}
                  end={link.exact}
                  className={({ isActive }) =>
                    `${NAV_PILL} px-2 2xl:px-3 duration-200 relative z-10 ${
                      isActive
                        ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-400/50 shadow-[0_0_12px_rgba(6,182,212,0.25)] font-bold'
                        : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
                    }`
                  }
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span className="hidden 2xl:inline leading-none">{link.label}</span>
                  <span className="inline 2xl:hidden leading-none">{link.shortLabel}</span>
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* RIGHT SECTION: Quick Actions */}
        <div className="flex items-center justify-end gap-1 sm:gap-1.5 ml-auto shrink-0">
          
          {/* DESKTOP/TABLET UTILITY BUTTONS (Intelligently scaled by breakpoints) */}
          
          {/* 1. Port Selector Button (visible on md+) */}
          <button
            id="btn-nav-port-selector"
            type="button"
            onClick={onOpenLocationPicker}
            className={`hidden md:flex ${NAV_PILL} bg-slate-900/75 hover:bg-slate-800/90 border border-sky-500/30 hover:border-sky-400/60 text-cyan-200 px-2.5 sm:px-3 shadow-sm group max-w-[140px] lg:max-w-[170px] xl:max-w-[150px] 2xl:max-w-[200px]`}
            title={`Active Port: ${selectedLocation.name} (${selectedLocation.state}). Click to switch harbour/location.`}
            aria-label={`Select maritime location, currently ${selectedLocation.name}`}
          >
            <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0 group-hover:scale-110 transition-transform" />
            <span className="truncate font-mono text-[11px] sm:text-xs text-cyan-100 font-medium min-w-0">
              {getLocationShortLabel(selectedLocation.name)}
            </span>
            <ChevronDown className="w-3 h-3 text-cyan-400/60 shrink-0" />
          </button>

          {/* 2. News Dispatch Link — hidden on xl+ where it lives in the center nav capsule */}
          <NavLink
            id="btn-nav-news"
            to="/news"
            className={({ isActive }) =>
              `hidden sm:flex xl:hidden ${NAV_PILL} px-2 sm:px-2.5 font-mono font-bold shadow-sm ${
                isActive
                  ? 'bg-cyan-500/25 text-cyan-200 border border-cyan-400/50 shadow-[0_0_12px_rgba(6,182,212,0.25)]'
                  : 'bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/30 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.2)]'
              }`
            }
            title={t.navNews || 'Marine Intelligence News & Dispatches'}
            aria-label={t.navNews || 'Open marine news and dispatches'}
          >
            <Newspaper className="w-3.5 h-3.5 shrink-0" />
            <span className="leading-none">{t.navNews || 'Dispatches'}</span>
          </NavLink>

          {/* 3. SOS Emergency Distress Trigger (visible on sm+) */}
          {onTriggerSos && (
            <button
              id="btn-nav-sos"
              type="button"
              onClick={onTriggerSos}
              className={`hidden sm:flex ${NAV_PILL} px-2 sm:px-2.5 font-mono font-bold shadow-sm bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 shadow-[0_0_12px_rgba(244,63,94,0.25)]`}
              title={t.navSos || 'Open Maritime Emergency SOS Distress Console'}
              aria-label={t.navSos || 'Open emergency SOS distress console'}
            >
              <AlertOctagon className="w-3.5 h-3.5 text-rose-400 animate-pulse shrink-0" />
              <span className="hidden lg:inline leading-none">SOS</span>
            </button>
          )}

          {/* 4. Audio Voice Broadcast Toggle (visible on sm+) */}
          <button
            id="btn-nav-listen"
            type="button"
            onClick={handleToggleGlobalAudio}
            className={`hidden sm:flex ${NAV_PILL} px-2 sm:px-2.5 font-mono font-bold shadow-sm ${
              isSpeaking
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-[0_0_12px_rgba(244,63,94,0.3)] animate-pulse'
                : 'bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/30 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.2)]'
            }`}
            title={isSpeaking ? "Stop Maritime Audio Broadcast" : "Listen to Coastal Spoken Voice Broadcast"}
            aria-label={isSpeaking ? "Stop voice audio" : "Listen to page broadcast"}
          >
            {isSpeaking ? (
              <VolumeX className="w-3.5 h-3.5 text-rose-400 animate-pulse shrink-0" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
            )}
            <span className="hidden lg:inline leading-none">{isSpeaking ? 'Stop' : 'Listen'}</span>
          </button>

          {/* 5. Language Selector Dropdown Capsule (compact on tablet, full on desktop) */}
          <div className="relative shrink-0 hidden sm:block" ref={langMenuRef}>
            <button
              id="btn-nav-language"
              type="button"
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className={`${NAV_PILL} bg-slate-900/60 hover:bg-slate-800/80 border border-white/15 text-slate-300 hover:text-white px-2 sm:px-2.5 font-mono font-bold`}
              title="Select Maritime Language"
              aria-label="Change maritime language"
              aria-expanded={langMenuOpen}
            >
              <Languages className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
              <span className="text-[11px] uppercase tracking-wide">
                {currentLanguage.toUpperCase()}
              </span>
              <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${langMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {langMenuOpen && (
              <div 
                id="nav-language-dropdown"
                className="absolute right-0 mt-2 w-52 rounded-2xl bg-[#03152d]/98 border border-sky-500/40 shadow-2xl p-1.5 z-[70] animate-fadeIn backdrop-blur-2xl"
              >
                <div className="px-2.5 py-1 text-[10px] font-mono text-cyan-300/80 border-b border-white/10 uppercase tracking-wider">
                  Maritime Language (10 Indic Dialects)
                </div>
                <div className="max-h-60 overflow-y-auto py-1">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        handleSetLanguage(l.code);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs rounded-xl flex items-center justify-between transition-colors ${
                        currentLanguage === l.code
                          ? 'bg-cyan-500/25 text-cyan-200 font-semibold'
                          : 'text-slate-300 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <span className="font-medium">{l.label}</span>
                      <span className="text-[10px] text-slate-400">{l.region}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 6. Google Authentication User Capsule / Sign-In Button */}
          <div className="relative shrink-0" ref={userMenuRef}>
            {user ? (
              <div>
                <button
                  id="btn-nav-user-profile"
                  type="button"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className={`${NAV_PILL} p-1 sm:pr-2.5 bg-cyan-950/70 hover:bg-cyan-900/70 border border-cyan-400/40 text-white shadow-sm cursor-pointer`}
                  title={`Logged in as ${user.displayName || user.email}`}
                  aria-label="User profile menu"
                  aria-expanded={userMenuOpen}
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || 'User'}
                      className="w-6 h-6 rounded-full object-cover border border-cyan-400/60 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-[10px] font-bold text-white shrink-0">
                      {user.displayName?.charAt(0) || <UserIcon className="w-3.5 h-3.5" />}
                    </div>
                  )}
                  <span className="hidden sm:inline max-w-[80px] lg:max-w-[100px] truncate text-[11px] font-medium text-cyan-100">
                    {user.displayName?.split(' ')[0] || 'Mariner'}
                  </span>
                  <ChevronDown className={`w-3 h-3 text-cyan-300 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {userMenuOpen && (
                  <div 
                    id="nav-user-dropdown"
                    className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#03152d]/98 border border-cyan-400/40 shadow-2xl p-2 z-[70] animate-fadeIn backdrop-blur-2xl"
                  >
                    <div className="px-3 py-2 border-b border-white/10">
                      <div className="text-xs font-bold text-white truncate">
                        {user.displayName || 'Mariner'}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate font-mono">
                        {user.email}
                      </div>
                      <div className="mt-1 inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        <span>Google Authenticated</span>
                      </div>
                    </div>

                    <div className="py-1">
                      <button
                        type="button"
                        onClick={() => {
                          setUserMenuOpen(false);
                          openAuthModal();
                        }}
                        className="w-full text-left px-3 py-1.5 text-xs text-slate-300 hover:text-white hover:bg-white/5 rounded-xl flex items-center gap-2"
                      >
                        <UserIcon className="w-3.5 h-3.5 text-cyan-300" />
                        <span>Mariner Profile & Sync</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setUserMenuOpen(false);
                          signOutUser();
                        }}
                        className="w-full text-left px-3 py-1.5 text-xs text-rose-300 hover:text-rose-200 hover:bg-rose-500/15 rounded-xl flex items-center gap-2"
                      >
                        <LogOut className="w-3.5 h-3.5 text-rose-400" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                id="btn-nav-signin-google"
                type="button"
                onClick={openAuthModal}
                disabled={authLoading}
                className={`${NAV_PILL} bg-white hover:bg-slate-100 text-slate-900 border border-white/20 px-2.5 sm:px-3 font-bold shadow-sm hover:scale-[1.02] disabled:opacity-60`}
                title="Sign in with Google to persist your preferences"
                aria-label="Sign in with Google"
              >
                <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span className="whitespace-nowrap">Sign In</span>
              </button>
            )}
          </div>

          {/* 7. Critical Alerts Indicator Capsule */}
          {criticalAlertsCount > 0 && (
            <button
              id="btn-nav-alerts-badge"
              type="button"
              onClick={onOpenAlerts}
              className="relative h-8 w-8 inline-flex items-center justify-center rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 hover:bg-rose-500/30 transition-all focus:outline-none shrink-0"
              title={`${criticalAlertsCount} critical maritime alerts active`}
              aria-label="Open critical maritime alerts"
            >
              <Bell className="w-3.5 h-3.5 animate-bounce" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[9px] font-black flex items-center justify-center border border-[#020b16]">
                {criticalAlertsCount}
              </span>
            </button>
          )}

          {/* 8. Settings Control Trigger */}
          {onOpenSettings && (
            <button
              id="btn-nav-settings"
              type="button"
              onClick={onOpenSettings}
              className="hidden sm:inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-cyan-200 transition-all focus:outline-none shrink-0"
              title="Open Maritime HUD Settings & Controls"
              aria-label="Open settings"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
            </button>
          )}

          {/* 9. RESPONSIVE HAMBURGER MENU TOGGLE (Visible on xl and below) */}
          <button
            id="btn-nav-mobile-toggle"
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden h-8 w-8 inline-flex items-center justify-center rounded-full bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/30 text-cyan-300 transition-all focus:outline-none shrink-0"
            title="Toggle Command Bridge Navigation Menu"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-300" />
            ) : (
              <Menu className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-300" />
            )}
          </button>

        </div>
      </div>

      {/* 2. SUB-TELEMETRY STATUS BAR (Balanced Full-Width Alignment across screen sizes) */}
      <div 
        id="sub-telemetry-bar"
        className="mt-1.5 sm:mt-2 w-full bg-[#020b16]/75 backdrop-blur-md border border-sky-500/20 rounded-2xl sm:rounded-full px-3 sm:px-4 md:px-5 py-1.5 flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between text-[11px] font-mono text-slate-300 shadow-xl shadow-black/40 relative overflow-hidden"
      >
        {/* Specular Highlight */}
        <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent pointer-events-none" />

        {/* Left Text: Command Center & Fleet Telemetry */}
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
          <span className="text-xs shrink-0 select-none">🛰️</span>
          <span className="text-cyan-300 font-bold tracking-wider uppercase truncate text-[10px] sm:text-[11px]">
            MARITIME COMMAND CENTER • SATELLITE FLEET TELEMETRY
          </span>
        </div>

        {/* Right Text Status Indicators with Active Green Pulses */}
        <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3.5 shrink-0 text-[10px] sm:text-[11px]">
          {/* ISRO Oceansat-3 Beacon */}
          <div className="flex items-center gap-1 sm:gap-1.5 text-slate-200">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ring-2 ring-emerald-500/25 shrink-0" />
            <span className="font-semibold text-slate-200 truncate">ISRO Oceansat-3</span>
          </div>

          {/* INCOIS Wave Buoys Beacon */}
          <div className="hidden xs:flex items-center gap-1 sm:gap-1.5 text-slate-200">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ring-2 ring-emerald-500/25 shrink-0" />
            <span className="font-semibold text-slate-200 truncate">INCOIS Buoys</span>
          </div>

          {/* Clean Port Badge */}
          <div 
            className="px-2 sm:px-2.5 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 font-bold text-[9px] sm:text-[10px] uppercase tracking-wider shadow-inner truncate max-w-[120px]"
            title={`PORT: ${selectedLocation.name}`}
          >
            PORT: {selectedLocation.name}
          </div>
        </div>
      </div>

      {/* 3. MOBILE & TABLET RESPONSIVE NAVIGATION DRAWER */}
      {mobileMenuOpen && (
        <div 
          id="nav-mobile-dropdown"
          className="xl:hidden mt-2 rounded-2xl sm:rounded-3xl bg-[#020b16]/98 border border-sky-500/40 shadow-2xl p-3 sm:p-4 backdrop-blur-2xl animate-fadeIn text-slate-100 z-50 space-y-3"
        >
          {/* Header with status */}
          <div className="text-[10px] font-mono text-cyan-300/80 uppercase tracking-wider px-1 flex items-center justify-between border-b border-white/10 pb-2">
            <span className="flex items-center gap-1.5 font-bold">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Bridge Navigation Deck</span>
            </span>
            <span className="text-[9px] text-cyan-400 font-bold uppercase bg-cyan-500/20 px-2 py-0.5 rounded-full border border-cyan-400/30">
              LANG: {currentLanguage}
            </span>
          </div>

          {/* Mobile Utility Row (Voice Broadcast + Change Port) */}
          <div className="grid grid-cols-2 gap-2">
            {/* Audio Voice Broadcast */}
            <button
              id="btn-nav-mobile-listen"
              type="button"
              onClick={handleToggleGlobalAudio}
              className={`p-2 sm:p-2.5 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-2 border transition-all ${
                isSpeaking
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/50 shadow-md animate-pulse'
                  : 'bg-cyan-500/20 text-cyan-200 border-cyan-400/40 hover:bg-cyan-500/30'
              }`}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-cyan-300" />}
              <span className="truncate">{isSpeaking ? 'Stop Voice' : '🔊 Listen'}</span>
            </button>

            {/* Port Selector */}
            <button
              id="btn-nav-mobile-port"
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLocationPicker();
              }}
              className="p-2 sm:p-2.5 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-1.5 bg-slate-900/80 text-cyan-200 border border-sky-500/30 hover:border-sky-400 min-w-0"
              title={`Switch from ${selectedLocation.name}`}
            >
              <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="truncate font-mono">📍 {selectedLocation.name}</span>
            </button>
          </div>

          {/* Navigation Items Grid - Clean, Spacious, Zero Overlap */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1.5 pt-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.to}
                  id={`nav-mobile-${link.id}`}
                  to={link.to}
                  end={link.exact}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold transition-all border ${
                      isActive
                        ? 'bg-cyan-500/20 text-cyan-200 border-cyan-400/50 shadow-sm font-bold'
                        : 'text-slate-300 hover:text-white hover:bg-white/5 border-white/5'
                    }`
                  }
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span className="truncate">{link.label}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                </NavLink>
              );
            })}
          </div>

          {/* User Authentication in Mobile Menu */}
          <div className="pt-2 pb-1 border-t border-white/10">
            {user ? (
              <div className="flex items-center justify-between p-2 rounded-xl bg-cyan-950/50 border border-cyan-400/30">
                <div className="flex items-center gap-2.5 min-w-0">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || 'User'}
                      className="w-8 h-8 rounded-full object-cover border border-cyan-400/50 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
                      {user.displayName?.charAt(0) || <UserIcon className="w-4 h-4" />}
                    </div>
                  )}
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-white truncate">
                      {user.displayName || 'Mariner'}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate font-mono">
                      {user.email}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    signOutUser();
                  }}
                  className="p-2 rounded-lg bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 text-xs font-medium shrink-0 flex items-center gap-1"
                  title="Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="text-[11px]">Sign Out</span>
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAuthModal();
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-white text-slate-900 text-xs font-bold flex items-center justify-center gap-2 hover:bg-slate-100 shadow-md cursor-pointer"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>
            )}
          </div>

          {/* Language Selection Chips */}
          <div className="pt-2 border-t border-white/10">
            <div className="text-[10px] font-mono text-slate-400 mb-1.5 uppercase flex items-center gap-1">
              <Languages className="w-3 h-3 text-cyan-400" />
              <span>Coastal Voice Dialect</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => handleSetLanguage(lang.code)}
                  className={`px-2 py-1 rounded-lg text-[10px] font-mono transition-all ${
                    currentLanguage === lang.code
                      ? 'bg-cyan-500 text-white font-bold shadow-sm'
                      : 'bg-slate-900/70 text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {lang.label.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* SOS Emergency Mobile Action */}
          {onTriggerSos && (
            <button
              id="btn-nav-mobile-sos"
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onTriggerSos();
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold flex items-center justify-center gap-2 hover:bg-rose-500/30 shadow-[0_0_16px_rgba(244,63,94,0.25)]"
              title={t.navSos || 'Open Maritime Emergency SOS Distress Console'}
            >
              <AlertOctagon className="w-4 h-4 text-rose-400 animate-pulse shrink-0" />
              <span>{t.navSos || 'SOS Emergency Distress'}</span>
            </button>
          )}

          {/* Settings & Critical Alerts Mobile Row */}
          <div className="flex items-center gap-2 pt-1 border-t border-white/10">
            {onOpenSettings && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSettings();
                }}
                className="flex-1 py-2 px-3 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-xs font-semibold flex items-center justify-center gap-2 hover:bg-white/10"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-300" />
                <span>HUD Settings</span>
              </button>
            )}

            {criticalAlertsCount > 0 && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAlerts();
                }}
                className="flex-1 py-2 px-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold flex items-center justify-center gap-2 hover:bg-rose-500/30"
              >
                <Bell className="w-3.5 h-3.5 text-rose-400 animate-bounce" />
                <span>{criticalAlertsCount} Alerts</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
});

Navbar.displayName = 'Navbar';
