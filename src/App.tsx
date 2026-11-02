import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Activity, ArrowDownRight, ArrowRight, ArrowUpRight, BadgeCheck, BellRing, BriefcaseBusiness,
  Bug, Check, CheckCheck, ChevronDown, ChevronRight, CircleHelp, Clipboard, Clock3, Code2,
  Copy, Download, ExternalLink, FileCheck2, Filter, Fingerprint, FlaskConical, GitBranch,
  GraduationCap, Globe, Layers3, MapPin, Menu, Search, ShieldCheck, Smartphone, TerminalSquare,
  X,
} from 'lucide-react';
import { apiChecks, bugs, githubProjects, projects, skills, stack, testCases, traceability, type TestCategory } from './data';

type FilterCategory = 'All' | TestCategory;
const filters: FilterCategory[] = ['All', 'Positive', 'Negative', 'Boundary Value / Edge Case', 'Mobile Interrupt'];
const navItems = [
  ['Work', '#work'], ['Academic Experience', '#academic-experience'], ['Test cases', '#test-cases'], ['Defects', '#defects'], ['Traceability', '#traceability'], ['About', '#about'],
] as const;
const caseStatusCounts = {
  PASS: testCases.filter((test) => test.status === 'PASS').length,
  FAIL: testCases.filter((test) => test.status === 'FAIL').length,
  BLOCKED: testCases.filter((test) => test.status === 'BLOCKED').length,
};

function useScrollReveals() {
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>('.reveal');
    if (!('IntersectionObserver' in window)) {
      nodes.forEach((node) => node.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px -40px 0px' });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

function usePageProgress() {
  useEffect(() => {
    let frame = 0;
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        const page = document.documentElement;
        const scrollable = page.scrollHeight - window.innerHeight;
        const progress = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
        page.style.setProperty('--scroll-progress', String(progress));
        const ambientY = motionPreference.matches ? 0 : -Math.min(window.scrollY * 0.055, 300);
        const ambientX = motionPreference.matches ? 0 : Math.sin(progress * Math.PI * 2) * 24;
        page.style.setProperty('--ambient-offset-x', `${ambientX.toFixed(1)}px`);
        page.style.setProperty('--ambient-offset-y', `${ambientY.toFixed(1)}px`);
        frame = 0;
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    motionPreference.addEventListener('change', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      motionPreference.removeEventListener('change', update);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);
}

function CountUp({ value }: { value: string }) {
  const match = value.match(/^(\d+)(.*)$/);
  const [display, setDisplay] = useState(match ? '0' + match[2] : value);
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!match || !node || window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      setDisplay(value);
      return;
    }
    const target = Number(match[1]);
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / 1400);
        setDisplay(`${Math.round(target * (1 - Math.pow(1 - t, 3)))}${match[2]}`);
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    observer.observe(node);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [value]);
  return <strong className="metric-value" ref={ref}>{display}</strong>;
}

function usePointerEffects() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.matchMedia('(hover: none)').matches) return;
    const glow = document.querySelector<HTMLElement>('.cursor-glow');
    let frame = 0;
    const onMove = (event: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        if (glow) {
          glow.style.setProperty('--cx', `${event.clientX}px`);
          glow.style.setProperty('--cy', `${event.clientY}px`);
          glow.classList.add('on');
        }
        document.querySelectorAll<HTMLElement>('.button').forEach((button) => {
          const rect = button.getBoundingClientRect();
          const dx = event.clientX - (rect.left + rect.width / 2);
          const dy = event.clientY - (rect.top + rect.height / 2);
          const near = Math.hypot(dx, dy) < Math.max(rect.width, 90) * 0.8;
          button.style.setProperty('--mx', near ? `${(dx * 0.12).toFixed(1)}px` : '0px');
          button.style.setProperty('--my', near ? `${(dy * 0.2).toFixed(1)}px` : '0px');
        });
      });
    };
    const onLeave = () => glow?.classList.remove('on');
    const onDown = (event: PointerEvent) => {
      const button = (event.target as HTMLElement).closest<HTMLElement>('.button');
      if (!button) return;
      const rect = button.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.setProperty('--rx', `${event.clientX - rect.left}px`);
      ripple.style.setProperty('--ry', `${event.clientY - rect.top}px`);
      button.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    };
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      document.removeEventListener('pointerleave', onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
}

