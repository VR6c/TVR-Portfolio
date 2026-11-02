export const experience = [
  {
    id: 'checkinme',
    role: 'Quality Assurance Engineer',
    org: 'CheckinMe',
    meta: ['MOBILE & WEB PLATFORM', 'CURRENT'],
    summary: 'Managing quality across Development, iOS TestFlight, and Production for BenefitMe, AI Mentor, Employee Analysis, and push notifications.',
    pipeline: [
      { stage: 'Development', detail: 'API payload verification, database state checks, and feature validation alongside developers.' },
      { stage: 'iOS TestFlight', detail: 'Functional, interrupt, and regression testing across foreground, background, and locked device states, including the push notification migration.' },
      { stage: 'Production', detail: 'Post-deployment smoke testing, hotfix verification, and release-readiness sign-off.' },
    ],
    tags: ['TestFlight', 'Regression', 'API testing', 'Push notifications'],
    active: true,
  },
  {
    id: 'setec',
    role: 'B.Sc. in Management Information Systems (MIS)',
    org: 'SETEC Institute',
    meta: ['GROUP SU20', 'COMPLETED'],
    summary: 'Completed a 16-week internship and weekly report booklet, defended an academic thesis, and worked on full-stack SRS architecture.',
    pipeline: [],
    tags: ['16-week internship', 'Thesis', 'SRS'],
    active: false,
  },
];

export const skillGroups = [
  {
    id: 'frontend', title: 'Frontend & Mobile', tone: 'mint',
    items: ['React.js', 'React Native', 'Flutter · Dart', 'Tailwind CSS', 'TypeScript', 'Responsive UI'],
  },
  {
    id: 'backend', title: 'Backend & APIs', tone: 'blue',
    items: ['Laravel', 'Python', 'FastAPI', 'REST APIs', 'OpenCV · YOLOv8', 'Telegram Bot API'],
  },
  {
    id: 'qa', title: 'QA & Release Pipeline', tone: 'violet',
    items: ['Dev → TestFlight → Prod validation', 'Functional & regression testing', 'Smoke & hotfix verification', 'Boundary value analysis', 'Mobile interrupt testing', 'API testing', 'Test case & defect documentation'],
  },
  {
    id: 'devops', title: 'DevOps & Databases', tone: 'amber',
    items: ['Docker & Compose', 'AWS EC2', 'MySQL', 'MongoDB'],
  },
];

export const projects = [
  {
    id: 'mobile',
    stack: ['Local / Dev branch', 'iOS TestFlight staging', 'Live Production'],
    engineering: 'Early-stage API payload verification and database state checks alongside developers, then TestFlight functional, interrupt, and regression testing, and finally live smoke testing, hotfix verification, and release sign-off.',
    index: '01',
    label: 'Mobile · TestFlight',
    title: 'HR & Attendance App',
    product: 'CheckinMe · iOS TestFlight',
    description: 'End-to-end verification of employee benefits, learning, analytics, and a push notification migration across production-bound iOS builds.',
    scope: ['BenefitMe rewards', 'AI Mentor', 'Employee Analysis', 'Push notification migration'],
    highlight: 'Interrupted the app at the moments that matter: backgrounded, foregrounded, and locked. Signed off regression builds and re-verified hotfixes.',
    accent: 'mint',
    metric: '03 builds',
  },
  {
    id: 'reports',
    stack: ['React.js', 'Canvas dashboard', 'Report generator'],
    engineering: 'A personal task manager scoped strictly to owner tasks (“Manage Only Owner Task”) with an automated monthly report generator. Cross-month deduplication keeps a task exported in June’s report out of July’s.',
    index: '02',
    label: 'Rules · Reporting',
    title: 'Task & Monthly Reports',
    product: 'Personal task ownership · Export engine',
    description: 'Validated owner-only task permissions, month-boundary filtering, and scheduled report output against business rules.',
    scope: ['Manage Only Owner Tasks', 'Monthly report generation', 'Cross-month deduplication', 'Boundary date ranges'],
    highlight: 'Probed the June → July cutoff and last-second timestamps to catch timezone leakage and duplicate records between monthly exports.',
    accent: 'blue',
    metric: '100% coverage',
  },
  {
    id: 'music',
    stack: ['Laravel REST API', 'React.js SPA', 'Tailwind CSS', 'MySQL'],
    engineering: 'Dedicated Producer entity management, audio metadata workflows, and a multi-tier subscription billing engine supporting 1-Week, 1-Month, and 1-Year plans.',
    index: '03',
    label: 'Shift-left · SRS',
    title: 'Music Platform',
    product: 'SETEC MIS SU20 · Laravel API + React SPA',
    description: 'Authored pre-implementation requirements and acceptance criteria for Producer profiles, subscription entitlements, premium downloads, and billing-plan transitions.',
    scope: ['Producer profile data integrity', '1-Week / 1-Month / 1-Year plans', 'Expiry and renewal boundaries', 'Unauthorized download blocks'],
    highlight: 'Applied shift-left QA: checked business rules and state transitions against the SRS before code implementation, including exact subscription expiry behavior.',
    accent: 'violet',
    metric: '03 plan tiers',
  },
  {
    id: 'anpr',
    stack: ['Python', 'FastAPI', 'OpenCV', 'YOLOv8', 'Telegram Bot API'],
    engineering: 'Automated license plate recognition that detects plates from camera feeds, reconciles service records in FastAPI, and triggers instant Telegram Bot notifications.',
    index: '04',
    label: 'Vision · ANPR',
    title: 'ANPR Car Wash',
    product: 'SETEC MIS SU20 · FastAPI + OpenCV + YOLOv8',
    description: 'Specified and validated an automated license-plate recognition workflow that connects image confidence handling to real-time Telegram Bot service notifications.',
    scope: ['Blurry and angled plate samples', 'Lighting variations', 'Confidence < 0.65 fallback', 'Telegram webhook delivery'],
    highlight: 'Keep uncertain plate reads out of automatic acceptance: return a safe fallback, flag manual review, and verify the notification handoff.',
    accent: 'blue',
    metric: '0.65 review gate',
  },
];

