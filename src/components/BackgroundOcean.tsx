import React, { useEffect, useRef } from 'react';

interface BackgroundOceanProps {
  marineLifeEnabled?: boolean;
}

export const BackgroundOcean: React.FC<BackgroundOceanProps> = ({ marineLifeEnabled = true }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // 1. AIS Vessels (Moving maritime vessels with tiny telemetry tails)
    const vesselCount = Math.min(14, Math.max(8, Math.floor(width / 130)));
    const vessels: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      mmsi: string;
      heading: number;
      type: 'Trawler' | 'Patrol' | 'Cargo';
      pulse: number;
    }> = [];

    for (let i = 0; i < vesselCount; i++) {
      const angle = (Math.random() * 0.8 - 0.4) * Math.PI;
      const speed = Math.random() * 0.25 + 0.15;
      vessels.push({
        x: Math.random() * width,
        y: Math.random() * height * 0.85 + height * 0.1,
        vx: Math.cos(angle) * speed * (Math.random() > 0.5 ? 1 : -1),
        vy: Math.sin(angle) * speed * 0.5,
        mmsi: `AIS-${4190000 + Math.floor(Math.random() * 9000)}`,
        heading: angle,
        type: i % 3 === 0 ? 'Patrol' : i % 3 === 1 ? 'Trawler' : 'Cargo',
        pulse: Math.random() * Math.PI * 2
      });
    }

    // 2. Satellite Orbit Arcs (Oceansat-3 & INSAT-3DR ground tracks)
    const satellites = [
      { name: 'OCEANSAT-3', speed: 0.0003, progress: 0.15, arcRadius: 900, tilt: 0.4 },
      { name: 'INSAT-3DR', speed: 0.00018, progress: 0.65, arcRadius: 1100, tilt: -0.25 }
    ];

    // 3. Floating Bioluminescent Plankton & Hydrodynamic Micro-Particles
    const particleCount = Math.min(45, Math.floor((width * height) / 30000));
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      maxAlpha: number;
      pulseRate: number;
    }> = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.15 + 0.05,
        vy: (Math.random() - 0.5) * 0.12,
        size: Math.random() * 1.6 + 0.6,
        alpha: Math.random() * 0.3 + 0.1,
        maxAlpha: Math.random() * 0.4 + 0.15,
        pulseRate: Math.random() * 0.02 + 0.008
      });
    }

    // 4. SIGNATURE VISUAL: Ocean Intelligence Radar Wave Pulse
    // Originates from coastal center (e.g. Mangaluru 12.91°N, 74.85°E)
    let radarPulseRadius = 0;
    const radarCenter = { x: width * 0.42, y: height * 0.48 };

    let time = 0;

    const render = () => {
      time += 0.01;
      ctx.clearRect(0, 0, width, height);

      // --- LAYER 1: Subtle Geographic Latitude/Longitude Coordinate Grid & Crosshairs ---
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.04)';
      ctx.lineWidth = 1;
      const gridStep = Math.max(140, Math.floor(width / 8));

      for (let x = gridStep; x < width; x += gridStep) {
        ctx.beginPath();
        ctx.setLineDash([3, 15]);
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();

        // Apple style digital micro crosshairs at intersections
        for (let y = gridStep; y < height; y += gridStep) {
          ctx.setLineDash([]);
          ctx.strokeStyle = 'rgba(6, 182, 212, 0.12)';
          ctx.beginPath();
          ctx.moveTo(x - 3, y);
          ctx.lineTo(x + 3, y);
          ctx.moveTo(x, y - 3);
          ctx.lineTo(x, y + 3);
          ctx.stroke();
          ctx.setLineDash([3, 15]);
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.04)';
        }
      }

      for (let y = gridStep; y < height; y += gridStep) {
        ctx.beginPath();
        ctx.setLineDash([3, 15]);
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.setLineDash([]); // Reset line dash

      // --- LAYER 2: Bathymetric Ocean Depth Contours (Iso-depth curves) ---
      ctx.lineWidth = 1.0;
      for (let c = 0; c < 3; c++) {
        const baseY = height * (0.28 + c * 0.22);
        ctx.beginPath();
        for (let x = 0; x <= width; x += 40) {
          const wave1 = Math.sin(x * 0.002 + time * 0.4 + c * 1.5) * (28 + c * 8);
          const wave2 = Math.cos(x * 0.004 - time * 0.25) * 12;
          const y = baseY + wave1 + wave2;

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(34, 211, 238, ${0.038 - c * 0.008})`;
        ctx.stroke();
      }

      // --- LAYER 3: Animated Ocean Current Streamlines ---
      for (let s = 0; s < 2; s++) {
        const streamY = height * (0.55 + s * 0.25);
        ctx.beginPath();
        for (let x = 0; x <= width; x += 50) {
          const currentOffset = Math.sin(x * 0.0035 + time * 0.8 + s) * 20;
          const y = streamY + currentOffset;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(14, 165, 233, ${0.03 + s * 0.015})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // --- LAYER 4: Satellite Tracking Orbital Arcs ---
      for (const sat of satellites) {
        sat.progress = (sat.progress + sat.speed) % 1;
        const satX = width * sat.progress;
        const satY = height * 0.22 + Math.sin(sat.progress * Math.PI) * (sat.arcRadius * 0.12) + sat.tilt * 50;

        // Orbit Trail
        ctx.beginPath();
        ctx.moveTo(0, height * 0.22 + sat.tilt * 50);
        ctx.quadraticCurveTo(
          width * 0.5, 
          height * 0.22 + (sat.arcRadius * 0.12) + sat.tilt * 50, 
          width, 
          height * 0.22 + sat.tilt * 50
        );
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.05)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Satellite Transponder Node
        ctx.beginPath();
        ctx.arc(satX, satY, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(165, 243, 252, 0.65)';
        ctx.fill();

        // Tiny Satellite Beam Field
        ctx.beginPath();
        ctx.arc(satX, satY, 8 + Math.sin(time * 4) * 2, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(34, 211, 238, 0.2)';
        ctx.stroke();

        // Tiny Orbit Label
        ctx.font = '9px monospace';
        ctx.fillStyle = 'rgba(147, 197, 253, 0.35)';
        ctx.fillText(sat.name, satX + 10, satY + 3);
      }

      // --- LAYER 5: SIGNATURE VISUAL - Ocean Intelligence Radar Wave Pulse ---
      radarPulseRadius += 0.85;
      const maxRadarRadius = Math.max(width, height) * 0.65;
      if (radarPulseRadius > maxRadarRadius) {
        radarPulseRadius = 0;
      }

      const pulseProgress = radarPulseRadius / maxRadarRadius;
      const pulseAlpha = Math.max(0, (1 - pulseProgress) * 0.18);

      if (pulseAlpha > 0.005) {
        ctx.beginPath();
        ctx.arc(radarCenter.x, radarCenter.y, radarPulseRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(34, 211, 238, ${pulseAlpha})`;
        ctx.lineWidth = 1.8;
        ctx.stroke();

        // Second trailing faint pulse ring
        if (radarPulseRadius > 60) {
          ctx.beginPath();
          ctx.arc(radarCenter.x, radarCenter.y, radarPulseRadius - 45, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(14, 165, 233, ${pulseAlpha * 0.5})`;
          ctx.lineWidth = 1.0;
          ctx.stroke();
        }
      }

      // Coastal Origin Beacon Indicator
      ctx.beginPath();
      ctx.arc(radarCenter.x, radarCenter.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(56, 189, 248, 0.7)';
      ctx.fill();

      // --- LAYER 6: Moving AIS Maritime Vessels ---
      for (const v of vessels) {
        v.x += v.vx;
        v.y += v.vy;

        // Wrap around smoothly
        if (v.x < -30) v.x = width + 30;
        if (v.x > width + 30) v.x = -30;
        if (v.y < -30) v.y = height + 30;
        if (v.y > height + 30) v.y = -30;

        v.pulse += 0.03;
        const vesselGlow = Math.sin(v.pulse) * 0.15 + 0.35;

        // Calculate proximity to radar pulse for momentary illumination
        const distFromRadar = Math.hypot(v.x - radarCenter.x, v.y - radarCenter.y);
        const isIlluminated = Math.abs(distFromRadar - radarPulseRadius) < 35;
        const extraGlow = isIlluminated ? 0.4 : 0;

        // Vessel Vector Tail (Course over ground)
        ctx.beginPath();
        ctx.moveTo(v.x, v.y);
        ctx.lineTo(v.x - v.vx * 24, v.y - v.vy * 24);
        ctx.strokeStyle = `rgba(56, 189, 248, ${0.12 + extraGlow})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Vessel Marker Dot
        ctx.beginPath();
        ctx.arc(v.x, v.y, isIlluminated ? 3.0 : 1.8, 0, Math.PI * 2);
        ctx.fillStyle = v.type === 'Patrol' 
          ? `rgba(52, 211, 153, ${vesselGlow + extraGlow})` 
          : `rgba(56, 189, 248, ${vesselGlow + extraGlow})`;
        ctx.fill();

        // Faint Callout when illuminated
        if (isIlluminated) {
          ctx.font = '8px monospace';
          ctx.fillStyle = 'rgba(165, 243, 252, 0.6)';
          ctx.fillText(`${v.mmsi} [${v.type}]`, v.x + 6, v.y - 4);
        }
      }

      // --- LAYER 7: Floating Atmospheric Particles & Micro-Plankton ---
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        p.alpha += Math.sin(time * 30 * p.pulseRate) * 0.005;
        if (p.alpha < 0.06) p.alpha = 0.06;
        if (p.alpha > p.maxAlpha) p.alpha = p.maxAlpha;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${p.alpha})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [marineLifeEnabled]);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-[#020b16]">
      {/* 1. Deep Underwater Ocean with Marine Life, Sun Rays & Gentle Blur */}
      <img
        src="/src/assets/images/underwater_deep_ocean_1788933284048.jpg"
        alt="Deep Underwater Ocean with Sun Rays, Marine Life and Coral Seabed"
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-65 scale-105 filter blur-[3px] brightness-90 contrast-105 transition-transform duration-1000 ease-out"
      />

      {/* 2. Oceanic Atmospheric Vignette & Contrast Control */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#020b16] via-[#020b16]/30 to-[#020b16]/75 opacity-85" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#020b16]/80 via-transparent to-[#020b16]/90" />
      
      {/* 3. Volumetric Sunlight Rays & Azure Caustics */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(6,182,212,0.22),transparent_65%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_35%,rgba(14,165,233,0.12),transparent_55%)]" />

      {/* 4. Apple Keynote Style Volumetric Twilight Light Beams */}
      <div className="absolute -top-32 left-1/3 w-[550px] h-[130vh] bg-gradient-to-b from-cyan-400/14 via-sky-500/5 to-transparent blur-3xl transform -rotate-12 animate-light-ray-1" />
      <div className="absolute -top-40 right-1/4 w-[480px] h-[120vh] bg-gradient-to-b from-sky-400/12 via-cyan-500/4 to-transparent blur-3xl transform -rotate-6 animate-light-ray-2" />

      {/* 5. Interactive Ocean Digital Twin Canvas (Radar, Ships, Satellites, Current) */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-90" />
    </div>
  );
};