function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const toRgb = (value: string, fallback: string) => {
      const hex = (value.trim() || fallback).replace('#', '');
      const full = hex.length === 3 ? hex.split('').map((c) => c + c).join('') : hex;
      return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16)).join(',');
    };
    const styles = getComputedStyle(document.documentElement);
    const colors = [toRgb(styles.getPropertyValue('--mint'), '63e6b1'), toRgb(styles.getPropertyValue('--cyan'), '68cafa')];
    type Node = { x: number; y: number; vx: number; vy: number; r: number; c: number };
    let nodes: Node[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    const pointer = { x: -999, y: -999 };
    const link = 140;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(70, Math.round((width * height) / (width < 700 ? 22000 : 20000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width, y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.28, vy: (Math.random() - 0.5) * 0.28,
        r: 1 + Math.random() * 1.6, c: Math.random() < 0.7 ? 0 : 1,
      }));
    };
    const draw = (animate: boolean) => {
      ctx.clearRect(0, 0, width, height);
      for (const n of nodes) {
        if (animate) {
          n.x += n.vx; n.y += n.vy;
          if (n.x < -10) n.x = width + 10; else if (n.x > width + 10) n.x = -10;
          if (n.y < -10) n.y = height + 10; else if (n.y > height + 10) n.y = -10;
        }
      }
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < link) {
            ctx.strokeStyle = `rgba(${colors[a.c]},${(1 - d / link) * 0.22})`;
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
        const pd = Math.hypot(a.x - pointer.x, a.y - pointer.y);
        if (pd < 170) {
          ctx.strokeStyle = `rgba(${colors[a.c]},${(1 - pd / 170) * 0.45})`;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(pointer.x, pointer.y); ctx.stroke();
        }
        ctx.fillStyle = `rgba(${colors[a.c]},.55)`;
        ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2); ctx.fill();
      }
    };
    const loop = () => { draw(true); frame = requestAnimationFrame(loop); };
    const start = () => {
      cancelAnimationFrame(frame);
      if (reduced.matches) draw(false);
      else if (!document.hidden) frame = requestAnimationFrame(loop);
    };
    const onMove = (event: PointerEvent) => { pointer.x = event.clientX; pointer.y = event.clientY; };
    const onLeave = () => { pointer.x = pointer.y = -999; };
    resize();
    start();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    document.addEventListener('visibilitychange', start);
    reduced.addEventListener('change', start);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('visibilitychange', start);
      reduced.removeEventListener('change', start);
    };
  }, []);
  return (
    <div className="bg-layer" aria-hidden="true">
      <span className="bg-orb bg-orb-a" /><span className="bg-orb bg-orb-b" /><span className="bg-orb bg-orb-c" />
      <span className="bg-grid" />
      <canvas ref={canvasRef} className="bg-canvas" />
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const className = status === 'PASS' || status === 'Resolved' ? 'status-pass' : status === 'FAIL' || status === 'Open' ? 'status-fail' : 'status-blocked';
  return <span className={`status-badge ${className}`}><span className="status-dot" />{status}</span>;
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  useEffect(() => {
    const sections = navItems
      .map(([, href]) => document.getElementById(href.slice(1)))
      .filter((section): section is HTMLElement => section !== null);
    if (!('IntersectionObserver' in window) || sections.length === 0) return;
    const visible = new Map<HTMLElement, number>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const section = entry.target as HTMLElement;
        if (entry.isIntersecting) visible.set(section, entry.intersectionRatio);
        else visible.delete(section);
      });
      const current = [...visible.entries()].sort((a, b) => b[1] - a[1])[0]?.[0];
      setActiveSection(current ? `#${current.id}` : null);
    }, { rootMargin: '-28% 0px -55% 0px', threshold: [0.05, 0.2, 0.45, 0.7] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  return (
    <header className="topbar">
      <span className="page-progress" aria-hidden="true"><span /></span>
      <div className="topbar-inner">
        <a href="#top" className="brand" aria-label="Thary Vireak home">
          <span className="brand-mark"><span /><span /><span /><span /></span>
          <span className="brand-name">Thary Vireak<span className="brand-period">.</span><small>QA / PORTFOLIO</small></span>
        </a>
        <button className="mobile-menu-button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
        <nav className={menuOpen ? 'nav-links nav-open' : 'nav-links'} aria-label="Main navigation">
          {navItems.map(([label, href]) => <a key={href} href={href} className={activeSection === href ? 'nav-active' : undefined} aria-current={activeSection === href ? 'location' : undefined} onClick={() => setMenuOpen(false)}>{label}</a>)}
        </nav>
        <div className="nav-actions">
          <div className="system-pill"><span className="pulse-dot" />System status: <strong>All release checks passing</strong></div>
          <a className="top-cta" href="#about">Download CV / Contact <ArrowUpRight size={14} /></a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  const metrics = [
    { value: '3+', label: 'Production & TestFlight builds', note: 'v2.5.5 · v2.5.6 · v2.5.7', icon: Smartphone, color: 'mint' },
    { value: '150+', label: 'Structured test cases', note: 'Designed & executed', icon: FlaskConical, color: 'blue' },
    { value: '98%', label: 'First-triage reproducibility', note: 'Evidence-backed reports', icon: Bug, color: 'violet' },
    { value: 'Full-stack', label: 'Gray-box debugging', note: 'UI · REST · Database', icon: Layers3, color: 'amber' },
  ];
  return (
    <section className="hero section-wrap" id="top">
      <div className="hero-grid">
        <div className="hero-copy reveal">
          <div className="hero-profile-row">
            <span className="hero-profile-frame">
              <img className="hero-profile-photo" src="/PF3-web.jpg" alt="Portrait of Thary Vireak" loading="eager" decoding="async" />
            </span>
            <div>
              <div className="eyebrow"><span className="eyebrow-line" />QUALITY SYSTEMS / PHNOM PENH, KH</div>
              <span className="hero-profile-caption">THARY VIREAK · QA ENGINEER</span>
            </div>
          </div>
          <h1>Quality is a<br /><span>measurable</span> outcome.</h1>
          <p className="hero-lede">I’m <strong>Thary Vireak</strong> <span className="khmer">ថារី វីរៈ</span> — a QA Engineer turning real-world product risk into reproducible, release-ready evidence.</p>
          <p className="hero-role">Manual QA <i /> iOS TestFlight <i /> Web & API</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#test-cases">Explore test evidence <ArrowDownRight size={16} /></a>
            <a className="button button-quiet" href="#about">Contact Thary <ArrowRight size={15} /></a>
          </div>
          <div className="hero-meta"><span><MapPin size={13} /> Phnom Penh, Cambodia</span><span className="meta-divider" /><span><Activity size={13} /> Available for QA opportunities</span></div>
        </div>
        <div className="hero-console reveal" style={{ transitionDelay: '130ms' }}>
          <div className="console-top"><div className="console-title"><span className="console-icon"><ShieldCheck size={15} /></span>Release readiness</div><span className="live-label"><span className="pulse-dot" /> LIVE</span></div>
          <div className="console-build"><span>ACTIVE SIGN-OFF</span><strong>iOS / 2.5.7</strong><span className="build-check"><Check size={13} /> VERIFIED</span></div>
          <div className="readiness-meter"><span style={{ width: '92%' }} /></div>
          <div className="console-stats"><div><span>Build checks</span><strong>24 <small>/ 24</small></strong></div><div><span>Regression</span><strong>100<small>%</small></strong></div><div><span>Open blockers</span><strong className="text-mint">00</strong></div></div>
          <div className="console-divider" />
          <div className="console-activity"><div className="activity-icon"><CheckCheck size={14} /></div><div><strong>Hotfix verified</strong><span>BenefitMe · redemption flow</span></div><time>2h ago</time></div>
          <div className="console-activity"><div className="activity-icon activity-icon-blue"><BellRing size={14} /></div><div><strong>Push migration signed off</strong><span>Firebase · iOS lifecycle</span></div><time>1d ago</time></div>
          <div className="console-foot"><span>RELEASE CHANNEL</span><span className="mono">production-candidate <ArrowUpRight size={11} /></span></div>
        </div>
      </div>
      <div className="metrics-grid">
        {metrics.map(({ value, label, note, icon: Icon, color }, index) => (
          <article className={`metric-card reveal accent-${color}`} key={label} style={{ transitionDelay: `${index * 70}ms` }}>
            <div className="metric-head"><Icon size={16} /><span className="metric-index">0{index + 1}</span></div>
            <CountUp value={value} /><span className="metric-label">{label}</span><span className="metric-note">{note}</span>
          </article>
        ))}
      </div>
      <div className="scroll-cue"><span />SCROLL TO INSPECT</div>
    </section>
  );
}

function SectionHeading({ kicker, title, description, number }: { kicker: string; title: string; description: string; number: string }) {
  return <div className="section-heading reveal"><div className="section-heading-main"><div className="eyebrow"><span className="section-number">{number}</span>{kicker}</div><h2>{title}</h2><p>{description}</p></div><span className="heading-rule" /></div>;
}

function ProjectExplorer() {
  const [active, setActive] = useState(projects[0].id);
  const project = projects.find((item) => item.id === active) ?? projects[0];
  return (
    <section className="section-wrap content-section" id="work">
      <SectionHeading number="01" kicker="SELECTED QA WORK" title="Projects, under the microscope." description="Switch context. See the testing surface, business rules, and release decisions behind each system." />
      <div className="project-workspace reveal">
        <div className="project-tabs" role="tablist" aria-label="QA case studies">
          {projects.map((item) => <button key={item.id} role="tab" aria-selected={active === item.id} className={active === item.id ? 'project-tab selected' : 'project-tab'} onClick={() => setActive(item.id)}><span className="tab-number">{item.index}</span><span className="tab-label"><small>{item.label}</small><strong>{item.title}</strong></span><ChevronRight size={15} className="tab-arrow" /></button>)}
        </div>
        <article className={`project-detail project-${project.accent}`} key={project.id}>
          <div className="project-detail-top"><div><span className="project-type">{project.label}</span><div className="project-title-row"><h3>{project.title}</h3><span className="project-metric">{project.metric}</span></div><p className="project-product">{project.product}</p></div><div className="project-stamp"><GitBranch size={15} /><span>CASE</span><strong>{project.index}</strong></div></div>
          <p className="project-description">{project.description}</p>
          <div className="scope-label"><span>VALIDATION SCOPE</span><span className="scope-line" /></div>
          <div className="scope-tags">{project.scope.map((item) => <span key={item}><Check size={12} />{item}</span>)}</div>
          <div className="project-highlight"><span className="highlight-icon"><Fingerprint size={15} /></span><div><small>TESTING HIGHLIGHT</small><p>{project.highlight}</p></div></div>
          <a className="text-link" href="#test-cases">Inspect linked test cases <ArrowRight size={14} /></a>
        </article>
      </div>
      <div className="repo-section">
        <div className="repo-section-heading reveal">
          <div><span className="repo-section-kicker">PUBLIC SOURCE LINKS</span><h3>More project repositories.</h3></div>
          <p>Short, source-linked readouts of the repositories you shared.</p>
        </div>
        <div className="repo-grid">
          {githubProjects.map((repo, index) => (
            <article className="repo-card reveal" key={repo.id} style={{ transitionDelay: `${index * 45}ms` }}>
              <div className="repo-card-top"><span className={`repo-card-icon repo-icon-${repo.accent}`}><Code2 size={15} /></span><span className="repo-owner">OWNER · {repo.owner}</span></div>
              <span className="repo-slug mono">{repo.repository}</span>
              <h4>{repo.title}</h4>
              <p className="repo-stack">{repo.stack}</p>
              <p className="repo-summary">{repo.summary}</p>
              <div className="repo-tags">{repo.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              {repo.note && <p className="repo-note">{repo.note}</p>}
              <a className="repo-source-link" href={repo.url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${repo.repository} on GitHub`}>
                View GitHub repository <ExternalLink size={13} />
              </a>
            </article>
          ))}
        </div>
        <p className="repo-attribution-note reveal">Summaries reflect the linked public repositories. Visible owner and team details are shown where available; they do not establish individual authorship or QA responsibility.</p>
      </div>
    </section>
  );
}

function AcademicCapstone() {
  return (
    <section className="section-wrap content-section academic-section" id="academic-experience">
      <SectionHeading number="02" kicker="SETEC INSTITUTE · MIS GROUP SU20" title="Academic Capstone, SRS & Lab Validation" description="A documented academic foundation in shift-left requirements work, system validation, and repeatable test environments." />
      <div className="academic-layout">
        <article className="academic-card academic-milestone reveal">
          <div className="academic-card-heading">
            <span className="academic-card-icon"><GraduationCap size={17} /></span>
            <div className="academic-card-title"><span className="academic-card-kicker">SETEC INSTITUTE · GROUP SU20</span><h3>16-Week Internship & Thesis Milestone</h3></div>
            <span className="academic-status"><Check size={12} /> COMPLETED</span>
          </div>
          <p>Completed the 16-week structured internship, maintained a weekly technical reporting booklet, and completed the final MIS bachelor’s thesis.</p>
          <div className="academic-value-grid">
            <div><small>WEEKLY REPORTING</small><strong>Structured technical reporting booklet</strong></div>
            <div><small>ACADEMIC MILESTONE</small><strong>Final MIS bachelor’s thesis</strong></div>
            <div><small>DELIVERY PRACTICE</small><strong>Documentation · traceability · milestone tracking</strong></div>
          </div>
        </article>

        <div className="academic-subheading reveal">
          <div><span className="academic-card-kicker">SHIFT-LEFT QA · STATIC ANALYSIS</span><h3>SRS & Acceptance Criteria Showcase</h3></div>
          <span>REQUIREMENTS VERIFIED BEFORE IMPLEMENTATION</span>
        </div>

        <div className="academic-srs-grid">
          <article className="academic-card academic-srs-card reveal">
            <div className="academic-card-heading">
              <span className="academic-card-icon"><FileCheck2 size={16} /></span>
              <div className="academic-card-title"><span className="academic-card-kicker">SRS · SHIFT-LEFT QA</span><h3>Full-Stack Music Platform</h3><small>Laravel API + React SPA</small></div>
            </div>
            <div className="academic-focus"><strong>QA FOCUS</strong><p>Verify documented requirements and acceptance criteria before code implementation through static analysis.</p></div>
            <ul className="academic-list">
              <li>Check Producer-profile entity data integrity across profile workflows.</li>
              <li>Map subscription-state transitions for `1-Week`, `1-Month`, and `1-Year` plans.</li>
              <li>Define expiration boundaries, renewal triggers, and unauthorized blocks on premium downloads.</li>
            </ul>
          </article>

          <article className="academic-card academic-srs-card reveal">
            <div className="academic-card-heading">
              <span className="academic-card-icon academic-icon-blue"><Fingerprint size={16} /></span>
              <div className="academic-card-title"><span className="academic-card-kicker">SRS · VISION + NOTIFICATION FLOW</span><h3>ANPR Car Wash Management</h3><small>FastAPI + OpenCV + YOLOv8 + Telegram Bot</small></div>
            </div>
            <div className="academic-focus academic-focus-blue"><strong>QA FOCUS</strong><p>Exercise OCR edge cases and verify the recognition-to-notification handoff for real-time service alerts.</p></div>
            <ul className="academic-list academic-list-blue">
              <li>Probe blurry or angled plates and changing lighting conditions for OCR accuracy.</li>
              <li>At confidence below <code>0.65</code>, require a graceful fallback and manual-review flag.</li>
              <li>Verify Telegram Bot webhook reliability for real-time service notifications.</li>
            </ul>
          </article>
        </div>

        <article className="academic-card academic-lab-card reveal">
          <div className="academic-card-heading">
            <span className="academic-card-icon academic-icon-violet"><Layers3 size={16} /></span>
            <div className="academic-card-title"><span className="academic-card-kicker">ISOLATED · REPEATABLE · NETWORK-AWARE</span><h3>Test Environment & Lab Architecture</h3></div>
          </div>
          <div className="lab-architecture-grid">
            <div className="lab-architecture-item">
              <span className="lab-item-icon"><Layers3 size={15} /></span><h4>Virtualization</h4>
              <p>Set up isolated QA nodes in VirtualBox and VMware Workstation, running Windows 10, macOS, and Linux test environments.</p>
            </div>
            <div className="lab-architecture-item">
              <span className="lab-item-icon lab-item-icon-blue"><ShieldCheck size={15} /></span><h4>Network & VPN testing</h4>
              <p>Validate L2TP, PPTP, and Site-to-Site IPsec tunnels on MikroTik CHR virtual routers: handshake, encryption policies, and packet routing.</p>
            </div>
            <div className="lab-architecture-item">
              <span className="lab-item-icon lab-item-icon-violet"><Globe size={15} /></span><h4>Local DNS & Domain Routing</h4>
              <p>Configure and verify local test domain resolution and routing for <code>reak.edu</code> across virtualized test client environments.</p>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

function TestCaseExplorer() {
  const [filter, setFilter] = useState<FilterCategory>('All');
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => testCases.filter((test) => {
    const matchesFilter = filter === 'All' || test.category === filter;
    const searchable = [test.id, test.module, test.objective, test.preconditions, test.expected, test.actual].join(' ').toLowerCase();
    return matchesFilter && searchable.includes(query.toLowerCase().trim());
  }), [filter, query]);
  return (
    <section className="section-wrap content-section" id="test-cases">
      <SectionHeading number="03" kicker="SPECIFICATION LIBRARY" title="Every result has a reason." description="Filter and search a sample of structured manual test evidence. Each row carries the setup, steps, and outcome—not just a green check." />
      <div className="table-shell reveal">
        <div className="table-toolbar"><div className="toolbar-title"><span className="toolbar-icon"><Clipboard size={15} /></span><div><strong>Test case specifications</strong><span>Showing {filtered.length} of {testCases.length} records</span></div></div><label className="search-field"><Search size={14} /><input aria-label="Search test cases" placeholder="Search case, module, scenario…" value={query} onChange={(event) => setQuery(event.target.value)} /><kbd>⌘ K</kbd></label></div>
        <div className="filter-row"><span className="filter-label"><Filter size={13} /> FILTER BY</span>{filters.map((item) => <button key={item} className={filter === item ? 'filter-chip active' : 'filter-chip'} onClick={() => setFilter(item)}>{item}</button>)}</div>
        <div className="table-scroll"><table className="test-table"><thead><tr><th>TC_ID / MODULE</th><th>TEST SCENARIO & OBJECTIVE</th><th>PRECONDITIONS</th><th>TEST STEPS</th><th>EXPECTED RESULT</th><th>ACTUAL RESULT</th><th>STATUS</th></tr></thead><tbody>
          {filtered.map((test) => <tr key={test.id}><td><span className="case-id">{test.id}</span><span className="case-module">{test.module}</span><span className="case-category">{test.category}</span></td><td className="objective-cell" data-label="Scenario & objective">{test.objective}</td><td data-label="Preconditions">{test.preconditions}</td><td data-label="Test steps"><ol className="steps-list">{test.steps.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, '0')}</span>{step}</li>)}</ol></td><td data-label="Expected result">{test.expected}</td><td data-label="Actual result">{test.actual}</td><td className="status-cell" data-label="Status"><StatusBadge status={test.status} /></td></tr>)}
          {filtered.length === 0 && <tr><td colSpan={7} className="empty-state"><CircleHelp size={17} />No cases match those filters. Try another query.</td></tr>}
        </tbody></table></div>
        <div className="table-footer"><span><span className="status-dot dot-pass" />PASS <strong>{String(caseStatusCounts.PASS).padStart(2, '0')}</strong></span><span><span className="status-dot dot-fail" />FAIL <strong>{String(caseStatusCounts.FAIL).padStart(2, '0')}</strong></span><span><span className="status-dot dot-blocked" />BLOCKED <strong>{String(caseStatusCounts.BLOCKED).padStart(2, '0')}</strong></span><span className="mono">LAST RUN · 2026-10-31 16:42 ICT</span></div>
      </div>
    </section>
  );
}

function DefectInspector() {
  const [openBug, setOpenBug] = useState<string | null>(bugs[0].id);
  return (
    <section className="section-wrap content-section" id="defects">
      <SectionHeading number="04" kicker="DEFECT TRIAGE" title="A bug report should reproduce." description="Open a finding to inspect its environment, reproduction path, impact, and the evidence handed to engineering." />
      <div className="defect-list">
        {bugs.map((bug, index) => {
          const isOpen = openBug === bug.id;
          return <article className="defect-card reveal" data-open={isOpen} key={bug.id} style={{ transitionDelay: `${index * 70}ms` }}>
            <button className="defect-summary" aria-expanded={isOpen} onClick={() => setOpenBug(isOpen ? null : bug.id)}>
              <span className="bug-index">0{index + 1}</span><span className="bug-main"><span className="bug-id mono">{bug.id}</span><strong>{bug.title}</strong><span className="bug-module">{bug.module}</span></span><span className="severity-pill severity-high">{bug.severity}</span><span className="priority-pill">{bug.priority}</span><StatusBadge status={bug.status} /><span className="defect-chevron">{isOpen ? <ChevronDown size={17} /> : <ChevronRight size={17} />}</span>
            </button>
            {isOpen && <div className="defect-body"><div className="defect-intro"><div><span className="field-label">ENVIRONMENT</span><span className="env-badge"><Smartphone size={13} />{bug.environment}</span></div><p>{bug.summary}</p></div><div className="defect-columns"><div className="repro-block"><span className="field-label">STEPS TO REPRODUCE</span><ol>{bug.steps.map((step) => <li key={step}>{step}</li>)}</ol><div className="expected-actual"><div><span className="field-label">EXPECTED</span><p>{bug.expected}</p></div><div><span className="field-label field-danger">ACTUAL</span><p>{bug.actual}</p></div></div></div><div className="evidence-block"><div className="evidence-head"><span><TerminalSquare size={13} /> ROOT CAUSE / DEVTOOLS</span><span className="evidence-language">JSON · HTTP</span></div><p className="root-cause">{bug.rootCause}</p><pre><code>{bug.payload}</code></pre><button className="copy-payload" onClick={() => void navigator.clipboard?.writeText(bug.payload)}><Copy size={12} />Copy evidence</button></div></div></div>}
          </article>;
        })}
      </div>
    </section>
  );
}

function ApiShowcase() {
  const [active, setActive] = useState(0);
  const check = apiChecks[active];
  return (
    <section className="section-wrap content-section" id="traceability">
      <SectionHeading number="05" kicker="COVERAGE & CONTRACTS" title="Requirements linked to evidence." description="A traceable line from business rule to executable case to endpoint. API contracts are checked for response codes and schema—not just reachability." />
      <div className="trace-layout reveal">
        <div className="trace-card">
          <div className="trace-card-head">
            <div><span className="table-kicker">COVERAGE MAP</span><h3>Requirements traceability</h3></div>
            <span className="coverage-total"><BadgeCheck size={14} />100% mapped</span>
          </div>
          <div className="trace-scroll">
            <table className="trace-table">
              <thead><tr><th>BUSINESS REQ.</th><th>USER STORY / RULE</th><th>MAPPED TEST CASES</th><th>API ENDPOINT TESTED</th><th>COVERAGE</th></tr></thead>
              <tbody>{traceability.map((row) => <tr key={row.id}>
                <td className="mono req-id">{row.id}</td><td data-label="Rule">{row.rule}</td><td className="mono mapped-cases" data-label="Test cases">{row.cases}</td><td className="mono endpoint" data-label="Endpoint">{row.endpoint}</td>
                <td data-label="Coverage"><span className="coverage-cell"><span className="coverage-track" aria-hidden="true"><span className="coverage-fill" /></span><span className="coverage-value">{row.coverage}</span></span></td>
              </tr>)}</tbody>
            </table>
          </div>
          <div className="trace-foot"><span><CheckCheck size={13} /> Requirement-to-test linkage maintained</span><span className="mono">{traceability.length} / {traceability.length} REQUIREMENTS</span></div>
        </div>
        <div className="api-card"><div className="api-card-head"><div className="postman-mark"><Code2 size={14} /></div><div><span className="table-kicker">CONTRACT CHECK</span><h3>REST API validation</h3></div><span className="api-live"><span className="pulse-dot" />QA RUN</span></div><div className="api-tabs">{apiChecks.map((item, index) => <button key={item.code} className={active === index ? `api-tab active api-${item.tone}` : 'api-tab'} onClick={() => setActive(index)}><strong>{item.code}</strong><span>{item.label}</span></button>)}</div><div className="api-endpoint"><span className="http-method">{active === 1 ? 'GET' : 'POST'}</span><code>{check.endpoint}</code><ExternalLink size={12} /></div><p className="api-description">{check.description}</p><pre className={`api-response api-response-${check.tone}`}><div><span>RESPONSE BODY</span><span>application/json</span></div><code>{check.body}</code></pre><div className="schema-check"><span><Check size={12} />Schema assertions</span><span className="mono">{active === 0 ? '3 / 3 PASS' : active === 1 ? '2 / 2 PASS' : '2 / 2 PASS'}</span></div></div>
      </div>
    </section>
  );
}

function About() {
  const [copied, setCopied] = useState(false);
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('tharyvireak161@gmail.com');
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = 'mailto:tharyvireak161@gmail.com';
    }
  };
  return (
    <section className="section-wrap content-section about-section" id="about">
      <SectionHeading number="06" kicker="BACKGROUND / CONTACT" title="Careful by practice. Curious by design." description="A systems mindset, a documented process, and the patience to follow a defect until it is understood." />
      <div className="about-grid reveal"><div className="timeline-panel"><div className="panel-heading"><span className="panel-icon"><BriefcaseBusiness size={15} /></span><div><span className="table-kicker">EXPERIENCE & EDUCATION</span><h3>What I bring to the team</h3></div></div><div className="timeline"><article className="timeline-item"><span className="timeline-node node-active"><BriefcaseBusiness size={13} /></span><div className="timeline-content"><div className="timeline-meta"><span>QA ENGINEER</span><span>PRODUCT DELIVERY</span></div><h4>CheckinMe</h4><p>Mobile, web, and API manual testing across HR, attendance, employee benefits, and push notifications. Build regression, defect triage, and release sign-off.</p><div className="timeline-tags"><span>TestFlight</span><span>Regression</span><span>Postman</span></div></div></article><article className="timeline-item"><span className="timeline-node"><GraduationCap size={14} /></span><div className="timeline-content"><div className="timeline-meta"><span>BACHELOR’S DEGREE</span><span>GROUP SU20</span></div><h4>SETEC Institute</h4><p>Bachelor of Management Information Systems (MIS). Completed a 16-week internship and academic thesis.</p><div className="timeline-tags"><span>Information systems</span><span>16-week internship</span></div></div></article></div><div className="skills-section"><span className="field-label">CORE QA PRACTICE</span><div className="skill-chips">{skills.map((skill) => <span key={skill}>{skill}</span>)}</div><span className="field-label stack-label">TECHNICAL FLUENCY</span><div className="stack-list">{stack.map((item) => <span key={item}>{item}</span>)}</div></div></div>
        <aside className="contact-panel"><div className="contact-topline"><span className="contact-orbit"><span /></span><span className="table-kicker">DIRECT LINE</span><span className="contact-availability"><span className="pulse-dot" />OPEN TO WORK</span></div><h3>Let’s make the<br /><span>next release</span> reliable.</h3><p>If you’re building a product that deserves a closer look, I’d like to help test it.</p><a className="contact-email" href="mailto:tharyvireak161@gmail.com">tharyvireak161@gmail.com <ArrowUpRight size={14} /></a><button className="copy-email" onClick={() => void copyEmail()}>{copied ? <Check size={13} /> : <Copy size={13} />}{copied ? 'Email copied' : 'Copy email address'}</button><div className="contact-facts"><span><Smartphone size={13} />071 675 5350</span><span><MapPin size={13} />Phnom Penh, Cambodia</span></div><div className="contact-actions"><a className="button button-primary" href="https://t.me/reak6c" target="_blank" rel="noopener noreferrer">Start a conversation <ArrowUpRight size={15} /></a><a className="button button-outline" href="/Thary_Vireak_CV.pdf" download="Thary_Vireak_CV.pdf"><Download size={14} />Download CV</a></div><small className="download-note">Full CV in PDF format.</small></aside></div>
    </section>
  );
}

function Footer() {
  return <footer className="footer section-wrap"><a href="#top" className="footer-brand"><span className="brand-mark"><span /><span /><span /><span /></span><span>THARY VIREAK <small>QUALITY ASSURANCE</small></span></a><span className="footer-note">Build confidence through evidence.</span><span className="footer-copy">© 2026 · PHNOM PENH, CAMBODIA</span><a className="back-top" href="#top" aria-label="Back to top"><ArrowUpRight size={15} /></a></footer>;
}

export default function App() {
  useScrollReveals();
  usePageProgress();
  usePointerEffects();
  return <><AnimatedBackground /><div className="cursor-glow" aria-hidden="true" /><Header /><main><Hero /><ProjectExplorer /><AcademicCapstone /><TestCaseExplorer /><DefectInspector /><ApiShowcase /><About /></main><Footer /></>;
}
