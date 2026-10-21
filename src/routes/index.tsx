import { createFileRoute, Link } from "@tanstack/react-router";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentType,
  type CSSProperties,
  type FormEvent,
  type PointerEvent as RPointerEvent,
  type ReactNode,
} from "react";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Send,
  Code2,
  Database,
  Cloud,
  Wrench,
  MessageCircle,
  GraduationCap,
  Award,
  Server,
  Palette as PaletteIcon,
  Instagram,
  Youtube,
  Download,
  Terminal,
  Globe,
  Search,
  X,
  BarChart3,
  Star,
  GitFork,
  Activity,
  ArrowUpRight,
  ChevronDown,
  Briefcase,
  Sprout,
  Compass,
  ExternalLink,
} from "lucide-react";
import portraitAsset from "@/assets/Sachin-Profile.jpg";
import { projects } from "@/lib/projects";

export const Route = createFileRoute("/")({
  component: Portfolio,
  head: () => ({
    meta: [
      { title: "Sachin Bodare — Coder, Traveller & Farmer" },
      { name: "description", content: "Portfolio of Sachin Bodare — full-stack developer who also travels and farms. Live sites, every GitHub repo and case studies." },
      { property: "og:title", content: "Sachin Bodare — Coder, Traveller & Farmer" },
      { property: "og:description", content: "React · Next.js · Node · MongoDB. Three worlds, one developer." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Fraunces:ital,opsz,wght@0,9..144,600;0,9..144,800;1,9..144,600&family=IBM+Plex+Sans:wght@400;500;600&family=JetBrains+Mono:wght@500;700;800&family=Nunito:wght@400;600;700;800&family=Young+Serif&display=swap",
      },
    ],
  }),
});

/* ───────────────────────── Data ───────────────────────── */

const WHATSAPP_NUMBER = "919545242549";
const WHATSAPP_DISPLAY = "+91 95452 42549";
const EMAIL = "sachinbodare2@gmail.com";
const GITHUB = "https://github.com/SACHINBODARE07";
const GITHUB_USER = "SACHINBODARE07";
const LINKEDIN = "https://www.linkedin.com/in/sachin-bodare";
const INSTAGRAM = "https://instagram.com/sachinbodare21";
const YOUTUBE = "https://youtube.com/@thingsofthings8844";
const OLD_PORTFOLIO = "https://drive.google.com/file/d/1gS6IlQE0wqa6fp79rAMMt89FQx486O9r/view?usp=sharing";

const WRAP = "mx-auto w-full max-w-[1200px] px-4 sm:px-8";

type PKey = "coder" | "traveller" | "farmer";

const PERSONAS: Record<
  PKey,
  {
    label: string;
    icon: ComponentType<{ className?: string }>;
    kicker: string;
    blurb: string;
    live: string;
    exp: string;
    expSub: string;
    stack: string;
    stackSub: string;
    repos: string;
    gallery: string;
    gallerySub: string;
    cta: string;
    gh: { title: string; text: string; sub: string; bg: string; trophy: string };
  }
> = {
  coder: {
    label: "Coder",
    icon: Terminal,
    kicker: "~/sachin $ whoami",
    blurb: "Full-stack developer. I turn requirements into production systems: Next.js front ends, Node APIs, MongoDB and PostgreSQL underneath.",
    live: "Deployed.",
    exp: "git log --career",
    expSub: "Newest commit first.",
    stack: "package.json",
    stackSub: "Everything I npm install without thinking.",
    repos: "git remote -v",
    gallery: "Screenshots from life",
    gallerySub: "Late nights, long roads and green fields. Swap in your own photos any time.",
    cta: "Open the terminal",
    gh: { title: "39ff88", text: "e6edf3", sub: "8b98a9", bg: "0f1722", trophy: "onedark" },
  },
  traveller: {
    label: "Traveller",
    icon: Compass,
    kicker: "Pune → anywhere",
    blurb: "I treat every project like a trip: pick a destination, pack light, ship before sunset, and always look for a better route.",
    live: "Postcards from production.",
    exp: "The route so far.",
    expSub: "Every stop, newest first.",
    stack: "What's in the bag.",
    stackSub: "Packed light, used daily.",
    repos: "The travel log.",
    gallery: "Along the way.",
    gallerySub: "Roads, hills and chai stops. Swap in your own photos any time.",
    cta: "Plan a trip together",
    gh: { title: "d9480f", text: "0f3b4a", sub: "5d7a85", bg: "fff3e3", trophy: "flat" },
  },
  farmer: {
    label: "Farmer",
    icon: Sprout,
    kicker: "Soil · Seasons · Software",
    blurb: "I grow crops and codebases the same way: good soil, patience, and fixing what's broken before the season turns.",
    live: "Fresh from the harvest.",
    exp: "Growing seasons.",
    expSub: "Each season, newest first.",
    stack: "The toolshed.",
    stackSub: "Well-worn tools that earn their place.",
    repos: "Every seed I've planted.",
    gallery: "From the field.",
    gallerySub: "Fields, fresh chai and weekend cricket. Swap in your own photos any time.",
    cta: "Grow something together",
    gh: { title: "3d6d14", text: "2b3a1f", sub: "6b7a58", bg: "f3eedd", trophy: "flat" },
  },
};
const P_KEYS: PKey[] = ["coder", "traveller", "farmer"];

const ROLES = ["Software Developer", "Farmer", "Frontend Developer", "Backend Developer", "Traveller"];

/**
 * Your own photos: drop files in /public/photos and set `src` (e.g. "/photos/trek.jpg").
 * Without a `src`, a hand-drawn illustration is shown instead.
 */
type ArtKind = "code" | "mountain" | "field" | "chai" | "road" | "cricket";
const PHOTOS: { title: string; caption: string; art: ArtKind; src?: string; span?: string }[] = [
  { title: "Late-night shipping", caption: "Where most of the code gets written.", art: "code", span: "md:col-span-2 md:row-span-2" },
  { title: "Mountain roads", caption: "Best debugging happens above 2,000 m.", art: "mountain" },
  { title: "The farm", caption: "Seasons teach patience.", art: "field" },
  { title: "Chai break", caption: "Standup, but with tea.", art: "chai" },
  { title: "Open road", caption: "Pune to anywhere.", art: "road", span: "md:col-span-2" },
  { title: "Weekend cricket", caption: "Off-screen hours.", art: "cricket" },
];

type Site = { name: string; url: string; cat: string; blurb: string; stack?: string[]; feat?: boolean };
const liveSites: Site[] = [
  {
    name: "MediBazzar",
    url: "https://medibazzar.com/",
    cat: "E-commerce",
    blurb: "Online marketplace for surgical, dental and healthcare supplies: brand catalogue, category browsing, seller onboarding and order tracking.",
    stack: ["Next.js"],
    feat: true,
  },
  { name: "PigoPi Technologies", url: "https://pigo-pi.com/", cat: "Company", blurb: "Company website for PigoPi Technologies, the team where I ship production apps." },
  { name: "PiTask", url: "https://pitask.pigo-pi.com/", cat: "SaaS", blurb: "PiTask task manager: plan, assign and track work across a team." },
  { name: "Edge Tours & Travels", url: "https://edge-tours-travels-next-js-jtiu.vercel.app/", cat: "Travel", blurb: "Travel and tour booking website built with Next.js.", stack: ["Next.js", "Vercel"] },
  { name: "Hotel City Residency", url: "https://hotel-city-residency-next-js-np6r.onrender.com/", cat: "Hospitality", blurb: "Hotel website with rooms and enquiries, built with Next.js.", stack: ["Next.js", "Render"] },
  { name: "PigoPi Restaurant", url: "https://restaurant.pigo-pi.com/", cat: "Hospitality", blurb: "Restaurant web app from the PigoPi product line." },
  { name: "InkMall", url: "https://inkmall.com.au/", cat: "E-commerce", blurb: "Australian e-commerce storefront." },
  { name: "Smile4U Taxi Admin", url: "https://smile4-u-taxi-web-admin-panel-react.vercel.app/", cat: "Admin", blurb: "Web admin panel for the Smile4U taxi service, built with React.", stack: ["React", "Vercel"] },
  { name: "Pukar Mahila Mandal", url: "https://pukarmahilamandal.com/", cat: "Community", blurb: "Website for Pukar Mahila Mandal, a women's community organisation." },
  { name: "SK Fishnet", url: "https://sk-fishnet.pigo-pi.com/", cat: "Business", blurb: "Business website for SK Fishnet." },
  { name: "IInspark", url: "https://www.iinspark.com/", cat: "Company", blurb: "Company website for IInspark." },
  { name: "BitSpace", url: "https://www.bitspace.tech/", cat: "Company", blurb: "Website for the BitSpace tech company." },
  { name: "Flying Monk Soul", url: "https://flyingmonksoul.com/", cat: "Brand", blurb: "Brand website for Flying Monk Soul." },
];
const siteCats = ["All", ...Array.from(new Set(liveSites.map((s) => s.cat)))];

type Repo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  pushed_at: string;
};
/** Snapshot shown only if the GitHub API can't be reached. */
const FALLBACK_REPOS: Repo[] = [
  { id: 1, name: "IInspark", description: null, html_url: `${GITHUB}/IInspark`, homepage: "https://www.iinspark.com/", language: "JavaScript", stargazers_count: 0, forks_count: 0, fork: false, pushed_at: "2026-01-01T00:00:00Z" },
  { id: 2, name: "StudentPortal", description: "ASP.NET MVC CRUD app using Entity Framework Core and SQL Server (.NET 8).", html_url: `${GITHUB}/StudentPortal`, homepage: null, language: "C#", stargazers_count: 1, forks_count: 0, fork: false, pushed_at: "2025-01-01T00:00:00Z" },
  { id: 3, name: "Automated-Tour-Planner", description: "Smart trip planner platform built with HTML, CSS, JavaScript and Java.", html_url: `${GITHUB}/Automated-Tour-Planner`, homepage: null, language: "Java", stargazers_count: 0, forks_count: 0, fork: false, pushed_at: "2024-06-01T00:00:00Z" },
  { id: 4, name: "Id-Card-Management", description: null, html_url: `${GITHUB}/Id-Card-Management`, homepage: null, language: "JavaScript", stargazers_count: 0, forks_count: 0, fork: false, pushed_at: "2024-03-01T00:00:00Z" },
  { id: 5, name: "PayingGuest-Website", description: null, html_url: `${GITHUB}/PayingGuest-Website`, homepage: null, language: null, stargazers_count: 0, forks_count: 0, fork: false, pushed_at: "2024-01-01T00:00:00Z" },
  { id: 6, name: "smart_trip_planner_ui", description: "Forked from rups20097/smart_trip_planner_ui.", html_url: `${GITHUB}/smart_trip_planner_ui`, homepage: null, language: "JavaScript", stargazers_count: 0, forks_count: 0, fork: true, pushed_at: "2023-12-01T00:00:00Z" },
];

