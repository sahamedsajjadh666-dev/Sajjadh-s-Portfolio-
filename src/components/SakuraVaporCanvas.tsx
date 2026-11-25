import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { useReducedMotion } from 'motion/react';
import type { ThemeMode } from '../utils/portfolioLogic';
import {
  clamp01,
  computeVaporAlpha,
  createVaporEmitter,
  deterministicSeed,
  emitCursorTrail,
  getVaporPalette,
  stepVaporEmitter,
  triggerVaporWave,
  type GlyphAnchor,
  type VaporEmitter,
  type VaporPhase,
} from '../utils/sakuraVaporPhysics';

const PAD_X = 36;
const PAD_TOP = 38;
const PAD_BOTTOM = 16;
const SAMPLE_STEP = 2.0;
const INITIAL_SWEEP_DELAY_MS = 300;

interface SakuraVaporCanvasProps {
  text: string;
  theme: ThemeMode;
  className?: string;
}

interface CharMeasure {
  char: string;
  left: number;
  top: number;
  width: number;
  height: number;
}

interface LineSpan {
  minY: number;
  maxY: number;
  minX: number;
  maxX: number;
  uStart: number;
  uEnd: number;
}

/**
 * Samples glyph stroke coordinates offscreen ONLY to know where letters sit.
 * No static text pixels are ever drawn on the visible <canvas>.
 */
function sampleGlyphStrokeAnchors(
  headingEl: HTMLElement,
  text: string,
): { width: number; height: number; anchors: GlyphAnchor[] } | null {
  const textNode = headingEl.firstChild;
  if (!textNode || textNode.nodeType !== Node.TEXT_NODE) {
    return null;
  }

  const h1Rect = headingEl.getBoundingClientRect();
  const width = Math.ceil(h1Rect.width);
  const height = Math.ceil(h1Rect.height);
  if (width < 4 || height < 4) {
    return null;
  }

  const computed = window.getComputedStyle(headingEl);
  const offscreen = document.createElement('canvas');
  offscreen.width = width;
  offscreen.height = height;
  const octx = offscreen.getContext('2d', { willReadFrequently: true });
  if (!octx) return null;

  octx.clearRect(0, 0, width, height);
  octx.font = `${computed.fontStyle} ${computed.fontWeight} ${computed.fontSize} ${computed.fontFamily}`;
  octx.fillStyle = '#000000';

  const chars: CharMeasure[] = [];
  for (let i = 0; i < text.length; i += 1) {
    const range = document.createRange();
    range.setStart(textNode, i);
    range.setEnd(textNode, i + 1);
    const rect = range.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) continue;
    chars.push({
      char: text[i],
      left: rect.left - h1Rect.left,
      top: rect.top - h1Rect.top,
      width: rect.width,
      height: rect.height,
    });
  }

  if (chars.length === 0) {
    return null;
  }

  const totalTextAdvance = chars.reduce((acc, ch) => acc + ch.width, 0) || 1;
  const lines: LineSpan[] = [];
  let currentLine: LineSpan | null = null;
  let cumulativeX = 0;

  const sampleMetrics = octx.measureText('AHAMED');
  const fontAscent = sampleMetrics.fontBoundingBoxAscent ?? 0;
  const fontDescent = sampleMetrics.fontBoundingBoxDescent ?? 0;
  const hasFontBox = fontAscent + fontDescent > 0;

  octx.textBaseline = hasFontBox ? 'alphabetic' : 'middle';

  for (let i = 0; i < chars.length; i += 1) {
    const ch = chars[i];
    const uStart = cumulativeX / totalTextAdvance;
    cumulativeX += ch.width;
    const uEnd = cumulativeX / totalTextAdvance;

    if (!currentLine || Math.abs(ch.top - currentLine.minY) > ch.height * 0.45) {
      currentLine = {
        minY: ch.top,
        maxY: ch.top + ch.height,
        minX: ch.left,
        maxX: ch.left + ch.width,
        uStart,
        uEnd,
      };
      lines.push(currentLine);
    } else {
      currentLine.minY = Math.min(currentLine.minY, ch.top);
      currentLine.maxY = Math.max(currentLine.maxY, ch.top + ch.height);
      currentLine.minX = Math.min(currentLine.minX, ch.left);
      currentLine.maxX = Math.max(currentLine.maxX, ch.left + ch.width);
      currentLine.uEnd = uEnd;
    }

    if (ch.char.trim().length > 0) {
      const drawY = hasFontBox
        ? ch.top + (fontAscent / (fontAscent + fontDescent)) * ch.height
        : ch.top + ch.height * 0.52;
      octx.fillText(ch.char, ch.left, drawY);
    }
  }

  const img = octx.getImageData(0, 0, width, height).data;
  const anchors: GlyphAnchor[] = [];
  let idx = 0;

  for (let py = SAMPLE_STEP * 0.5; py < height; py += SAMPLE_STEP) {
    const iy = Math.min(height - 1, Math.floor(py));
    let activeLine = lines[0];
    for (let l = 0; l < lines.length; l += 1) {
      if (py >= lines[l].minY - 4 && py <= lines[l].maxY + 4) {
        activeLine = lines[l];
        break;
      }
    }
    const lineSpan = Math.max(1, activeLine.maxX - activeLine.minX);

    for (let px = SAMPLE_STEP * 0.5; px < width; px += SAMPLE_STEP) {
      const ix = Math.min(width - 1, Math.floor(px));
      const alpha = img[(iy * width + ix) * 4 + 3];
      if (alpha < 64) continue;

      // Detect glyph stroke edge pixels so mist peels cleanly off letter contours without fogging faces
      const topEmpty = iy - 2 < 0 || img[((iy - 2) * width + ix) * 4 + 3] < 48;
      const bottomEmpty = iy + 2 >= height || img[((iy + 2) * width + ix) * 4 + 3] < 48;
      const leftEmpty = ix - 2 < 0 || img[(iy * width + (ix - 2)) * 4 + 3] < 48;
      const rightEmpty = ix + 2 >= width || img[(iy * width + (ix + 2)) * 4 + 3] < 48;
      const isEdge = topEmpty || bottomEmpty || leftEmpty || rightEmpty;

      // Keep all contour/edge anchors and sparse upper-interior anchors only
      if (!isEdge && idx % 5 !== 0) {
        idx += 1;
        continue;
      }

      const lineFraction = clamp01((px - activeLine.minX) / lineSpan);
      const u = activeLine.uStart + lineFraction * (activeLine.uEnd - activeLine.uStart);

      anchors.push({
        x: px + PAD_X,
        y: py + PAD_TOP,
        u,
        seed: deterministicSeed(idx),
      });
      idx += 1;
    }
  }

  return { width, height, anchors };
}

