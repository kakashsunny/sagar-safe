import React from 'react';
import { 
  X, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Sliders, 
  ShieldCheck, 
  Check, 
  Radio, 
  Layers, 
  Play,
  Globe,
  Languages,
  Anchor,
  Activity,
  BarChart3,
  Fish
} from 'lucide-react';
import { playBubblePop } from '../utils/bubbleAudio';
import { useLanguage } from '../context/LanguageContext';
import { useOperationalMode } from '../context/OperationalModeContext';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  // Audio
  bubbleSoundMuted: boolean;
  onToggleBubbleSoundMuted: (muted: boolean) => void;
  // Bubbles
  bubblesEnabled: boolean;
  onToggleBubblesEnabled: (enabled: boolean) => void;
  bubbleDensity: 'gentle' | 'normal' | 'surge';
  onChangeBubbleDensity: (density: 'gentle' | 'normal' | 'surge') => void;
  bubbleSizeMode: 'micro' | 'tiny';
  onChangeBubbleSizeMode: (mode: 'micro' | 'tiny') => void;
  // Marine Life
  marineLifeEnabled: boolean;
  onToggleMarineLife: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  bubbleSoundMuted,
  onToggleBubbleSoundMuted,
  bubblesEnabled,
  onToggleBubblesEnabled,
  bubbleDensity,
  onChangeBubbleDensity,
  bubbleSizeMode,
  onChangeBubbleSizeMode,
  marineLifeEnabled,
  onToggleMarineLife,
}) => {
  const { language, setLanguage, supportedLanguages, currentLanguageOption, pageI18n, t } = useLanguage();
  const { operationalMode, setOperationalMode } = useOperationalMode();

  if (!isOpen) return null;

  return (
    <div 
      id="settings-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#010814]/80 backdrop-blur-md animate-fadeIn select-none"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        id="settings-modal-dialog"
        className="w-full max-w-lg rounded-3xl ocean-glass border border-cyan-400/40 shadow-2xl p-5 sm:p-6 text-slate-100 relative overflow-hidden"
      >
        {/* Ambient Top Glow */}
        <div className="absolute -top-20 -right-20 w-44 h-44 rounded-full bg-cyan-500/20 blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-cyan-400/20 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-500/25 to-blue-700/30 border border-cyan-400/40 flex items-center justify-center shadow-lg shadow-cyan-500/10">
              <Sliders className="w-5 h-5 text-cyan-300" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base sm:text-lg text-white tracking-tight">
                {t.appTitle ? `${t.appTitle} • Settings` : 'System & Language Settings'}
              </h3>
              <p className="text-xs text-cyan-200/70 font-mono">
                {currentLanguageOption.nativeName} ({currentLanguageOption.label}) • {currentLanguageOption.region}
              </p>
            </div>
          </div>

          <button
            id="btn-close-settings-modal"
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900/60 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            title="Close Settings"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Settings Body */}
        <div className="mt-5 space-y-5 max-h-[75vh] overflow-y-auto pr-1">

          {/* ========================================================
              SECTION: OPERATIONAL USER MODE (FISHERMAN VS EXECUTIVE)
              ======================================================== */}
          <div id="settings-operational-user-mode" className="p-4.5 rounded-2xl bg-gradient-to-br from-[#03152d]/95 via-[#020e23]/90 to-[#020b18]/95 border-2 border-cyan-500/40 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-display font-black text-white uppercase tracking-wider">
                    OPERATIONAL USER MODE
                  </h3>
                  <p className="text-[11px] text-slate-300">
                    Tailors dashboard telemetry, audio directives, and visual complexity to your workflow.
                  </p>
                </div>
              </div>
              <span className={`text-[10px] font-mono px-2.5 py-1 rounded-full font-bold border ${
                operationalMode === 'FISHERMAN'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40'
                  : 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40'
              }`}>
                ACTIVE: {operationalMode}
              </span>
            </div>

            {/* Mode Selection Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {/* Option 1: FISHERMAN MODE */}
              <button
                id="btn-mode-fisherman"
                type="button"
                onClick={() => setOperationalMode('FISHERMAN')}
                className={`p-3.5 rounded-xl border text-left transition-all relative overflow-hidden group cursor-pointer ${
                  operationalMode === 'FISHERMAN'
                    ? 'bg-gradient-to-br from-emerald-950/80 via-[#021f1d]/80 to-[#020b16]/90 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.25)]'
                    : 'bg-[#020e1f]/60 border-slate-700/60 hover:border-slate-500 text-slate-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      operationalMode === 'FISHERMAN' 
                        ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-400/50' 
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      <Fish className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-xs sm:text-sm text-white flex items-center gap-1.5">
                        <span>FISHERMAN MODE</span>
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                          SAFETY-FIRST
                        </span>
                      </div>
                      <div className="text-[10px] text-emerald-400/90 font-mono">सुरक्षित तटीय मोड</div>
                    </div>
                  </div>
                  {operationalMode === 'FISHERMAN' && (
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-300">
                      <Check className="w-3 h-3" />
                    </div>
                  )}
                </div>
                <p className="text-[11px] text-slate-300 mt-2.5 leading-relaxed">
                  Strips away technical data tables. Features massive colored safety badges (Green/Red), localized audio sea report button, and instant border danger alerts.
                </p>
              </button>

              {/* Option 2: EXECUTIVE MODE */}
              <button
                id="btn-mode-executive"
                type="button"
                onClick={() => setOperationalMode('EXECUTIVE')}
                className={`p-3.5 rounded-xl border text-left transition-all relative overflow-hidden group cursor-pointer ${
                  operationalMode === 'EXECUTIVE'
                    ? 'bg-gradient-to-br from-cyan-950/80 via-[#031d36]/80 to-[#020b16]/90 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.25)]'
                    : 'bg-[#020e1f]/60 border-slate-700/60 hover:border-slate-500 text-slate-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      operationalMode === 'EXECUTIVE' 
                        ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-400/50' 
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      <BarChart3 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-xs sm:text-sm text-white flex items-center gap-1.5">
                        <span>EXECUTIVE MODE</span>
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                          COMMAND DECK
                        </span>
                      </div>
                      <div className="text-[10px] text-cyan-300/90 font-mono">वाणिज्यिक कमान मोड</div>
                    </div>
                  </div>
                  {operationalMode === 'EXECUTIVE' && (
                    <div className="w-5 h-5 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-300">
                      <Check className="w-3 h-3" />
                    </div>
                  )}
                </div>
                <p className="text-[11px] text-slate-300 mt-2.5 leading-relaxed">
                  Renders the full suite of technical telemetry tables: Berth Occupancy & drafts, AIS Live Target breakdown, and Synoptic Wave Buoy spectral data.
                </p>
              </button>
            </div>
          </div>

          {/* ========================================================
              SECTION 0: GLOBAL LANGUAGE & COASTAL REGIONAL DIALECT
              ======================================================== */}
          <div className="p-4 rounded-2xl bg-[#03152d]/80 border border-cyan-500/20 space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider">
                <Globe className="w-4 h-4 text-cyan-400" />
                <span>Maritime Language & Coastal Regional Dialect</span>
              </div>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-400/30 flex items-center gap-1">
                <Languages className="w-3 h-3 text-cyan-400" />
                <span>10 Coastal Languages</span>
              </span>
            </div>

            <p className="text-xs text-slate-300/90 leading-relaxed">
              Persistently syncs all audio broadcasts, navigation labels, telemetry cards, and safety directives into your preferred coastal language.
            </p>

            {/* Language Selection Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1">
              {supportedLanguages.map((lang) => {
                const isActive = lang.code === language;
                return (
                  <button
                    key={lang.code}
                    id={`settings-lang-${lang.code}`}
                    type="button"
                    onClick={() => setLanguage(lang.code)}
                    className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all relative overflow-hidden group ${
                      isActive
                        ? 'bg-gradient-to-br from-cyan-500/25 via-blue-600/20 to-sky-950/80 border-cyan-400 text-white shadow-lg shadow-cyan-500/15'
                        : 'bg-slate-950/60 border-white/10 text-slate-300 hover:border-cyan-400/40 hover:bg-slate-900/60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-bold font-display text-white tracking-wide">
                        {lang.nativeName}
                      </span>
                      {isActive && (
                        <div className="w-4 h-4 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold text-cyan-300/90">
                        {lang.label}
                      </div>
                      <div className="text-[9px] font-mono text-slate-400 truncate mt-0.5">
                        {lang.region}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ========================================================
              SECTION 1: ACOUSTIC & AUDIO SETTINGS
              ======================================================== */}
          <div className="p-4 rounded-2xl bg-[#03152d]/80 border border-cyan-500/20 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider">
                <Volume2 className="w-4 h-4 text-cyan-400" />
                <span>Web Audio Effects</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-400/30">
                Acoustic Cavitation
              </span>
            </div>

            {/* Bubble Pop Sound Toggle (MAIN USER REQUEST) */}
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-cyan-400/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-white">Subtle Bubble Pop Sound</span>
                  {bubbleSoundMuted ? (
                    <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-rose-500/20 text-rose-300 border border-rose-500/40">
                      MUTED
                    </span>
                  ) : (
                    <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      ACTIVE
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Plays a very subtle, soft underwater pop whenever a background bubble is clicked.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {/* Test Sound Button */}
                <button
                  type="button"
                  id="btn-test-bubble-sound"
                  onClick={() => playBubblePop(1.1, true)}
                  className="px-2.5 py-1.5 text-xs rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-400/30 flex items-center gap-1 transition-all active:scale-95"
                  title="Preview the subtle bubble pop sound effect"
                >
                  <Play className="w-3 h-3 text-cyan-400 fill-cyan-400" />
                  <span>Preview Pop</span>
                </button>

                {/* Mute Toggle Button */}
                <button
                  type="button"
                  id="btn-toggle-mute-bubble-sound"
                  onClick={() => onToggleBubbleSoundMuted(!bubbleSoundMuted)}
                  className={`px-3 py-1.5 text-xs font-mono font-semibold rounded-xl border transition-all flex items-center gap-1.5 ${
                    bubbleSoundMuted
                      ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 hover:bg-rose-500/30'
                      : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30'
                  }`}
                >
                  {bubbleSoundMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  <span>{bubbleSoundMuted ? 'Unmute' : 'Mute'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* ========================================================
              SECTION 2: BACKGROUND BUBBLE SIZING & ATOMOSPHERE
              ======================================================== */}
          <div className="p-4 rounded-2xl bg-[#03152d]/80 border border-cyan-500/20 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Background Bubbles (Non-Intrusive)</span>
              </div>
              <button
                type="button"
                id="btn-toggle-bubbles-active"
                onClick={() => onToggleBubblesEnabled(!bubblesEnabled)}
                className={`text-[11px] font-mono px-2.5 py-1 rounded-lg border transition-all ${
                  bubblesEnabled
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : 'bg-slate-800/80 text-slate-400 border-slate-700'
                }`}
              >
                {bubblesEnabled ? 'Bubbles: ON' : 'Bubbles: OFF'}
              </button>
            </div>

            <p className="text-xs text-slate-400">
              Bubbles float in the far background behind all cards and will never block or disturb cards, charts, or inputs.
            </p>

            {/* Bubble Size Selector: Very Small */}
            <div className="p-3 rounded-xl bg-slate-950/60 border border-cyan-400/15 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="text-xs font-semibold text-white">Bubble Diameter Scale</div>
                <div className="text-[11px] text-slate-400">Kept microscopic to prevent card distraction</div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  id="btn-bubble-size-micro"
                  onClick={() => onChangeBubbleSizeMode('micro')}
                  className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all ${
                    bubbleSizeMode === 'micro'
                      ? 'bg-cyan-500/25 text-cyan-200 border-cyan-400/50 font-bold shadow-sm'
                      : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  Very Tiny (4–8px)
                </button>

                <button
                  type="button"
                  id="btn-bubble-size-tiny"
                  onClick={() => onChangeBubbleSizeMode('tiny')}
                  className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all ${
                    bubbleSizeMode === 'tiny'
                      ? 'bg-cyan-500/25 text-cyan-200 border-cyan-400/50 font-bold shadow-sm'
                      : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  Tiny (6–10px)
                </button>
              </div>
            </div>

            {/* Bubble Density */}
            <div className="p-3 rounded-xl bg-slate-950/60 border border-cyan-400/15 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="text-xs font-semibold text-white">Effervescence Density</div>
                <div className="text-[11px] text-slate-400">Number of subtle background bubbles</div>
              </div>

              <div className="flex items-center gap-1">
                {(['gentle', 'normal', 'surge'] as const).map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => onChangeBubbleDensity(d)}
                    className={`px-2.5 py-1 text-xs font-mono rounded-lg capitalize transition-all border ${
                      bubbleDensity === d
                        ? 'bg-cyan-500/25 text-cyan-200 border-cyan-400/50 font-bold'
                        : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* ========================================================
              SECTION 3: MARINE LIFE FAUNA
              ======================================================== */}
          <div className="p-4 rounded-2xl bg-[#03152d]/80 border border-cyan-500/20 flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-white">Marine Fauna Shadows</div>
              <div className="text-xs text-slate-400">Deep manta ray and pelagic fish cruising in background</div>
            </div>

            <button
              type="button"
              id="btn-toggle-marine-life-settings"
              onClick={onToggleMarineLife}
              className={`px-3 py-1.5 text-xs font-mono font-semibold rounded-xl border transition-all ${
                marineLifeEnabled
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-slate-800/80 text-slate-400 border-slate-700'
              }`}
            >
              {marineLifeEnabled ? 'Enabled' : 'Disabled'}
            </button>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-5 pt-4 border-t border-cyan-400/20 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Preferences auto-saved locally</span>
          </div>

          <button
            id="btn-settings-done"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold font-mono tracking-wide shadow-lg shadow-cyan-500/20 active:scale-95 transition-all"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
