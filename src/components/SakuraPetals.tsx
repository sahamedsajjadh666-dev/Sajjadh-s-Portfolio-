import type { CSSProperties } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react';
import type { ThemeMode } from '../utils/portfolioLogic';

interface PetalConfig {
  id: number;
  left: string;
  size: number;
  duration: string;
  delay: string;
  variant: 'a' | 'b';
  fill: string;
  parallaxY: number;
  parallaxX: number;
  parallaxRotate: number;
}

const PETALS: PetalConfig[] = [
  { id: 1, left: '5%', size: 13, duration: '16s', delay: '0s', variant: 'a', fill: '#F472B6', parallaxY: 45, parallaxX: 28, parallaxRotate: 65 },
  { id: 2, left: '12%', size: 11, duration: '19s', delay: '-4s', variant: 'b', fill: '#FBCFE8', parallaxY: -35, parallaxX: -24, parallaxRotate: -48 },
  { id: 3, left: '19%', size: 14, duration: '15s', delay: '-8s', variant: 'a', fill: '#F472B6', parallaxY: 55, parallaxX: 32, parallaxRotate: 92 },
  { id: 4, left: '26%', size: 10, duration: '20s', delay: '-2s', variant: 'b', fill: '#F472B6', parallaxY: 30, parallaxX: -28, parallaxRotate: -55 },
  { id: 5, left: '34%', size: 12, duration: '17s', delay: '-11s', variant: 'a', fill: '#FBCFE8', parallaxY: -45, parallaxX: 22, parallaxRotate: 74 },
  { id: 6, left: '42%', size: 11, duration: '16s', delay: '-5s', variant: 'b', fill: '#F472B6', parallaxY: 50, parallaxX: -18, parallaxRotate: -85 },
  { id: 7, left: '50%', size: 14, duration: '18s', delay: '-9s', variant: 'a', fill: '#FBCFE8', parallaxY: -32, parallaxX: 24, parallaxRotate: 52 },
  { id: 8, left: '58%', size: 10, duration: '21s', delay: '-3s', variant: 'b', fill: '#F472B6', parallaxY: 40, parallaxX: -32, parallaxRotate: -64 },
  { id: 9, left: '66%', size: 13, duration: '17s', delay: '-12s', variant: 'a', fill: '#F472B6', parallaxY: 60, parallaxX: 26, parallaxRotate: 110 },
  { id: 10, left: '73%', size: 11, duration: '15s', delay: '-6s', variant: 'b', fill: '#FBCFE8', parallaxY: -40, parallaxX: -22, parallaxRotate: -70 },
  { id: 11, left: '80%', size: 13, duration: '19s', delay: '-1s', variant: 'a', fill: '#F472B6', parallaxY: 48, parallaxX: 30, parallaxRotate: 84 },
  { id: 12, left: '86%', size: 11, duration: '16s', delay: '-10s', variant: 'b', fill: '#F472B6', parallaxY: -28, parallaxX: -26, parallaxRotate: -45 },
  { id: 13, left: '91%', size: 14, duration: '18s', delay: '-4.5s', variant: 'a', fill: '#FBCFE8', parallaxY: 52, parallaxX: 20, parallaxRotate: 96 },
  { id: 14, left: '96%', size: 10, duration: '20s', delay: '-7.5s', variant: 'b', fill: '#F472B6', parallaxY: 36, parallaxX: -20, parallaxRotate: -60 },
];

interface ParallaxPetalProps {
  petal: PetalConfig;
  scrollY: MotionValue<number>;
}

function ParallaxPetal({ petal, scrollY }: ParallaxPetalProps) {
  const y = useTransform(scrollY, [0, 4200], [0, petal.parallaxY]);
  const x = useTransform(scrollY, [0, 4200], [0, petal.parallaxX]);
  const rotate = useTransform(scrollY, [0, 4200], [0, petal.parallaxRotate]);

  const style = {
    '--petal-duration': petal.duration,
    '--petal-delay': petal.delay,
  } as CSSProperties;

  return (
    <motion.div
      data-testid="global-sakura-petal"
      style={{ left: petal.left, top: '-28px', x, y, rotate }}
      className="absolute"
    >
      <svg
        width={petal.size}
        height={petal.size}
        viewBox="0 0 24 24"
        fill="none"
        style={style}
        className={petal.variant === 'a' ? 'sakura-petal-a' : 'sakura-petal-b'}
      >
        <path
          d="M12 2C15.5 5.5 20 9.5 18.5 15.5C17.4 19.8 14.3 21.5 12 22C9.7 21.5 6.6 19.8 5.5 15.5C4 9.5 8.5 5.5 12 2Z"
          fill={petal.fill}
        />
      </svg>
    </motion.div>
  );
}

interface SakuraPetalsProps {
  theme?: ThemeMode;
}

export function SakuraPetals({ theme = 'light' }: SakuraPetalsProps) {
  const { scrollY } = useScroll();
  const isDark = theme === 'dark';

  return (
    <div
      aria-hidden="true"
      data-testid="global-sakura-backdrop"
      className={`pointer-events-none fixed inset-0 overflow-hidden z-[5] transition-opacity duration-300 ${
        isDark ? 'opacity-55' : 'opacity-45'
      }`}
    >
      {PETALS.map((petal) => (
        <ParallaxPetal key={petal.id} petal={petal} scrollY={scrollY} />
      ))}
    </div>
  );
}
