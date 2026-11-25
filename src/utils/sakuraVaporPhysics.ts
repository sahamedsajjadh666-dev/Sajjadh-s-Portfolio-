import type { ThemeMode } from './portfolioLogic';

export type VaporPhase = 'idle' | 'sweeping' | 'emitting';

export interface RgbColor {
  r: number;
  g: number;
  b: number;
}

export interface GlyphAnchor {
  x: number;
  y: number;
  u: number;
  seed: number;
}

export interface VaporEmitter {
  anchors: GlyphAnchor[];
  capacity: number;
  active: Uint8Array;
  originY: Float32Array;
  maxRise: Float32Array;
  x: Float32Array;
  y: Float32Array;
  vx: Float32Array;
  vy: Float32Array;
  age: Float32Array;
  maxLife: Float32Array;
  size: Float32Array;
  peakAlpha: Float32Array;
  seed: Float32Array;
  colorIndex: Uint8Array;
  cursorIndex: number;
  waveActive: boolean;
  prevWaveProgress: number;
  waveProgress: number;
  nextAnchorHint: number;
  activeCount: number;
}

export const LIGHT_VAPOR_PALETTE: readonly string[] = ['#F472B6', '#FBCFE8'] as const;
export const DARK_VAPOR_PALETTE: readonly string[] = ['#FDA4AF', '#FDE68A'] as const;

export function getVaporPalette(theme: ThemeMode): readonly string[] {
  return theme === 'dark' ? DARK_VAPOR_PALETTE : LIGHT_VAPOR_PALETTE;
}

export function clamp01(value: number): number {
  if (value <= 0) return 0;
  if (value >= 1) return 1;
  return value;
}

/**
 * Deterministic hash in [0, 1) from integer index.
 */
