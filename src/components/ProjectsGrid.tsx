import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Code2 } from 'lucide-react';
import {
  PORTFOLIO_PROJECTS,
  type ProjectItem,
  type ProjectTrack,
} from '../data/portfolioData';
import { filterProjectsByTrack } from '../utils/portfolioLogic';
import { InteractiveTiltCard } from './InteractiveTiltCard';

interface ProjectsGridProps {
  onSelectProject: (project: ProjectItem) => void;
}

const TRACK_FILTERS: ProjectTrack[] = ['All', 'Software', 'Hardware'];

const KATANA_EASE = [0.16, 1, 0.3, 1] as const;

export function ProjectsGrid({ onSelectProject }: ProjectsGridProps) {
  const [activeTrack, setActiveTrack] = useState<ProjectTrack>('All');
  const visibleProjects = filterProjectsByTrack(PORTFOLIO_PROJECTS, activeTrack);

  return (
    <section
      id="project"
      className="scroll-mt-20 relative py-20 sm:py-24 bg-[#FAF8F5] dark:bg-[#0F1624] transition-colors duration-300"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-8 right-0 w-48 h-48 screentone-subtle opacity-55"
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.45, ease: KATANA_EASE }}
          >
            <p className="font-mono-tech text-xs font-bold tracking-[0.16em] text-[#DC2626] dark:text-[#D4AF37] mb-2">
              03 / PROJECT
            </p>
            <h2 className="font-display text-3xl sm:text-4xl tracking-tight text-[#0F172A] dark:text-[#F8FAFC] text-balance">
              Collaborative Builds &amp; Engineering Work
            </h2>
            <p className="text-sm sm:text-base text-[#475569] dark:text-slate-300 mt-2 max-w-lg">
              Software platforms, accessibility applications, and IoT hardware
              prototypes engineered in peer collaboration.
            </p>
          </motion.div>

          <div
            role="group"
            aria-label="Filter projects by category"
            className="flex flex-wrap sm:flex-nowrap items-center gap-1.5 p-1 bg-white dark:bg-[#141C2E] border border-slate-200 dark:border-[#24304A] rounded-xl shadow-xs shrink-0 self-start lg:self-auto"
          >
            {TRACK_FILTERS.map((track) => {
              const isSelected = activeTrack === track;
              return (
                <button
                  key={track}
                  type="button"
                  onClick={() => setActiveTrack(track)}
                  aria-pressed={isSelected}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#DC2626] dark:bg-[#C9A24D] text-white dark:text-[#0B0F19]'
                      : 'text-[#475569] dark:text-slate-300 hover:text-[#0F172A] dark:hover:text-[#F8FAFC] hover:bg-slate-100 dark:hover:bg-[#1B253B]'
                  }`}
                >
                  {track}
                </button>
              );
            })}
          </div>
        </div>

        {/* Clean Responsive 2-Column Grid for 4 Collaborative Builds */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {visibleProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.08 }}
              transition={{
                duration: 0.44,
                delay: idx * 0.08,
                ease: KATANA_EASE,
              }}
              className="h-full"
            >
              <InteractiveTiltCard
                testId={`project-tilt-${project.id}`}
                maxTilt={4}
                hoverLiftY={-4}
                wrapperClassName="h-full"
                className="katana-project-card rounded-2xl h-full"
              >
                <article className="flex flex-col justify-between h-full p-6 sm:p-7">
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md border border-[#FECACA] dark:border-[#D4AF37]/40 bg-[#FEF2F2] dark:bg-[#D4AF37]/10 font-mono-tech text-[11px] font-bold tracking-wider text-[#DC2626] dark:text-[#E5C158] uppercase">
                        {project.categoryBadge}
                      </span>
                      <span className="font-mono-tech text-xs font-bold text-[#64748B] dark:text-slate-400">
                        {project.indexNumber}
                      </span>
                    </div>

                    <h3 className="font-display text-xl sm:text-[1.35rem] text-[#0F172A] dark:text-[#F8FAFC] leading-snug mb-3">
                      {project.title}
                    </h3>

                    <p className="text-sm leading-relaxed text-[#475569] dark:text-slate-300 mb-5">
                      {project.summary}
                    </p>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-slate-200 dark:border-[#2E3D5C] bg-[#FAF8F5] dark:bg-[#0B0F19] px-2.5 py-1 font-mono-tech text-xs font-medium text-[#0F172A] dark:text-slate-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => onSelectProject(project)}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 dark:border-[#2E3D5C] bg-[#FAF8F5] dark:bg-[#0B0F19] text-xs font-bold text-[#0F172A] dark:text-[#F8FAFC] hover:border-[#DC2626] dark:hover:border-[#D4AF37] hover:bg-[#DC2626] dark:hover:bg-[#C9A24D] hover:text-white dark:hover:text-[#0B0F19] transition-colors cursor-pointer"
                      >
                        <Code2 className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>View Code / Details</span>
                        <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>

                      <span className="font-mono-tech text-[11px] font-semibold text-[#64748B] dark:text-slate-400 uppercase tracking-wider">
                        {project.track}
                      </span>
                    </div>
                  </div>
                </article>
              </InteractiveTiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