const LANG_COLORS: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  HTML: "#e34c26",
  CSS: "#563d7c",
  SCSS: "#c6538c",
  Java: "#b07219",
  PHP: "#4F5D95",
  Python: "#3572A5",
  "C#": "#178600",
  "C++": "#f34b7d",
  C: "#555555",
  Dart: "#00B4AB",
  Vue: "#41b883",
  EJS: "#a91e50",
  Shell: "#89e051",
};

type TechDef = { slug?: string; color: string; dk?: boolean; lucide?: boolean };
const TECH: Record<string, TechDef> = {
  React: { slug: "react", color: "61DAFB" },
  "Next.js": { slug: "nextdotjs", color: "000000", dk: true },
  TypeScript: { slug: "typescript", color: "3178C6" },
  JavaScript: { slug: "javascript", color: "F7DF1E" },
  "Node.js": { slug: "nodedotjs", color: "5FA04E" },
  Express: { slug: "express", color: "000000", dk: true },
  Angular: { slug: "angular", color: "DD0031" },
  Redux: { slug: "redux", color: "764ABC" },
  Tailwind: { slug: "tailwindcss", color: "06B6D4" },
  MUI: { slug: "mui", color: "007FFF" },
  HTML5: { slug: "html5", color: "E34F26" },
  CSS3: { slug: "css3", color: "1572B6" },
  GraphQL: { slug: "graphql", color: "E10098" },
  "Socket.io": { slug: "socketdotio", color: "010101", dk: true },
  MongoDB: { slug: "mongodb", color: "47A248" },
  PostgreSQL: { slug: "postgresql", color: "4169E1" },
  MySQL: { slug: "mysql", color: "4479A1" },
  Redis: { slug: "redis", color: "FF4438" },
  Firebase: { slug: "firebase", color: "FFCA28" },
  Prisma: { slug: "prisma", color: "2D3748", dk: true },
  AWS: { color: "FF9900", lucide: true },
  Vercel: { slug: "vercel", color: "000000", dk: true },
  Netlify: { slug: "netlify", color: "00C7B7" },
  Render: { slug: "render", color: "46E3B7" },
  Docker: { slug: "docker", color: "2496ED" },
  "GitHub Actions": { slug: "githubactions", color: "2088FF" },
  Figma: { slug: "figma", color: "F24E1E" },
  Git: { slug: "git", color: "F05032" },
  Postman: { slug: "postman", color: "FF6C37" },
  JIRA: { slug: "jira", color: "0052CC" },
};
const tickerTech = ["React", "Next.js", "TypeScript", "Node.js", "Express", "MongoDB", "PostgreSQL", "Redis", "Docker", "AWS", "Tailwind", "Angular", "GraphQL", "Prisma", "Git", "Figma"];

const experience = [
  {
    role: "Software Developer",
    company: "PigoPi Technologies",
    period: "Oct 2024 — Present",
    mode: "Remote",
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
    period: "July 2023",
    mode: "Hybrid",
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
    bullets: [
      "Built MERN features with a focus on scalability and clean architecture.",
      "Optimized response time by ~25% through targeted refactors.",
      "Implemented JWT auth and shipped production-ready deployments.",
    ],
  },
];