export function SakuraVaporCanvas({
  text,
  theme,
  className = '',
}: SakuraVaporCanvasProps) {
  const prefersReducedMotion = useReducedMotion();
  const isReducedMotion = prefersReducedMotion === true;
  const wrapperRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const emitterRef = useRef<VaporEmitter | null>(null);
  const themeRef = useRef<ThemeMode>(theme);
  const sizeRef = useRef<{ cssWidth: number; cssHeight: number }>({
    cssWidth: 0,
    cssHeight: 0,
  });
  const lastPointerRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const hasTriggeredInitialSweepRef = useRef<boolean>(false);
  const hasLeftViewRef = useRef<boolean>(false);
  const vaporPhaseRef = useRef<VaporPhase>('idle');

  const [vaporPhase, setVaporPhase] = useState<VaporPhase>('idle');
  const [anchorCount, setAnchorCount] = useState(0);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const headingEl = headingRef.current;
    const canvasEl = canvasRef.current;
    const wrapperEl = wrapperRef.current;
    if (!headingEl || !canvasEl || !wrapperEl) return;

    let cancelled = false;
    let initialSweepTimer: number | null = null;
    let rafId: number | null = null;

    const scheduleInitialSweep = () => {
      if (isReducedMotion || hasTriggeredInitialSweepRef.current || initialSweepTimer !== null) {
        return;
      }
      initialSweepTimer = window.setTimeout(() => {
        initialSweepTimer = null;
        if (cancelled || !emitterRef.current) return;
        hasTriggeredInitialSweepRef.current = true;
        triggerVaporWave(emitterRef.current);
      }, INITIAL_SWEEP_DELAY_MS);
    };

    const rebuildAnchors = () => {
      if (cancelled || !headingRef.current || !canvasRef.current) return;
      const sampled = sampleGlyphStrokeAnchors(headingRef.current, text);
      if (!sampled || sampled.anchors.length === 0) return;

      const cssWidth = sampled.width + PAD_X * 2;
      const cssHeight = sampled.height + PAD_TOP + PAD_BOTTOM;

      // Avoid resetting an active mist emitter if geometry and sampled anchors did not change
      if (
        emitterRef.current &&
        sizeRef.current.cssWidth === cssWidth &&
        sizeRef.current.cssHeight === cssHeight &&
        emitterRef.current.anchors.length === sampled.anchors.length
      ) {
        scheduleInitialSweep();
        return;
      }

      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvasRef.current.width = Math.round(cssWidth * dpr);
      canvasRef.current.height = Math.round(cssHeight * dpr);
      canvasRef.current.style.width = `${cssWidth}px`;
      canvasRef.current.style.height = `${cssHeight}px`;

      sizeRef.current = { cssWidth, cssHeight };

      const emitter = createVaporEmitter(sampled.anchors, 1800);
      emitterRef.current = emitter;
      setAnchorCount(sampled.anchors.length);

      // On Load: sweep left-to-right Sakura mist wave 0.3s after page opens
      scheduleInitialSweep();
    };

    const ALPHA_BUCKETS = [0.22, 0.3, 0.38, 0.45] as const;

    const drawMistOverlay = (ctx: CanvasRenderingContext2D, emitter: VaporEmitter) => {
      const { cssWidth, cssHeight } = sizeRef.current;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cssWidth, cssHeight);

      if (emitter.activeCount === 0) {
        return;
      }

      const palette = getVaporPalette(themeRef.current);

      // Microscopic soft-glow mist grains (0.8px-1.4px, shadowBlur = 4, low opacity 0.18-0.45)
      // Batched into 4 opacity buckets per color for silky 60fps even with shadowBlur = 4
      ctx.save();
      ctx.shadowBlur = 4;

      for (let c = 0; c < palette.length; c += 1) {
        const color = palette[c];
        ctx.fillStyle = color;
        ctx.shadowColor = color;

        for (let b = 0; b < ALPHA_BUCKETS.length; b += 1) {
          const minAlpha = b === 0 ? 0.02 : ALPHA_BUCKETS[b] - 0.04;
          const maxAlpha = b === ALPHA_BUCKETS.length - 1 ? 1.0 : ALPHA_BUCKETS[b] + 0.04;
          let hasAny = false;

          for (let i = 0; i < emitter.capacity; i += 1) {
            if (emitter.active[i] === 0 || emitter.colorIndex[i] !== c) continue;

            const alpha = computeVaporAlpha(
              emitter.age[i],
              emitter.maxLife[i],
              emitter.peakAlpha[i],
            );
            if (alpha < minAlpha || alpha >= maxAlpha) continue;

            if (!hasAny) {
              ctx.beginPath();
              hasAny = true;
            }
            const px = emitter.x[i];
            const py = emitter.y[i];
            const radius = emitter.size[i] * 0.5;
            ctx.moveTo(px + radius, py);
            ctx.arc(px, py, radius, 0, Math.PI * 2);
          }

          if (hasAny) {
            ctx.globalAlpha = ALPHA_BUCKETS[b];
            ctx.fill();
          }
        }
      }

      ctx.restore();
      ctx.globalAlpha = 1;
    };

    let lastFrameTime = performance.now();
    const tick = (now: number) => {
      if (cancelled) return;
      const dt = Math.min(0.05, Math.max(0.001, (now - lastFrameTime) / 1000));
      lastFrameTime = now;

      const emitter = emitterRef.current;
      const ctx = canvasRef.current?.getContext('2d');

      if (emitter && ctx && !document.hidden) {
        const nextPhase: VaporPhase = isReducedMotion
          ? 'idle'
          : stepVaporEmitter(emitter, dt);

        if (nextPhase !== vaporPhaseRef.current) {
          vaporPhaseRef.current = nextPhase;
          setVaporPhase(nextPhase);
        }

        drawMistOverlay(ctx, emitter);
      }

      rafId = window.requestAnimationFrame(tick);
    };

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (!cancelled) {
          rebuildAnchors();
        }
      });
    } else {
      rebuildAnchors();
    }

    const resizeObserver =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => {
            rebuildAnchors();
          })
        : null;
    resizeObserver?.observe(headingEl);

    const handleVisibilityRatio = (ratio: number) => {
      if (ratio < 0.4) {
        hasLeftViewRef.current = true;
      } else if (hasLeftViewRef.current) {
        hasLeftViewRef.current = false;
        if (emitterRef.current && !isReducedMotion) {
          triggerVaporWave(emitterRef.current);
        }
      }
    };

    // On Scroll Back Up: replay Sakura mist wave automatically at threshold 0.4
    const intersectionObserver =
      typeof IntersectionObserver !== 'undefined' && !isReducedMotion
        ? new IntersectionObserver(
            (entries) => {
              const entry = entries[0];
              if (!entry) return;
              handleVisibilityRatio(entry.isIntersecting ? entry.intersectionRatio : 0);
            },
            { threshold: [0, 0.4] },
          )
        : null;
    intersectionObserver?.observe(wrapperEl);

    const handleWindowScroll = () => {
      if (isReducedMotion || !wrapperRef.current) return;
      const rect = wrapperRef.current.getBoundingClientRect();
      if (rect.height <= 0) return;
      const visibleTop = Math.max(0, rect.top);
      const visibleBottom = Math.min(window.innerHeight, rect.bottom);
      const visibleHeight = Math.max(0, visibleBottom - visibleTop);
      handleVisibilityRatio(visibleHeight / rect.height);
    };
    window.addEventListener('scroll', handleWindowScroll, { passive: true });

    rafId = window.requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      if (initialSweepTimer !== null) window.clearTimeout(initialSweepTimer);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      resizeObserver?.disconnect();
      intersectionObserver?.disconnect();
      window.removeEventListener('scroll', handleWindowScroll);
    };
  }, [text, isReducedMotion]);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !emitterRef.current || !wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const cx = event.clientX - rect.left + PAD_X;
    const cy = event.clientY - rect.top + PAD_TOP;
    const now = performance.now();

    let pointerVx = 0;
    let pointerVy = 0;
    if (lastPointerRef.current) {
      const dt = Math.max(0.008, (now - lastPointerRef.current.time) / 1000);
      pointerVx = (cx - lastPointerRef.current.x) / dt;
      pointerVy = (cy - lastPointerRef.current.y) / dt;
    }
    lastPointerRef.current = { x: cx, y: cy, time: now };

    emitCursorTrail(emitterRef.current, cx, cy, pointerVx, pointerVy, 36, 24);
  };

  const handleMouseLeave = () => {
    lastPointerRef.current = null;
  };

  return (
    <div
      ref={wrapperRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-fit max-w-full select-none"
    >
      {/* Crisp Gradient Vector Heading (Always 100% razor-sharp vector text) */}
      <h1
        ref={headingRef}
        data-testid="hero-headline"
        data-render-mode="native-vector"
        className={`relative z-10 font-samurai-name opacity-100 visible ${className}`}
      >
        {text}
      </h1>

      {/* Tight Transparent Sakura Mist Overlay (Microscopic 0.8-1.4px soft-glow grains over letter edges) */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        data-testid="hero-vapor-canvas"
        data-vapor-state={vaporPhase}
        data-vapor-active={vaporPhase !== 'idle' ? 'true' : 'false'}
        data-anchor-count={anchorCount}
        style={{ left: `-${PAD_X}px`, top: `-${PAD_TOP}px` }}
        className="pointer-events-none absolute z-20"
      />
    </div>
  );
}
