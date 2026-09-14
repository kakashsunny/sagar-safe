import React, { useState } from 'react';
import { Sparkles, Fish, Compass, Waves, Info, Radio, Activity } from 'lucide-react';

interface MarineCreatureDetail {
  species: string;
  vernacular: string;
  ecologicalRole: string;
  depthRange: string;
  telemetrySignificance: string;
}

export const InteractiveMarineLife: React.FC = () => {
  const [hoveredCreature, setHoveredCreature] = useState<{
    detail: MarineCreatureDetail;
    x: number;
    y: number;
  } | null>(null);

  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [ecoPulseActive, setEcoPulseActive] = useState<boolean>(false);

  // Trigger gentle interactive eco-sonar ripple on click
  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only if clicking the backdrop directly or a creature
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple = { id: Date.now(), x, y };
    setRipples((prev) => [...prev.slice(-4), newRipple]);
    setEcoPulseActive(true);
    setTimeout(() => setEcoPulseActive(false), 2000);
  };

  const handleCreatureHover = (
    e: React.MouseEvent,
    detail: MarineCreatureDetail
  ) => {
    setHoveredCreature({
      detail,
      x: e.clientX,
      y: e.clientY
    });
  };

  const handleCreatureLeave = () => {
    setHoveredCreature(null);
  };

  return (
    <div 
      id="interactive-marine-life-layer"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      onClick={handleContainerClick}
    >
      {/* Dynamic Eco-Sonar Acoustic Ripples on interaction */}
      {ripples.map((rip) => (
        <div
          key={rip.id}
          className="absolute rounded-full border border-cyan-400/40 pointer-events-none -translate-x-1/2 -translate-y-1/2 animate-ping"
          style={{
            left: rip.x,
            top: rip.y,
            width: '120px',
            height: '120px',
            animationDuration: '1.6s'
          }}
        />
      ))}

      {/* ========================================================
          1. GIANT MANTA RAY (Manta birostris) - Primary Glide
          ======================================================== */}
      <div 
        className="absolute animate-marine-manta marine-creature-interactive"
        onMouseEnter={(e) => handleCreatureHover(e, {
          species: 'Manta birostris',
          vernacular: 'Giant Oceanic Manta Ray',
          ecologicalRole: 'Pelagic Plankton Filter Feeder',
          depthRange: '15m – 65m (Epipelagic)',
          telemetrySignificance: 'Associated with Oceansat-3 Chlorophyll-a frontal boundaries.'
        })}
        onMouseLeave={handleCreatureLeave}
        style={{ top: '0px', left: '0px' }}
      >
        <svg
          width="130"
          height="110"
          viewBox="0 0 130 110"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="animate-bio-glow"
        >
          {/* Manta Wings & Body */}
          <path
            d="M65 8 C58 20, 24 35, 2 52 C-1 54, 2 58, 14 56 C28 54, 46 50, 58 62 C62 66, 62 78, 64 92 C64.5 95, 65.5 95, 66 92 C68 78, 68 66, 72 62 C84 50, 102 54, 116 56 C128 58, 131 54, 128 52 C106 35, 72 20, 65 8 Z"
            fill="url(#mantaGradient)"
            className="transition-all duration-300"
          />
          {/* Cephalic Horns */}
          <path d="M60 8 C58 3, 56 0, 54 1 C52 2, 55 6, 58 10 Z" fill="#38bdf8" fillOpacity="0.4" />
          <path d="M70 8 C72 3, 74 0, 76 1 C78 2, 75 6, 72 10 Z" fill="#38bdf8" fillOpacity="0.4" />
          {/* Long Thin Whip Tail */}
          <path d="M65 92 Q66 102, 65 110" stroke="#38bdf8" strokeWidth="1.2" strokeOpacity="0.5" strokeLinecap="round" />
          
          {/* Bioluminescent Spine Dots */}
          <circle cx="65" cy="28" r="1.5" fill="#a5f3fc" fillOpacity="0.8" />
          <circle cx="65" cy="40" r="1.5" fill="#a5f3fc" fillOpacity="0.7" />
          <circle cx="65" cy="52" r="1.2" fill="#a5f3fc" fillOpacity="0.6" />
          <circle cx="65" cy="64" r="1.0" fill="#a5f3fc" fillOpacity="0.5" />

          <defs>
            <linearGradient id="mantaGradient" x1="65" y1="0" x2="65" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#38bdf8" stopOpacity="0.32" />
              <stop offset="0.6" stopColor="#0284c7" stopOpacity="0.22" />
              <stop offset="1" stopColor="#082f49" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* ========================================================
          2. SECONDARY REVERSE MANTA RAY (Deeper Horizon)
          ======================================================== */}
      <div 
        className="absolute animate-marine-manta-rev marine-creature-interactive"
        onMouseEnter={(e) => handleCreatureHover(e, {
          species: 'Mobula mobular',
          vernacular: 'Spinetail Devil Ray',
          ecologicalRole: 'Deep Bathypelagic Forager',
          depthRange: '40m – 120m (Mesopelagic)',
          telemetrySignificance: 'Detects thermal thermocline inversion layers.'
        })}
        onMouseLeave={handleCreatureLeave}
        style={{ top: '0px', left: '0px' }}
      >
        <svg
          width="95"
          height="80"
          viewBox="0 0 130 110"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="opacity-75"
        >
          <path
            d="M65 8 C58 20, 24 35, 2 52 C-1 54, 2 58, 14 56 C28 54, 46 50, 58 62 C62 66, 62 78, 64 92 C64.5 95, 65.5 95, 66 92 C68 78, 68 66, 72 62 C84 50, 102 54, 116 56 C128 58, 131 54, 128 52 C106 35, 72 20, 65 8 Z"
            fill="url(#mantaGradientRev)"
          />
          <path d="M65 92 Q66 102, 65 110" stroke="#06b6d4" strokeWidth="1" strokeOpacity="0.4" />
          <defs>
            <linearGradient id="mantaGradientRev" x1="65" y1="0" x2="65" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#06b6d4" stopOpacity="0.25" />
              <stop offset="1" stopColor="#0369a1" stopOpacity="0.08" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* ========================================================
          3. PELAGIC MACKEREL SCHOOL (Indian Mackerel / Kingfish)
          ======================================================== */}
      <div 
        className="absolute animate-marine-school marine-creature-interactive"
        onMouseEnter={(e) => handleCreatureHover(e, {
          species: 'Rastrelliger kanagurta',
          vernacular: 'Indian Mackerel (Bangda)',
          ecologicalRole: 'Key Pelagic Commercial Fish Stock',
          depthRange: '5m – 45m',
          telemetrySignificance: 'Primary target species for INCOIS Potential Fishing Zones.'
        })}
        onMouseLeave={handleCreatureLeave}
        style={{ top: '0px', left: '0px' }}
      >
        <div className="relative w-48 h-28 flex items-center">
          {/* Fish 1 - Lead */}
          <div className="absolute left-28 top-6 animate-tail-wag">
            <svg width="34" height="14" viewBox="0 0 34 14" fill="none">
              <path d="M30 7 C26 2, 14 1, 6 5 L0 1 L2 7 L0 13 L6 9 C14 13, 26 12, 30 7 Z" fill="#22d3ee" fillOpacity="0.38" />
              <circle cx="27" cy="6" r="0.8" fill="#e0f2fe" />
            </svg>
          </div>

          {/* Fish 2 - Upper Flank */}
          <div className="absolute left-16 top-0 animate-tail-wag" style={{ animationDelay: '-0.2s' }}>
            <svg width="28" height="12" viewBox="0 0 34 14" fill="none">
              <path d="M30 7 C26 2, 14 1, 6 5 L0 1 L2 7 L0 13 L6 9 C14 13, 26 12, 30 7 Z" fill="#38bdf8" fillOpacity="0.3" />
            </svg>
          </div>

          {/* Fish 3 - Center */}
          <div className="absolute left-12 top-10 animate-tail-wag" style={{ animationDelay: '-0.45s' }}>
            <svg width="32" height="13" viewBox="0 0 34 14" fill="none">
              <path d="M30 7 C26 2, 14 1, 6 5 L0 1 L2 7 L0 13 L6 9 C14 13, 26 12, 30 7 Z" fill="#22d3ee" fillOpacity="0.35" />
              <circle cx="27" cy="6" r="0.8" fill="#e0f2fe" />
            </svg>
          </div>

          {/* Fish 4 - Lower Flank */}
          <div className="absolute left-20 top-18 animate-tail-wag" style={{ animationDelay: '-0.15s' }}>
            <svg width="26" height="11" viewBox="0 0 34 14" fill="none">
              <path d="M30 7 C26 2, 14 1, 6 5 L0 1 L2 7 L0 13 L6 9 C14 13, 26 12, 30 7 Z" fill="#0284c7" fillOpacity="0.3" />
            </svg>
          </div>

          {/* Fish 5 - Rear Guard */}
          <div className="absolute left-0 top-8 animate-tail-wag" style={{ animationDelay: '-0.6s' }}>
            <svg width="30" height="12" viewBox="0 0 34 14" fill="none">
              <path d="M30 7 C26 2, 14 1, 6 5 L0 1 L2 7 L0 13 L6 9 C14 13, 26 12, 30 7 Z" fill="#38bdf8" fillOpacity="0.25" />
            </svg>
          </div>
        </div>
      </div>

      {/* ========================================================
          4. FAST TUNA / BONITO SCHOOL (Deeper Counter-Current)
          ======================================================== */}
      <div 
        className="absolute animate-marine-school-fast marine-creature-interactive"
        onMouseEnter={(e) => handleCreatureHover(e, {
          species: 'Katsuwonus pelamis',
          vernacular: 'Skipjack Tuna (Choora)',
          ecologicalRole: 'High-Speed Pelagic Predator',
          depthRange: '20m – 100m',
          telemetrySignificance: 'Tracks high-salinity oceanic fronts & upwelling nodes.'
        })}
        onMouseLeave={handleCreatureLeave}
        style={{ top: '0px', left: '0px' }}
      >
        <div className="relative w-40 h-24">
          <div className="absolute left-20 top-4 animate-tail-wag" style={{ animationDuration: '0.45s' }}>
            <svg width="38" height="15" viewBox="0 0 38 15" fill="none">
              <path d="M36 7.5 C30 1.5, 16 1, 8 5 L0 1 L3 7.5 L0 14 L8 10 C16 14, 30 13.5, 36 7.5 Z" fill="#38bdf8" fillOpacity="0.28" />
            </svg>
          </div>
          <div className="absolute left-6 top-0 animate-tail-wag" style={{ animationDuration: '0.45s', animationDelay: '-0.1s' }}>
            <svg width="34" height="13" viewBox="0 0 38 15" fill="none">
              <path d="M36 7.5 C30 1.5, 16 1, 8 5 L0 1 L3 7.5 L0 14 L8 10 C16 14, 30 13.5, 36 7.5 Z" fill="#0ea5e9" fillOpacity="0.22" />
            </svg>
          </div>
          <div className="absolute left-0 top-12 animate-tail-wag" style={{ animationDuration: '0.45s', animationDelay: '-0.25s' }}>
            <svg width="32" height="12" viewBox="0 0 38 15" fill="none">
              <path d="M36 7.5 C30 1.5, 16 1, 8 5 L0 1 L3 7.5 L0 14 L8 10 C16 14, 30 13.5, 36 7.5 Z" fill="#0284c7" fillOpacity="0.2" />
            </svg>
          </div>
        </div>
      </div>

      {/* ========================================================
          5. BIOLUMINESCENT JELLYFISH (Aurelia aurita - Moon Jelly)
          ======================================================== */}
      <div 
        className="absolute animate-marine-jellyfish marine-creature-interactive"
        onMouseEnter={(e) => handleCreatureHover(e, {
          species: 'Aurelia aurita',
          vernacular: 'Moon Jellyfish (Bioluminescent)',
          ecologicalRole: 'Macro-Zooplankton Drifter',
          depthRange: '0m – 50m (Surface Drift)',
          telemetrySignificance: 'Bio-indicator for coastal current velocity & water temperature.'
        })}
        onMouseLeave={handleCreatureLeave}
        style={{ top: '0px', left: '0px' }}
      >
        <div className="animate-jelly-pump animate-bio-glow flex flex-col items-center">
          <svg width="55" height="75" viewBox="0 0 55 75" fill="none">
            {/* Bell Umbrella */}
            <path
              d="M27.5 5 C12 5, 4 18, 5 32 C12 36, 18 33, 27.5 35 C37 33, 43 36, 50 32 C51 18, 43 5, 27.5 5 Z"
              fill="url(#jellyGradient)"
              stroke="#67e8f9"
              strokeWidth="0.75"
              strokeOpacity="0.6"
            />
            {/* Internal Gonad Horseshoe Rings */}
            <circle cx="21" cy="20" r="3" stroke="#a5f3fc" strokeWidth="1" strokeOpacity="0.7" fill="none" />
            <circle cx="34" cy="20" r="3" stroke="#a5f3fc" strokeWidth="1" strokeOpacity="0.7" fill="none" />
            
            {/* Trailing Oral Arms & Tentacles */}
            <path d="M15 34 Q10 48, 16 68" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.45" strokeDasharray="2 3" />
            <path d="M22 35 Q20 52, 24 72" stroke="#67e8f9" strokeWidth="1.2" strokeOpacity="0.6" />
            <path d="M27.5 36 Q28 55, 27 75" stroke="#a5f3fc" strokeWidth="1.5" strokeOpacity="0.7" />
            <path d="M33 35 Q35 52, 31 72" stroke="#67e8f9" strokeWidth="1.2" strokeOpacity="0.6" />
            <path d="M40 34 Q45 48, 39 68" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.45" strokeDasharray="2 3" />

            <defs>
              <linearGradient id="jellyGradient" x1="27.5" y1="5" x2="27.5" y2="35" gradientUnits="userSpaceOnUse">
                <stop stopColor="#67e8f9" stopOpacity="0.38" />
                <stop offset="0.6" stopColor="#06b6d4" stopOpacity="0.2" />
                <stop offset="1" stopColor="#083344" stopOpacity="0.05" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* ========================================================
          6. SECONDARY DEEP JELLYFISH (Right Flank)
          ======================================================== */}
      <div 
        className="absolute animate-marine-jellyfish-2 marine-creature-interactive"
        onMouseEnter={(e) => handleCreatureHover(e, {
          species: 'Pelagia noctiluca',
          vernacular: 'Mauve Stinger (Noctilucent)',
          ecologicalRole: 'Deep Sea Bioluminescent Cnidarian',
          depthRange: '30m – 150m',
          telemetrySignificance: 'Emits luciferin flash in response to hydrodynamic swell turbulence.'
        })}
        onMouseLeave={handleCreatureLeave}
        style={{ top: '0px', left: '0px' }}
      >
        <div className="animate-jelly-pump flex flex-col items-center">
          <svg width="44" height="60" viewBox="0 0 55 75" fill="none">
            <path
              d="M27.5 5 C12 5, 4 18, 5 32 C12 36, 18 33, 27.5 35 C37 33, 43 36, 50 32 C51 18, 43 5, 27.5 5 Z"
              fill="url(#jellyGradient2)"
              stroke="#38bdf8"
              strokeWidth="0.6"
              strokeOpacity="0.5"
            />
            <path d="M22 35 Q18 50, 23 68" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.5" />
            <path d="M27.5 36 Q29 52, 27.5 70" stroke="#38bdf8" strokeWidth="1.2" strokeOpacity="0.6" />
            <path d="M33 35 Q37 50, 32 68" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.5" />
            <defs>
              <linearGradient id="jellyGradient2" x1="27.5" y1="5" x2="27.5" y2="35" gradientUnits="userSpaceOnUse">
                <stop stopColor="#38bdf8" stopOpacity="0.25" />
                <stop offset="1" stopColor="#0c4a6e" stopOpacity="0.05" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* ========================================================
          7. OLIVE RIDLEY SEA TURTLE (Lepidochelys olivacea)
          ======================================================== */}
      <div 
        className="absolute animate-marine-turtle marine-creature-interactive"
        onMouseEnter={(e) => handleCreatureHover(e, {
          species: 'Lepidochelys olivacea',
          vernacular: 'Olive Ridley Sea Turtle',
          ecologicalRole: 'Protected Coastal Migratory Reptile',
          depthRange: '5m – 40m',
          telemetrySignificance: 'Protected under Indian Wildlife Act; nesting corridors monitored along Odisha & Karnataka.'
        })}
        onMouseLeave={handleCreatureLeave}
        style={{ top: '0px', left: '0px' }}
      >
        <svg width="75" height="70" viewBox="0 0 75 70" fill="none" className="animate-bio-glow">
          {/* Carapace Shell */}
          <ellipse cx="37.5" cy="38" rx="18" ry="22" fill="url(#turtleShellGradient)" stroke="#38bdf8" strokeWidth="0.8" strokeOpacity="0.4" />
          
          {/* Shell Scute Pattern */}
          <path d="M37.5 20 L37.5 56" stroke="#0ea5e9" strokeWidth="0.8" strokeOpacity="0.4" />
          <path d="M26 32 L49 32" stroke="#0ea5e9" strokeWidth="0.8" strokeOpacity="0.3" />
          <path d="M24 44 L51 44" stroke="#0ea5e9" strokeWidth="0.8" strokeOpacity="0.3" />

          {/* Front Left Flipper */}
          <path d="M22 28 C10 18, 2 12, 0 16 C-2 20, 8 32, 20 34 Z" fill="#0284c7" fillOpacity="0.35" />
          {/* Front Right Flipper */}
          <path d="M53 28 C65 18, 73 12, 75 16 C77 20, 67 32, 55 34 Z" fill="#0284c7" fillOpacity="0.35" />
          
          {/* Rear Flippers */}
          <path d="M26 54 C18 60, 16 66, 20 68 C24 70, 28 62, 30 58 Z" fill="#0369a1" fillOpacity="0.3" />
          <path d="M49 54 C57 60, 59 66, 55 68 C51 70, 47 62, 45 58 Z" fill="#0369a1" fillOpacity="0.3" />

          {/* Head */}
          <ellipse cx="37.5" cy="12" rx="5.5" ry="7" fill="#38bdf8" fillOpacity="0.4" />
          <circle cx="35" cy="10" r="0.8" fill="#e0f2fe" />
          <circle cx="40" cy="10" r="0.8" fill="#e0f2fe" />

          <defs>
            <linearGradient id="turtleShellGradient" x1="37.5" y1="16" x2="37.5" y2="60" gradientUnits="userSpaceOnUse">
              <stop stopColor="#38bdf8" stopOpacity="0.32" />
              <stop offset="0.7" stopColor="#0369a1" stopOpacity="0.2" />
              <stop offset="1" stopColor="#082f49" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* ========================================================
          HOVER TELEMETRY HUD TOOLTIP (Interactive Floating Pill)
          ======================================================== */}
      {hoveredCreature && (
        <div 
          className="fixed pointer-events-none z-50 floating-glass-card rounded-2xl p-3.5 border border-cyan-400/40 shadow-2xl backdrop-blur-xl max-w-xs transition-transform animate-in fade-in zoom-in-95 duration-150"
          style={{
            left: Math.min(window.innerWidth - 300, Math.max(16, hoveredCreature.x + 20)),
            top: Math.min(window.innerHeight - 180, Math.max(16, hoveredCreature.y - 40)),
          }}
        >
          <div className="flex items-center gap-1.5 mb-1 text-[10px] font-mono font-bold text-cyan-300">
            <Fish className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>MARINE ECO-TELEMETRY</span>
          </div>

          <h4 className="font-display font-bold text-sm text-white italic">
            {hoveredCreature.detail.species}
          </h4>
          <p className="text-xs font-semibold text-cyan-200 mb-2">
            {hoveredCreature.detail.vernacular}
          </p>

          <div className="space-y-1 text-[11px] text-slate-300 font-mono border-t border-white/10 pt-2">
            <div className="flex items-center justify-between gap-2">
              <span className="text-slate-400">Depth Zone:</span>
              <span className="text-cyan-300 font-bold">{hoveredCreature.detail.depthRange}</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-slate-400">Niche:</span>
              <span className="text-slate-200">{hoveredCreature.detail.ecologicalRole}</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1 leading-tight italic">
              ⚡ {hoveredCreature.detail.telemetrySignificance}
            </p>
          </div>
        </div>
      )}

    </div>
  );
};