const skillGroups = [
  { icon: Code2, title: "Frontend", items: ["React", "Next.js", "Angular", "TypeScript", "Redux", "Tailwind", "MUI", "HTML5", "CSS3"] },
  { icon: Server, title: "Backend", items: ["Node.js", "Express", "REST APIs", "GraphQL", "JWT", "OAuth", "Socket.io"] },
  { icon: Database, title: "Databases", items: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Firebase", "Mongoose", "Prisma"] },
  { icon: Cloud, title: "Cloud & DevOps", items: ["AWS", "Vercel", "Netlify", "Render", "Docker", "GitHub Actions", "CI/CD"] },
  { icon: PaletteIcon, title: "Design & UX", items: ["Figma", "Responsive", "A11y", "Design Systems", "Framer Motion"] },
  { icon: Wrench, title: "Craft", items: ["Agile / Scrum", "SDLC", "OOP", "Git", "Postman", "JIRA", "TDD"] },
];

const education = [
  { icon: GraduationCap, title: "B.E. Computer Engineering", org: "Sinhgad Institute, Pune", period: "2020 — 2024", detail: "CGPA 7.69" },
  { icon: Award, title: "MERN Stack Certification", org: "Vinsys IT Services", period: "2023 — 2024", detail: "Production-grade curriculum" },
  { icon: Terminal, title: "Full Stack Web Dev", org: "Codecademy", period: "Self-paced", detail: "Continuous learning" },
];

/* ───────────────────────── Styles ───────────────────────── */

const NOISE =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .35 0 0 0 0 .28 0 0 0 0 .15 0 0 0 .09 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

const css = `
.wd{--bg:#0b0f14;--ink:#e6edf3;--mute:#8b98a9;--card:#111823;--line:#1f2a3a;--acc:#39ff88;--acct:#39ff88;--acc2:#58a6ff;--on-acc:#04140a;
  --r:8px;--rb:14px;--shadow:0 20px 50px -26px rgba(0,0,0,.9);--glow:0 0 0 1px rgba(57,255,136,.35),0 0 30px -6px rgba(57,255,136,.35);
  --fd:'JetBrains Mono',ui-monospace,monospace;--fb:'IBM Plex Sans',system-ui,sans-serif;--dw:800;--ls:-.03em;
  background:var(--bg);color:var(--ink);font-family:var(--fb);-webkit-font-smoothing:antialiased;position:relative;overflow-x:hidden;
  transition:background-color .7s ease,color .7s ease}
.wd[data-p="traveller"]{--bg:#fff3e3;--ink:#0f3b4a;--mute:#56747f;--card:#ffffff;--line:#f0d9bd;--acc:#ff6b35;--acct:#d9480f;--acc2:#0aa5a0;--on-acc:#ffffff;
  --r:14px;--rb:24px;--shadow:0 24px 46px -28px rgba(15,59,74,.4);--glow:0 18px 40px -16px rgba(255,107,53,.5);
  --fd:'Fraunces',Georgia,serif;--fb:'DM Sans',system-ui,sans-serif;--dw:800;--ls:-.035em}
.wd[data-p="farmer"]{--bg:#f3eedd;--ink:#2b3a1f;--mute:#667552;--card:#fbf8ee;--line:#d9ceae;--acc:#4f8a1f;--acct:#3d6d14;--acc2:#c8873a;--on-acc:#ffffff;
  --r:18px;--rb:30px;--shadow:0 20px 40px -26px rgba(70,55,20,.5);--glow:0 16px 34px -14px rgba(79,138,31,.5);
  --fd:'Young Serif',Georgia,serif;--fb:'Nunito',system-ui,sans-serif;--dw:400;--ls:-.015em}
.wd *{box-sizing:border-box}
.wd ::selection{background:var(--acc);color:var(--on-acc)}
.wd a:focus-visible,.wd button:focus-visible,.wd input:focus-visible,.wd textarea:focus-visible,.wd select:focus-visible{outline:3px solid var(--acc);outline-offset:3px}

/* Per-world backdrop */
.wd-bg{position:fixed;inset:0;z-index:0;pointer-events:none;transition:opacity .7s}
.wd-bg-coder{background:
  radial-gradient(ellipse 60% 40% at 80% 0%,rgba(57,255,136,.10),transparent 70%),
  radial-gradient(ellipse 50% 40% at 0% 100%,rgba(88,166,255,.10),transparent 70%),
  linear-gradient(rgba(57,255,136,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(57,255,136,.045) 1px,transparent 1px);
  background-size:auto,auto,44px 44px,44px 44px}
.wd-bg-traveller{background:
  radial-gradient(ellipse 70% 40% at 90% 0%,rgba(255,107,53,.22),transparent 70%),
  radial-gradient(ellipse 60% 40% at 0% 100%,rgba(10,165,160,.16),transparent 70%),
  repeating-linear-gradient(115deg,transparent 0 46px,rgba(240,217,189,.55) 46px 47px)}
.wd-bg-farmer{background:
  radial-gradient(ellipse 70% 40% at 15% 0%,rgba(200,135,58,.20),transparent 70%),
  radial-gradient(ellipse 60% 40% at 100% 100%,rgba(79,138,31,.18),transparent 70%),${NOISE}}
.wd[data-p="coder"] .wd-bg-traveller,.wd[data-p="coder"] .wd-bg-farmer,
.wd[data-p="traveller"] .wd-bg-coder,.wd[data-p="traveller"] .wd-bg-farmer,
.wd[data-p="farmer"] .wd-bg-coder,.wd[data-p="farmer"] .wd-bg-traveller{opacity:0}
.wd-scan{position:fixed;inset:0;z-index:1;pointer-events:none;opacity:0;transition:opacity .7s;
  background:repeating-linear-gradient(0deg,rgba(255,255,255,.03) 0 1px,transparent 1px 3px)}
.wd[data-p="coder"] .wd-scan{opacity:1}
.wd-content{position:relative;z-index:2}

.wd-display{font-family:var(--fd);font-weight:var(--dw);letter-spacing:var(--ls)}
.wd-mute{color:var(--mute)}
.wd-acct{color:var(--acct)}
.wd-card{background:var(--card);border:1px solid var(--line);border-radius:var(--rb);box-shadow:var(--shadow);transition:background-color .7s,border-color .7s,box-shadow .3s}
.wd[data-p="coder"] .wd-card:hover{box-shadow:var(--glow)}
.wd-chip{background:color-mix(in srgb,var(--ink) 7%,transparent);border-radius:999px}
.wd[data-p="coder"] .wd-chip{border-radius:6px}
.wd-btn{background:var(--acc);color:var(--on-acc);border-radius:var(--r);font-weight:700;transition:transform .25s,box-shadow .25s,filter .25s}
.wd[data-p="traveller"] .wd-btn,.wd[data-p="farmer"] .wd-btn{border-radius:999px}
.wd-btn:hover{transform:translateY(-2px);box-shadow:var(--glow);filter:brightness(1.05)}
.wd-ghost{border:1.5px solid var(--line);border-radius:var(--r);font-weight:700;transition:border-color .25s,transform .25s}
.wd[data-p="traveller"] .wd-ghost,.wd[data-p="farmer"] .wd-ghost{border-radius:999px}
.wd-ghost:hover{border-color:var(--acc);transform:translateY(-2px)}
.wd-input{background:color-mix(in srgb,var(--ink) 5%,transparent);border:1.5px solid var(--line);color:var(--ink);border-radius:var(--r);transition:border-color .2s}
.wd-input::placeholder{color:var(--mute);opacity:.7}
.wd-input:focus{border-color:var(--acc);outline:none}
.wd-nav{background:color-mix(in srgb,var(--bg) 82%,transparent);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border-bottom:1px solid var(--line);transition:background-color .7s}
.wd-navlink{color:var(--mute);transition:color .2s}
.wd-navlink:hover{color:var(--ink)}
.wd-seg{display:inline-flex;gap:2px;padding:3px;border:1.5px solid var(--line);border-radius:999px;background:color-mix(in srgb,var(--ink) 5%,transparent)}
.wd-seg button{display:inline-flex;align-items:center;gap:6px;border-radius:999px;padding:7px 12px;font-size:13px;font-weight:700;color:var(--mute);transition:background-color .25s,color .25s}
.wd-seg button[aria-selected="true"]{background:var(--acc);color:var(--on-acc)}
.wd[data-p="coder"] .wd-seg,.wd[data-p="coder"] .wd-seg button{border-radius:8px}

.wd-kicker{display:inline-flex;gap:8px;align-items:center;font-size:13px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--acct)}
.wd-kicker::before{content:"$";opacity:.9}
.wd[data-p="traveller"] .wd-kicker::before{content:"→"}
.wd[data-p="farmer"] .wd-kicker::before{content:"✿"}
.wd[data-p="coder"] .wd-kicker{font-family:var(--fd);text-transform:none;letter-spacing:0}

.wd-badge{display:inline-block;border:1.5px solid var(--acc);color:var(--acct);padding:3px 10px;font-size:12px;font-weight:800;border-radius:999px}
.wd[data-p="coder"] .wd-badge{border-radius:4px;font-family:var(--fd);font-weight:700}
.wd[data-p="coder"] .wd-badge::before{content:"[ "}
.wd[data-p="coder"] .wd-badge::after{content:" ]"}
.wd[data-p="traveller"] .wd-badge{border-style:dashed;border-width:2px;transform:rotate(-3deg);padding:4px 12px}
.wd[data-p="farmer"] .wd-badge{background:color-mix(in srgb,var(--acc2) 22%,transparent);border-color:transparent;color:#7a4a12}
.wd-dots{display:none;gap:6px}
.wd[data-p="coder"] .wd-dots{display:flex}

/* Portrait frames */
.wd-frame{position:relative;overflow:hidden;background:var(--card);display:flex;flex-direction:column;transition:all .5s}
.wd-frame img{display:block;flex:1 1 0;min-height:0;width:100%;object-fit:cover}
.wd[data-p="coder"] .wd-frame{border:1.5px solid var(--acc);border-radius:10px;box-shadow:var(--glow)}
.wd[data-p="traveller"] .wd-frame{padding:8px 8px 40px;border-radius:6px;transform:rotate(-4deg);box-shadow:var(--shadow)}
.wd[data-p="farmer"] .wd-frame{border:5px solid var(--acc2);border-radius:999px 999px 22px 22px;box-shadow:var(--shadow)}
.wd-frame-cap{display:none;position:absolute;left:0;right:0;bottom:0;text-align:center}
.wd[data-p="traveller"] .wd-frame-cap{display:block;padding:10px;font-family:var(--fd);font-style:italic;font-size:14px;color:#0f3b4a}
.wd-frame-bar{display:none;align-items:center;gap:6px;padding:7px 10px;border-bottom:1px solid var(--line);font-family:var(--fd);font-size:11px;color:var(--mute)}
.wd[data-p="coder"] .wd-frame-bar{display:flex}
.wd-tape{display:none;position:absolute;top:-10px;left:50%;width:84px;height:24px;margin-left:-42px;background:rgba(255,196,120,.75);transform:rotate(3deg)}
.wd[data-p="traveller"] .wd-tape{display:block}

/* Motion */
.wd-fade{animation:wd-fade .7s cubic-bezier(.2,.8,.2,1) both}
@keyframes wd-fade{from{opacity:0;transform:scale(1.03)}to{opacity:1;transform:none}}
.wd-rise{animation:wd-rise .9s cubic-bezier(.2,.8,.2,1) both;animation-delay:var(--d,0ms)}
@keyframes wd-rise{from{opacity:0;transform:translateY(26px)}to{opacity:1;transform:none}}
.wd-reveal{opacity:0;transform:translateY(24px);transition:opacity .8s cubic-bezier(.2,.8,.2,1) var(--d,0ms),transform .8s cubic-bezier(.2,.8,.2,1) var(--d,0ms)}
.wd-reveal[data-in="true"]{opacity:1;transform:none}
.wd-caret{display:inline-block;width:.075em;height:.85em;margin-left:.07em;border-radius:2px;background:var(--acc);vertical-align:-.05em;animation:wd-blink 1s steps(1) infinite}
@keyframes wd-blink{50%{opacity:0}}
.wd-tilt{transform-style:preserve-3d;transform:perspective(1100px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg)) scale(var(--s,1));
  transition:transform .4s cubic-bezier(.2,.8,.2,1);will-change:transform}
.wd-tilt[data-active="true"]{transition:transform .08s linear}
.wd-shine{background:radial-gradient(circle at var(--gx,50%) var(--gy,50%),rgba(255,255,255,.35),transparent 55%);opacity:0;transition:opacity .3s;pointer-events:none;mix-blend-mode:soft-light}
.wd-tilt[data-active="true"] .wd-shine{opacity:1}
.wd-shot{transition:transform .9s cubic-bezier(.2,.8,.2,1)}
.group:hover .wd-shot{transform:scale(1.05) translateY(-2%)}
@keyframes wd-live{0%{box-shadow:0 0 0 0 rgba(61,220,151,.6)}100%{box-shadow:0 0 0 8px rgba(61,220,151,0)}}
.wd-live{animation:wd-live 2s ease-out infinite}
.wd-marq{display:flex;gap:2.75rem;width:max-content;animation:wd-marq 42s linear infinite}
.wd-marq-wrap:hover .wd-marq{animation-play-state:paused}
@keyframes wd-marq{to{transform:translateX(-50%)}}
.wd-drift{animation:wd-drift 26s linear infinite}
@keyframes wd-drift{from{transform:translateX(-40px)}to{transform:translateX(60px)}}
.wd-bobsvg{animation:wd-bobsvg 6s ease-in-out infinite}
@keyframes wd-bobsvg{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
.wd-spin{transform-box:fill-box;transform-origin:center;animation:wd-spin 9s linear infinite}
@keyframes wd-spin{to{transform:rotate(360deg)}}
.wd-plane{animation:wd-plane 16s linear infinite}
@keyframes wd-plane{from{transform:translate(-80px,20px)}to{transform:translate(640px,-30px)}}
.wd-steam{animation:wd-steam 3s ease-in-out infinite}
@keyframes wd-steam{0%{opacity:0;transform:translateY(8px)}50%{opacity:.8}100%{opacity:0;transform:translateY(-14px)}}

/* Quick-contact buttons */
.wd-fab{position:fixed;right:clamp(14px,3vw,28px);bottom:clamp(14px,3vw,28px);z-index:60;display:flex;flex-direction:column;gap:12px;
  opacity:0;transform:translateY(18px) scale(.92);pointer-events:none;transition:opacity .45s,transform .45s cubic-bezier(.2,.8,.2,1)}
.wd-fab[data-in="true"]{opacity:1;transform:none;pointer-events:auto}
.wd-fab-btn{position:relative;display:grid;place-items:center;width:56px;height:56px;border-radius:50%;color:#fff;box-shadow:0 18px 34px -14px rgba(0,0,0,.6);transition:transform .25s}
.wd-fab-btn:hover{transform:translateY(-4px) scale(1.06)}
.wd-fab-wa{background:linear-gradient(135deg,#25D366,#128C7E)}
.wd-fab-gm{background:linear-gradient(135deg,#EA4335,#FBBC05)}
.wd-fab-btn::before{content:"";position:absolute;inset:0;border-radius:50%;border:2px solid currentColor;animation:wd-fabping 3s cubic-bezier(.2,.6,.3,1) infinite}
.wd-fab-gm::before{animation-delay:1.5s}
@keyframes wd-fabping{0%{transform:scale(1);opacity:.5}100%{transform:scale(1.75);opacity:0}}
.wd-fab-label{position:absolute;right:calc(100% + 12px);white-space:nowrap;border-radius:999px;background:var(--card);color:var(--ink);border:1px solid var(--line);
  padding:8px 14px;font-size:13px;font-weight:700;opacity:0;transform:translateX(8px);pointer-events:none;transition:opacity .22s,transform .22s}
.wd-fab-btn:hover .wd-fab-label,.wd-fab-btn:focus-visible .wd-fab-label{opacity:1;transform:none}
@media (max-width:420px){.wd-fab-label{display:none}.wd-fab-btn{width:52px;height:52px}}

@media (prefers-reduced-motion:reduce){
  .wd-tilt{transform:none!important}
  .wd-fade,.wd-rise,.wd-caret,.wd-live,.wd-marq,.wd-drift,.wd-bobsvg,.wd-spin,.wd-plane,.wd-steam,.wd-fab-btn::before{animation:none!important}
  .wd-reveal{opacity:1;transform:none;transition:none}
  .wd-shot{transition:none}
  .wd *{scroll-behavior:auto!important}
}
`;

/* ───────────────────────── Helpers ───────────────────────── */

function hostOf(url: string) {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function formatMonth(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });
}

