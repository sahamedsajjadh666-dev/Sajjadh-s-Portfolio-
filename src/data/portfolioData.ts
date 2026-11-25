export type ProjectTrack = 'All' | 'Software' | 'Hardware';

export interface ProjectItem {
  id: string;
  indexNumber: string;
  track: Exclude<ProjectTrack, 'All'>;
  categoryBadge: string;
  title: string;
  summary: string;
  problem: string;
  solution: string;
  impactLabel: string;
  impactMetric: string;
  impactContext: string;
  tags: string[];
  githubUrl: string;
}

export interface AboutHighlight {
  id: string;
  index: string;
  title: string;
  detail: string;
}

export interface LeadershipMilestone {
  id: string;
  index: string;
  tag: string;
  title: string;
  description: string;
}

export interface LanguageProficiency {
  id: string;
  name: string;
  level: string;
  percent: number;
  barColor: string;
}

export interface SkillColumn {
  id: string;
  index: string;
  title: string;
  accent: 'crimson' | 'sakura' | 'steel';
  description: string;
  skills: string[];
}

export interface BookExcerptPage {
  pageNumber: number;
  heading: string;
  paragraphs: string[];
}

export const PORTFOLIO_PROFILE = {
  name: 'S. Ahamed Sajjadh',
  displayName: 'S. AHAMED SAJJADH',
  email: 'sahamedsajjadh666@gmail.com',
  whatsappNumber: '916369117287', // Replace with your country code + WhatsApp number (digits only)
  portraitSrc: '/src/assets/images/enhanced_portrait_hd_1795493289578.jpg',
  portraitAlt:
    'Portrait of S. Ahamed Sajjadh wearing glasses and a pastel pink collared shirt',
  heroTag: 'AI & MACHINE LEARNING ENGINEER',
  heroSubtitle:
    'Designing intelligent machine learning models, computer vision pipelines, and scalable AI solutions.',
  heroIntro:
    'Focused on end-to-end machine learning engineering—from raw dataset curation and deep neural architecture optimization to containerized inference APIs. Applying structured systems thinking to real-world computer vision, NLP, and predictive analytics challenges.',
  portraitFocusBadge: 'Focus: Deep Learning · Computer Vision · NLP',
  socials: [
    {
      id: 'github',
      label: 'GitHub',
      href: 'https://github.com/sahamedsajjadh666-dev',
      handle: 'github.com/sahamedsajjadh666-dev',
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/s-ahamed-sajjadh-324a62327?utm_source=share_via&utm_content=profile&utm_medium=member_android',
      handle: 'linkedin.com/in/s-ahamed-sajjadh-324a62327',
    },
    {
      id: 'email',
      label: 'Email',
      href: 'mailto:sahamedsajjadh666@gmail.com',
      handle: 'sahamedsajjadh666@gmail.com',
    },
  ],
};

export const NAV_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skill', label: 'Skill' },
  { href: '#project', label: 'Project' },
];

export const ABOUT_SECTION = {
  label: '01 / ABOUT',
  heading: 'Engineering Intelligence & Applied Systems',
  title: 'AI & Machine Learning Engineer',
  paragraphs: [
    'Focused on architecting dependable machine learning systems from raw dataset preprocessing and neural network design through to containerized API deployment. My work bridges research experimentation with clean, maintainable production software.',
    'Whether fine-tuning PyTorch vision detectors, building retrieval-augmented NLP pipelines, or benchmarking tabular ensemble models, I prioritize measurable accuracy, reproducible workflows, and low-latency execution.',
  ],
  highlights: [
    {
      id: 'ai-ml',
      index: '01',
      title: 'AI & Machine Learning',
      detail:
        'Model training, computer vision, and data pipelines using Python, PyTorch, TensorFlow, Scikit-Learn, OpenCV, Pandas, and NumPy.',
    },
    {
      id: 'prompt-engineering',
      index: '02',
      title: 'Prompt Engineering',
      detail:
        'Designing structured prompts, LLM workflows, and AI-assisted development pipelines for reliable, high-accuracy outputs.',
    },
    {
      id: 'full-stack',
      index: '03',
      title: 'Full-Stack Development',
      detail:
        'Building end-to-end web applications, responsive frontends, REST APIs, and scalable backend integrations.',
    },
    {
      id: 'ui-ux-design',
      index: '04',
      title: 'UI/UX & Web Design',
      detail:
        'Crafting clean, user-centered interfaces, wireframes, and modern responsive web experiences.',
    },
  ] satisfies AboutHighlight[],
  milestonesTitle: 'Leadership & Milestones',
  milestonesSubtitle:
    'Campus technical organization, peer hackathon leadership, and structured Japanese language study.',
  milestones: [
    {
      id: 'project-x-2025',
      index: '01',
      tag: 'CAMPUS HACKATHON · 2025',
      title: 'Project X 2025 Hackathon — Co-Organizer',
      description:
        'Co-organized a college-wide hackathon with peers, managing event coordination, team workflows, and project showcases.',
    },
    {
      id: 'techwar',
      index: '02',
      tag: 'TECHNICAL EVENT',
      title: 'TechWar — Event Co-Organizer',
      description:
        'Planned and conducted a technical competition event at college, handling round structure and participant management.',
    },
    {
      id: 'nptel-japanese',
      index: '03',
      tag: 'CERTIFICATION',
      title: 'NPTEL Japanese Certification',
      description: 'Successfully completed the NPTEL Japanese language course.',
    },
  ] satisfies LeadershipMilestone[],
};

