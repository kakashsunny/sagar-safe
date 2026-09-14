import React, { useState } from 'react';
import { 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Wind, 
  Waves, 
  ChevronDown, 
  RefreshCw, 
  Droplets, 
  Zap, 
  X,
  Compass,
  Thermometer,
  ShieldCheck,
  Sliders
} from 'lucide-react';
import { MarineLocation } from '../types/marine';
import { playBubblePop, playBurstChime } from '../utils/bubbleAudio';

interface InteractiveOceanBubbleWidgetProps {
  bubblesEnabled: boolean;
  setBubblesEnabled: (val: boolean) => void;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
  bubbleDensity: 'gentle' | 'normal' | 'surge';
  setBubbleDensity: (val: 'gentle' | 'normal' | 'surge') => void;
  poppedCount: number;
  onTriggerBurst: () => void;
  selectedLocation: MarineLocation;
  sst: number;
  waveHeight: number;
  windSpeed: number;
  onOpenSettings?: () => void;
}

export const InteractiveOceanBubbleWidget: React.FC<InteractiveOceanBubbleWidgetProps> = ({
  bubblesEnabled,
  setBubblesEnabled,
  soundEnabled,
  setSoundEnabled,
  bubbleDensity,
  setBubbleDensity,
  poppedCount,
  onTriggerBurst,
  selectedLocation,
  sst,
  waveHeight,
  windSpeed,
  onOpenSettings
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [miniPadPops, setMiniPadPops] = useState<number[]>([1, 2, 3, 4]);

  // Gamified diver rank
  const getDiverRank = (count: number) => {
    if (count >= 50) return { title: 'Abyssal Master', color: 'text-purple-300', border: 'border-purple-500/40' };
    if (count >= 25) return { title: 'Pelagic Diver', color: 'text-cyan-300', border: 'border-cyan-500/40' };
    if (count >= 10) return { title: 'Reef Explorer', color: 'text-emerald-300', border: 'border-emerald-500/40' };
    return { title: 'Coastal Snorkeler', color: 'text-sky-300', border: 'border-sky-500/40' };
  };

  const rank = getDiverRank(poppedCount);

  // Pop a mini bubble in the widget pad
  const handleMiniPop = (id: number) => {
    if (soundEnabled) {
      playBubblePop(1.2 + Math.random() * 0.6);
    }
    setMiniPadPops((prev) => prev.filter((p) => p !== id));
    setTimeout(() => {
      setMiniPadPops((prev) => [...prev, id]);
    }, 1200);
  };

  return (
    <div className="fixed bottom-20 right-3 sm:bottom-6 sm:right-6 z-30 select-none">
      
      {/* 1. EXPANDED BUBBLE TELEMETRY CAPSULE */}
      {isOpen && (
        <div 
          id="interactive-ocean-bubble-modal"
          className="mb-3 w-80 sm:w-96 rounded-3xl ocean-glass border border-cyan-400/40 shadow-2xl p-4 sm:p-5 backdrop-blur-2xl animate-fadeIn text-slate-100 relative overflow-hidden"
        >
          {/* Ambient Glass Highlights */}
          <div className="absolute -top-16 -right-16 w-36 h-36 rounded-full bg-cyan-500/20 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-36 h-36 rounded-full bg-blue-600/20 blur-2xl pointer-events-none" />

          {/* Header Row */}
          <div className="flex items-center justify-between pb-3 border-b border-cyan-400/20 relative z-10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bubble-glass-orb flex items-center justify-center animate-bubble-wobble-1">
                <span className="text-base">🫧</span>
              </div>
              <div>
                <h4 className="font-display font-bold text-sm tracking-wide text-white flex items-center gap-1.5">
                  <span>Ocean Bubble HUD</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 font-mono">
                    LIVE
                  </span>
                </h4>
                <p className="text-[11px] text-cyan-200/70 font-mono">
                  {selectedLocation.name} • Depth 24m
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {onOpenSettings && (
                <button
                  type="button"
                  id="btn-widget-open-settings"
                  onClick={onOpenSettings}
                  className="p-1.5 rounded-xl hover:bg-white/10 text-slate-400 hover:text-cyan-300 transition-colors"
                  title="Open Audio & Bubble Settings"
                >
                  <Sliders className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                title="Close Bubble HUD"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Diver Score & Rank Card */}
          <div className="mt-3 p-3 rounded-2xl bg-[#03152d]/80 border border-cyan-500/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-2xl font-black font-mono text-cyan-300 flex items-center gap-1">
                <span>{poppedCount}</span>
                <span className="text-xs font-sans text-slate-400 font-normal">popped</span>
              </div>
              <div className="h-6 w-[1px] bg-slate-700/60" />
              <div>
                <div className="text-[10px] font-mono uppercase text-slate-400">Rank</div>
                <div className={`text-xs font-bold font-mono ${rank.color}`}>{rank.title}</div>
              </div>
            </div>

            <button
              onClick={() => {
                if (soundEnabled) playBurstChime();
                onTriggerBurst();
              }}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-cyan-500/20 active:scale-95 transition-all"
              title="Release oxygen bubble stream"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Blow Bubbles</span>
            </button>
          </div>

          {/* Quick Marine Water Snapshot Inside Bubble */}
          <div className="mt-3 grid grid-cols-3 gap-2">
            <div className="p-2 rounded-xl bg-slate-950/50 border border-cyan-400/15 text-center">
              <div className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
                <Thermometer className="w-3 h-3 text-cyan-400" />
                <span>SST</span>
              </div>
              <div className="text-xs font-mono font-bold text-cyan-200 mt-0.5">{sst.toFixed(1)}°C</div>
            </div>

            <div className="p-2 rounded-xl bg-slate-950/50 border border-cyan-400/15 text-center">
              <div className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
                <Waves className="w-3 h-3 text-sky-400" />
                <span>Wave</span>
              </div>
              <div className="text-xs font-mono font-bold text-sky-200 mt-0.5">{waveHeight.toFixed(1)}m</div>
            </div>

            <div className="p-2 rounded-xl bg-slate-950/50 border border-cyan-400/15 text-center">
              <div className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
                <Wind className="w-3 h-3 text-emerald-400" />
                <span>Wind</span>
              </div>
              <div className="text-xs font-mono font-bold text-emerald-200 mt-0.5">{windSpeed} km/h</div>
            </div>
          </div>

          {/* Interactive Pop-Pad (Clickable Mini Bubbles right in the card) */}
          <div className="mt-3 p-2.5 rounded-2xl bg-cyan-950/30 border border-cyan-500/20">
            <div className="text-[10px] font-mono text-cyan-300/80 mb-2 flex items-center justify-between">
              <span>Interactive Bubble Pad (Tap to Pop):</span>
              <span className="text-slate-400 text-[9px]">Acoustic WebAudio</span>
            </div>
            <div className="flex items-center justify-around py-1">
              {[1, 2, 3, 4].map((num) => {
                const isPresent = miniPadPops.includes(num);
                return (
                  <button
                    key={num}
                    onClick={() => isPresent && handleMiniPop(num)}
                    disabled={!isPresent}
                    className={`w-11 h-11 rounded-full transition-all duration-300 flex items-center justify-center relative ${
                      isPresent
                        ? 'bubble-glass-orb hover:scale-115 active:scale-90 cursor-pointer animate-bubble-wobble-1'
                        : 'scale-0 opacity-0 pointer-events-none'
                    }`}
                    title="Pop this bubble!"
                  >
                    <span className="text-xs select-none">🫧</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bubble Settings Controls */}
          <div className="mt-3 pt-3 border-t border-cyan-400/15 flex items-center justify-between text-xs">
            {/* Audio Toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[11px] font-mono transition-all ${
                soundEnabled
                  ? 'bg-cyan-500/20 text-cyan-200 border-cyan-400/40'
                  : 'bg-slate-800/60 text-slate-400 border-slate-700'
              }`}
              title="Toggle bubble popping audio effects"
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span>{soundEnabled ? 'Pop Audio ON' : 'Muted'}</span>
            </button>

            {/* Density Selector */}
            <div className="flex items-center gap-1 bg-slate-950/60 p-0.5 rounded-lg border border-slate-700/60">
              {(['gentle', 'normal', 'surge'] as const).map((d) => (
                <button
                  key={d}
                  onClick={() => setBubbleDensity(d)}
                  className={`px-2 py-0.5 text-[10px] font-mono rounded capitalize transition-all ${
                    bubbleDensity === d
                      ? 'bg-cyan-500/30 text-cyan-200 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>

            {/* Stream On/Off */}
            <button
              onClick={() => setBubblesEnabled(!bubblesEnabled)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all border ${
                bubblesEnabled
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40'
                  : 'bg-rose-500/20 text-rose-300 border-rose-400/40'
              }`}
            >
              {bubblesEnabled ? 'Bubbles ON' : 'Paused'}
            </button>
          </div>

        </div>
      )}

      {/* 2. DOCKED FLOATING BUBBLE TRIGGER (ORB) */}
      <button
        id="btn-interactive-bubble-orb"
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2 focus:outline-none"
        title="Interactive Ocean Bubbles • Click to pop & inspect"
        aria-label="Toggle Interactive Ocean Bubble HUD"
      >
        {/* Floating Bubble Badge Tag (Desktop) */}
        {!isOpen && (
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full ocean-glass border border-cyan-400/40 text-xs font-mono text-cyan-200 shadow-lg group-hover:border-cyan-300 transition-all mr-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-semibold">Interactive Bubble</span>
            {poppedCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-cyan-500/30 text-[10px] text-white">
                {poppedCount} 🫧
              </span>
            )}
          </div>
        )}

        {/* Spherical Glowing Water Bubble Orb */}
        <div className="relative w-13 h-13 sm:w-14 sm:h-14 rounded-full bubble-glass-orb flex items-center justify-center animate-bubble-orb shadow-2xl group-hover:scale-110 active:scale-95 transition-all">
          
          {/* Specular Glistening Arc */}
          <div className="absolute top-1.5 left-2 w-5 h-3 rounded-full bg-white/70 rotate-[-28deg] blur-[0.5px] pointer-events-none" />
          <div className="absolute top-4 left-1.5 w-1.5 h-1.5 rounded-full bg-white/80 pointer-events-none" />

          {/* Internal Swirling Wave level */}
          <div className="text-xl sm:text-2xl select-none group-hover:rotate-12 transition-transform">
            🫧
          </div>

          {/* Unread Popped Counter Badge */}
          {poppedCount > 0 && !isOpen && (
            <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 border border-white text-white text-[10px] font-mono font-black flex items-center justify-center shadow-lg">
              {poppedCount > 99 ? '99+' : poppedCount}
            </span>
          )}
        </div>
      </button>

    </div>
  );
};