export function deterministicSeed(index: number): number {
  const x = Math.sin(index * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

/**
 * Samples the continuous horizontal headline gradient at normalized position u in [0, 1].
 * Preserved for theme gradient verification tests.
 */
export function sampleThemeGradientColor(u: number, theme: ThemeMode): RgbColor {
  const t = clamp01(u);
  const lerp = (a: number, b: number, k: number) => a + (b - a) * k;

  if (theme === 'dark') {
    if (t <= 0.45) return { r: 248, g: 250, b: 252 }; // #F8FAFC
    if (t <= 0.62) {
      const k = (t - 0.45) / (0.62 - 0.45);
      return {
        r: Math.round(lerp(248, 226, k)),
        g: Math.round(lerp(250, 232, k)),
        b: Math.round(lerp(252, 240, k)),
      };
    }
    if (t <= 0.85) {
      const k = (t - 0.62) / (0.85 - 0.62);
      return {
        r: Math.round(lerp(226, 234, k)),
        g: Math.round(lerp(232, 179, k)),
        b: Math.round(lerp(240, 8, k)),
      };
    }
    return { r: 234, g: 179, b: 8 }; // #EAB308
  }

  if (t <= 0.54) return { r: 15, g: 23, b: 42 }; // #0F172A
  if (t <= 0.82) {
    const k = (t - 0.54) / (0.82 - 0.54);
    return {
      r: Math.round(lerp(15, 153, k)),
      g: Math.round(lerp(23, 27, k)),
      b: Math.round(lerp(42, 27, k)),
    };
  }
  const k = (t - 0.82) / (1 - 0.82);
  return {
    r: Math.round(lerp(153, 220, k)),
    g: Math.round(lerp(27, 38, k)),
    b: Math.round(lerp(27, 38, k)),
  };
}

/**
 * Allocates a fixed-capacity microscopic Sakura mist emitter over sampled glyph stroke anchors.
 */
export function createVaporEmitter(anchors: GlyphAnchor[], capacity = 1800): VaporEmitter {
  const sortedAnchors = [...anchors].sort((a, b) => a.u - b.u);

  return {
    anchors: sortedAnchors,
    capacity,
    active: new Uint8Array(capacity),
    originY: new Float32Array(capacity),
    maxRise: new Float32Array(capacity),
    x: new Float32Array(capacity),
    y: new Float32Array(capacity),
    vx: new Float32Array(capacity),
    vy: new Float32Array(capacity),
    age: new Float32Array(capacity),
    maxLife: new Float32Array(capacity),
    size: new Float32Array(capacity),
    peakAlpha: new Float32Array(capacity),
    seed: new Float32Array(capacity),
    colorIndex: new Uint8Array(capacity),
    cursorIndex: 0,
    waveActive: false,
    prevWaveProgress: -0.04,
    waveProgress: -0.04,
    nextAnchorHint: 0,
    activeCount: 0,
  };
}

function spawnMistGrainAtAnchor(
  emitter: VaporEmitter,
  anchor: GlyphAnchor,
  windVx: number,
  windVy: number,
): void {
  const cap = emitter.capacity;
  if (cap === 0) return;

  let slot = -1;
  for (let probe = 0; probe < cap; probe += 1) {
    const idx = (emitter.cursorIndex + probe) % cap;
    if (emitter.active[idx] === 0) {
      slot = idx;
      break;
    }
  }
  if (slot === -1) {
    slot = emitter.cursorIndex % cap;
  } else {
    emitter.activeCount += 1;
  }
  emitter.cursorIndex = (slot + 1) % cap;

  const s = deterministicSeed(
    slot * 17 + Math.round(anchor.x * 3 + anchor.y * 7) + emitter.activeCount,
  );
  const s2 = deterministicSeed(slot * 31 + Math.round(anchor.u * 1000));

  emitter.active[slot] = 1;
  emitter.originY[slot] = anchor.y;
  // Tight upward drift cap: 18px to 26px above glyph stroke
  emitter.maxRise[slot] = 18 + s * 8;
  emitter.x[slot] = anchor.x + (s - 0.5) * 3.4;
  emitter.y[slot] = anchor.y - s2 * 1.5;
  emitter.vx[slot] = (s - 0.5) * 24 + windVx;
  // Brisk initial upward lift so grains peel clearly off edges before fading
  emitter.vy[slot] = -(48 + s2 * 26) + windVy * 0.35;
  emitter.age[slot] = 0;
  // Rapid fade out: ~28 to 36 frames at 60fps (0.47s - 0.60s)
  emitter.maxLife[slot] = (28 + Math.round(s * 8)) / 60;
  // Microscopic mist grains: strictly within [0.8px, 1.4px]
  emitter.size[slot] = 0.95 + s2 * 0.45;
  // Low opacity mist: strictly within [0.18, 0.45] peak
  emitter.peakAlpha[slot] = 0.24 + s * 0.21;
  emitter.seed[slot] = s;
  // Favor primary sakura hue (#F472B6 / #FDA4AF) so fine mist stays legible on cream & dark
  emitter.colorIndex[slot] = s2 < 0.8 ? 0 : 1;
}

/**
 * Starts a left-to-right Sakura mist wave sweeping across the headline letters.
 */
export function triggerVaporWave(emitter: VaporEmitter): void {
  if (emitter.anchors.length === 0) return;
  emitter.waveActive = true;
  emitter.prevWaveProgress = -0.03;
  emitter.waveProgress = -0.03;
  emitter.nextAnchorHint = 0;
}

/**
 * Emits fine drifting mist directly from letter stroke anchors near the cursor.
 */
export function emitCursorTrail(
  emitter: VaporEmitter,
  cursorX: number,
  cursorY: number,
  pointerVx: number,
  pointerVy: number,
  radius = 36,
  maxEmitPerEvent = 24,
): number {
  const anchors = emitter.anchors;
  if (anchors.length === 0) return 0;

  const rSq = radius * radius;
  const clampedVx = Math.max(-180, Math.min(180, pointerVx)) * 0.14;
  const clampedVy = Math.max(-180, Math.min(180, pointerVy)) * 0.08 - 12;

  const candidates: GlyphAnchor[] = [];
  for (let i = 0; i < anchors.length; i += 1) {
    const a = anchors[i];
    const dx = a.x - cursorX;
    const dy = a.y - cursorY;
    if (dx * dx + dy * dy <= rSq) {
      candidates.push(a);
    }
  }

  if (candidates.length === 0) return 0;

  const emitTarget = Math.min(maxEmitPerEvent, candidates.length);
  const stride = Math.max(1, Math.floor(candidates.length / emitTarget));
  const offset = emitter.cursorIndex % stride;
  let spawned = 0;

  for (let i = offset; i < candidates.length && spawned < emitTarget; i += stride) {
    spawnMistGrainAtAnchor(emitter, candidates[i], clampedVx, clampedVy);
    spawned += 1;
  }

  return spawned;
}

/**
 * Advances active mist particles & left-to-right wave spawning by dtSeconds.
 */
export function stepVaporEmitter(
  emitter: VaporEmitter,
  dtSeconds: number,
  maxWaveEmitPerStep = 750,
): VaporPhase {
  const dt = Math.min(0.05, Math.max(0.001, dtSeconds));

  if (emitter.waveActive && emitter.anchors.length > 0) {
    emitter.prevWaveProgress = emitter.waveProgress;
    emitter.waveProgress += dt * 1.05;

    const anchors = emitter.anchors;
    const targetTotalWaveParticles = Math.min(720, Math.max(420, Math.round(anchors.length * 0.4)));
    const stride = Math.max(1, Math.floor(anchors.length / targetTotalWaveParticles));

    let emittedThisStep = 0;
    while (
      emitter.nextAnchorHint < anchors.length &&
      anchors[emitter.nextAnchorHint].u <= emitter.waveProgress &&
      emittedThisStep < maxWaveEmitPerStep
    ) {
      if (emitter.nextAnchorHint % stride === 0) {
        const anchor = anchors[emitter.nextAnchorHint];
        const driftVx = 10 + (anchor.seed - 0.5) * 18;
        spawnMistGrainAtAnchor(emitter, anchor, driftVx, -8);
        emittedThisStep += 1;
      }
      emitter.nextAnchorHint += 1;
    }

    if (emitter.waveProgress >= 1.06 && emitter.nextAnchorHint >= anchors.length) {
      emitter.waveActive = false;
    }
  }

  let live = 0;
  const drag = Math.exp(-1.2 * dt);

  for (let i = 0; i < emitter.capacity; i += 1) {
    if (emitter.active[i] === 0) continue;

    const nextAge = emitter.age[i] + dt;
    if (nextAge >= emitter.maxLife[i]) {
      emitter.active[i] = 0;
      continue;
    }

    emitter.age[i] = nextAge;
    live += 1;

    const s = emitter.seed[i];
    const curlAccelX = Math.sin(emitter.y[i] * 0.14 + nextAge * 7.5 + s * 6.283) * 28;

    emitter.vx[i] = (emitter.vx[i] + curlAccelX * dt) * drag;
    emitter.vy[i] = (emitter.vy[i] - 18 * dt) * drag;

    emitter.x[i] += emitter.vx[i] * dt;
    const nextY = emitter.y[i] + emitter.vy[i] * dt;
    const minY = emitter.originY[i] - emitter.maxRise[i];
    emitter.y[i] = nextY < minY ? minY : nextY;
  }

  emitter.activeCount = live;

  if (emitter.waveActive) {
    return 'sweeping';
  }
  if (live > 0) {
    return 'emitting';
  }
  return 'idle';
}

/**
 * Low-opacity vapor fade envelope bounded strictly within [0, peakAlpha] (<= 0.45).
 */
export function computeVaporAlpha(age: number, maxLife: number, peakAlpha: number): number {
  const t = clamp01(age / Math.max(0.01, maxLife));
  const fadeIn = Math.min(1, t / 0.14);
  const fadeOut = Math.pow(1 - t, 1.05);
  return clamp01(fadeIn * fadeOut * Math.min(0.45, Math.max(0.18, peakAlpha)));
}