function initialsOf(name: string) {
  const parts = name.replace(/[^a-zA-Z0-9 ]/g, " ").trim().split(/\s+/);
  return (parts.length > 1 ? parts[0][0] + parts[1][0] : name.slice(0, 2)).toUpperCase();
}

function TechIcon({ name, dark, size = 16 }: { name: string; dark: boolean; size?: number }) {
  const [failed, setFailed] = useState(false);
  const t = TECH[name];
  if (!t || failed) return null;
  const hex = t.dk && dark ? "ffffff" : t.color;
  if (t.lucide) return <Cloud aria-hidden="true" style={{ width: size, height: size, color: `#${hex}` }} />;
  return (
    <img
      src={`https://cdn.simpleicons.org/${t.slug}/${hex}`}
      alt=""
      width={size}
      height={size}
      loading="lazy"
      onError={() => setFailed(true)}
      style={{ width: size, height: size }}
    />
  );
}

function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} data-in={shown} className={`wd-reveal ${className}`} style={{ "--d": `${delay}ms` } as CSSProperties}>
      {children}
    </div>
  );
}

function Tilt({ children, className = "", max = 8, scale = 1.02 }: { children: ReactNode; className?: string; max?: number; scale?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: RPointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--ry", `${(px - 0.5) * max * 2}deg`);
    el.style.setProperty("--rx", `${-(py - 0.5) * max * 2}deg`);
    el.style.setProperty("--gx", `${px * 100}%`);
    el.style.setProperty("--gy", `${py * 100}%`);
    el.style.setProperty("--s", String(scale));
    el.dataset.active = "true";
  };
  const reset = () => {
    const el = ref.current;
    if (!el) return;
    ["--rx", "--ry", "--s"].forEach((v) => el.style.removeProperty(v));
    el.dataset.active = "false";
  };
  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={reset} onPointerCancel={reset} className={`wd-tilt group ${className}`}>
      {children}
    </div>
  );
}

function Heading({ kicker, title, sub }: { kicker: string; title: ReactNode; sub?: ReactNode }) {
  return (
    <Reveal className="mb-10 max-w-2xl">
      <span className="wd-kicker">{kicker}</span>
      <h2 className="wd-display mt-3 text-4xl leading-[1.05] sm:text-5xl md:text-6xl">{title}</h2>
      {sub && <p className="wd-mute mt-4 text-base sm:text-lg">{sub}</p>}
    </Reveal>
  );
}

function useTypewriter(words: string[]) {
  const [i, setI] = useState(0);
  const [txt, setTxt] = useState("");
  const [del, setDel] = useState(false);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  useEffect(() => {
    const word = words[i];
    if (reduced) {
      setTxt(word);
      const t = setTimeout(() => setI((x) => (x + 1) % words.length), 2600);
      return () => clearTimeout(t);
    }
    let delay = del ? 36 : 85;
    if (!del && txt === word) delay = 1700;
    else if (del && txt === "") delay = 320;
    const t = setTimeout(() => {
      if (!del && txt === word) {
        setDel(true);
        return;
      }
      if (del && txt === "") {
        setDel(false);
        setI((x) => (x + 1) % words.length);
        return;
      }
      setTxt(del ? word.slice(0, txt.length - 1) : word.slice(0, txt.length + 1));
    }, delay);
    return () => clearTimeout(t);
  }, [txt, del, i, words, reduced]);
  return { txt, i };
}

