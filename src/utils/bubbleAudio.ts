/**
 * Web Audio API Acoustic Bubble Pop Synthesizer
 * Produces a very subtle, gentle, organic water pop / cavitation bloop.
 * Zero external audio assets required. Supports complete muting via settings.
 */

const STORAGE_KEY_MUTED = 'sagar_bubble_sound_muted';

let sharedAudioCtx: AudioContext | null = null;

/**
 * Check if the bubble pop sound is currently muted in settings
 */
export function isBubbleSoundMuted(): boolean {
  try {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(STORAGE_KEY_MUTED) === 'true';
  } catch {
    return false;
  }
}

/**
 * Set the bubble pop sound muted state and persist to localStorage
 */
export function setBubbleSoundMuted(muted: boolean): void {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY_MUTED, muted ? 'true' : 'false');
    }
  } catch {
    // Ignore
  }
}

function getAudioContext(): AudioContext | null {
  try {
    if (typeof window === 'undefined') return null;
    const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtxClass) return null;

    if (!sharedAudioCtx || sharedAudioCtx.state === 'closed') {
      sharedAudioCtx = new AudioCtxClass();
    }
    if (sharedAudioCtx.state === 'suspended') {
      sharedAudioCtx.resume().catch(() => {});
    }
    return sharedAudioCtx;
  } catch {
    return null;
  }
}

/**
 * Play a very subtle, soft underwater bubble pop sound
 * @param pitchScale - Adjusts tone: smaller bubbles have slightly higher pitch
 * @param forceOverride - If true, ignores mute check (useful for testing sound in settings)
 */
export function playBubblePop(pitchScale = 1.0, forceOverride = false): void {
  try {
    // Check if muted in settings
    if (!forceOverride && isBubbleSoundMuted()) {
      return;
    }

    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    // Warm, soft acoustic base frequency (480Hz to 620Hz)
    const baseFreq = (480 + Math.random() * 140) * Math.min(1.4, Math.max(0.8, pitchScale));

    osc.type = 'sine';
    
    // Very subtle, fast pitch envelope mimicking miniature cavitation
    osc.frequency.setValueAtTime(baseFreq * 0.85, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.45, now + 0.022);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.92, now + 0.055);

    // Warm bandpass filter to eliminate any sharp clicks or high-frequency harshness
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(baseFreq * 1.2, now);
    filter.Q.setValueAtTime(1.8, now);

    // SUBTLE GAIN ENVELOPE: Very low amplitude (~0.08 max gain) for a gentle, pleasing pop
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.085, now + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.065);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.07);
  } catch {
    // Graceful silent fallback
  }
}

/**
 * Play a delicate cascading burst pop sequence
 */
export function playBurstChime(): void {
  try {
    if (isBubbleSoundMuted()) return;
    const notes = [0.95, 1.15, 1.35];
    notes.forEach((pitch, i) => {
      setTimeout(() => {
        playBubblePop(pitch);
      }, i * 50);
    });
  } catch {
    // Ignore
  }
}
