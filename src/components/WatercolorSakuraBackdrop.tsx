import { useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';

import type { ThemeMode } from '../utils/portfolioLogic';

const LEFT_FALLING_PETALS = [
  { left: '14%', delay: 0, duration: 9.5 },
  { left: '24%', delay: 2.1, duration: 11 },
  { left: '34%', delay: 1.0, duration: 10 },
  { left: '42%', delay: 3.4, duration: 12 },
];

interface WatercolorSakuraBackdropProps {
  theme?: ThemeMode;
}

export function WatercolorSakuraBackdrop({
  theme = 'light',
}: WatercolorSakuraBackdropProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isDark = theme === 'dark';

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -55]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-testid="watercolor-sakura-backdrop"
      className="pointer-events-none absolute inset-0 overflow-hidden select-none z-[1]"
    >
      {/* Left-Anchored Watercolor Sakura Tree (Natural Orientation) */}
      <motion.div
        style={prefersReducedMotion ? undefined : { y: parallaxY }}
        className={`absolute bottom-0 left-[-2%] h-[94%] w-[520px] max-w-[92vw] sm:w-[600px] lg:left-0 lg:w-[680px] transition-opacity duration-300 ${
          isDark ? 'opacity-35' : 'opacity-55'
        }`}
      >
        <motion.img
          src="/assets/aistudio/image_a8d0c712.png"
          alt=""
          data-testid="watercolor-sakura-image"
          animate={
            prefersReducedMotion ? undefined : { rotate: [-0.7, 0.7, -0.7] }
          }
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            transformOrigin: '20% 92%',
            mixBlendMode: isDark ? 'screen' : 'multiply',
            filter: isDark
              ? 'invert(0.93) hue-rotate(180deg) saturate(1.35) contrast(1.08)'
              : 'brightness(1.07) contrast(1.1)',
            WebkitMaskImage:
              'radial-gradient(ellipse 75% 78% at 45% 48%, #000 58%, transparent 96%)',
            maskImage:
              'radial-gradient(ellipse 75% 78% at 45% 48%, #000 58%, transparent 96%)',
          }}
          className="h-full w-full object-contain object-left-bottom"
        />
      </motion.div>

      {/* Soft Readability Wash Behind Left Text Column */}
      <div
        className={`absolute inset-y-0 left-0 w-full bg-gradient-to-r to-transparent lg:w-[62%] transition-colors duration-300 ${
          isDark
            ? 'from-[#0B0F19]/45 via-[#0B0F19]/75'
            : 'from-[#FAF8F5]/45 via-[#FAF8F5]/75'
        }`}
      />

      {/* Drifting Sakura Petals on the Left/Center */}
      {!prefersReducedMotion &&
        LEFT_FALLING_PETALS.map((p, i) => (
          <motion.span
            key={i}
            data-testid="watercolor-falling-petal"
            initial={{ y: 0, x: 0, opacity: 0, rotate: 0 }}
            animate={{
              y: [0, 520],
              x: [0, 24, -14, 18],
              opacity: [0, 0.65, 0.65, 0],
              rotate: [0, 120, 240, 360],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{ left: p.left, top: '16%' }}
            className="absolute h-2 w-2.5 rounded-tl-full rounded-br-full bg-[#F472B6]/70"
          />
        ))}
    </div>
  );
}
