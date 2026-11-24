import { useEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import type { ProjectItem } from './data/portfolioData';
import {
  resolveInitialTheme,
  toggleThemeMode,
  type ThemeMode,
} from './utils/portfolioLogic';
import { Navbar } from './components/Navbar';
import { SakuraPetals } from './components/SakuraPetals';
import { ToriiEntrance } from './components/ToriiEntrance';
import { HeroSpread } from './components/HeroSpread';
import { KatanaDivider } from './components/KatanaDivider';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsGrid } from './components/ProjectsGrid';
import { BookBonusArc } from './components/BookBonusArc';
import { ContactPanel } from './components/ContactPanel';
import { PortfolioModals } from './components/PortfolioModals';

const THEME_STORAGE_KEY = 'portfolio-theme';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null,
  );
  const [bookModalOpen, setBookModalOpen] = useState(false);
  const [theme, setTheme] = useState<ThemeMode>(() => {
    try {
      return resolveInitialTheme(window.localStorage.getItem(THEME_STORAGE_KEY));
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    const isDark = theme === 'dark';
    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.dataset.theme = theme;
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Ignore storage errors inside restricted contexts
    }
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => toggleThemeMode(prev));
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#0B0F19] text-[#0F172A] dark:text-[#F8FAFC] flex flex-col overflow-x-clip transition-colors duration-300">
        {/* Subtle Torii Gate Entrance Overlay on Page Load */}
        <ToriiEntrance theme={theme} />

        {/* Subtle Global Drifting Sakura Petals Backdrop (Preserved in Light & Midnight Samurai Modes) */}
        <SakuraPetals theme={theme} />

        <Navbar theme={theme} onToggleTheme={handleToggleTheme} />

        <main className="flex-1">
          <HeroSpread theme={theme} />
          <KatanaDivider idPrefix="hero-about" theme={theme} />
          <AboutSection />
          <KatanaDivider idPrefix="about-skill" theme={theme} />
          <SkillsSection />
          <KatanaDivider idPrefix="skill-project" theme={theme} />
          <ProjectsGrid onSelectProject={(project) => setSelectedProject(project)} />
          <KatanaDivider idPrefix="project-published" theme={theme} />
          <BookBonusArc onOpenBookModal={() => setBookModalOpen(true)} />
        </main>

        <KatanaDivider idPrefix="published-contact" theme={theme} noOverlap />
        <ContactPanel />

        <PortfolioModals
          selectedProject={selectedProject}
          bookModalOpen={bookModalOpen}
          onCloseProject={() => setSelectedProject(null)}
          onCloseBookModal={() => setBookModalOpen(false)}
        />
      </div>
    </MotionConfig>
  );
}
