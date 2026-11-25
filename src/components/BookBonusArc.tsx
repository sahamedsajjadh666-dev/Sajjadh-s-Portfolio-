import { useState, type MouseEvent } from 'react';
import { motion } from 'motion/react';
import { Clock } from 'lucide-react';
import { PUBLISHED_WORK, PORTFOLIO_PROFILE } from '../data/portfolioData';
import { computeBookTilt } from '../utils/portfolioLogic';
import { MangaImage } from './MangaImage';

const KATANA_EASE = [0.16, 1, 0.3, 1] as const;

export function BookBonusArc() {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [bookHovered, setBookHovered] = useState(false);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const normX = (event.clientX - rect.left) / rect.width;
    const normY = (event.clientY - rect.top) / rect.height;
    setTilt(computeBookTilt(normX, normY, 8));
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
    setBookHovered(false);
  };

  return (
    <section
      id="dragon-superiors"
      className="scroll-mt-16 relative py-20 bg-white dark:bg-[#0B0F19] transition-colors duration-300"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-6 left-0 w-44 h-44 screentone-sakura-soft opacity-50"
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.45, ease: KATANA_EASE }}
          className="mb-8"
        >
          <p className="font-mono-tech text-xs font-bold tracking-[0.16em] text-[#BE185D] dark:text-[#F472B6] mb-2">
            {PUBLISHED_WORK.sectionLabel}
          </p>
          <h2 className="font-display font-extrabold not-italic text-3xl sm:text-4xl tracking-tight text-[#0F172A] dark:text-[#F8FAFC] text-balance">
            Authored Fiction: {PUBLISHED_WORK.heading}
          </h2>
        </motion.div>

        {/* Sleek Horizontal Editorial Card with Soft Sakura / Gold Hairline Border */}
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.08 }}
          transition={{ duration: 0.45, delay: 0.08, ease: KATANA_EASE }}
          className="rounded-2xl bg-[#FAF8F5]/80 dark:bg-[#141C2E]/90 border border-[#FBCFE8] dark:border-[#D4AF37]/35 hover:border-[#F472B6] dark:hover:border-[#D4AF37]/70 shadow-[0_12px_32px_-8px_rgba(244,114,182,0.16)] dark:shadow-[0_16px_38px_-10px_rgba(2,6,23,0.75)] p-6 sm:p-10 transition-all duration-200"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* 3D-Hover Book Cover Mockup on Left */}
            <div className="md:col-span-4 flex justify-center">
              <div
                onMouseEnter={() => setBookHovered(true)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                data-testid="book-3d-cover"
                className="w-44 sm:w-48 cursor-default select-none"
                style={{ perspective: '900px' }}
              >
                <div
                  className={`relative rounded-xl overflow-hidden border bg-[#0F172A] transition-all duration-200 ease-out ${
                    bookHovered
                      ? 'border-[#F472B6] -translate-y-1 shadow-[0_20px_40px_-10px_rgba(244,114,182,0.4)]'
                      : 'border-slate-300 shadow-[0_14px_30px_-10px_rgba(15,23,42,0.22)]'
                  }`}
                  style={{
                    transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <MangaImage
                      src={PUBLISHED_WORK.coverImage}
                      alt={PUBLISHED_WORK.coverAlt}
                      fallbackTitle="DRAGON SUPERIORS"
                      darkFallback
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/25 to-transparent flex flex-col justify-end p-4">
                      <p className="font-display font-extrabold not-italic text-base text-white leading-tight">
                        DRAGON SUPERIORS
                      </p>
                      <p className="font-mono-tech text-[10px] text-[#FBCFE8] mt-1">
                        By {PORTFOLIO_PROFILE.displayName}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Concise 2-Sentence Author Note & View Book Button on Right */}
            <div className="md:col-span-8 flex flex-col justify-between">
              <div>
                <p className="font-mono-tech text-[11px] font-bold text-[#BE185D] dark:text-[#F472B6] tracking-wider mb-2">
                  {PUBLISHED_WORK.tag}
                </p>
                <h3 className="font-display font-extrabold not-italic text-2xl sm:text-3xl text-[#0F172A] dark:text-[#F8FAFC] mb-3">
                  {PUBLISHED_WORK.heading}
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-[#475569] dark:text-slate-300 max-w-2xl mb-7">
                  {PUBLISHED_WORK.blurb}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <span className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-slate-300 dark:border-[#D4AF37]/45 bg-white dark:bg-[#0B0F19] text-sm font-semibold text-[#0F172A] dark:text-[#E5C158] whitespace-nowrap shrink-0">
                  <Clock className="w-4 h-4 text-[#DC2626] dark:text-[#D4AF37]" aria-hidden="true" />
                  <span>Coming Soon</span>
                </span>
              </div>
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
