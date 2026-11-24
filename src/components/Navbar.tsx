import { useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS, PORTFOLIO_PROFILE } from '../data/portfolioData';
import type { ThemeMode } from '../utils/portfolioLogic';

interface NavbarProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
}

function SakuraIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="w-3.5 h-3.5 shrink-0 transition-transform duration-300"
    >
      {[0, 72, 144, 216, 288].map((angle) => (
        <path
          key={angle}
          d="M12 12 C9.4 7.6 9.3 3.7 11.1 2.4 L12 4.1 L12.9 2.4 C14.7 3.7 14.6 7.6 12 12 Z"
          transform={`rotate(${angle} 12 12)`}
          fill={active ? '#F472B6' : 'currentColor'}
          fillOpacity={active ? 0.9 : 0.35}
          stroke={active ? '#BE123C' : 'currentColor'}
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      ))}
      <circle
        cx="12"
        cy="12"
        r="2"
        fill={active ? '#BE123C' : 'currentColor'}
      />
    </svg>
  );
}

function SamuraiIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="w-3.5 h-3.5 shrink-0 transition-transform duration-300"
    >
      {/* Sweeping Samurai Kabuto Kuwagata (Crescent Horns) */}
      <path
        d="M4.5 5.2 C6.8 9.2 17.2 9.2 19.5 5.2 C16.8 7.5 7.2 7.5 4.5 5.2 Z"
        fill={active ? '#E5C158' : 'currentColor'}
        stroke={active ? '#D4AF37' : 'currentColor'}
        strokeWidth="1"
        strokeLinejoin="round"
      />
      {/* Kabuto Helmet Crown */}
      <path
        d="M6.5 13.5 C6.5 9.8 8.9 7.8 12 7.8 C15.1 7.8 17.5 9.8 17.5 13.5 Z"
        fill={active ? '#1E293B' : 'currentColor'}
        fillOpacity={active ? 1 : 0.22}
        stroke={active ? '#E5C158' : 'currentColor'}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Shikoro Neck Guard & Crest Center */}
      <path
        d="M4.5 16.2 L7.2 13.5 H16.8 L19.5 16.2"
        stroke={active ? '#E5C158' : 'currentColor'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 19 L12 16.5 L15.5 19"
        stroke={active ? '#D4AF37' : 'currentColor'}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isDark = theme === 'dark';
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 30,
    restDelta: 0.001,
  });
  const tipX = useTransform(smoothProgress, [0, 1], ['0%', '100%']);
  const tipOpacity = useTransform(smoothProgress, [0, 0.02, 0.98, 1], [0.25, 1, 1, 0.9]);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[#FAF8F5]/90 dark:bg-[#0B0F19]/90 border-b border-slate-200/80 dark:border-[#1E293B] transition-colors duration-300">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-6">
        {/* Zone 1: Animated Japanese Kamon Crest + Uppercase Wordmark */}
        <a
          href="#home"
          className="flex items-center gap-2 sm:gap-3 text-[#0F172A] dark:text-[#F8FAFC] min-w-0 shrink group"
          aria-label={`${PORTFOLIO_PROFILE.displayName} — Back to Home`}
        >
          <span className="relative inline-flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 shrink-0">
            <svg
              width="36"
              height="36"
              viewBox="0 0 40 40"
              fill="none"
              aria-hidden="true"
              className="w-8 h-8 sm:w-9 sm:h-9 kamon-crest"
            >
              {/* Outer Sumi-Slate Octagonal Kamon Crest */}
              <polygon
                points="12.7,2 27.3,2 38,12.7 38,27.3 27.3,38 12.7,38 2,27.3 2,12.7"
                fill={isDark ? '#141C2E' : '#0F172A'}
                stroke={isDark ? '#D4AF37' : '#0F172A'}
                strokeWidth="1.2"
              />
              {/* Crimson / Muted Gold Inner Ring */}
              <circle
                cx="20"
                cy="20"
                r="13.5"
                stroke={isDark ? '#D4AF37' : '#DC2626'}
                strokeWidth="1.8"
              />
              {/* Minimalist 5-Petal Sakura Blossom */}
              <g fill="#FCE7F3" stroke="#F472B6" strokeWidth="0.6">
                {[0, 72, 144, 216, 288].map((angle) => (
                  <path
                    key={angle}
                    d="M20 20 C17.4 15.6 17.5 11.4 19.2 10.2 L20 11.7 L20.8 10.2 C22.5 11.4 22.6 15.6 20 20 Z"
                    transform={`rotate(${angle} 20 20)`}
                  />
                ))}
              </g>
              {/* Clean Geometric Katana Blade Lines */}
              <line
                x1="8"
                y1="32"
                x2="32"
                y2="8"
                stroke="#0F172A"
                strokeWidth="3"
                strokeLinecap="square"
              />
              <line
                x1="8"
                y1="32"
                x2="32"
                y2="8"
                stroke="#FAF8F5"
                strokeWidth="1.5"
                strokeLinecap="square"
              />
              <line
                x1="8"
                y1="8"
                x2="32"
                y2="32"
                stroke="#0F172A"
                strokeWidth="3"
                strokeLinecap="square"
              />
              <line
                x1="8"
                y1="8"
                x2="32"
                y2="32"
                stroke="#FAF8F5"
                strokeWidth="1.5"
                strokeLinecap="square"
              />
              <circle
                cx="20"
                cy="20"
                r="2.2"
                fill={isDark ? '#D4AF37' : '#DC2626'}
                stroke="#FAF8F5"
                strokeWidth="1"
              />
            </svg>
          </span>
          <span className="font-samurai-name text-[12px] min-[360px]:text-[13px] sm:text-base uppercase tracking-[0.03em] sm:tracking-[0.07em] truncate">
            {PORTFOLIO_PROFILE.displayName}
          </span>
        </a>

        {/* Zone 2: Clean Architectural Nav Links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-semibold text-[#475569] dark:text-slate-300"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="katana-nav-link py-1 whitespace-nowrap shrink-0 hover:text-[#0F172A] dark:hover:text-[#E5C158] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Sakura ↔ Samurai Mode Toggle + Contact CTA + Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={onToggleTheme}
            data-testid="theme-toggle"
            aria-pressed={isDark}
            aria-label={
              isDark
                ? 'Samurai mode active — switch to Sakura theme'
                : 'Sakura mode active — switch to Samurai theme'
            }
            title={
              isDark
                ? 'Samurai Mode — Click for Sakura Mode'
                : 'Sakura Mode — Click for Samurai Mode'
            }
            className="relative inline-flex items-center p-1 rounded-full border border-rose-200/90 dark:border-[#D4AF37]/45 bg-white/95 dark:bg-[#0F1624] hover:border-[#DC2626]/55 dark:hover:border-[#D4AF37] transition-colors cursor-pointer shrink-0 shadow-xs"
          >
            {/* Sakura Stance */}
            <span
              className={`relative z-10 inline-flex items-center gap-1.5 px-2 py-1 lg:px-2.5 rounded-full text-xs font-bold tracking-wide transition-colors duration-200 ${
                !isDark
                  ? 'text-[#BE123C]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {!isDark && (
                <motion.span
                  layoutId="theme-stance-pill"
                  transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FFF1F2] to-[#FCE7F3] border border-[#F472B6]/45 -z-10"
                />
              )}
              <SakuraIcon active={!isDark} />
              <span className="hidden lg:inline whitespace-nowrap">Sakura</span>
            </span>

            {/* Samurai Stance */}
            <span
              className={`relative z-10 inline-flex items-center gap-1.5 px-2 py-1 lg:px-2.5 rounded-full text-xs font-bold tracking-wide transition-colors duration-200 ${
                isDark
                  ? 'text-[#E5C158]'
                  : 'text-slate-500 hover:text-[#0F172A]'
              }`}
            >
              {isDark && (
                <motion.span
                  layoutId="theme-stance-pill"
                  transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  className="absolute inset-0 rounded-full bg-[#1B253B] border border-[#D4AF37]/50 -z-10"
                />
              )}
              <SamuraiIcon active={isDark} />
              <span className="hidden lg:inline whitespace-nowrap">Samurai</span>
            </span>
          </button>

          <a
            href="#contact"
            className="hidden sm:inline-flex items-center justify-center px-5 py-2 rounded-lg bg-[#DC2626] dark:bg-[#C9A24D] text-white dark:text-[#0B0F19] text-xs sm:text-sm font-bold whitespace-nowrap shrink-0 katana-primary-btn hover:bg-[#B91C1C] dark:hover:bg-[#D4AF37]"
          >
            <span className="katana-sheen-layer" aria-hidden="true" />
            <span className="katana-notch-tl" aria-hidden="true" />
            <span className="katana-notch-br" aria-hidden="true" />
            <span className="relative z-10">Contact</span>
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white dark:bg-[#141C2E] text-[#0F172A] dark:text-[#F8FAFC] border border-slate-200 dark:border-[#24304A] hover:border-[#111111] dark:hover:border-[#D4AF37] transition-colors shrink-0"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <nav
          id="mobile-nav-drawer"
          aria-label="Mobile navigation"
          className="md:hidden border-t border-slate-200 dark:border-[#1E293B] bg-[#FAF8F5] dark:bg-[#0F1624] px-4 py-4 space-y-2"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 text-sm font-semibold text-[#0F172A] dark:text-[#F8FAFC] rounded-lg border border-slate-200 dark:border-[#24304A] bg-white dark:bg-[#141C2E] hover:border-[#111111] dark:hover:border-[#D4AF37] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-center px-4 py-2.5 text-sm font-bold rounded-lg bg-[#DC2626] dark:bg-[#C9A24D] text-white dark:text-[#0B0F19] mt-2"
          >
            Contact
          </a>
        </nav>
      )}

      {/* Top Katana Scroll-Progress Bar along Bottom Edge of Sticky Navbar */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[1px] left-0 right-0 h-1.5 overflow-hidden"
      >
        <div className="relative top-1/2 -translate-y-1/2 h-[2px] w-full">
          <motion.div
            data-testid="navbar-katana-progress"
            style={{
              scaleX: smoothProgress,
              transformOrigin: 'left center',
              background: isDark
                ? 'linear-gradient(90deg, #475569 0%, #94A3B8 45%, #D4AF37 90%, #F8FAFC 100%)'
                : 'linear-gradient(90deg, #94A3B8 0%, #CBD5E1 48%, #DC2626 90%, #FFFFFF 100%)',
            }}
            className="h-[2px] w-full"
          />
        </div>

        {/* Glowing Metallic Tip Following Scroll Progress */}
        <motion.div
          style={{ x: tipX, opacity: tipOpacity }}
          className="pointer-events-none absolute inset-0"
        >
          <span
            className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-[3px] rounded-full"
            style={{
              background: isDark
                ? 'radial-gradient(circle, #FFFFFF 0%, #D4AF37 65%, transparent 100%)'
                : 'radial-gradient(circle, #FFFFFF 0%, #DC2626 65%, transparent 100%)',
              boxShadow: isDark
                ? '0 0 8px 1px rgba(212, 175, 55, 0.7), 0 0 4px 1px rgba(255, 255, 255, 0.85)'
                : '0 0 8px 1px rgba(220, 38, 38, 0.65), 0 0 4px 1px rgba(255, 255, 255, 0.9)',
            }}
          />
        </motion.div>
      </div>
    </header>
  );
}
