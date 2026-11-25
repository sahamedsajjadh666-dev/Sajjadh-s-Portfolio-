import { useEffect } from 'react';
import { Github, X } from 'lucide-react';
import type { ProjectItem } from '../data/portfolioData';

interface PortfolioModalsProps {
  selectedProject: ProjectItem | null;
  onCloseProject: () => void;
}

export function PortfolioModals({
  selectedProject,
  onCloseProject,
}: PortfolioModalsProps) {
  useEffect(() => {
    if (!selectedProject) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCloseProject();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject, onCloseProject]);

  return (
    <>
      {/* 1. AI/ML Build Breakdown Modal */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          className="fixed inset-0 z-50 bg-[#0F172A]/75 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="w-full max-w-2xl rounded-2xl bg-[#FAF8F5] dark:bg-[#141C2E] text-[#0F172A] dark:text-[#F8FAFC] border border-slate-300 dark:border-[#24304A] shadow-2xl overflow-hidden">
            <div className="px-6 py-4 bg-[#0F172A] dark:bg-[#0B0F19] text-[#FAF8F5] flex items-center justify-between gap-4 border-b border-transparent dark:border-[#24304A]">
              <div className="min-w-0">
                <p className="font-mono-tech text-[11px] text-[#F472B6] dark:text-[#D4AF37] font-bold tracking-wider">
                  {selectedProject.indexNumber} · {selectedProject.categoryBadge}
                </p>
                <h3 id="project-modal-title" className="font-display text-lg">
                  {selectedProject.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={onCloseProject}
                aria-label="Close project breakdown"
                className="inline-flex items-center justify-center w-9 h-9 shrink-0 rounded-lg bg-slate-800 text-[#FAF8F5] border border-slate-700 hover:bg-[#DC2626] dark:hover:bg-[#C9A24D] dark:hover:text-[#0B0F19] hover:border-[#DC2626] dark:hover:border-[#D4AF37] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-[#0B0F19] border border-slate-200 dark:border-[#24304A] rounded-xl p-4">
                  <p className="font-mono-tech text-xs font-bold text-[#DC2626] dark:text-[#D4AF37] mb-1">
                    PROBLEM
                  </p>
                  <p className="text-sm text-[#475569] dark:text-slate-300 leading-relaxed">
                    {selectedProject.problem}
                  </p>
                </div>
                <div className="bg-white dark:bg-[#0B0F19] border border-slate-200 dark:border-[#24304A] rounded-xl p-4">
                  <p className="font-mono-tech text-xs font-bold text-[#BE185D] dark:text-[#F472B6] mb-1">
                    SYSTEM SOLUTION
                  </p>
                  <p className="text-sm text-[#475569] dark:text-slate-300 leading-relaxed">
                    {selectedProject.solution}
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-[#0B0F19] border border-slate-200 dark:border-[#24304A] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <p className="font-mono-tech text-xs font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                    {selectedProject.impactLabel}
                  </p>
                  <p className="text-sm text-[#475569] dark:text-slate-300">
                    {selectedProject.impactContext}
                  </p>
                </div>
                <span className="font-mono-tech text-base sm:text-lg font-bold text-[#DC2626] dark:text-[#E5C158]">
                  {selectedProject.impactMetric}
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-200 dark:border-slate-800">
                <p className="font-mono-tech text-xs font-semibold text-[#0F172A] dark:text-slate-300">
                  {selectedProject.tags.join(' · ')}
                </p>
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0F172A] dark:bg-[#C9A24D] text-white dark:text-[#0B0F19] text-xs font-semibold hover:bg-[#DC2626] dark:hover:bg-[#D4AF37] transition-colors"
                >
                  <Github className="w-4 h-4" aria-hidden="true" />
                  <span>Open Repository</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

    </>
  );
}
