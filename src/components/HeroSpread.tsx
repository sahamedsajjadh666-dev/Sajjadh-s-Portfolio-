import { motion } from 'motion/react';
import { ArrowRight, Mail } from 'lucide-react';
import { PORTFOLIO_PROFILE } from '../data/portfolioData';
import type { ThemeMode } from '../utils/portfolioLogic';
import { MangaImage } from './MangaImage';
import { WatercolorSakuraBackdrop } from './WatercolorSakuraBackdrop';
import { InteractiveTiltCard } from './InteractiveTiltCard';

const KATANA_EASE = [0.16, 1, 0.3, 1] as const;

const TIP_PETALS = [
  { id: 1, size: 11, delay: 0.94, endX: 10, endY: 46, rotate: 48, rightOffset: 'right-2' },
  { id: 2, size: 9, delay: 1.02, endX: 22, endY: 62, rotate: -38, rightOffset: 'right-5' },
  { id: 3, size: 10, delay: 1.1, endX: 4, endY: 54, rotate: 72, rightOffset: 'right-0' },
];

interface HeroSpreadProps {
  theme?: ThemeMode;
}

export function HeroSpread({ theme = 'light' }: HeroSpreadProps) {
  const isDark = theme === 'dark';

  return (
    <section
      id="home"
      className="scroll-mt-16 relative overflow-hidden washi-grain py-12 sm:py-20 lg:py-24 transition-colors duration-300"
    >
      {/* Blended Watercolor & Sumi-Ink Sakura Tree Backdrop */}
      <WatercolorSakuraBackdrop theme={theme} />

      {/* Subtle Halftone Screentone Accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 w-48 h-48 screentone-subtle opacity-60"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 w-56 h-44 screentone-sakura-soft opacity-65"
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Balanced 2-Column Editorial Split (60% Content / 40% Portrait) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column (60%): Unsheathing Katana Reveal */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.36, delay: 0.55, ease: KATANA_EASE }}
              className="font-sans text-xs font-extrabold tracking-[0.2em] text-[#DC2626] dark:text-[#D4AF37] mb-3"
            >
              {PORTFOLIO_PROFILE.heroTag}
            </motion.p>

            {/* Top Split-Mask Container: Headline cut open upward by the blade */}
            <div className="overflow-hidden pb-1">
              <motion.h1
                initial={{ y: '105%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.48, delay: 0.72, ease: KATANA_EASE }}
                className="font-samurai-name uppercase text-3xl sm:text-5xl xl:text-[3.2rem] leading-[1.08] tracking-[0.06em] text-balance"
              >
                {PORTFOLIO_PROFILE.displayName}
              </motion.h1>
            </div>

            {/* 2px Razor-Thin Blade Slash Line + Traveling Spark + Tip Sakura Release */}
            <div className="relative w-full max-w-xl my-4 overflow-visible">
              <div className="relative h-[2px] w-full overflow-hidden">
                <motion.div
                  aria-hidden="true"
                  data-testid="hero-katana-slash"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.45, delay: 0.52, ease: KATANA_EASE }}
                  style={{
                    transformOrigin: 'left center',
                    background: isDark
                      ? 'linear-gradient(90deg, #D4AF37 0%, #94A3B8 65%, #F8FAFC 95%, transparent 100%)'
                      : 'linear-gradient(90deg, #DC2626 0%, #94A3B8 65%, #FFFFFF 95%, transparent 100%)',
                  }}
                  className="h-[2px] w-full"
                />
              </div>

              {/* Traveling White-Crimson / Gold Spark Following the Leading Blade Tip */}
              <motion.div
                aria-hidden="true"
                initial={{ x: '0%', opacity: 0 }}
                animate={{ x: '100%', opacity: [0, 1, 1, 0] }}
                transition={{ duration: 0.45, delay: 0.52, ease: KATANA_EASE }}
                className="pointer-events-none absolute inset-0"
              >
                <span
                  className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-2 rounded-full"
                  style={{
                    background: isDark
                      ? 'radial-gradient(circle, #FFFFFF 0%, #D4AF37 60%, transparent 100%)'
                      : 'radial-gradient(circle, #FFFFFF 0%, #DC2626 60%, transparent 100%)',
                    boxShadow: isDark
                      ? '0 0 12px 3px rgba(212, 175, 55, 0.72), 0 0 6px 1px rgba(255, 255, 255, 0.9)'
                      : '0 0 12px 3px rgba(220, 38, 38, 0.7), 0 0 6px 1px rgba(255, 255, 255, 0.95)',
                  }}
                />
              </motion.div>

              {/* 3 Translucent Sakura Petals Released from Right Tip After Draw */}
              {TIP_PETALS.map((petal) => (
                <motion.svg
                  key={petal.id}
                  aria-hidden="true"
                  width={petal.size}
                  height={petal.size}
                  viewBox="0 0 24 24"
                  fill="none"
                  data-testid="katana-tip-petal"
                  initial={{ opacity: 0, x: 0, y: 0, rotate: 0 }}
                  animate={{
                    opacity: [0, 0.72, 0.45, 0],
                    x: [0, petal.endX * 0.6, petal.endX],
                    y: [0, petal.endY * 0.55, petal.endY],
                    rotate: [0, petal.rotate],
                  }}
                  transition={{
                    duration: 2.1,
                    delay: petal.delay,
                    ease: KATANA_EASE,
                  }}
                  className={`pointer-events-none absolute top-0 ${petal.rightOffset}`}
                >
                  <path
                    d="M12 2C15.5 5.5 20 9.5 18.5 15.5C17.4 19.8 14.3 21.5 12 22C9.7 21.5 6.6 19.8 5.5 15.5C4 9.5 8.5 5.5 12 2Z"
                    fill="#F472B6"
                    fillOpacity="0.85"
                  />
                </motion.svg>
              ))}
            </div>

            {/* Bottom Split-Mask Container: Subtitle, Intro & CTAs Revealed Downward */}
            <div className="overflow-hidden pt-1 pb-4 px-2 -mx-2">
              <motion.div
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.48, delay: 0.76, ease: KATANA_EASE }}
              >
                <p className="text-lg sm:text-xl font-semibold text-[#0F172A] dark:text-[#F8FAFC] leading-snug max-w-2xl mb-4">
                  {PORTFOLIO_PROFILE.heroSubtitle}
                </p>

                <p className="text-base leading-relaxed text-[#475569] dark:text-slate-300 max-w-xl mb-8">
                  {PORTFOLIO_PROFILE.heroIntro}
                </p>

                <div className="flex flex-col min-[420px]:flex-row flex-wrap items-stretch min-[420px]:items-center gap-3.5 sm:gap-4">
                  <a
                    href="#project"
                    className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#DC2626] dark:bg-[#C9A24D] text-white dark:text-[#0B0F19] text-sm sm:text-base font-bold whitespace-nowrap shrink-0 katana-primary-btn hover:bg-[#B91C1C] dark:hover:bg-[#D4AF37]"
                  >
                    <span className="katana-sheen-layer" aria-hidden="true" />
                    <span className="katana-notch-tl" aria-hidden="true" />
                    <span className="katana-notch-br" aria-hidden="true" />
                    <span className="relative z-10 inline-flex items-center gap-2">
                      <span>Explore Projects</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </span>
                  </a>

                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm sm:text-base font-semibold whitespace-nowrap shrink-0 arch-outline-btn"
                  >
                    <Mail className="w-4 h-4 text-[#475569] dark:text-[#D4AF37]" aria-hidden="true" />
                    <span>Get in Touch</span>
                  </a>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Column (40%): Sleek Modern Editorial Portrait Frame with Cursor Tilt & Metallic Sheen */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.68, ease: KATANA_EASE }}
            className="lg:col-span-5"
          >
            <InteractiveTiltCard
              testId="hero-portrait-tilt"
              maxTilt={4}
              hoverLiftY={-3}
              className="rounded-2xl portrait-editorial-frame bg-white dark:bg-[#141C2E] p-2.5"
            >
              <div className="group relative overflow-hidden rounded-xl bg-[#0F172A] aspect-[4/5]">
                <MangaImage
                  src={PORTFOLIO_PROFILE.portraitSrc}
                  alt={PORTFOLIO_PROFILE.portraitAlt}
                  fallbackTitle="S. AHAMED SAJJADH — Portrait"
                  darkFallback
                  className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />

                {/* Clean Floating Glass Badge at Bottom Corner */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 backdrop-blur-md bg-white/90 dark:bg-[#0B0F19]/90 border border-slate-200/90 dark:border-[#D4AF37]/40 rounded-lg px-4 py-2.5 shadow-sm">
                  <p className="font-mono-tech text-[11px] font-bold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight">
                    {PORTFOLIO_PROFILE.portraitFocusBadge}
                  </p>
                </div>
              </div>
            </InteractiveTiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
