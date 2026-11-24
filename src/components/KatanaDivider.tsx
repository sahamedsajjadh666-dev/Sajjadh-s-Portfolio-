import { motion } from 'motion/react';
import type { ThemeMode } from '../utils/portfolioLogic';

interface KatanaDividerProps {
  idPrefix: string;
  theme?: ThemeMode;
  noOverlap?: boolean;
}

const KATANA_EASE = [0.16, 1, 0.3, 1] as const;

const DIVIDER_PETALS = [
  { id: 1, size: 11, delay: 0.45, fromX: -18, toX: 8, toY: 14, rotate: 46, fill: '#F472B6', right: 'right-2', top: 'top-2' },
  { id: 2, size: 9, delay: 0.55, fromX: -12, toX: 16, toY: -6, rotate: -36, fill: '#FBCFE8', right: 'right-5', top: 'top-1' },
  { id: 3, size: 10, delay: 0.65, fromX: -22, toX: 2, toY: 22, rotate: 68, fill: '#F472B6', right: 'right-1', top: 'top-3' },
];

export function KatanaDivider({
  idPrefix,
  theme = 'light',
  noOverlap = false,
}: KatanaDividerProps) {
  const gradId = `katana-steel-${idPrefix}`;
  const isDark = theme === 'dark';

  return (
    <div
      aria-hidden="true"
      data-testid={`katana-divider-${idPrefix}`}
      className={
        noOverlap
          ? 'relative z-20 w-full bg-white dark:bg-[#0B0F19] py-5 pointer-events-none overflow-x-clip transition-colors duration-300'
          : 'relative max-w-[1200px] mx-auto px-4 sm:px-6 -my-3 z-20 pointer-events-none overflow-x-clip'
      }
    >
      <div
        className={
          noOverlap
            ? 'max-w-[1200px] mx-auto px-4 sm:px-6 relative flex items-center h-8 overflow-visible'
            : 'relative flex items-center h-8 overflow-visible'
        }
      >
        {/* Fixed-Aspect Tsuka (Hilt) & Geometric Tsuba (Guard) on Left */}
        <svg
          width="30"
          height="28"
          viewBox="0 0 30 28"
          fill="none"
          className="w-[30px] h-7 shrink-0"
        >
          <rect x="0" y="12.5" width="22" height="3" fill={isDark ? '#475569' : '#0F172A'} />
          <rect x="22" y="6" width="3.5" height="16" fill={isDark ? '#D4AF37' : '#0F172A'} />
          <rect x="26.5" y="10" width="2.5" height="8" fill={isDark ? '#F472B6' : '#DC2626'} />
        </svg>

        {/* Responsive Stretchable Tapered Silver-and-Crimson/Gold Blade */}
        <svg
          viewBox="0 0 1090 28"
          fill="none"
          preserveAspectRatio="none"
          className="flex-1 min-w-0 h-7 overflow-visible"
        >
          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={isDark ? '#64748B' : '#0F172A'} />
              <stop offset="10%" stopColor="#94A3B8" />
              <stop offset="72%" stopColor={isDark ? '#E2E8F0' : '#CBD5E1'} />
              <stop offset="93%" stopColor={isDark ? '#D4AF37' : '#DC2626'} />
              <stop offset="100%" stopColor="#F472B6" />
            </linearGradient>
          </defs>

          {/* Tapered Blade Drawing via pathLength 0 -> 1 in 0.7s */}
          <motion.path
            d="M 0 14 L 1058 13.4 L 1086 14"
            stroke={`url(#${gradId})`}
            strokeWidth="2.4"
            strokeLinecap="round"
            data-testid={`katana-divider-blade-${idPrefix}`}
            initial={{ pathLength: 0, opacity: 0.45 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: KATANA_EASE }}
          />

          {/* Fine Crimson / Gold Hamon Edge Highlight */}
          <motion.path
            d="M 0 15.2 L 1070 14.3"
            stroke={isDark ? '#D4AF37' : '#DC2626'}
            strokeOpacity="0.65"
            strokeWidth="0.9"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.7 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: KATANA_EASE }}
          />
        </svg>

        {/* 3 Soft Sakura Petals Released from Blade Tip */}
        {DIVIDER_PETALS.map((petal) => (
          <motion.svg
            key={petal.id}
            width={petal.size}
            height={petal.size}
            viewBox="0 0 24 24"
            fill="none"
            data-testid={`katana-divider-petal-${idPrefix}`}
            initial={{ opacity: 0, x: petal.fromX, y: 0, rotate: -15 }}
            whileInView={{
              opacity: [0, 0.88, 0.55],
              x: petal.toX,
              y: petal.toY,
              rotate: petal.rotate,
            }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.15, delay: petal.delay, ease: KATANA_EASE }}
            className={`absolute ${petal.right} ${petal.top}`}
          >
            <path
              d="M12 2C15.5 5.5 20 9.5 18.5 15.5C17.4 19.8 14.3 21.5 12 22C9.7 21.5 6.6 19.8 5.5 15.5C4 9.5 8.5 5.5 12 2Z"
              fill={petal.fill}
            />
          </motion.svg>
        ))}
      </div>
    </div>
  );
}