export interface RepositoryProject {
  id: string;
  repository: string;
  owner: string;
  title: string;
  stack: string;
  summary: string;
  tags: string[];
  url: string;
  accent: 'mint' | 'blue' | 'violet';
  note?: string;
}

export const githubProjects: RepositoryProject[] = [
  {
    id: 'ecommers-laravel', repository: 'E-commers-laravel', owner: 'VR6c',
    title: 'Multi-vendor commerce platform', stack: 'Laravel 10 · PHP 8.1+',
    summary: 'Customer APIs cover accounts, catalog, checkout, orders, and wishlists; the web routes include administration and vendor portals.',
    tags: ['REST API', 'Catalog & checkout', 'Admin / vendor'],
    url: 'https://github.com/VR6c/E-commers-laravel', accent: 'mint',
  },
  {
    id: 'flutter-e-commerce', repository: 'flutter_e_commerce', owner: 'VR6c',
    title: 'TVR E-Commerce App', stack: 'Flutter · Dart · Riverpod · GoRouter',
    summary: 'Group SU20 Final Year 4 e-commerce capstone documented as a Flutter client for a Laravel REST API, with catalog, cart/checkout, orders, and profile flows.',
    tags: ['Mobile app', 'Laravel REST API', 'Group SU20'],
    url: 'https://github.com/VR6c/flutter_e_commerce', accent: 'blue',
    note: 'The README lists Thary Vireak in the group roster; it does not specify individual responsibilities.',
  },
  {
    id: 'java-final-y4', repository: 'Java-Final-Y4', owner: 'VR6c',
    title: 'School & commerce API', stack: 'Java 21 · Spring Boot 3.4 · PostgreSQL',
    summary: 'REST API modules for school management and e-commerce. The README and source tree document JWT authentication, OTP workflows, caching, activity logs, and OpenAPI documentation.',
    tags: ['Spring Security', 'JWT / OTP', 'Audit & OpenAPI'],
    url: 'https://github.com/VR6c/Java-Final-Y4', accent: 'violet',
  },
  {
    id: 'service-system', repository: 'Service-System', owner: 'VR6c',
    title: 'Automotive service management', stack: 'React 19 · TypeScript · Express · MongoDB',
    summary: 'Automotive aftersales workflows for BYD and DENZA. The SRS and source cover quotations, receipts, customer/vehicle views, reporting, and administration.',
    tags: ['SRS-backed workflows', 'Quote → receipt', 'MongoDB API'],
    url: 'https://github.com/VR6c/Service-System', accent: 'blue',
  },
  {
    id: 'order-lunch', repository: 'Order_Lunch', owner: 'Phanit009',
    title: 'Staff lunch ordering system', stack: 'Node.js · Express · Telegraf · React/Vite',
    summary: 'A Telegram-based staff ordering flow paired with a web admin dashboard for staff and manual orders, plus branch-filtered reporting.',
    tags: ['Telegram bot', 'Admin dashboard', 'Branch reports'],
    url: 'https://github.com/Phanit009/Order_Lunch', accent: 'mint',
  },
  {
    id: 'downloader', repository: 'Downloader', owner: 'VR6c',
    title: 'TVR Studio desktop suite', stack: 'Electron · React 19 · TypeScript · Python (yt-dlp, FFmpeg)',
    summary: 'A macOS and Windows desktop app that pairs a YouTube/SoundCloud media downloader with a tag editor for organizing DJ libraries, including BPM and key analysis and Rekordbox export.',
    tags: ['Desktop app', 'Media downloader', 'Tag editor'],
    url: 'https://github.com/VR6c/Downloader', accent: 'violet',
  },
];