export const SKILL_COLUMNS: SkillColumn[] = [
  {
    id: 'ai-data-science',
    index: '01',
    title: 'AI & Data Science',
    accent: 'crimson',
    description:
      'Model training, computer vision, numerical computing, and structured data pipelines.',
    skills: [
      'Python',
      'PyTorch',
      'TensorFlow',
      'Scikit-Learn',
      'OpenCV',
      'Pandas',
      'NumPy',
    ],
  },
  {
    id: 'full-stack-web',
    index: '02',
    title: 'Full-Stack & Web',
    accent: 'steel',
    description:
      'Responsive interfaces, full-stack web architectures, API integrations, and version control.',
    skills: [
      'Full-Stack Development',
      'Web Design',
      'React / Next.js',
      'Tailwind CSS',
      'REST APIs',
      'Git & GitHub',
    ],
  },
  {
    id: 'design-ai-workflows',
    index: '03',
    title: 'Design & AI Workflows',
    accent: 'sakura',
    description:
      'User-centered interface architecture, rapid wireframing, and structured LLM prompt engineering.',
    skills: [
      'UI/UX Design',
      'Wireframing & Prototyping',
      'Prompt Engineering',
      'LLM Integration',
    ],
  },
];

export const LANGUAGES_PROFICIENCY: LanguageProficiency[] = [
  {
    id: 'tamil',
    name: 'Tamil',
    level: 'Native / Fluent',
    percent: 100,
    barColor: 'bg-[#0F172A]',
  },
  {
    id: 'english',
    name: 'English',
    level: 'Fluent',
    percent: 92,
    barColor: 'bg-[#DC2626]',
  },
  {
    id: 'japanese',
    name: 'Japanese',
    level: 'Learning • NPTEL Certified',
    percent: 52,
    barColor: 'bg-[#F472B6]',
  },
];

