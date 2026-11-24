import { motion } from 'motion/react';
import { Globe2 } from 'lucide-react';
import { LANGUAGES_PROFICIENCY, SKILL_COLUMNS } from '../data/portfolioData';

const KATANA_EASE = [0.16, 1, 0.3, 1] as const;

export function SkillsSection() {
  return (
    <section
      id="skill"
      className="scroll-mt-20 relative py-20 sm:py-24 bg-white dark:bg-[#0B0F19] transition-colors duration-300"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-6 left-0 w-44 h-40 screentone-sakura-soft opacity-50"
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.45, ease: KATANA_EASE }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
        >
          <div>
            <p className="font-mono-tech text-xs font-bold tracking-[0.16em] text-[#DC2626] dark:text-[#D4AF37] mb-2">
              02 / TECHNICAL SKILLS
            </p>
            <h2 className="font-display text-3xl sm:text-4xl tracking-tight text-[#0F172A] dark:text-[#F8FAFC] text-balance">
              Core Engineering Stack
            </h2>
          </div>
          <p className="text-sm text-[#475569] dark:text-slate-300 max-w-md">
            Machine learning frameworks, backend inference APIs, and reproducible
            deployment tooling.
          </p>
        </motion.div>

        {/* Three Structured Architectural Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SKILL_COLUMNS.map((col, idx) => {
            const accentClass =
              col.accent === 'crimson'
                ? 'text-[#DC2626] dark:text-[#D4AF37]'
                : col.accent === 'sakura'
                  ? 'text-[#BE185D] dark:text-[#F472B6]'
                  : 'text-[#475569] dark:text-slate-300';

            return (
              <motion.article
                key={col.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.08 }}
                transition={{
                  duration: 0.42,
                  delay: idx * 0.08,
                  ease: KATANA_EASE,
                }}
                className="arch-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
                    <span className={`font-mono-tech text-xs font-bold ${accentClass}`}>
                      {col.index}
                    </span>
                    <span className="font-mono-tech text-xs text-[#475569] dark:text-slate-400">
                      {col.skills.length} Skills
                    </span>
                  </div>

                  <h3 className="font-display text-xl text-[#0F172A] dark:text-[#F8FAFC] mb-2">
                    {col.title}
                  </h3>

                  <p className="text-sm text-[#475569] dark:text-slate-300 leading-relaxed mb-5">
                    {col.description}
                  </p>
                </div>

                <ul className="divide-y divide-slate-200/80 dark:divide-slate-800 border-t border-b border-slate-200/80 dark:border-slate-800">
                  {col.skills.map((skill, sIdx) => (
                    <li
                      key={skill}
                      className="py-2.5 flex items-center justify-between gap-3 text-sm font-medium text-[#0F172A] dark:text-slate-100"
                    >
                      <span>{skill}</span>
                      <span className="font-mono-tech text-[11px] text-[#64748B] dark:text-slate-400">
                        {String(sIdx + 1).padStart(2, '0')}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>

        {/* Compact Languages Architectural Card */}
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.08 }}
          transition={{ duration: 0.44, delay: 0.12, ease: KATANA_EASE }}
          className="mt-8 arch-card rounded-2xl p-6 sm:p-7"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-5 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <Globe2 className="w-4 h-4 text-[#DC2626] dark:text-[#D4AF37]" aria-hidden="true" />
              <span className="font-mono-tech text-xs font-bold text-[#DC2626] dark:text-[#D4AF37]">
                04
              </span>
              <h3 className="font-display text-xl text-[#0F172A] dark:text-[#F8FAFC]">Languages</h3>
            </div>
            <span className="font-mono-tech text-xs text-[#475569] dark:text-slate-400">
              Multilingual Communication · {LANGUAGES_PROFICIENCY.length} Languages
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {LANGUAGES_PROFICIENCY.map((lang, idx) => {
              const darkBarClass =
                lang.id === 'tamil'
                  ? 'dark:bg-[#D4AF37]'
                  : lang.id === 'english'
                    ? 'dark:bg-[#94A3B8]'
                    : 'dark:bg-[#F472B6]';

              return (
                <div
                  key={lang.id}
                  className="rounded-xl border border-slate-200 dark:border-[#24304A] bg-[#FAF8F5] dark:bg-[#0E1422] p-4 flex flex-col justify-between gap-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-display text-base text-[#0F172A] dark:text-[#F8FAFC]">
                      {lang.name}
                    </span>
                    <span className="rounded-md border border-slate-200 dark:border-[#2E3D5C] bg-white dark:bg-[#141C2E] px-2.5 py-1 font-mono-tech text-[11px] font-semibold text-[#475569] dark:text-slate-300 leading-tight max-w-full">
                      {lang.level}
                    </span>
                  </div>

                  <motion.div
                    aria-hidden="true"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.35 }}
                    className="h-1.5 w-full rounded-sm bg-slate-200/80 dark:bg-slate-800 overflow-hidden"
                  >
                    <motion.div
                      data-testid={`language-bar-${lang.id}`}
                      initial={{ width: '0%' }}
                      variants={{
                        hidden: {
                          width: '0%',
                          transition: { duration: 0.15, delay: 0 },
                        },
                        visible: {
                          width: `${lang.percent}%`,
                          transition: {
                            duration: 0.9,
                            delay: 0.1 + idx * 0.15,
                            ease: KATANA_EASE,
                          },
                        },
                      }}
                      className={`h-full rounded-sm ${lang.barColor} ${darkBarClass}`}
                    />
                  </motion.div>
                </div>
              );
            })}
          </div>
        </motion.article>
      </div>
    </section>
  );
}
