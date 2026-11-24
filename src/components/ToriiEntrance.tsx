import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import type { ThemeMode } from '../utils/portfolioLogic';

const TORII_EASE = [0.16, 1, 0.3, 1] as const;

interface ToriiEntranceProps {
  theme: ThemeMode;
}

export function ToriiEntrance({ theme }: ToriiEntranceProps) {
  const prefersReducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(() => !prefersReducedMotion);
  const isDark = theme === 'dark';

  useEffect(() => {
    if (prefersReducedMotion) {
      setVisible(false);
      return;
    }

    const timer = window.setTimeout(() => {
      setVisible(false);
    }, 700);

    return () => window.clearTimeout(timer);
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="torii-gate-entrance"
          data-testid="torii-entrance"
          aria-hidden="true"
          initial={{ opacity: 1, y: '0%' }}
          animate={{ opacity: 1, y: '0%' }}
          exit={{ opacity: 0, y: '-22%' }}
          transition={{ duration: 0.6, ease: TORII_EASE }}
          className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#FAF8F5]/95 dark:bg-[#0B0F19]/96 backdrop-blur-sm"
        >
          {/* Ambient Radial Dawn / Moonlit Glow Behind Gate */}
          <div
            className="absolute inset-0"
            style={{
              background: isDark
                ? 'radial-gradient(circle at 50% 44%, rgba(212, 175, 55, 0.14) 0%, rgba(20, 28, 46, 0.45) 45%, transparent 74%)'
                : 'radial-gradient(circle at 50% 44%, rgba(244, 114, 182, 0.18) 0%, rgba(220, 38, 38, 0.06) 44%, transparent 72%)',
            }}
          />

          {/* Layered Architectural Myojin Torii Gate + Mist */}
          <motion.div
            initial={{ opacity: 0.55, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -44, scale: 1.03 }}
            transition={{ duration: 0.52, ease: TORII_EASE }}
            className="relative w-full max-w-[440px] px-6 flex flex-col items-center"
          >
            <svg
              viewBox="0 0 400 290"
              fill="none"
              className="w-full h-auto drop-shadow-[0_18px_36px_rgba(15,23,42,0.14)] dark:drop-shadow-[0_22px_42px_rgba(0,0,0,0.65)]"
            >
              <defs>
                {/* Pillar Gradient */}
                <linearGradient id="torii-pillar-grad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor={isDark ? '#1E293B' : '#991B1B'} />
                  <stop offset="48%" stopColor={isDark ? '#2B3A55' : '#DC2626'} />
                  <stop offset="100%" stopColor={isDark ? '#0F172A' : '#7F1D1D'} />
                </linearGradient>

                {/* Upper Kasagi Cap Gradient */}
                <linearGradient id="torii-kasagi-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={isDark ? '#0F172A' : '#1E293B'} />
                  <stop offset="100%" stopColor={isDark ? '#080B12' : '#0F172A'} />
                </linearGradient>

                {/* Gilded / Crimson Lintel Accent Gradient */}
                <linearGradient id="torii-accent-grad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor={isDark ? '#A67C2E' : '#B91C1C'} />
                  <stop offset="50%" stopColor={isDark ? '#E5C158' : '#EF4444'} />
                  <stop offset="100%" stopColor={isDark ? '#A67C2E' : '#B91C1C'} />
                </linearGradient>

                {/* Layered Mist Gradient */}
                <linearGradient id="torii-mist-grad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor={isDark ? '#1E293B' : '#FCE7F3'} stopOpacity="0" />
                  <stop offset="50%" stopColor={isDark ? '#334155' : '#FBCFE8'} stopOpacity="0.45" />
                  <stop offset="100%" stopColor={isDark ? '#1E293B' : '#FCE7F3'} stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Layer 1: Distant Mountain / Horizon Silhouette */}
              <motion.path
                d="M18 242 Q95 198 165 224 T312 214 Q355 206 384 242 Z"
                fill={isDark ? '#141C2E' : '#F1ECE4'}
                fillOpacity="0.72"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 0.72, y: 0 }}
                transition={{ duration: 0.45, ease: TORII_EASE }}
              />

              {/* Layer 2: Sun / Moon Disc Behind Center Strut */}
              <motion.circle
                cx="200"
                cy="118"
                r="52"
                fill={isDark ? '#D4AF37' : '#F472B6'}
                fillOpacity={isDark ? '0.12' : '0.16'}
                stroke={isDark ? '#D4AF37' : '#F472B6'}
                strokeOpacity={isDark ? '0.28' : '0.32'}
                strokeWidth="1"
                initial={{ scale: 0.84, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.45, ease: TORII_EASE }}
              />

              {/* Layer 3: Ground Shadow & Stone Plinths (Kamebara) */}
              <ellipse
                cx="200"
                cy="252"
                rx="132"
                ry="8"
                fill={isDark ? '#020617' : '#0F172A'}
                fillOpacity={isDark ? '0.55' : '0.09'}
              />
              <path
                d="M108 250 L114 232 H144 L148 250 Z"
                fill={isDark ? '#0F172A' : '#1E293B'}
                stroke={isDark ? '#D4AF37' : '#0F172A'}
                strokeOpacity={isDark ? '0.45' : '0.6'}
                strokeWidth="1.2"
              />
              <path
                d="M252 250 L256 232 H286 L292 250 Z"
                fill={isDark ? '#0F172A' : '#1E293B'}
                stroke={isDark ? '#D4AF37' : '#0F172A'}
                strokeOpacity={isDark ? '0.45' : '0.6'}
                strokeWidth="1.2"
              />

              {/* Layer 4: Twin Inward-Tilted Pillars (Hashira) */}
              <path
                d="M118 232 L127 78 H145 L140 232 Z"
                fill="url(#torii-pillar-grad)"
                stroke={isDark ? '#D4AF37' : '#7F1D1D'}
                strokeOpacity={isDark ? '0.4' : '0.35'}
                strokeWidth="1"
              />
              <path
                d="M260 232 L255 78 H273 L282 232 Z"
                fill="url(#torii-pillar-grad)"
                stroke={isDark ? '#D4AF37' : '#7F1D1D'}
                strokeOpacity={isDark ? '0.4' : '0.35'}
                strokeWidth="1"
              />

              {/* Layer 5: Lower Tie Beam (Nuki) + Wedges (Kusabi) */}
              <rect
                x="78"
                y="112"
                width="244"
                height="13"
                rx="2"
                fill="url(#torii-accent-grad)"
              />
              {/* Kusabi Wedges */}
              <path d="M118 110 H150 L147 115 H121 Z" fill={isDark ? '#0F172A' : '#1E293B'} />
              <path d="M250 110 H282 L279 115 H253 Z" fill={isDark ? '#0F172A' : '#1E293B'} />

              {/* Center Strut & Tablet (Gakuzuka) */}
              <rect
                x="190"
                y="76"
                width="20"
                height="38"
                rx="2"
                fill={isDark ? '#141C2E' : '#0F172A'}
                stroke={isDark ? '#D4AF37' : '#DC2626'}
                strokeWidth="1.4"
              />
              <polygon
                points="200,85 206,94 200,103 194,94"
                fill={isDark ? '#E5C158' : '#FCE7F3'}
              />

              {/* Layer 6: Curved Shimaki Lintel & Kasagi Roof Cap */}
              <path
                d="M62 72 Q200 84 338 72 L332 84 Q200 94 68 84 Z"
                fill="url(#torii-accent-grad)"
              />
              <path
                d="M44 55 Q200 72 356 55 L344 74 Q200 87 56 74 Z"
                fill="url(#torii-kasagi-grad)"
                stroke={isDark ? '#D4AF37' : '#0F172A'}
                strokeOpacity={isDark ? '0.55' : '0.8'}
                strokeWidth="1.2"
              />

              {/* Layer 7: Drifting Layered Mist Bands */}
              <motion.rect
                x="45"
                y="214"
                width="310"
                height="14"
                rx="7"
                fill="url(#torii-mist-grad)"
                initial={{ x: -12, opacity: 0 }}
                animate={{ x: 6, opacity: 0.75 }}
                transition={{ duration: 0.9, ease: TORII_EASE }}
              />
              <motion.rect
                x="75"
                y="236"
                width="250"
                height="10"
                rx="5"
                fill="url(#torii-mist-grad)"
                initial={{ x: 10, opacity: 0 }}
                animate={{ x: -8, opacity: 0.6 }}
                transition={{ duration: 0.9, ease: TORII_EASE }}
              />

              {/* Layer 8: Floating Sakura Petals Around the Torii Gate */}
              <motion.path
                d="M92 64 C95 67 98 70 96 74 C94 77 91 78 89 77 C87 76 86 73 87 70 C88 67 90 65 92 64 Z"
                fill="#F472B6"
                fillOpacity="0.82"
                initial={{ y: -6, opacity: 0 }}
                animate={{ y: 8, opacity: 0.82 }}
                transition={{ duration: 0.8, ease: TORII_EASE }}
              />
              <motion.path
                d="M308 86 C311 89 313 92 311 96 C309 99 306 100 304 99 C302 98 301 95 302 92 C303 89 306 87 308 86 Z"
                fill="#F9A8D4"
                fillOpacity="0.85"
                initial={{ y: -8, opacity: 0 }}
                animate={{ y: 6, opacity: 0.85 }}
                transition={{ duration: 0.85, ease: TORII_EASE }}
              />
              <motion.path
                d="M236 50 C238 52 240 55 239 58 C237 60 235 61 233 60 C232 59 231 57 232 54 C233 52 234 51 236 50 Z"
                fill="#F472B6"
                fillOpacity="0.72"
                initial={{ x: -6, y: -4, opacity: 0 }}
                animate={{ x: 6, y: 6, opacity: 0.72 }}
                transition={{ duration: 0.9, ease: TORII_EASE }}
              />
            </svg>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