type RepoStatus = "loading" | "live" | "fallback";
function useRepos() {
  const [repos, setRepos] = useState<Repo[]>(FALLBACK_REPOS);
  const [status, setStatus] = useState<RepoStatus>("loading");
  useEffect(() => {
    let off = false;
    const KEY = "wd-repos-v1";
    try {
      const cached = sessionStorage.getItem(KEY);
      if (cached) {
        const { t, d } = JSON.parse(cached);
        if (Date.now() - t < 3600e3 && Array.isArray(d) && d.length) {
          setRepos(d);
          setStatus("live");
          return;
        }
      }
    } catch {
      /* storage unavailable */
    }
    (async () => {
      try {
        const all: Repo[] = [];
        for (let page = 1; page <= 3; page++) {
          const res = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=pushed&page=${page}`, {
            headers: { Accept: "application/vnd.github+json" },
          });
          if (!res.ok) throw new Error(String(res.status));
          const batch: Repo[] = await res.json();
          all.push(...batch);
          if (batch.length < 100) break;
        }
        if (off) return;
        if (all.length) {
          setRepos(all);
          setStatus("live");
          try {
            sessionStorage.setItem(KEY, JSON.stringify({ t: Date.now(), d: all }));
          } catch {
            /* storage unavailable */
          }
        } else setStatus("fallback");
      } catch {
        if (!off) setStatus("fallback");
      }
    })();
    return () => {
      off = true;
    };
  }, []);
  return { repos, status };
}

/* ───────────────────────── Illustrations ───────────────────────── */

const codeLines: [number, [number, string][]][] = [
  [0, [[60, "#c678dd"], [110, "#e6edf3"], [40, "#e5c07b"]]],
  [1, [[50, "#61afef"], [90, "#e6edf3"], [70, "#98c379"]]],
  [1, [[70, "#c678dd"], [130, "#e6edf3"]]],
  [2, [[40, "#e5c07b"], [100, "#98c379"], [50, "#e6edf3"]]],
  [2, [[80, "#61afef"], [60, "#e6edf3"], [90, "#d19a66"]]],
  [1, [[30, "#c678dd"], [120, "#e6edf3"]]],
  [0, [[26, "#e6edf3"]]],
  [0, [[70, "#c678dd"], [100, "#61afef"], [60, "#98c379"]]],
];

function Scene({ p }: { p: PKey }) {
  if (p === "coder") {
    return (
      <svg viewBox="0 0 560 420" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Illustration of code in an editor window" className="h-full w-full">
        <rect width="560" height="420" fill="#0b121b" />
        <rect width="560" height="40" fill="#141d2a" />
        {["#ff5f56", "#ffbd2e", "#27c93f"].map((c, i) => (
          <circle key={c} cx={24 + i * 22} cy="20" r="6" fill={c} />
        ))}
        <text x="120" y="25" fill="#8b98a9" fontSize="13" fontFamily="JetBrains Mono, monospace">server.ts — sachin/portfolio</text>
        {codeLines.map(([ind, segs], row) => {
          let x = 54 + ind * 26;
          return (
            <g key={row}>
              <text x="20" y={84 + row * 34} fill="#3b4a5e" fontSize="12" fontFamily="JetBrains Mono, monospace">{row + 1}</text>
              {segs.map(([w, c], k) => {
                const rect = <rect key={k} x={x} y={72 + row * 34} width={w} height="12" rx="3" fill={c} opacity=".9" />;
                x += w + 10;
                return rect;
              })}
            </g>
          );
        })}
        <rect x="260" y="348" width="9" height="16" fill="#39ff88" style={{ animation: "wd-blink 1s steps(1) infinite" }} />
        <g fontFamily="JetBrains Mono, monospace" fontWeight="800" fill="#39ff88" opacity=".8" className="wd-bobsvg">
          <text x="440" y="120" fontSize="44">{"{ }"}</text>
          <text x="400" y="250" fontSize="34" fill="#58a6ff">{"</>"}</text>
          <text x="470" y="330" fontSize="30" fill="#e5c07b">{"=>"}</text>
        </g>
      </svg>
    );
  }
  if (p === "traveller") {
    return (
      <svg viewBox="0 0 560 420" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Illustration of mountains and a road at sunset" className="h-full w-full">
        <defs>
          <linearGradient id="tsky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ff9a62" />
            <stop offset="0.6" stopColor="#ffd3a1" />
            <stop offset="1" stopColor="#fff0d6" />
          </linearGradient>
          <radialGradient id="tsun"><stop offset="0" stopColor="#fff8d6" /><stop offset="1" stopColor="#ffd166" /></radialGradient>
        </defs>
        <rect width="560" height="420" fill="url(#tsky)" />
        <circle cx="400" cy="170" r="70" fill="#fff3c4" opacity=".45" />
        <circle cx="400" cy="170" r="48" fill="url(#tsun)" />
        <g className="wd-drift" fill="#fff" opacity=".85">
          <ellipse cx="120" cy="90" rx="46" ry="12" />
          <ellipse cx="150" cy="80" rx="30" ry="11" />
          <ellipse cx="300" cy="60" rx="38" ry="10" />
        </g>
        <g className="wd-plane">
          <path d="M0 40 l26 -6 l-6 10 l12 6 l-30 2 z" fill="#0f3b4a" />
        </g>
        <path d="M0 250 L90 160 L150 215 L230 130 L320 230 L400 170 L470 235 L560 190 V420 H0Z" fill="#f4a582" />
        <path d="M0 290 L110 210 L190 270 L280 190 L380 280 L470 220 L560 270 V420 H0Z" fill="#d6604d" />
        <path d="M230 130 l22 22 l-16 -6 l-10 14 l-8 -16 l-14 8z" fill="#fff" opacity=".8" />
        <path d="M0 330 Q140 300 280 320 T560 310 V420 H0Z" fill="#7a3340" />
        <path d="M260 322 Q220 360 150 420 H410 Q330 360 300 322Z" fill="#2b1f2a" />
        <path d="M280 326 Q268 366 250 420" stroke="#ffd166" strokeWidth="4" strokeDasharray="14 12" fill="none" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 560 420" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Illustration of green farm fields with a barn and windmill" className="h-full w-full">
      <defs>
        <linearGradient id="fsky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#cfe9f5" />
          <stop offset="1" stopColor="#fdf3d2" />
        </linearGradient>
        <clipPath id="ffield"><path d="M0 250 Q200 215 380 245 T560 235 V420 H0Z" /></clipPath>
      </defs>
      <rect width="560" height="420" fill="url(#fsky)" />
      <circle cx="110" cy="90" r="40" fill="#ffd45e" />
      <circle cx="110" cy="90" r="58" fill="#ffd45e" opacity=".25" />
      <g className="wd-drift" fill="#fff" opacity=".9">
        <ellipse cx="300" cy="80" rx="50" ry="13" />
        <ellipse cx="335" cy="68" rx="32" ry="12" />
        <ellipse cx="470" cy="120" rx="36" ry="10" />
      </g>
      <path d="M0 230 Q120 170 250 215 T560 200 V420 H0Z" fill="#b6d98a" />
      <path d="M0 250 Q200 215 380 245 T560 235 V420 H0Z" fill="#6fa83a" />
      <g clipPath="url(#ffield)" stroke="#3f6d1a" strokeWidth="2" opacity=".45">
        {Array.from({ length: 22 }).map((_, i) => (
          <line key={i} x1="280" y1="236" x2={-260 + i * 56} y2="430" />
        ))}
      </g>
      <g>
        <rect x="50" y="190" width="86" height="62" fill="#b5472f" />
        <path d="M42 192 L93 150 L144 192Z" fill="#7e2d1e" />
        <path d="M70 252 V212 H116 V252 M70 212 L116 252 M116 212 L70 252" stroke="#fff3e0" strokeWidth="3" fill="none" />
      </g>
      <g>
        <path d="M462 245 L470 150 L478 245Z" fill="#8a5a2b" />
        <g className="wd-spin" style={{ transformOrigin: "470px 150px" }}>
          {[0, 90, 180, 270].map((a) => (
            <rect key={a} x="466" y="96" width="8" height="54" fill="#fdf3d2" stroke="#8a5a2b" strokeWidth="2" transform={`rotate(${a} 470 150)`} />
          ))}
        </g>
        <circle cx="470" cy="150" r="6" fill="#8a5a2b" />
      </g>
    </svg>
  );
}

function Art({ kind }: { kind: ArtKind }) {
  const common = { viewBox: "0 0 300 220", preserveAspectRatio: "xMidYMid slice" as const, className: "h-full w-full", "aria-hidden": true };
  if (kind === "code")
    return (
      <svg {...common}>
        <rect width="300" height="220" fill="#0b121b" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect key={i} x={24 + (i % 3) * 22} y={30 + i * 26} width={80 + ((i * 37) % 120)} height="10" rx="3" fill={["#c678dd", "#61afef", "#98c379", "#e5c07b"][i % 4]} opacity=".9" />
        ))}
        <text x="214" y="180" fontSize="46" fontWeight="800" fill="#39ff88" fontFamily="JetBrains Mono, monospace">{"</>"}</text>
      </svg>
    );
  if (kind === "mountain")
    return (
      <svg {...common}>
        <defs><linearGradient id="am" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#7ec8f2" /><stop offset="1" stopColor="#ffe9c9" /></linearGradient></defs>
        <rect width="300" height="220" fill="url(#am)" />
        <circle cx="236" cy="52" r="20" fill="#fff4c2" />
        <path d="M0 190 L70 80 L120 150 L170 60 L240 160 L300 110 V220 H0Z" fill="#5b7fa6" />
        <path d="M170 60 l18 28 l-14 -6 l-8 12 l-8 -12 l-14 6z" fill="#fff" />
        <path d="M0 205 Q90 180 180 200 T300 195 V220 H0Z" fill="#2f5d50" />
      </svg>
    );
  if (kind === "field")
    return (
      <svg {...common}>
        <rect width="300" height="220" fill="#e6f3df" />
        <circle cx="60" cy="48" r="22" fill="#ffd45e" />
        <path d="M0 110 Q100 80 200 105 T300 95 V220 H0Z" fill="#9fcf6a" />
        <g stroke="#3f6d1a" strokeWidth="2" opacity=".5">
          {Array.from({ length: 12 }).map((_, i) => (
            <line key={i} x1="150" y1="110" x2={-120 + i * 42} y2="225" />
          ))}
        </g>
        <rect x="214" y="70" width="46" height="34" fill="#b5472f" />
        <path d="M208 72 L237 48 L266 72Z" fill="#7e2d1e" />
      </svg>
    );
  if (kind === "chai")
    return (
      <svg {...common}>
        <rect width="300" height="220" fill="#f7d9a8" />
        <g stroke="#b9722c" strokeWidth="5" strokeLinecap="round" fill="none">
          <path className="wd-steam" d="M125 80 q-10 -14 0 -26" />
          <path className="wd-steam" style={{ animationDelay: "1s" }} d="M150 82 q-10 -14 0 -26" />
          <path className="wd-steam" style={{ animationDelay: "2s" }} d="M175 80 q-10 -14 0 -26" />
        </g>
        <path d="M100 100 H200 L190 170 Q150 190 110 170Z" fill="#fff8ec" stroke="#b9722c" strokeWidth="4" />
        <path d="M200 114 q30 4 20 26 q-8 12 -26 10" fill="none" stroke="#b9722c" strokeWidth="4" />
        <ellipse cx="150" cy="104" rx="50" ry="8" fill="#c27a3a" />
      </svg>
    );
  if (kind === "road")
    return (
      <svg {...common}>
        <defs><linearGradient id="ar" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ff9a62" /><stop offset="1" stopColor="#ffe4bd" /></linearGradient></defs>
        <rect width="300" height="220" fill="url(#ar)" />
        <circle cx="210" cy="96" r="26" fill="#fff3c4" />
        <path d="M0 120 L60 80 L110 110 L170 70 L230 108 L300 84 V220 H0Z" fill="#d6604d" />
        <path d="M0 140 Q150 120 300 138 V220 H0Z" fill="#7a3340" />
        <path d="M138 138 L60 220 H240 L162 138Z" fill="#2b1f2a" />
        <path d="M150 142 L150 220" stroke="#ffd166" strokeWidth="3" strokeDasharray="10 9" />
      </svg>
    );
  return (
    <svg {...common}>
      <rect width="300" height="220" fill="#cfe9f5" />
      <rect y="120" width="300" height="100" fill="#7fb348" />
      <ellipse cx="150" cy="150" rx="110" ry="22" fill="#a9d678" opacity=".7" />
      <g transform="rotate(-28 120 120)"><rect x="104" y="40" width="22" height="110" rx="9" fill="#d9a05b" /><rect x="110" y="148" width="10" height="38" rx="4" fill="#7a4a1e" /></g>
      <circle cx="205" cy="150" r="14" fill="#c62828" />
      <path d="M195 146 q10 8 20 0" stroke="#fff" strokeWidth="2" fill="none" />
    </svg>
  );
}

/* ───────────────────────── Page ───────────────────────── */

function Portfolio() {
  const [p, setP] = useState<PKey>("coder");
  const { repos, status } = useRepos();

  useEffect(() => {
    try {
      const saved = localStorage.getItem("wd-world") as PKey | null;
      if (saved && P_KEYS.includes(saved)) setP(saved);
    } catch {
      /* storage unavailable */
    }
  }, []);

  const choose = (k: PKey) => {
    setP(k);
    try {
      localStorage.setItem("wd-world", k);
    } catch {
      /* storage unavailable */
    }
  };

  const T = PERSONAS[p];
  const dark = p === "coder";

  return (
    <div className="wd min-h-screen" data-p={p} style={{ colorScheme: dark ? "dark" : "light" }}>
      <style>{css}</style>
      <div className="wd-bg wd-bg-coder" aria-hidden="true" />
      <div className="wd-bg wd-bg-traveller" aria-hidden="true" />
      <div className="wd-bg wd-bg-farmer" aria-hidden="true" />
      <div className="wd-scan" aria-hidden="true" />

      <div className="wd-content">
        <Nav p={p} onChoose={choose} />
        <main>
          <Hero p={p} T={T} dark={dark} repoCount={repos.length} />
          <Ticker dark={dark} />
          <Worlds p={p} onChoose={choose} />
          <LiveSites T={T} dark={dark} />
          <Experience T={T} />
          <CaseStudies dark={dark} />
          <Repos T={T} repos={repos} status={status} />
          <Stack T={T} dark={dark} />
          <Gallery T={T} />
          <GitHubStats T={T} />
          <Education />
          <Contact T={T} />
        </main>
        <Footer />
      </div>
      <FloatingContact />
    </div>
  );
}

function Nav({ p, onChoose }: { p: PKey; onChoose: (k: PKey) => void }) {
  const links = [
    { h: "#live", l: "Live sites" },
    { h: "#repos", l: "Repos" },
    { h: "#experience", l: "Experience" },
    { h: "#gallery", l: "Gallery" },
    { h: "#contact", l: "Contact" },
  ];
  return (
    <header className="wd-nav sticky top-0 z-40">
      <div className={`${WRAP} flex h-16 items-center justify-between gap-3`}>
        <a href="#top" className="flex items-center gap-2.5" aria-label="Sachin Bodare — home">
          <span className="wd-display grid h-10 w-10 place-items-center rounded-[var(--r)] bg-[var(--acc)] text-sm text-[var(--on-acc)]">SB</span>
          <span className="wd-display hidden text-base sm:block">Sachin Bodare</span>
        </a>
        <nav className="hidden items-center gap-6 text-sm font-semibold lg:flex" aria-label="Primary">
          {links.map((i) => (
            <a key={i.h} href={i.h} className="wd-navlink">
              {i.l}
            </a>
          ))}
        </nav>
        <div className="wd-seg" role="tablist" aria-label="Choose a world">
          {P_KEYS.map((k) => {
            const Icon = PERSONAS[k].icon;
            return (
              <button key={k} role="tab" aria-selected={p === k} onClick={() => onChoose(k)} aria-label={PERSONAS[k].label}>
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{PERSONAS[k].label}</span>
              </button>
            );
          })}
        </div>
      </div>
      <nav aria-label="Sections" className="flex gap-5 overflow-x-auto px-4 pb-2.5 text-sm font-semibold [scrollbar-width:none] lg:hidden">
        {links.map((i) => (
          <a key={i.h} href={i.h} className="wd-navlink shrink-0">
            {i.l}
          </a>
        ))}
      </nav>
    </header>
  );
}

function Hero({ p, T, dark, repoCount }: { p: PKey; T: (typeof PERSONAS)[PKey]; dark: boolean; repoCount: number }) {
  const caseCount = projects.filter((x) => x.caseStudy).length;
  const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;
  const { txt } = useTypewriter(ROLES);
  void dark;

  return (
    <section id="top" className={`${WRAP} scroll-mt-24 pb-16 pt-10 sm:pt-16 lg:pb-24`}>
      <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        <div>
          <span className="wd-kicker wd-rise" style={d(0)}>
            {T.kicker}
          </span>
          <h1 className="wd-display wd-rise mt-4 text-[2.8rem] leading-[1.02] sm:text-7xl lg:text-[5.4rem]" style={d(100)}>
            <span className="sr-only">Sachin Bodare: software developer, farmer, frontend developer, backend developer and traveller.</span>
            <span aria-hidden="true">
              Sachin
              <br />
              Bodare
            </span>
          </h1>
          <p className="wd-display wd-rise mt-5 min-h-[1.3em] text-2xl sm:text-4xl" style={{ ...d(220), color: "var(--acct)" }} aria-hidden="true">
            <span className="wd-mute text-[.7em] font-semibold">a </span>
            {txt}
            <span className="wd-caret" />
          </p>
          <p className="wd-mute wd-rise mt-6 max-w-xl text-lg leading-relaxed" style={d(320)}>
            {T.blurb}
          </p>
          <div className="wd-rise mt-9 flex flex-wrap gap-3" style={d(420)}>
            <a href="#live" className="wd-btn inline-flex items-center gap-2 px-7 py-3.5 text-base">
              See live projects <ArrowUpRight className="h-5 w-5" />
            </a>
            <a href="#contact" className="wd-ghost inline-flex items-center gap-2 px-7 py-3.5 text-base">
              <MessageCircle className="h-5 w-5" /> {T.cta}
            </a>
            <a href={OLD_PORTFOLIO} target="_blank" rel="noreferrer" className="wd-navlink inline-flex items-center gap-2 px-4 py-3.5 text-base font-bold">
              <Download className="h-5 w-5" /> Resume
            </a>
          </div>
          <p className="wd-mute wd-rise mt-8 text-sm font-semibold" style={d(520)}>
            Open to work · Pune · {liveSites.length} live sites · {repoCount} public repos{caseCount > 0 ? ` · ${caseCount} case studies` : ""}
          </p>
        </div>

        <div className="wd-rise relative pb-10" style={d(260)}>
          <Tilt max={6} scale={1.015}>
            <div key={p} className="wd-card wd-fade relative aspect-[4/3] overflow-hidden">
              <Scene p={p} />
              <div className="wd-shine absolute inset-0" />
            </div>
          </Tilt>
          <div className="absolute -bottom-0 -left-2 w-36 sm:-left-8 sm:w-48">
            <div className="wd-frame aspect-[4/5]">
              <div className="wd-frame-bar">
                <i className="h-2 w-2 rounded-full bg-[#ff5f56]" />
                <i className="h-2 w-2 rounded-full bg-[#ffbd2e]" />
                <i className="h-2 w-2 rounded-full bg-[#27c93f]" />
                <span className="ml-1">me.jpg</span>
              </div>
              <img src={portraitAsset} alt="Sachin Bodare portrait" width={512} height={512} />
              <span className="wd-frame-cap">Pune → anywhere</span>
            </div>
            <span className="wd-tape" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Ticker({ dark }: { dark: boolean }) {
  const items = [...tickerTech, ...tickerTech];
  return (
    <div className="wd-marq-wrap overflow-hidden border-y border-[var(--line)] py-4" aria-label="Technologies I use">
      <div className="wd-marq">
        {items.map((t, i) => (
          <span key={`${t}-${i}`} className="wd-display inline-flex items-center gap-2.5 text-sm" style={{ fontWeight: 700 }}>
            <TechIcon name={t} dark={dark} size={20} />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function Worlds({ p, onChoose }: { p: PKey; onChoose: (k: PKey) => void }) {
  const cards: { k: PKey; art: ArtKind; title: string; text: string }[] = [
    { k: "coder", art: "code", title: "The coder", text: "React, Next.js, Node and MongoDB by day. Auth, RBAC, dashboards and the polished front ends on top." },
    { k: "traveller", art: "mountain", title: "The traveller", text: "Always chasing the next road, view and chai stop. Travel is where my best ideas show up." },
    { k: "farmer", art: "field", title: "The farmer", text: "Seasons, soil and patience. Farming taught me to plan long, work steady and fix things early." },
  ];
  return (
    <section id="about" className={`${WRAP} scroll-mt-24 py-16 sm:py-24`}>
      <Heading kicker="About" title="Three lives, one developer." sub="Pick a world. The whole site changes with it." />
      <div className="grid gap-5 md:grid-cols-3">
        {cards.map((c, i) => {
          const Icon = PERSONAS[c.k].icon;
          const active = p === c.k;
          return (
            <Reveal key={c.k} delay={i * 90} className="h-full">
              <Tilt max={6} className="h-full">
                <article className="wd-card flex h-full flex-col overflow-hidden" style={active ? { borderColor: "var(--acc)" } : undefined}>
                  <div className="aspect-[3/2] overflow-hidden">
                    <Art kind={c.art} />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="wd-display flex items-center gap-2 text-2xl">
                      <Icon className="wd-acct h-5 w-5" /> {c.title}
                    </h3>
                    <p className="wd-mute mt-3 text-[15px] leading-relaxed">{c.text}</p>
                    <button
                      onClick={() => onChoose(c.k)}
                      aria-pressed={active}
                      className={`mt-auto pt-5 text-left text-sm font-bold ${active ? "wd-acct" : "wd-navlink"}`}
                    >
                      {active ? "You're in this world" : `Switch to ${PERSONAS[c.k].label.toLowerCase()} mode →`}
                    </button>
                  </div>
                </article>
              </Tilt>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function ShotImg({ site }: { site: Site }) {
  const [failed, setFailed] = useState(false);
  const src = `https://image.thum.io/get/width/900/crop/560/noanimate/${site.url}`;
  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-[color-mix(in_srgb,var(--acc)_14%,transparent)]">
      {failed ? (
        <span className="wd-display absolute inset-0 grid place-items-center text-7xl text-[var(--acct)] sm:text-8xl">{initialsOf(site.name)}</span>
      ) : (
        <img src={src} alt={`${site.name} homepage preview`} width={900} height={560} loading="lazy" onError={() => setFailed(true)} className="wd-shot h-full w-full object-cover object-top" />
      )}
      <div className="wd-shine absolute inset-0" />
    </div>
  );
}

function LiveSites({ T, dark }: { T: (typeof PERSONAS)[PKey]; dark: boolean }) {
  const [cat, setCat] = useState("All");
  const list = liveSites.filter((s) => cat === "All" || s.cat === cat);
  return (
    <section id="live" className={`${WRAP} scroll-mt-24 py-12 sm:py-20`}>
      <Heading kicker="Live sites" title={T.live} sub={`${liveSites.length} production websites and apps you can open right now.`} />
      <div className="-mx-4 mb-8 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
        {siteCats.map((c) => {
          const active = cat === c;
          return (
            <button
              key={c}
              onClick={() => setCat(c)}
              aria-pressed={active}
              className={`shrink-0 px-4 py-2 text-sm ${active ? "wd-btn" : "wd-ghost"}`}
            >
              {c}
            </button>
          );
        })}
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {list.map((s, i) => (
          <Reveal key={s.url} delay={(i % 3) * 80} className={`h-full ${s.feat && cat === "All" ? "lg:col-span-2" : ""}`}>
            <Tilt max={6} scale={1.02} className="h-full">
              <article className="wd-card relative flex h-full flex-col overflow-hidden">
                <div className="flex items-center gap-3 border-b border-[var(--line)] px-4 py-2.5">
                  <span className="wd-dots" aria-hidden="true">
                    <i className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                    <i className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                    <i className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
                  </span>
                  <span className="wd-chip wd-mute min-w-0 flex-1 truncate px-3 py-1 text-xs font-semibold">{hostOf(s.url)}</span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2fae77]">
                    <i className="wd-live h-2 w-2 rounded-full bg-[#3ddc97]" /> Live
                  </span>
                </div>
                <ShotImg site={s} />
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="wd-display text-xl leading-tight sm:text-2xl">{s.name}</h3>
                    <span className="wd-badge shrink-0">{s.cat}</span>
                  </div>
                  <p className="wd-mute mt-2 text-sm leading-relaxed">{s.blurb}</p>
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4">
                    <div className="flex flex-wrap gap-1.5 text-xs font-bold">
                      {(s.stack ?? []).map((t) => (
                        <span key={t} className="wd-chip inline-flex items-center gap-1.5 px-2.5 py-1">
                          <TechIcon name={t} dark={dark} size={12} />
                          {t}
                        </span>
                      ))}
                    </div>
                    <span className="wd-acct inline-flex items-center gap-1 text-sm font-bold">
                      Visit site <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
                <a href={s.url} target="_blank" rel="noreferrer" aria-label={`Open ${s.name} (${hostOf(s.url)})`} className="absolute inset-0" style={{ borderRadius: "var(--rb)" }} />
              </article>
            </Tilt>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Experience({ T }: { T: (typeof PERSONAS)[PKey] }) {
  return (
    <section id="experience" className={`${WRAP} scroll-mt-24 py-12 sm:py-16`}>
      <Heading kicker="Experience" title={T.exp} sub={T.expSub} />
      <ol className="relative space-y-6 border-l-2 border-[var(--line)] pl-6 sm:pl-10">
        {experience.map((e, i) => (
          <li key={e.role + e.company} className="relative">
            <span
              className="absolute -left-[33px] top-7 grid h-4 w-4 place-items-center rounded-full border-4 sm:-left-[49px]"
              style={{ background: i === 0 ? "var(--acc)" : "var(--acc2)", borderColor: "var(--bg)" }}
            />
            <Reveal delay={i * 90}>
              <article className="wd-card p-6 sm:p-8">
                <header className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="wd-display flex items-center gap-2 text-2xl sm:text-3xl">
                    <Briefcase className="wd-acct h-5 w-5 shrink-0" /> {e.role}
                  </h3>
                  <span className="wd-acct text-sm font-bold">{e.period}</span>
                </header>
                <p className="wd-mute mt-1 font-semibold">
                  {e.company} · {e.mode}
                </p>
                <ul className="mt-5 space-y-2.5 text-[15px] leading-relaxed">
                  {e.bullets.map((b) => (
                    <li key={b} className="grid grid-cols-[14px_minmax(0,1fr)] gap-2">
                      <span className="mt-2 h-2 w-2 rounded-full bg-[var(--acc)]" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}

function CaseStudies({ dark }: { dark: boolean }) {
  const list = projects.filter((x) => x.caseStudy);
  if (list.length === 0) return null;
  return (
    <section id="work" className={`${WRAP} scroll-mt-24 py-12 sm:py-20`}>
      <Heading kicker="Case studies" title="How it was built." sub="A closer look at a few of these projects." />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {list.map((x, i) => (
          <Reveal key={x.slug} delay={(i % 3) * 80} className="h-full">
            <Link to="/case-study/$slug" params={{ slug: x.slug }} className="block h-full" style={{ borderRadius: "var(--rb)" }}>
              <Tilt max={6} className="h-full">
                <article className="wd-card flex h-full flex-col p-6">
                  <span className="wd-badge self-start">{x.tag}</span>
                  <h3 className="wd-display mt-4 text-xl">{x.name}</h3>
                  <p className="wd-mute mt-2 line-clamp-3 text-sm leading-relaxed">{x.blurb}</p>
                  <div className="mt-auto flex flex-wrap gap-1.5 pt-4 text-xs font-bold">
                    {x.stack.slice(0, 3).map((s) => (
                      <span key={s} className="wd-chip inline-flex items-center gap-1.5 px-2.5 py-1">
                        <TechIcon name={s} dark={dark} size={12} />
                        {s}
                      </span>
                    ))}
                  </div>
                </article>
              </Tilt>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Repos({ T, repos, status }: { T: (typeof PERSONAS)[PKey]; repos: Repo[]; status: RepoStatus }) {
  const [query, setQuery] = useState("");
  const [lang, setLang] = useState("All");
  const [hideForks, setHideForks] = useState(false);
  const [sort, setSort] = useState<"recent" | "stars" | "name">("recent");
  const [visible, setVisible] = useState(12);

  const langs = useMemo(() => {
    const counts = new Map<string, number>();
    repos.forEach((r) => r.language && counts.set(r.language, (counts.get(r.language) ?? 0) + 1));
    return ["All", ...[...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8).map(([l]) => l)];
  }, [repos]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = repos.filter((r) => {
      if (hideForks && r.fork) return false;
      if (lang !== "All" && r.language !== lang) return false;
      if (!q) return true;
      return r.name.toLowerCase().includes(q) || (r.description ?? "").toLowerCase().includes(q) || (r.language ?? "").toLowerCase().includes(q);
    });
    const sorted = [...list];
    if (sort === "recent") sorted.sort((a, b) => +new Date(b.pushed_at) - +new Date(a.pushed_at));
    if (sort === "stars") sorted.sort((a, b) => b.stargazers_count - a.stargazers_count || +new Date(b.pushed_at) - +new Date(a.pushed_at));
    if (sort === "name") sorted.sort((a, b) => a.name.localeCompare(b.name));
    return sorted;
  }, [repos, query, lang, hideForks, sort]);

  useEffect(() => {
    setVisible(12);
  }, [query, lang, hideForks, sort]);

  const shown = filtered.slice(0, visible);

  return (
    <section id="repos" className={`${WRAP} scroll-mt-24 py-16 sm:py-24`}>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <Heading
          kicker="GitHub"
          title={T.repos}
          sub={
            status === "fallback"
              ? "GitHub's API didn't respond (it rate-limits visitors), so this is a saved snapshot. Open GitHub for the complete list."
              : `${repos.length} public repositories, pulled live and sorted by recent activity.`
          }
        />
        <a href={GITHUB} target="_blank" rel="noreferrer" className="wd-ghost mb-10 inline-flex items-center gap-2 px-5 py-2.5 text-sm">
          <Github className="h-4 w-4" /> View profile on GitHub
        </a>
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-[220px] max-w-md flex-1">
            <label htmlFor="repo-search" className="sr-only">
              Search repositories
            </label>
            <Search className="wd-mute absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2" />
            <input id="repo-search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search repos, languages" maxLength={100} className="wd-input w-full py-3 pl-11 pr-11 text-sm" />
            {query && (
              <button onClick={() => setQuery("")} aria-label="Clear search" className="wd-navlink absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <label className="sr-only" htmlFor="repo-sort">
            Sort repositories
          </label>
          <select id="repo-sort" value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} className="wd-input px-4 py-3 text-sm font-bold">
            <option value="recent">Recently updated</option>
            <option value="stars">Most starred</option>
            <option value="name">Name A–Z</option>
          </select>
          <button onClick={() => setHideForks((v) => !v)} aria-pressed={hideForks} className={`px-4 py-3 text-sm ${hideForks ? "wd-btn" : "wd-ghost"}`}>
            Hide forks
          </button>
        </div>
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
          {langs.map((l) => {
            const active = lang === l;
            return (
              <button key={l} onClick={() => setLang(l)} aria-pressed={active} className={`inline-flex shrink-0 items-center gap-2 px-4 py-2 text-sm ${active ? "wd-btn" : "wd-ghost"}`}>
                {l !== "All" && <i className="h-2.5 w-2.5 rounded-full" style={{ background: LANG_COLORS[l] ?? "#8b8fa8" }} />}
                {l}
              </button>
            );
          })}
        </div>
        <p className="wd-mute text-sm" aria-live="polite">
          {status === "loading" ? "Loading from GitHub…" : `${filtered.length} ${filtered.length === 1 ? "repository" : "repositories"}`}
        </p>
      </div>

      {shown.length === 0 ? (
        <div className="wd-card wd-mute mt-8 p-10 text-center">No repositories match. Clear the search or pick another language.</div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((r, i) => (
            <Reveal key={r.id} delay={(i % 3) * 60} className="h-full">
              <Tilt max={4} scale={1.015} className="h-full">
                <article className="wd-card relative flex h-full flex-col p-5">
                  <div className="flex items-start gap-3">
                    <span className="wd-chip grid h-10 w-10 shrink-0 place-items-center">{r.fork ? <GitFork className="wd-acct h-5 w-5" /> : <Github className="wd-acct h-5 w-5" />}</span>
                    <div className="min-w-0 flex-1">
                      <h3 className="wd-display truncate text-lg leading-tight">
                        <a href={r.html_url} target="_blank" rel="noreferrer" className="after:absolute after:inset-0" style={{ outlineOffset: 2 }}>
                          {r.name}
                        </a>
                      </h3>
                      {r.fork && <span className="wd-mute text-xs font-bold">Forked repository</span>}
                    </div>
                    {r.homepage && /^https?:\/\//.test(r.homepage) && (
                      <a href={r.homepage} target="_blank" rel="noreferrer" aria-label={`Open ${r.name} live site`} className="wd-chip wd-mute relative z-10 grid h-9 w-9 shrink-0 place-items-center transition hover:text-[var(--acct)]">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                  <p className="wd-mute mt-3 line-clamp-2 text-sm leading-relaxed">{r.description ?? "No description yet."}</p>
                  <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-4 text-xs font-bold">
                    {r.language && (
                      <span className="inline-flex items-center gap-1.5">
                        <i className="h-2.5 w-2.5 rounded-full" style={{ background: LANG_COLORS[r.language] ?? "#8b8fa8" }} />
                        {r.language}
                      </span>
                    )}
                    <span className="wd-mute inline-flex items-center gap-1">
                      <Star className="h-3.5 w-3.5" /> {r.stargazers_count}
                    </span>
                    <span className="wd-mute inline-flex items-center gap-1">
                      <GitFork className="h-3.5 w-3.5" /> {r.forks_count}
                    </span>
                    <span className="wd-mute ml-auto">Updated {formatMonth(r.pushed_at)}</span>
                  </div>
                </article>
              </Tilt>
            </Reveal>
          ))}
        </div>
      )}

      {visible < filtered.length && (
        <div className="mt-10 flex justify-center">
          <button onClick={() => setVisible((v) => Math.min(v + 12, filtered.length))} className="wd-ghost inline-flex items-center gap-2 px-7 py-3.5 text-sm">
            <ChevronDown className="h-4 w-4" /> Show {Math.min(12, filtered.length - visible)} more
          </button>
        </div>
      )}
    </section>
  );
}

function Stack({ T, dark }: { T: (typeof PERSONAS)[PKey]; dark: boolean }) {
  return (
    <section id="skills" className={`${WRAP} scroll-mt-24 py-12 sm:py-16`}>
      <Heading kicker="Stack" title={T.stack} sub={T.stackSub} />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((g, i) => {
          const Icon = g.icon;
          return (
            <Reveal key={g.title} delay={(i % 3) * 80} className="h-full">
              <Tilt max={5} scale={1.015} className="h-full">
                <div className="wd-card h-full p-6">
                  <span className="mb-4 grid h-11 w-11 place-items-center rounded-[var(--r)] bg-[var(--acc)] text-[var(--on-acc)]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="wd-display text-xl">{g.title}</h3>
                  <ul className="mt-4 flex flex-wrap gap-2 text-xs font-bold">
                    {g.items.map((s) => (
                      <li key={s} className="wd-chip inline-flex items-center gap-1.5 px-3 py-1.5">
                        <TechIcon name={s} dark={dark} size={14} />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </Tilt>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function Gallery({ T }: { T: (typeof PERSONAS)[PKey] }) {
  return (
    <section id="gallery" className={`${WRAP} scroll-mt-24 py-16 sm:py-24`}>
      <Heading kicker="Gallery" title={T.gallery} sub={T.gallerySub} />
      <div className="grid auto-rows-[190px] grid-cols-2 gap-4 md:grid-cols-4 md:auto-rows-[200px]">
        {PHOTOS.map((ph, i) => (
          <Reveal key={ph.title} delay={(i % 4) * 70} className={`h-full ${ph.span ?? ""}`}>
            <figure className="wd-card group relative h-full overflow-hidden">
              <div className="h-full w-full transition-transform duration-700 group-hover:scale-105">
                {ph.src ? <img src={ph.src} alt={ph.title} loading="lazy" className="h-full w-full object-cover" /> : <Art kind={ph.art} />}
              </div>
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
                <span className="wd-display block text-base leading-tight sm:text-lg">{ph.title}</span>
                <span className="block text-xs opacity-85">{ph.caption}</span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function StatCard({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <Reveal className="h-full">
      <div className="wd-card h-full p-5">
        <div className="mb-4 flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-[var(--r)] bg-[var(--acc)] text-[var(--on-acc)]">{icon}</span>
          <h3 className="wd-display text-base">{title}</h3>
        </div>
        <div className="overflow-hidden rounded-xl">{children}</div>
      </div>
    </Reveal>
  );
}

function GitHubStats({ T }: { T: (typeof PERSONAS)[PKey] }) {
  const c = T.gh;
  const base = `username=${GITHUB_USER}&hide_border=true&bg_color=00000000&title_color=${c.title}&text_color=${c.text}&icon_color=${c.title}`;
  const stats = `https://github-readme-stats.vercel.app/api?${base}&show_icons=true&count_private=true&include_all_commits=true`;
  const langs = `https://github-readme-stats.vercel.app/api/top-langs/?${base}&layout=compact&langs_count=10`;
  const streak = `https://streak-stats.demolab.com/?user=${GITHUB_USER}&hide_border=true&background=00000000&ring=${c.title}&fire=${c.title}&currStreakNum=${c.text}&sideNums=${c.text}&currStreakLabel=${c.title}&sideLabels=${c.sub}&dates=${c.sub}`;
  const graph = `https://github-readme-activity-graph.vercel.app/graph?username=${GITHUB_USER}&hide_border=true&bg_color=${c.bg}&color=${c.text}&line=${c.title}&point=${c.text}&area=true&area_color=${c.title}&title_color=${c.text}&custom_title=Contribution%20Graph`;
  const trophy = `https://github-profile-trophy.vercel.app/?username=${GITHUB_USER}&theme=${c.trophy}&no-frame=true&no-bg=true&column=7&margin-w=8&margin-h=8`;
  return (
    <section id="stats" className={`${WRAP} scroll-mt-24 py-12 sm:py-20`}>
      <Heading kicker="Numbers" title="GitHub, in numbers." sub="Live from GitHub: stats, top languages, streaks and a year of commits." />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <StatCard icon={<BarChart3 className="h-4 w-4" />} title="Overall stats">
          <img src={stats} alt="GitHub stats" loading="lazy" className="h-auto w-full" />
        </StatCard>
        <StatCard icon={<Code2 className="h-4 w-4" />} title="Top languages">
          <img src={langs} alt="Top languages" loading="lazy" className="h-auto w-full" />
        </StatCard>
      </div>
      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <StatCard icon={<Activity className="h-4 w-4" />} title="Streak">
          <img src={streak} alt="Streak stats" loading="lazy" className="h-auto w-full" />
        </StatCard>
        <StatCard icon={<Star className="h-4 w-4" />} title="Trophies">
          <img src={trophy} alt="Trophies" loading="lazy" className="h-auto w-full" />
        </StatCard>
      </div>
      <div className="mt-5">
        <StatCard icon={<GitFork className="h-4 w-4" />} title="Contribution graph">
          <img src={graph} alt="Contribution graph" loading="lazy" className="h-auto w-full" />
        </StatCard>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education" className={`${WRAP} scroll-mt-24 py-12 sm:py-16`}>
      <Heading kicker="Learning" title="Education & learning." />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {education.map((e, i) => {
          const Icon = e.icon;
          return (
            <Reveal key={e.title} delay={i * 90} className="h-full">
              <div className="wd-card h-full p-6">
                <span className="mb-4 grid h-11 w-11 place-items-center rounded-[var(--r)] bg-[var(--acc)] text-[var(--on-acc)]">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="wd-display text-xl leading-tight">{e.title}</h3>
                <p className="wd-mute mt-1 text-sm">{e.org}</p>
                <div className="mt-4 flex items-center justify-between text-xs font-bold">
                  <span className="wd-mute">{e.period}</span>
                  <span className="wd-acct">{e.detail}</span>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function ContactLine({ icon, label, value, href }: { icon: ReactNode; label: string; value: string; href?: string }) {
  const inner = (
    <div className="grid grid-cols-[24px_84px_minmax(0,1fr)] items-center gap-3 rounded-[var(--r)] px-3 py-3 text-sm transition hover:bg-[color-mix(in_srgb,var(--ink)_6%,transparent)]">
      <span className="wd-acct">{icon}</span>
      <span className="wd-mute font-semibold">{label}</span>
      <span className="truncate font-bold">{value}</span>
    </div>
  );
  return href ? (
    <a href={href} target="_blank" rel="noreferrer" className="block">
      {inner}
    </a>
  ) : (
    inner
  );
}

function Field({ id, label, children }: { id: string; label: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-bold">
        {label}
      </label>
      {children}
    </div>
  );
}

function Contact({ T }: { T: (typeof PERSONAS)[PKey] }) {
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

  const input = "wd-input w-full px-4 py-3";

  return (
    <section id="contact" className={`${WRAP} scroll-mt-24 py-16 sm:py-24`}>
      <Reveal>
        <div className="wd-card grid gap-12 p-7 sm:p-12 md:grid-cols-2 md:gap-14">
          <div>
            <span className="wd-kicker">Contact</span>
            <h2 className="wd-display mt-3 text-5xl leading-[1] sm:text-6xl">
              Have a project? <span className="wd-acct">{T.cta}.</span>
            </h2>
            <p className="wd-mute mt-5 max-w-md">Messages go straight to my WhatsApp, the fastest way to reach me. For anything longer, email works too.</p>
            <div className="-mx-3 mt-6">
              <ContactLine icon={<MessageCircle className="h-4 w-4" />} label="WhatsApp" value={WHATSAPP_DISPLAY} href={`https://wa.me/${WHATSAPP_NUMBER}`} />
              <ContactLine icon={<Mail className="h-4 w-4" />} label="Email" value={EMAIL} href={`mailto:${EMAIL}`} />
              <ContactLine icon={<Github className="h-4 w-4" />} label="GitHub" value="SACHINBODARE07" href={GITHUB} />
              <ContactLine icon={<Linkedin className="h-4 w-4" />} label="LinkedIn" value="sachin-bodare" href={LINKEDIN} />
              <ContactLine icon={<Instagram className="h-4 w-4" />} label="Instagram" value="sachinbodare21" href={INSTAGRAM} />
              <ContactLine icon={<Youtube className="h-4 w-4" />} label="YouTube" value="thingsofthings" href={YOUTUBE} />
              <ContactLine icon={<Globe className="h-4 w-4" />} label="Resume" value="Download my resume" href={OLD_PORTFOLIO} />
              <ContactLine icon={<MapPin className="h-4 w-4" />} label="Location" value="Pune, Maharashtra, IN" />
            </div>
          </div>
          <form onSubmit={onSubmit} className="space-y-4 self-start rounded-[var(--rb)] bg-[color-mix(in_srgb,var(--ink)_4%,transparent)] p-6 sm:p-8">
            <Field id="c-name" label="Your name">
              <input id="c-name" value={name} onChange={(e) => setName(e.target.value)} maxLength={100} required placeholder="Jane Doe" className={input} />
            </Field>
            <Field id="c-email" label="Email (optional)">
              <input id="c-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={255} placeholder="jane@company.com" className={input} />
            </Field>
            <Field id="c-msg" label="Message">
              <textarea id="c-msg" value={message} onChange={(e) => setMessage(e.target.value)} maxLength={1000} required rows={4} placeholder="Tell me about your project" className={`${input} resize-none`} />
              <div className="wd-mute mt-1 text-right text-xs">{message.length}/1000</div>
            </Field>
            <button type="submit" className="wd-btn inline-flex w-full items-center justify-center gap-2 px-5 py-3.5 text-base">
              Send on WhatsApp <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </Reveal>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[var(--line)] pb-10 pt-8">
      <div className={`${WRAP} wd-mute flex flex-col items-start justify-between gap-4 text-sm font-semibold sm:flex-row sm:items-center`}>
        <span>© {new Date().getFullYear()} Sachin Bodare · Coded, travelled and grown in Pune</span>
        <div className="flex items-center gap-5">
          <a href={GITHUB} target="_blank" rel="noreferrer" className="wd-navlink">
            GitHub
          </a>
          <a href={LINKEDIN} target="_blank" rel="noreferrer" className="wd-navlink">
            LinkedIn
          </a>
          <a href={`mailto:${EMAIL}`} className="wd-navlink">
            Email
          </a>
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="wd-navlink">
            WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
}

function BrandIcon({ slug, size = 26, Fallback }: { slug: string; size?: number; Fallback: ComponentType<{ className?: string }> }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <Fallback className="h-6 w-6" />;
  return (
    <img src={`https://cdn.simpleicons.org/${slug}/ffffff`} alt="" width={size} height={size} loading="lazy" onError={() => setFailed(true)} style={{ width: size, height: size }} />
  );
}

function FloatingContact() {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 220);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const items = [
    {
      key: "wa",
      label: "Chat on WhatsApp",
      href: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi Sachin, I came across your portfolio and would like to talk.")}`,
      slug: "whatsapp",
      cls: "wd-fab-wa",
      Fallback: MessageCircle,
      external: true,
    },
    {
      key: "gm",
      label: "Email me",
      href: `mailto:${EMAIL}?subject=${encodeURIComponent("Project enquiry")}`,
      slug: "gmail",
      cls: "wd-fab-gm",
      Fallback: Mail,
      external: false,
    },
  ] as const;
  return (
    <div className="wd-fab" data-in={shown} aria-label="Quick contact">
      {items.map((it) => (
        <a
          key={it.key}
          href={it.href}
          target={it.external ? "_blank" : undefined}
          rel={it.external ? "noreferrer" : undefined}
          aria-label={it.label}
          className={`wd-fab-btn ${it.cls}`}
        >
          <span className="wd-fab-label">{it.label}</span>
          <BrandIcon slug={it.slug} Fallback={it.Fallback} />
        </a>
      ))}
    </div>
  );
}