export const PORTFOLIO_PROJECTS: ProjectItem[] = [
  {
    id: 'speed-detection-fine-system',
    indexNumber: '01',
    track: 'Hardware',
    categoryBadge: 'HARDWARE / IOT',
    title: 'Automatic Speed Detection & Fine System',
    summary:
      'Real-time vehicle speed monitoring prototype built with peers using NodeMCU ESP8266, GPS, Wi-Fi, and an LCD display to detect overspeeding and automate violation fine logging.',
    problem:
      'Manual roadside speed checks struggle to capture continuous velocity telemetry and log violations without delayed paperwork.',
    solution:
      'Integrated a NodeMCU ESP8266 microcontroller with GPS velocity polling, local LCD feedback, and Wi-Fi violation event logging for automated fine recording.',
    impactLabel: 'PROTOTYPE FOCUS',
    impactMetric: 'Real-Time GPS Telemetry',
    impactContext: 'Live LCD threshold alerts paired with Wi-Fi violation logging',
    tags: ['IoT', 'NodeMCU ESP8266', 'GPS', 'Embedded Systems'],
    githubUrl: 'https://github.com/sahamedsajjadh666-dev',
  },
  {
    id: 'voicemirror-assistive-app',
    indexNumber: '02',
    track: 'Software',
    categoryBadge: 'SOFTWARE / ACCESSIBILITY',
    title: 'VoiceMirror (Autism Assistive App)',
    summary:
      'An assistive software application designed to support individuals with autism through interactive vocal mirroring and accessible communication feedback.',
    problem:
      'Standard speech-practice tools often feel overwhelming or unintuitive for neurodivergent learners practicing vocal expression.',
    solution:
      'Designed calm, low-friction vocal mirroring loops and clear visual-audio communication cues centered on accessibility and comfort.',
    impactLabel: 'DESIGN FOCUS',
    impactMetric: 'Inclusive Speech Feedback',
    impactContext: 'Guided vocal mirroring tailored for calm daily communication practice',
    tags: ['Assistive Tech', 'Speech Processing', 'UI/UX'],
    githubUrl: 'https://github.com/sahamedsajjadh666-dev',
  },
  {
    id: 'online-medical-portal',
    indexNumber: '03',
    track: 'Software',
    categoryBadge: 'SOFTWARE / WEB',
    title: 'Online Medical Portal',
    summary:
      'A responsive web platform enabling patients to explore medical services, manage consultations, and access healthcare resources easily.',
    problem:
      'Patients often navigate fragmented directories when trying to compare clinical departments, schedule appointments, and locate health guidance.',
    solution:
      'Built a structured, responsive frontend workflow unifying service discovery, consultation management, and patient-friendly resource navigation.',
    impactLabel: 'PLATFORM FOCUS',
    impactMetric: 'Unified Patient Flow',
    impactContext: 'Streamlined discovery of medical services, consultations, and care resources',
    tags: ['Web Development', 'Healthcare', 'Frontend'],
    githubUrl: 'https://github.com/sahamedsajjadh666-dev',
  },
  {
    id: 'recycle-upcycling-site',
    indexNumber: '04',
    track: 'Software',
    categoryBadge: 'SOFTWARE / SUSTAINABILITY',
    title: 'Recycle Collection & Upcycling Site',
    summary:
      'A circular-economy web application for collecting recyclable materials and turning them into useful, everyday upcycled products.',
    problem:
      'Household recyclables frequently go uncollected or underutilized because contributors lack a direct loop connecting collection to practical reuse.',
    solution:
      'Created a circular-economy web experience pairing recyclable material intake tracking with a catalog of everyday upcycled products.',
    impactLabel: 'MISSION FOCUS',
    impactMetric: 'Circular Material Loop',
    impactContext: 'Bridging recyclable material pickup with practical everyday upcycling',
    tags: ['Sustainability', 'Web App', 'Product Design'],
    githubUrl: 'https://github.com/sahamedsajjadh666-dev',
  },
];

export const PUBLISHED_WORK = {
  sectionLabel: 'PUBLISHED WORK',
  heading: 'Dragon Superiors',
  tag: 'FANTASY · ACTION · ADVENTURE',
  genres: ['Fantasy', 'Action', 'Adventure'],
  coverImage: '/src/assets/images/book_dragon_superios_1795079421345.jpg',
  coverAlt:
    'Dragon Superiors book cover artwork depicting a celestial dragon coiled around storm monoliths',
  blurb:
    'Beyond machine learning research and engineering, I am the author of Dragon Superiors, an original fantasy-action light novel. Through this project, I explore imaginative world-building, character development, and storytelling. Creating an original fictional universe has strengthened my creativity, attention to detail, and ability to develop complex ideas into a cohesive narrative.',
  excerptTag: 'PUBLISHED WORK · DRAGON SUPERIORS EXCERPT',
  sampleExcerpt: [
    {
      pageNumber: 1,
      heading: 'Chapter 1 · The Fracture Above the Reach',
      paragraphs: [
        'Thunder did not roll across the Obsidian Reach; it snapped like tempered glass.',
        'From the parapet of the Seventh Bastion, Kael watched crimson and silver arcs stitch across the underside of the storm shelf. Every scholar swore the upper monoliths were dead stone—until the stone began to bleed light.',
      ],
    },
    {
      pageNumber: 2,
      heading: 'Chapter 1 · Awakening Resonance',
      paragraphs: [
        'Beneath Kael’s palm, the iron railing hummed at the exact cadence of his pulse—a silent frequency only the marked bloodlines could answer.',
        'High above the fractured spire, two vermilion eyes parted the gale. Dragon Superiors had returned to reclaim the oath.',
      ],
    },
  ] satisfies BookExcerptPage[],
};
