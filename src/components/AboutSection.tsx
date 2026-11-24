import { motion } from 'motion/react';
import { ArrowRight, Award, Calendar, Layers } from 'lucide-react';
import { ABOUT_SECTION } from '../data/portfolioData';

const KATANA_EASE = [0.16, 1, 0.3, 1] as const;

export function AboutSection() {
  const renderMilestoneIcon = (id: string) => {
    if (id === 'project-x-2025') {
      return <Calendar className="w-4 h-4 text-[#DC2626] dark:text-[#D4AF37]" aria-hidden="true" />;
    }
    if (id === 'techwar') {
      return <Layers className="w-4 h-4 text-[#DC2626] dark:text-[#D4AF37]" aria-hidden="true" />;
    }
    return <Award className="w-4 h-4 text-[#BE185D] dark:text-[#F472B6]" aria-hidden="true" />;
  };

  return (
    <section
      id="about"
      className="scroll-mt-20 relative py-20 sm:py-24 bg-[#FAF8F5] dark:bg-[#0F1624] transition-colors duration-300"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-8 right-0 w-48 h-48 screentone-subtle opacity-50"
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.45, ease: KATANA_EASE }}
          className="mb-12"
        >
          <p className="font-mono-tech text-xs font-bold tracking-[0.16em] text-[#DC2626] dark:text-[#D4AF37] mb-2">
            {ABOUT_SECTION.label}
          </p>
          <h2 className="font-display text-3xl sm:text-4xl tracking-tight text-[#0F172A] dark:text-[#F8FAFC] text-balance">
            {ABOUT_SECTION.heading}
          </h2>
        </motion.div>

        {/* Two-Column Architectural Layout: Narrative Left + 2x2 Highlights Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.08 }}
            transition={{ duration: 0.45, ease: KATANA_EASE }}
            className="lg:col-span-5 arch-card rounded-2xl p-7 sm:p-9 flex flex-col justify-between"
          >
            <div>
              <h3 className="font-display text-2xl text-[#0F172A] dark:text-[#F8FAFC] pb-4 mb-5 border-b border-slate-200 dark:border-slate-800">
                {ABOUT_SECTION.title}
              </h3>

              <div className="space-y-4 text-sm sm:text-base leading-relaxed text-[#475569] dark:text-slate-300 mb-8">
                {ABOUT_SECTION.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            <a
              href="#project"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap shrink-0 arch-outline-btn self-start"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4 text-[#DC2626] dark:text-[#D4AF37]" aria-hidden="true" />
            </a>
          </motion.article>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {ABOUT_SECTION.highlights.map((card, idx) => (
              <motion.article
                key={card.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.08 }}
                transition={{
                  duration: 0.42,
                  delay: idx * 0.08,
                  ease: KATANA_EASE,
                }}
                className="arch-card rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden hover:-translate-y-1"
              >
                <div
                  aria-hidden="true"
                  className="absolute top-0 left-0 right-0 h-[2px] bg-[#DC2626] dark:bg-[#D4AF37]"
                />
                <div className="pt-1">
                  <p className="font-mono-tech text-xs font-bold text-[#DC2626] dark:text-[#D4AF37] mb-2">
                    {card.index}
                  </p>
                  <h3 className="font-display text-lg text-[#0F172A] dark:text-[#F8FAFC] mb-2">
                    {card.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#475569] dark:text-slate-300">
                    {card.detail}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Two-Column Leadership & Milestones Timeline Subsection */}
        <div className="mt-14 pt-12 border-t border-slate-200/80 dark:border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.45, ease: KATANA_EASE }}
            className="lg:col-span-4"
          >
            <p className="font-mono-tech text-xs font-bold tracking-[0.16em] text-[#DC2626] dark:text-[#D4AF37] mb-2">
              MILESTONES &amp; CAMPUS IMPACT
            </p>
            <h3 className="font-display text-2xl sm:text-3xl tracking-tight text-[#0F172A] dark:text-[#F8FAFC] mb-3">
              {ABOUT_SECTION.milestonesTitle}
            </h3>
            <p className="text-sm leading-relaxed text-[#475569] dark:text-slate-300 mb-5">
              {ABOUT_SECTION.milestonesSubtitle}
            </p>
            <div
              aria-hidden="true"
              className="w-12 h-[2px] bg-gradient-to-r from-[#DC2626] to-[#F472B6] dark:from-[#D4AF37] dark:to-[#F472B6]"
            />
          </motion.div>

          <div className="lg:col-span-8 relative pl-7 sm:pl-9 space-y-5 before:content-[''] before:absolute before:left-[10px] sm:before:left-[12px] before:top-4 before:bottom-4 before:w-[2px] before:bg-gradient-to-b before:from-[#DC2626] before:via-[#F472B6] before:to-slate-200 dark:before:from-[#D4AF37] dark:before:via-[#F472B6] dark:before:to-slate-800">
            {ABOUT_SECTION.milestones.map((item, idx) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.08 }}
                transition={{
                  duration: 0.42,
                  delay: idx * 0.08,
                  ease: KATANA_EASE,
                }}
                className="relative arch-card rounded-2xl p-5 sm:p-6 hover:-translate-y-0.5"
              >
                {/* Architectural Square Marker on Vertical Timeline Spine */}
                <span
                  aria-hidden="true"
                  className="absolute -left-[24px] sm:-left-[30px] top-6 w-3.5 h-3.5 rounded-xs bg-[#FAF8F5] dark:bg-[#0F1624] border-2 border-[#DC2626] dark:border-[#D4AF37] shadow-xs"
                />

                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="inline-flex items-center gap-2">
                    {renderMilestoneIcon(item.id)}
                    <span className="font-mono-tech text-[11px] font-bold tracking-wider text-[#DC2626] dark:text-[#D4AF37] uppercase">
                      {item.tag}
                    </span>
                  </div>
                  <span className="font-mono-tech text-xs font-bold text-[#64748B] dark:text-slate-400">
                    {item.index}
                  </span>
                </div>

                <h4 className="font-display text-lg text-[#0F172A] dark:text-[#F8FAFC] mb-1.5">
                  {item.title}
                </h4>
                <p className="text-sm leading-relaxed text-[#475569] dark:text-slate-300">
                  {item.description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
