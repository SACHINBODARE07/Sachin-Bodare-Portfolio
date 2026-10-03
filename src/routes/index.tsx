import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  ArrowUpRight,
  Send,
  Code2,
  Database,
  Cloud,
  Wrench,
  ExternalLink,
  MessageCircle,
  Briefcase,
  GraduationCap,
  Award,
  Zap,
  Rocket,
  Layers,
  Server,
  Palette as PaletteIcon,
  GitBranch,
  Coffee,
  Instagram,
  Youtube,
  Download,
  Sparkles,
  Terminal,
  Globe,
  Heart,
  Search,
  X,
  BookOpen,
  BarChart3,
  Star,
  GitFork,
  Activity,
} from "lucide-react";
import portraitAsset from "@/assets/Sachin-Profile Photo.jpg";
import { ThemeProvider, useTheme } from "@/lib/theme";
import { ThemeToggle } from "@/components/ThemeToggle";
import { CursorGlow } from "@/components/CursorGlow";
import { projects, projectCategories, accentClass, type Accent } from "@/lib/projects";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: PortfolioRoot,
  head: () => ({
    meta: [
      { title: "Sachin Bodare — Full Stack Developer Portfolio" },
      { name: "description", content: "Portfolio of Sachin Bodare — Full Stack Developer shipping production web apps with React, Next.js, Node.js and MongoDB." },
      { property: "og:title", content: "Sachin Bodare — Full Stack Developer" },
       { property: "og:description", content: "React · Next.js · Node · MongoDB. Case studies, GitHub stats and a complete public project gallery." },
       { property: "og:type", content: "website" },
       { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const WHATSAPP_NUMBER = "919545242549";
const WHATSAPP_DISPLAY = "+91 95452 42549";
const EMAIL = "sachinbodare2@gmail.com";
const GITHUB = "https://github.com/SACHINBODARE07";
const GITHUB_USER = "SACHINBODARE07";
const LINKEDIN = "https://www.linkedin.com/in/sachin-bodare";
const INSTAGRAM = "https://instagram.com/sachinbodare21";
const YOUTUBE = "https://youtube.com/@thingsofthings8844";
const OLD_PORTFOLIO = "https://sachinbodare-portfolio.netlify.app/";

const experience = [
  {
    role: "Software Developer",
    company: "PigoPi Technologies",
    period: "Dec 2025 — Present",
    mode: "Remote",
    accent: "ember" as Accent,
    bullets: [
      "Shipped production apps: travel platform, HRMS, e-commerce, and PiTask task manager.",
      "Built scalable UIs in Next.js, React & Angular with SSR for SEO + performance.",
      "Designed REST APIs on Node/Express with MongoDB & PostgreSQL, tuned for high traffic.",
      "Implemented JWT/OAuth auth and RBAC across all applications.",
    ],
  },
  {
    role: "Liaison Executive",
    company: "Freyr Energy Services Pvt. Ltd.",
    period: "May 2024 — Sep 2024",
    mode: "Hybrid",
    accent: "teal" as Accent,
    bullets: [
      "Coordinated solar installation projects and maintained full documentation.",
      "Owned client communication, requirements gathering and issue resolution.",
    ],
  },
  {
    role: "Software Developer Trainee",
    company: "Vinsys IT Services",
    period: "Oct 2023 — Apr 2024",
    mode: "Remote",
    accent: "violet" as Accent,
    bullets: [
      "Built MERN features with a focus on scalability and clean architecture.",
      "Optimized response time by ~25% through targeted refactors.",
      "Implemented JWT auth and shipped production-ready deployments.",
    ],
  },
];

const skillGroups = [
  { icon: Code2, accent: "ember" as Accent, title: "Frontend", items: ["React", "Next.js", "Angular", "TypeScript", "Redux", "Tailwind", "MUI", "HTML5", "CSS3"] },
  { icon: Server, accent: "teal" as Accent, title: "Backend", items: ["Node.js", "Express", "REST APIs", "GraphQL", "JWT", "OAuth", "Socket.io"] },
  { icon: Database, accent: "violet" as Accent, title: "Databases", items: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Firebase", "Mongoose", "Prisma"] },
  { icon: Cloud, accent: "pink" as Accent, title: "Cloud & DevOps", items: ["AWS", "Vercel", "Netlify", "Render", "Docker", "GitHub Actions", "CI/CD"] },
  { icon: PaletteIcon, accent: "lime" as Accent, title: "Design & UX", items: ["Figma", "Responsive", "A11y", "Design Systems", "Framer Motion"] },
  { icon: Wrench, accent: "sky" as Accent, title: "Craft", items: ["Agile / Scrum", "SDLC", "OOP", "Git", "Postman", "JIRA", "TDD"] },
];

const marqueeTech = [
  "React", "Next.js", "TypeScript", "Node.js", "MongoDB", "PostgreSQL", "AWS",
  "Redux", "Tailwind", "Express", "Angular", "Docker", "Redis", "GraphQL", "Firebase",
];

const education = [
  { icon: GraduationCap, title: "B.E. Computer Engineering", org: "Sinhgad Institute, Pune", period: "2020 — 2024", detail: "CGPA 7.69" },
  { icon: Award, title: "MERN Stack Certification", org: "Vinsys IT Services", period: "2023 — 2024", detail: "Production-grade curriculum" },
  { icon: Terminal, title: "Full Stack Web Dev", org: "Codecademy", period: "Self-paced", detail: "Continuous learning" },
];

function PortfolioRoot() {
  return (
    <ThemeProvider>
      <Portfolio />
    </ThemeProvider>
  );
}

function Portfolio() {
  useEffect(() => {
    const sections = document.querySelectorAll(".scroll-reveal");
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      sections.forEach((section) => section.classList.add("in-view"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -30px 0px" });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  return (
    <div className="min-h-screen grain overflow-x-hidden">
      <CursorGlow />
      <Nav />
      <Hero />
      <TechMarquee />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <GitHubStats />
      <Education />
      <Contact />
      <Footer />
      <FloatingActions />
    </div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={`sticky top-0 z-40 backdrop-blur-md transition-all ${scrolled ? "bg-background/85 border-b border-border/60" : "bg-transparent"}`}>
      <div className="mx-auto max-w-6xl px-5 sm:px-8 h-16 flex items-center justify-between gap-3">
        <a href="#top" className="flex items-center gap-2 min-w-0 group">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-gradient-to-br from-ember via-pink to-violet text-primary-foreground text-mono text-sm font-bold group-hover:scale-110 transition-transform">SB</span>
          <span className="text-mono text-xs sm:text-sm text-muted-foreground truncate">sachin.bodare<span className="text-gradient">.dev</span></span>
        </a>
        <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
          {[
            { h: "#work", l: "Work" },
            { h: "#experience", l: "Experience" },
            { h: "#skills", l: "Stack" },
            { h: "#stats", l: "Stats" },
            { h: "#contact", l: "Contact" },
          ].map((i) => (
            <a key={i.h} href={i.h} className="relative hover:text-foreground transition group">
              {i.l}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-ember to-pink group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-ember to-pink text-primary-foreground px-4 py-1.5 text-sm font-medium hover:shadow-lg hover:shadow-ember/30 hover:scale-105 transition-all"
          >
            Let's talk <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
      <nav aria-label="Sections" className="md:hidden flex gap-5 overflow-x-auto border-t border-border/50 px-5 py-2.5 text-xs text-muted-foreground whitespace-nowrap [scrollbar-width:none]">
        <a href="#work" className="hover:text-ember">Work</a>
        <a href="#experience" className="hover:text-ember">Experience</a>
        <a href="#skills" className="hover:text-ember">Stack</a>
        <a href="#stats" className="hover:text-ember">Stats</a>
        <a href="#contact" className="hover:text-ember">Contact</a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative mx-auto max-w-6xl px-5 sm:px-8 pt-9 sm:pt-20 pb-16 sm:pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] gap-10 lg:gap-16 items-center">
        <div className="reveal-up">
          <div className="flex items-center gap-2 text-mono text-xs text-muted-foreground mb-6">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-lime opacity-70 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-lime" />
            </span>
            <span className="text-lime">AVAILABLE FOR HIRE</span> · PUNE, IN
          </div>

          <h1 className="text-display text-[3rem] leading-[0.95] sm:text-7xl md:text-8xl lg:text-[7rem] text-foreground">
            Sachin<br />
            <span className="italic text-gradient">Bodare.</span>
          </h1>

          <p className="mt-8 text-lg sm:text-xl text-muted-foreground max-w-xl leading-relaxed">
            Full-stack developer shipping <span className="text-foreground">production web apps</span> — travel platforms, HRMS, commerce & SaaS. <span className="text-ember">React</span> · <span className="text-teal">Next.js</span> · <span className="text-violet">Node</span> · <span className="text-pink">MongoDB</span>, wired for scale.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#work" className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-ember via-pink to-violet text-primary-foreground px-6 py-3 text-sm font-medium hover:shadow-xl hover:shadow-ember/40 hover:scale-105 transition-all">
              <Rocket className="h-4 w-4 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" /> See my work
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm hover:border-ember hover:text-ember hover:bg-ember/5 transition-all">
              <MessageCircle className="h-4 w-4" /> Start a project
            </a>
            <a href={OLD_PORTFOLIO} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border/60 px-6 py-3 text-sm text-muted-foreground hover:text-teal hover:border-teal transition-all">
              <Download className="h-4 w-4" /> Resume
            </a>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-6 max-w-lg">
            <Stat k="YEARS" v="2+" accent="ember" />
            <Stat k="CASE STUDIES" v={String(projects.filter((p) => p.caseStudy).length)} accent="teal" />
            <Stat k="REPOS" v={String(projects.length)} accent="violet" />
          </div>
        </div>

        <div className="relative flex justify-center lg:justify-end">
          <div className="relative">
            <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-ember/20 via-pink/10 to-violet/20 blur-2xl float-slow" />
            <div className="relative rounded-3xl border border-border/80 bg-surface overflow-hidden w-56 h-56 sm:w-80 sm:h-80 group">
              <img
                src={portraitAsset.url}
                alt="Sachin Bodare portrait"
                width={512}
                height={512}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-mono text-[10px] text-muted-foreground">
                <span className="rounded-full bg-background/70 backdrop-blur px-2 py-1 border border-border/60">v1.0 — replace me</span>
                <span className="rounded-full bg-background/70 backdrop-blur px-2 py-1 border border-border/60 text-lime">● LIVE</span>
              </div>
            </div>
            <div className="absolute -top-3 -right-3 rounded-full bg-ember text-primary-foreground text-mono text-[10px] font-bold px-3 py-1.5 rotate-6 shadow-lg shadow-ember/40">
              👋 Hi there
            </div>
            <div className="absolute -bottom-3 -left-3 rounded-full bg-teal text-background text-mono text-[10px] font-bold px-3 py-1.5 -rotate-6 shadow-lg shadow-teal/40">
              <Coffee className="inline h-3 w-3 mr-1" /> ships code
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ k, v, accent }: { k: string; v: string; accent: Accent }) {
  const a = accentClass[accent];
  return (
    <div className={`rounded-xl border ${a.border} ${a.bg} p-3 sm:p-4 card-lift`}>
      <div className={`text-mono text-[10px] ${a.text} tracking-wider`}>{k}</div>
      <div className="text-foreground font-medium text-lg sm:text-xl mt-1">{v}</div>
    </div>
  );
}

function TechMarquee() {
  const colors: Accent[] = ["ember", "teal", "violet", "pink", "lime", "sky"];
  const doubled = [...marqueeTech, ...marqueeTech];
  return (
    <div className="border-y border-border/60 bg-surface/40 overflow-hidden py-4" aria-label="Technologies">
      <div className="marquee-x flex gap-8 whitespace-nowrap text-mono text-sm">
        {doubled.map((t, i) => {
          const a = accentClass[colors[i % colors.length]];
          return (
            <span key={i} className="inline-flex items-center gap-2">
              <Zap className={`h-3.5 w-3.5 ${a.text}`} />
              <span className="text-muted-foreground">{t}</span>
              <span className="text-border">·</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

function SectionLabel({ n, children, accent = "ember" }: { n: string; children: ReactNode; accent?: Accent }) {
  const a = accentClass[accent];
  return (
    <div className="flex items-center gap-3 text-mono text-xs text-muted-foreground mb-8">
      <span className={a.text}>{n}</span>
      <span className={`h-px w-8 ${a.bg}`} />
      <span className="uppercase tracking-widest">{children}</span>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="scroll-reveal mx-auto max-w-6xl px-5 sm:px-8 py-20 sm:py-24 border-t border-border/60">
      <SectionLabel n="01" accent="teal">About</SectionLabel>
      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-10 md:gap-16">
        <p className="text-display text-3xl sm:text-4xl md:text-5xl leading-[1.15] text-foreground">
          I build the <span className="italic text-ember">boring, load-bearing parts</span> of the internet — auth, RBAC, dashboards, billing — and the <span className="italic text-teal">polished front ends</span> that sit on top.
        </p>
        <div className="space-y-4 text-muted-foreground text-[15px] leading-relaxed">
          <p>B.E. Computer Engineering from Sinhgad Institute (CGPA 7.69). Currently a Software Developer at PigoPi Technologies. Previously trained on MERN at Vinsys IT Services.</p>
          <p>I like small teams, tight feedback loops, and code that survives its second reviewer.</p>
          <p>Outside code — chai, cricket, and getting lost in documentation rabbit holes.</p>
          <div className="pt-2 flex flex-wrap gap-2 text-mono text-xs">
            <Tag accent="ember">MERN</Tag>
            <Tag accent="teal">Next.js</Tag>
            <Tag accent="violet">TypeScript</Tag>
            <Tag accent="pink">AWS</Tag>
            <Tag accent="lime">Docker</Tag>
            <Tag accent="sky">Agile</Tag>
          </div>
        </div>
      </div>
    </section>
  );
}

function Tag({ children, accent }: { children: ReactNode; accent: Accent }) {
  const a = accentClass[accent];
  return (
    <span className={`rounded-full border ${a.border} ${a.bg} ${a.text} px-3 py-1 hover:scale-110 transition-transform inline-block`}>
      {children}
    </span>
  );
}

function Experience() {
  return (
    <section id="experience" className="scroll-reveal mx-auto max-w-6xl px-5 sm:px-8 py-20 sm:py-24 border-t border-border/60">
      <SectionLabel n="02" accent="violet">Experience</SectionLabel>
      <div className="space-y-4">
        {experience.map((e) => {
          const a = accentClass[e.accent];
          return (
            <article key={e.role + e.company} className="card-lift group relative rounded-xl border border-border bg-surface/60 p-5 sm:p-7 overflow-hidden">
              <div className={`absolute inset-y-0 left-0 w-1 ${a.bg} ${a.border} border-l-2 group-hover:w-2 transition-all`} />
              <header className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-baseline">
                <div className="min-w-0 flex items-start gap-3">
                  <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg ${a.bg} ${a.border} border`}>
                    <Briefcase className={`h-4 w-4 ${a.text}`} />
                  </span>
                  <div>
                    <h3 className="text-xl sm:text-2xl text-foreground font-medium">
                      {e.role} <span className="text-muted-foreground">· {e.company}</span>
                    </h3>
                    <p className="text-mono text-xs text-muted-foreground mt-1">{e.mode}</p>
                  </div>
                </div>
                <span className={`text-mono text-xs ${a.text} shrink-0 whitespace-nowrap`}>{e.period}</span>
              </header>
              <ul className="mt-5 grid gap-2 text-[15px] text-muted-foreground pl-[52px]">
                {e.bullets.map((b) => (
                  <li key={b} className="grid grid-cols-[16px_minmax(0,1fr)] gap-2">
                    <span className={`mt-2 h-1.5 w-1.5 rounded-full ${a.text} bg-current self-start translate-y-1`} />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="scroll-reveal mx-auto max-w-6xl px-5 sm:px-8 py-20 sm:py-24 border-t border-border/60">
      <SectionLabel n="03" accent="pink">Stack</SectionLabel>
      <h2 className="text-display text-4xl sm:text-5xl md:text-6xl mb-10">
        Tools I <span className="italic text-gradient">reach for</span>.
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {skillGroups.map((g) => {
          const a = accentClass[g.accent];
          const Icon = g.icon;
          return (
            <div key={g.title} className="card-lift group relative rounded-xl border border-border bg-surface/60 p-5 overflow-hidden">
              <div className={`absolute -top-10 -right-10 h-32 w-32 rounded-full ${a.bg} blur-2xl opacity-40 group-hover:opacity-80 transition-opacity`} />
              <div className="relative flex items-center gap-2 mb-4">
                <span className={`grid h-8 w-8 place-items-center rounded-md ${a.bg} ${a.border} border`}>
                  <Icon className={`h-4 w-4 ${a.text}`} />
                </span>
                <h4 className="text-sm text-foreground font-medium">{g.title}</h4>
              </div>
              <ul className="relative flex flex-wrap gap-1.5 text-mono text-xs text-muted-foreground">
                {g.items.map((i) => (
                  <li key={i} className="rounded-md bg-secondary hover:bg-ember/10 hover:text-ember px-2 py-1 transition-colors cursor-default">
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Projects() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [visible, setVisible] = useState(9);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      if (category !== "All" && p.category !== category) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.blurb.toLowerCase().includes(q) ||
        p.tag.toLowerCase().includes(q) ||
        p.stack.some((s) => s.toLowerCase().includes(q))
      );
    });
  }, [query, category]);

  const shown = filtered.slice(0, visible);
  useEffect(() => { setVisible(9); }, [query, category]);

  return (
    <section id="work" className="scroll-reveal mx-auto max-w-6xl px-5 sm:px-8 py-20 sm:py-24 border-t border-border/60">
      <div className="flex items-end justify-between mb-8 gap-4 flex-wrap">
        <div>
          <SectionLabel n="04" accent="ember">Selected Work</SectionLabel>
          <h2 className="text-display text-4xl sm:text-5xl md:text-6xl">
            Things I've <span className="italic text-gradient">built</span>.
          </h2>
          <p className="mt-3 text-muted-foreground text-sm">{projects.length} public repositories, sorted by recent activity · select a case study for a closer look.</p>
        </div>
        <a href={GITHUB} target="_blank" rel="noreferrer" className="text-mono text-xs text-muted-foreground hover:text-ember inline-flex items-center gap-1 shrink-0 group">
          <Github className="h-4 w-4" /> all repos on GitHub <ArrowUpRight className="h-3 w-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>

      {/* Search + filter chips */}
      <div className="mb-8 space-y-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, stack, tags…"
            maxLength={100}
            className="w-full rounded-full bg-surface/60 border border-border pl-10 pr-9 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-ember focus:outline-none focus:ring-2 focus:ring-ember/20 transition-all"
          />
          {query && (
            <Button variant="ghost" size="icon" onClick={() => setQuery("")} aria-label="Clear search" className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full text-muted-foreground">
              <X className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {["All", ...projectCategories].map((c) => {
            const active = category === c;
            return (
              <Button
                variant="outline"
                key={c}
                onClick={() => setCategory(c)}
                className={`text-mono text-xs uppercase tracking-wider rounded-full px-3.5 py-1.5 border transition-all hover:scale-105 ${
                  active
                    ? "bg-gradient-to-r from-ember to-pink text-primary-foreground border-transparent shadow-md shadow-ember/30"
                    : "border-border text-muted-foreground hover:border-ember hover:text-ember"
                }`}
              >
                {c}
              </Button>
            );
          })}
        </div>
        <div className="text-mono text-[11px] text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? "result" : "results"}
        </div>
      </div>

      {shown.length === 0 ? (
        <div className="rounded-xl border border-border bg-surface/40 p-10 text-center text-muted-foreground">
          Nothing matches "{query}". Try another word.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {shown.map((p, i) => {
            const a = accentClass[p.accent];
            const hasCase = !!p.caseStudy;
            const CardInner = (
              <div className="card-lift group relative rounded-xl border border-border bg-surface/60 p-6 flex flex-col justify-between min-h-[240px] overflow-hidden h-full">
                <div className={`absolute -top-16 -right-16 h-40 w-40 rounded-full ${a.bg} blur-3xl opacity-50 group-hover:opacity-100 transition-opacity`} />
                <div className="relative flex items-start justify-between gap-3">
                  <span className={`text-mono text-[10px] uppercase tracking-wider rounded-full ${a.bg} ${a.text} px-2.5 py-1 border ${a.border}`}>
                    {p.tag}
                  </span>
                   <span className="text-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className="relative mt-6">
                  <h3 className="text-xl text-foreground font-medium group-hover:text-gradient transition-all">{p.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3">{p.blurb}</p>
                   {p.updatedAt && <p className="mt-3 text-mono text-[11px] text-muted-foreground">Updated {new Date(p.updatedAt).toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" })}{p.fork ? " · Fork" : ""}</p>}
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-1.5 text-mono text-[11px]">
                      {p.stack.slice(0, 3).map((s) => (
                        <span key={s} className="rounded-md border border-border px-2 py-0.5 text-muted-foreground">{s}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {hasCase && (
                        <span className={`text-mono text-[10px] uppercase inline-flex items-center gap-1 ${a.text}`}>
                          <BookOpen className="h-3 w-3" /> case
                        </span>
                      )}
                      <ExternalLink className={`h-4 w-4 text-muted-foreground group-hover:${a.text} group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all`} />
                    </div>
                  </div>
                </div>
              </div>
            );
            return hasCase ? (
              <Link key={p.slug} to="/case-study/$slug" params={{ slug: p.slug }} className="block">
                {CardInner}
              </Link>
            ) : (
              <a key={p.slug} href={p.href} target="_blank" rel="noreferrer" className="block">
                {CardInner}
              </a>
            );
          })}
        </div>
      )}

      {visible < filtered.length && (
        <div className="mt-8 flex justify-center">
          <Button variant="outline"
            onClick={() => setVisible((v) => Math.min(v + 6, filtered.length))}
            className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm hover:border-ember hover:text-ember hover:bg-ember/5 transition-all"
          >
            <Layers className="h-4 w-4" /> Load more ({filtered.length - visible} more)
          </Button>
        </div>
      )}
    </section>
  );
}

function GitHubStats() {
  const { theme } = useTheme();
  // Map our themes to github-readme-stats theme names
  const ghTheme = {
    ember: "radical",
    ocean: "tokyonight",
    neon: "synthwave",
    forest: "gruvbox",
    midnight: "midnight-purple",
    light: "graywhite",
  }[theme];

  const stats = `https://github-readme-stats.vercel.app/api?username=${GITHUB_USER}&show_icons=true&hide_border=true&count_private=true&include_all_commits=true&theme=${ghTheme}&bg_color=00000000`;
  const langs = `https://github-readme-stats.vercel.app/api/top-langs/?username=${GITHUB_USER}&layout=compact&hide_border=true&langs_count=10&theme=${ghTheme}&bg_color=00000000`;
  const streak = `https://streak-stats.demolab.com/?user=${GITHUB_USER}&hide_border=true&theme=${ghTheme}&background=00000000`;
  const graph = `https://github-readme-activity-graph.vercel.app/graph?username=${GITHUB_USER}&theme=react-dark&hide_border=true&bg_color=00000000&area=true&custom_title=Contribution%20Graph`;
  const trophy = `https://github-profile-trophy.vercel.app/?username=${GITHUB_USER}&theme=algolia&no-frame=true&column=7&margin-w=8&margin-h=8`;

  return (
    <section id="stats" className="scroll-reveal mx-auto max-w-6xl px-5 sm:px-8 py-20 sm:py-24 border-t border-border/60">
      <SectionLabel n="05" accent="sky">GitHub, in numbers</SectionLabel>
      <h2 className="text-display text-4xl sm:text-5xl md:text-6xl mb-4">
        The <span className="italic text-gradient">contribution</span> footprint.
      </h2>
      <p className="text-muted-foreground text-sm mb-10 max-w-2xl">
        Live pulls from GitHub — stats, top languages, streaks and a year of commits. Theme follows your palette pick.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-4 mb-4">
        <StatCard icon={<BarChart3 className="h-4 w-4" />} title="Overall stats" accent="ember">
          <img src={stats} alt="GitHub stats" loading="lazy" className="w-full h-auto" />
        </StatCard>
        <StatCard icon={<Code2 className="h-4 w-4" />} title="Top languages" accent="teal">
          <img src={langs} alt="Top languages" loading="lazy" className="w-full h-auto" />
        </StatCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <StatCard icon={<Activity className="h-4 w-4" />} title="Streak" accent="pink">
          <img src={streak} alt="Streak stats" loading="lazy" className="w-full h-auto" />
        </StatCard>
        <StatCard icon={<Star className="h-4 w-4" />} title="Trophies" accent="lime">
          <img src={trophy} alt="Trophies" loading="lazy" className="w-full h-auto" />
        </StatCard>
      </div>

      <StatCard icon={<GitFork className="h-4 w-4" />} title="Contribution graph" accent="violet">
        <img src={graph} alt="Contribution graph" loading="lazy" className="w-full h-auto" />
      </StatCard>

      <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
        <MiniStat k="Repos" v={String(projects.length)} accent="ember" />
        <MiniStat k="Case Studies" v={String(projects.filter((p) => p.caseStudy).length)} accent="teal" />
        <MiniStat k="Categories" v={String(projectCategories.length)} accent="violet" />
        <MiniStat k="Years coding" v="4+" accent="pink" />
      </div>
    </section>
  );
}

function StatCard({ icon, title, accent, children }: { icon: ReactNode; title: string; accent: Accent; children: ReactNode }) {
  const a = accentClass[accent];
  return (
    <div className="card-lift relative rounded-2xl border border-border bg-surface/60 p-4 sm:p-5 overflow-hidden">
      <div className={`absolute -top-16 -right-16 h-40 w-40 rounded-full ${a.bg} blur-3xl opacity-50`} />
      <div className="relative flex items-center gap-2 mb-4">
        <span className={`grid h-7 w-7 place-items-center rounded-md ${a.bg} ${a.border} border ${a.text}`}>{icon}</span>
        <h4 className="text-sm text-foreground font-medium">{title}</h4>
      </div>
      <div className="relative rounded-lg overflow-hidden">{children}</div>
    </div>
  );
}

function MiniStat({ k, v, accent }: { k: string; v: string; accent: Accent }) {
  const a = accentClass[accent];
  return (
    <div className={`rounded-xl border ${a.border} ${a.bg} p-4 card-lift`}>
      <div className={`text-mono text-[10px] ${a.text} tracking-wider uppercase`}>{k}</div>
      <div className="text-foreground font-medium text-2xl mt-1">{v}</div>
    </div>
  );
}

function Education() {
  return (
    <section id="education" className="scroll-reveal mx-auto max-w-6xl px-5 sm:px-8 py-20 sm:py-24 border-t border-border/60">
      <SectionLabel n="06" accent="lime">Education & Learning</SectionLabel>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {education.map((e, i) => {
          const accents: Accent[] = ["lime", "teal", "violet"];
          const a = accentClass[accents[i]];
          const Icon = e.icon;
          return (
            <div key={e.title} className="card-lift rounded-xl border border-border bg-surface/60 p-5">
              <span className={`grid h-10 w-10 place-items-center rounded-lg ${a.bg} ${a.border} border mb-4`}>
                <Icon className={`h-5 w-5 ${a.text}`} />
              </span>
              <h4 className="text-foreground font-medium">{e.title}</h4>
              <p className="text-sm text-muted-foreground mt-1">{e.org}</p>
              <div className="mt-3 flex items-center justify-between text-mono text-xs">
                <span className="text-muted-foreground">{e.period}</span>
                <span className={a.text}>{e.detail}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const n = name.trim().slice(0, 100);
    const em = email.trim().slice(0, 255);
    const msg = message.trim().slice(0, 1000);
    if (!n || !msg) return;
    const text = `Hi Sachin, I'm ${n}` + (em ? ` (${em})` : "") + `.\n\n${msg}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="contact" className="scroll-reveal mx-auto max-w-6xl px-5 sm:px-8 py-20 sm:py-28 border-t border-border/60">
      <SectionLabel n="07" accent="sky">Contact</SectionLabel>
      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-10 md:gap-16">
        <div>
          <h2 className="text-display text-4xl sm:text-5xl md:text-6xl leading-[1.05]">
            Have a project?<br />
            <span className="italic text-gradient">Let's build it.</span>
          </h2>
          <p className="mt-6 text-muted-foreground max-w-md">
            Messages go straight to my WhatsApp — the fastest way to reach me. For anything longer, email works too.
          </p>
          <div className="mt-8 space-y-1 text-sm">
            <ContactLine icon={<MessageCircle className="h-4 w-4" />} accent="lime" label="WhatsApp" value={WHATSAPP_DISPLAY} href={`https://wa.me/${WHATSAPP_NUMBER}`} />
            <ContactLine icon={<Mail className="h-4 w-4" />} accent="ember" label="Email" value={EMAIL} href={`mailto:${EMAIL}`} />
            <ContactLine icon={<Github className="h-4 w-4" />} accent="violet" label="GitHub" value="SACHINBODARE07" href={GITHUB} />
            <ContactLine icon={<Linkedin className="h-4 w-4" />} accent="sky" label="LinkedIn" value="sachin-bodare" href={LINKEDIN} />
            <ContactLine icon={<Instagram className="h-4 w-4" />} accent="pink" label="Instagram" value="sachinbodare21" href={INSTAGRAM} />
            <ContactLine icon={<Youtube className="h-4 w-4" />} accent="ember" label="YouTube" value="thingsofthings" href={YOUTUBE} />
            <ContactLine icon={<Globe className="h-4 w-4" />} accent="teal" label="Portfolio" value="sachinbodare-portfolio" href={OLD_PORTFOLIO} />
            <ContactLine icon={<MapPin className="h-4 w-4" />} accent="teal" label="Location" value="Pune, Maharashtra, IN" />
          </div>
        </div>

        <form onSubmit={onSubmit} className="relative rounded-2xl border border-border bg-surface/60 p-6 sm:p-8 space-y-4 overflow-hidden">
          <div className="absolute -top-20 -right-20 h-48 w-48 rounded-full bg-ember/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-violet/20 blur-3xl" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-4 text-mono text-xs text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-ember" /> DIRECT LINE
            </div>
            <Field label="Your name" required>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={100}
                required
                placeholder="Jane Doe"
                className="w-full bg-transparent border-0 border-b border-border focus:border-ember outline-none py-2 text-foreground placeholder:text-muted-foreground/60 transition-colors"
              />
            </Field>
            <Field label="Email (optional)">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                maxLength={255}
                placeholder="jane@company.com"
                className="w-full bg-transparent border-0 border-b border-border focus:border-teal outline-none py-2 text-foreground placeholder:text-muted-foreground/60 transition-colors"
              />
            </Field>
            <Field label="Message" required>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={1000}
                required
                rows={4}
                placeholder="Tell me about your project…"
                className="w-full bg-transparent border-0 border-b border-border focus:border-violet outline-none py-2 text-foreground placeholder:text-muted-foreground/60 resize-none transition-colors"
              />
              <div className="text-mono text-[10px] text-muted-foreground text-right mt-1">{message.length}/1000</div>
            </Field>
            <Button
              type="submit"
              className="w-full mt-4 group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-ember via-pink to-violet text-primary-foreground px-5 py-3 text-sm font-medium hover:shadow-xl hover:shadow-ember/40 hover:scale-[1.02] transition-all"
            >
              Send via WhatsApp <Send className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

function ContactLine({ icon, label, value, href, accent }: { icon: ReactNode; label: string; value: string; href?: string; accent: Accent }) {
  const a = accentClass[accent];
  const inner = (
    <div className={`group grid grid-cols-[24px_90px_minmax(0,1fr)] items-center gap-3 py-2.5 border-b border-border/60 hover:${a.bg} px-2 rounded-md transition-colors`}>
      <span className={a.text}>{icon}</span>
      <span className="text-mono text-[10px] text-muted-foreground uppercase tracking-wider">{label}</span>
      <span className={`text-foreground truncate group-hover:${a.text} transition`}>{value}</span>
    </div>
  );
  return href ? <a href={href} target="_blank" rel="noreferrer">{inner}</a> : inner;
}

function Field({ label, required, children }: { label: string; required?: boolean; children: ReactNode }) {
  return (
    <label className="block mt-3 first:mt-0">
      <span className="text-mono text-[11px] text-muted-foreground uppercase tracking-wider">
        {label} {required && <span className="text-ember">*</span>}
      </span>
      {children}
    </label>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-mono text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          © {new Date().getFullYear()} Sachin Bodare · Crafted with <Heart className="h-3 w-3 text-pink fill-pink" /> in Pune.
        </span>
        <div className="flex items-center gap-4">
          <a href={GITHUB} target="_blank" rel="noreferrer" className="hover:text-ember transition-colors">GitHub</a>
          <a href={LINKEDIN} target="_blank" rel="noreferrer" className="hover:text-sky transition-colors">LinkedIn</a>
          <a href={`mailto:${EMAIL}`} className="hover:text-teal transition-colors">Email</a>
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="hover:text-lime transition-colors">WhatsApp</a>
        </div>
      </div>
    </footer>
  );
}

function FloatingActions() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 300);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <div className={`fixed right-4 bottom-4 sm:right-6 sm:bottom-6 z-50 flex flex-col gap-3 transition-all duration-500 ${scrolled ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
        className="group relative grid h-12 w-12 sm:h-14 sm:w-14 place-items-center rounded-full bg-lime text-background shadow-lg shadow-lime/40 hover:scale-110 transition-transform"
      >
        <span className="absolute inset-0 rounded-full bg-lime animate-ping opacity-30" />
        <MessageCircle className="relative h-5 w-5 sm:h-6 sm:w-6" />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md bg-background border border-border px-3 py-1 text-xs text-foreground opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Chat on WhatsApp
        </span>
      </a>
      <a
        href={`mailto:${EMAIL}`}
        aria-label="Email"
        className="group relative grid h-12 w-12 sm:h-14 sm:w-14 place-items-center rounded-full bg-gradient-to-br from-ember to-pink text-primary-foreground shadow-lg shadow-ember/40 hover:scale-110 transition-transform"
      >
        <Mail className="relative h-5 w-5 sm:h-6 sm:w-6" />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md bg-background border border-border px-3 py-1 text-xs text-foreground opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Send email
        </span>
      </a>
      <a
        href="#top"
        aria-label="Back to top"
        className="group relative grid h-10 w-10 sm:h-12 sm:w-12 place-items-center rounded-full bg-surface border border-border text-muted-foreground hover:text-ember hover:border-ember transition-colors"
      >
        <GitBranch className="h-4 w-4 rotate-180" />
      </a>
    </div>
  );
}
