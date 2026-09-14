import React, { useState, useEffect, useRef, useCallback } from 'react';
import { playBubblePop, isBubbleSoundMuted } from '../utils/bubbleAudio';

export interface ActiveBubble {
  id: string;
  x: number; // percentage across screen 0-100
  y: number; // px from top of screen
  size: number; // px diameter (VERY VERY SMALL: 4px to 10px)
  speed: number; // px per frame float speed
  wobbleSpeed: number;
  wobbleAmp: number;
  phase: number;
  opacity: number;
}

export interface PopEffect {
  id: string;
  x: number;
  y: number;
  size: number;
}

interface InteractiveOceanBubblesProps {
  enabled?: boolean;
  soundEnabled?: boolean;
  density?: 'gentle' | 'normal' | 'surge';
  bubbleSizeMode?: 'micro' | 'tiny'; // default micro (4-8px)
  onBubblePopped?: (count: number) => void;
  burstSignal?: number; // changes whenever a burst is requested
}

export const InteractiveOceanBubbles: React.FC<InteractiveOceanBubblesProps> = ({
  enabled = true,
  soundEnabled = true,
  density = 'normal',
  bubbleSizeMode = 'micro',
  onBubblePopped,
  burstSignal = 0
}) => {
  const [bubbles, setBubbles] = useState<ActiveBubble[]>([]);
  const [popEffects, setPopEffects] = useState<PopEffect[]>([]);

  const requestRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());
  const nextSpawnRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Target count based on density (effervescent, clean, never crowded)
  const maxBubbles = density === 'gentle' ? 12 : density === 'surge' ? 32 : 18;

  // Helper to create a single random very small rising bubble
  const createBubble = useCallback((startX?: number, startY?: number, isBurst = false): ActiveBubble => {
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 800;

    // VERY, VERY, VERY SMALL BUBBLES:
    // micro: 4px to 8px
    // tiny: 6px to 10px
    const minSize = bubbleSizeMode === 'micro' ? 4 : 5;
    const maxSize = bubbleSizeMode === 'micro' ? 8 : 10;
    const size = isBurst
      ? Math.floor(Math.random() * 4 + minSize) // 4-8px
      : Math.floor(Math.random() * (maxSize - minSize + 1) + minSize); // 4-10px

    const x = startX !== undefined ? (startX / screenWidth) * 100 : Math.random() * 96 + 2;
    const y = startY !== undefined ? startY : screenHeight + Math.random() * 30 + 10;

    // Gentle upward float speed
    const speed = (Math.random() * 0.45 + 0.35) * (isBurst ? 1.2 : 1.0);
    const wobbleSpeed = Math.random() * 0.0025 + 0.0015;
    const wobbleAmp = Math.random() * 6 + 3; // very delicate subtle sway
    const phase = Math.random() * Math.PI * 2;
    const opacity = Math.random() * 0.3 + 0.35; // 0.35 to 0.65 soft translucency

    return {
      id: `b-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      x,
      y,
      size,
      speed,
      wobbleSpeed,
      wobbleAmp,
      phase,
      opacity
    };
  }, [bubbleSizeMode]);

  // Initial populate
  useEffect(() => {
    if (!enabled) {
      setBubbles([]);
      return;
    }

    const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
    const initial: ActiveBubble[] = [];
    // Start bubbles below the hero section (y >= 540) so no bubbles spawn in hero
    const heroSafeBottom = Math.min(540, screenHeight * 0.65);
    for (let i = 0; i < maxBubbles; i++) {
      const b = createBubble();
      b.y = Math.random() * (screenHeight - heroSafeBottom) + heroSafeBottom;
      initial.push(b);
    }
    setBubbles(initial);
  }, [enabled, maxBubbles, createBubble]);

  // Handle burst trigger
  useEffect(() => {
    if (!burstSignal || !enabled) return;
    const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;

    const burstBubbles: ActiveBubble[] = [];
    const burstCount = density === 'surge' ? 24 : 14;

    for (let i = 0; i < burstCount; i++) {
      const spawnX = Math.random() * (screenWidth * 0.9) + (screenWidth * 0.05);
      const spawnY = screenHeight - Math.random() * 80;
      burstBubbles.push(createBubble(spawnX, spawnY, true));
    }

    setBubbles((prev) => [...prev.slice(-28), ...burstBubbles]);
  }, [burstSignal, enabled, density, createBubble]);

  // Pop a bubble
  const handlePop = useCallback((bubble: ActiveBubble, e?: React.MouseEvent | React.TouchEvent) => {
    if (e) {
      e.stopPropagation();
    }

    // Play subtle acoustic water pop via Web Audio API (honors mute setting)
    if (soundEnabled && !isBubbleSoundMuted()) {
      // Pitch slightly higher for micro bubbles
      const pitch = Math.max(0.9, Math.min(1.5, 9 / bubble.size));
      playBubblePop(pitch);
    }

    // Visual micro pop effect
    const popId = `pop-${Date.now()}-${Math.random()}`;
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const pixelX = (bubble.x / 100) * screenWidth;

    const newEffect: PopEffect = {
      id: popId,
      x: pixelX,
      y: bubble.y,
      size: Math.max(12, bubble.size * 2)
    };

    setPopEffects((prev) => [...prev.slice(-10), newEffect]);

    setTimeout(() => {
      setPopEffects((prev) => prev.filter((p) => p.id !== popId));
    }, 380);

    if (onBubblePopped) {
      onBubblePopped(1);
    }

    setBubbles((prev) => prev.filter((b) => b.id !== bubble.id));
  }, [soundEnabled, onBubblePopped]);

  // Click on open backdrop to release tiny micro-bubbles
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enabled) return;
    const clickX = e.clientX;
    const clickY = e.clientY;

    const cluster: ActiveBubble[] = [];
    for (let i = 0; i < 3; i++) {
      const offsetX = clickX + (Math.random() * 16 - 8);
      const offsetY = clickY + (Math.random() * 14 - 7);
      cluster.push(createBubble(offsetX, offsetY, true));
    }

    if (soundEnabled && !isBubbleSoundMuted()) {
      playBubblePop(1.3);
    }

    setBubbles((prev) => [...prev.slice(-30), ...cluster]);
  };

  // Smooth animation loop
  useEffect(() => {
    if (!enabled) return;

    const updatePhysics = (time: number) => {
      const delta = Math.min(35, time - lastTimeRef.current);
      lastTimeRef.current = time;

      setBubbles((prev) => {
        const updated: ActiveBubble[] = [];
        let needsReplacement = 0;

        for (const b of prev) {
          const newY = b.y - b.speed * (delta / 16);

          // Hero protection: dissolve bubbles before entering the hero section when viewing the top of the page
          const isNearTop = typeof window !== 'undefined' && window.scrollY < 200;
          const topThreshold = isNearTop ? 520 : -b.size - 10;

          if (newY < topThreshold) {
            needsReplacement++;
          } else {
            updated.push({
              ...b,
              y: newY
            });
          }
        }

        const now = performance.now();
        if ((updated.length < maxBubbles || needsReplacement > 0) && now > nextSpawnRef.current) {
          updated.push(createBubble());
          nextSpawnRef.current = now + (Math.random() * 700 + 450);
        }

        return updated;
      });

      requestRef.current = requestAnimationFrame(updatePhysics);
    };

    requestRef.current = requestAnimationFrame(updatePhysics);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [enabled, maxBubbles, createBubble]);

  if (!enabled) return null;

  return (
    <div
      ref={containerRef}
      id="interactive-ocean-bubbles-layer"
      /* IMPORTANT: z-0 keeps it strictly behind all cards and interactive content */
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      onClick={handleBackdropClick}
      aria-label="Background interactive micro bubbles layer"
    >
      {/* 1. Active Rising Micro Bubbles */}
      {bubbles.map((b) => {
        const wobbleX = Math.sin((performance.now() * b.wobbleSpeed) + b.phase) * b.wobbleAmp;
        const isNearTop = typeof window !== 'undefined' && window.scrollY < 200;
        const effectiveOpacity = (isNearTop && b.y < 620)
          ? Math.max(0, b.opacity * ((b.y - 520) / 100))
          : b.opacity;

        if (effectiveOpacity <= 0.02) return null;

        return (
          <div
            key={b.id}
            /* 
              Hit area is 24px wide with pointer-events-auto so clicking is comfortable,
              while the visible bubble itself is very, very tiny (4-8px) in the center!
            */
            className="absolute pointer-events-auto cursor-pointer group flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `calc(${b.x}% + ${wobbleX}px)`,
              top: `${b.y}px`,
              width: '24px',
              height: '24px'
            }}
            onClick={(e) => handlePop(b, e)}
            title="Click to pop 🫧"
          >
            {/* The visible very very small bubble */}
            <div
              className="rounded-full relative transition-transform duration-150 group-hover:scale-135"
              style={{
                width: `${b.size}px`,
                height: `${b.size}px`,
                opacity: effectiveOpacity,
                background: 'radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.85) 0%, rgba(56, 189, 248, 0.6) 45%, rgba(6, 182, 212, 0.4) 80%, rgba(14, 116, 144, 0.7) 100%)',
                boxShadow: '0 0 6px rgba(56, 189, 248, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.8)',
                border: '0.75px solid rgba(255, 255, 255, 0.65)'
              }}
            >
              {/* Micro specular glint */}
              <div 
                className="absolute rounded-full bg-white/90"
                style={{
                  top: '1px',
                  left: '1.2px',
                  width: `${Math.max(1.2, b.size * 0.3)}px`,
                  height: `${Math.max(1.2, b.size * 0.3)}px`
                }}
              />
            </div>
          </div>
        );
      })}

      {/* 2. Micro Pop Dissipation Ring */}
      {popEffects.map((pop) => (
        <div
          key={pop.id}
          className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${pop.x}px`,
            top: `${pop.y}px`,
            width: `${pop.size}px`,
            height: `${pop.size}px`
          }}
        >
          {/* Subtle micro expanding ring */}
          <div className="w-full h-full rounded-full border border-cyan-300/70 animate-ping opacity-60" />
        </div>
      ))}
    </div>
  );
};
