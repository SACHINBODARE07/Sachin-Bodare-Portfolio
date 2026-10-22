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
  Play,
  Info,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ExternalLink,
  Sun,
  Moon,
  Coffee,
} from "lucide-react";
import portraitAsset from "@/assets/Sachin-Profile.jpg";
import { projects } from "@/lib/projects";

export const Route = createFileRoute("/")({
  component: Portfolio,
  head: () => ({
    meta: [
      { title: "Sachin Bodare — Full Stack Developer Portfolio" },
      { name: "description", content: "Portfolio of Sachin Bodare — full-stack developer shipping production web apps with React, Next.js, Node.js and MongoDB. Live sites, every GitHub repo and case studies." },
      { name: "color-scheme", content: "dark light" },
      { property: "og:title", content: "Sachin Bodare — Full Stack Developer" },
      { property: "og:description", content: "React · Next.js · Node · MongoDB. 13 live sites and every GitHub repo." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Figtree:wght@400;500;600;700;800&display=swap" },
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
const OLD_PORTFOLIO = "https://drive.google.com/file/d/1P8bZnGe3RIjOhIY9Auk6nA_8RO3f44Fe/view?usp=sharing";

const WRAP = "mx-auto w-full max-w-[1500px]";
const PAD = "px-4 sm:px-8 lg:px-12";

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

type Site = { name: string; url: string; cat: string; blurb: string; stack?: string[] };
const liveSites: Site[] = [
  {
    name: "MediBazzar",
    url: "https://medibazzar.com/",
    cat: "E-commerce",
    blurb: "Online marketplace for surgical, dental and healthcare supplies: brand catalogue, category browsing, seller onboarding and order tracking.",
    stack: ["Next.js"],
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

/** `dk: true` = brand colour is too dark for dark mode, so the icon is drawn white there. */
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
const topTech = ["React", "Next.js", "TypeScript", "Node.js", "MongoDB", "PostgreSQL", "AWS", "Tailwind", "Docker", "Redis"];

const experience = [
  {
    role: "Software Developer",
    company: "PigoPi Technologies",
    period: "Oct 2024 — Present",
    mode: "Remote",
    progress: 72,
    current: true,
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
    progress: 100,
    current: false,
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
    progress: 100,
    current: false,
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
  { icon: GraduationCap, title: "B.E. Computer Engineering", org: "Sinhgad Institute Of Technology and Science,Narhe,Pune", period: "2023", detail: "CGPA 7.69" },
  { icon: Award, title: "MERN Stack Certification", org: "Vinsys IT Services", period: "2023 — 2024", detail: "Production-grade curriculum" },
  { icon: Terminal, title: "Full Stack Web Dev", org: "Codecademy", period: "Self-paced", detail: "Continuous learning" },
];

/* ───────────────────────── Styles ───────────────────────── */

const css = `
.nx{--red:#E50914;--red-hover:#f6121d;--bg:#141414;--surface:#181818;--raised:#2f2f2f;--ink:#ffffff;--mute:#b3b3b3;--faint:#777;--line:rgba(255,255,255,.12);
  --btn:#ffffff;--btn-ink:#000000;--sec:rgba(109,109,110,.7);--sec-hover:rgba(109,109,110,.45);--green:#46d369;--stroke:#595959;
  --nav-grad:linear-gradient(to bottom,rgba(0,0,0,.85),rgba(0,0,0,.4) 60%,transparent);--shadow:0 20px 40px -22px rgba(0,0,0,.9);--art-op:1;
  background:var(--bg);color:var(--ink);font-family:'Figtree',system-ui,-apple-system,Segoe UI,sans-serif;-webkit-font-smoothing:antialiased;
  overflow-x:hidden;transition:background-color .5s ease,color .5s ease}
.nx[data-theme="light"]{--bg:#f5f5f1;--surface:#ffffff;--raised:#e9e9e4;--ink:#141414;--mute:#5a5a5a;--faint:#8a8a8a;--line:rgba(0,0,0,.12);
  --btn:#141414;--btn-ink:#ffffff;--sec:rgba(20,20,20,.1);--sec-hover:rgba(20,20,20,.18);--green:#1a8f3c;--stroke:#c5c5bf;
  --nav-grad:linear-gradient(to bottom,rgba(255,255,255,.95),rgba(245,245,241,.6) 60%,transparent);--shadow:0 20px 40px -24px rgba(20,20,20,.35)}
.nx *{box-sizing:border-box}
.nx ::selection{background:var(--red);color:#fff}
.nx a:focus-visible,.nx button:focus-visible,.nx input:focus-visible,.nx textarea:focus-visible,.nx select:focus-visible{outline:2px solid var(--ink);outline-offset:3px}

.nx-display{font-family:'Bebas Neue','Impact',sans-serif;letter-spacing:.02em;font-weight:400}
.nx-mute{color:var(--mute)}
.nx-faint{color:var(--faint)}
.nx-red{color:var(--red)}
.nx-card{background:var(--surface);box-shadow:inset 0 0 0 1px var(--line),var(--shadow);border-radius:6px;transition:box-shadow .25s,background-color .5s}
.group:hover>.nx-card,.nx-card:hover{box-shadow:inset 0 0 0 2px var(--ink),var(--shadow)}
.nx-btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;background:var(--btn);color:var(--btn-ink);border-radius:4px;font-weight:700;transition:opacity .2s,transform .2s}
.nx-btn:hover{opacity:.8}
.nx-sec{display:inline-flex;align-items:center;justify-content:center;gap:10px;background:var(--sec);color:var(--ink);border-radius:4px;font-weight:700;transition:background-color .2s}
.nx-sec:hover{background:var(--sec-hover)}
.nx-redbtn{display:inline-flex;align-items:center;justify-content:center;gap:10px;background:var(--red);color:#fff;border-radius:4px;font-weight:700;transition:background-color .2s}
.nx-redbtn:hover{background:var(--red-hover)}
.nx-chip{border:1px solid var(--line);border-radius:999px;transition:border-color .2s,background-color .2s,color .2s}
.nx-chip:hover{border-color:var(--ink)}
.nx-chip[aria-pressed="true"]{background:var(--ink);color:var(--bg);border-color:var(--ink)}
.nx-tag{background:var(--raised);border-radius:3px}
.nx-input{background:var(--raised);color:var(--ink);border-radius:4px;border:1px solid transparent;transition:border-color .2s,background-color .2s}
.nx-input::placeholder{color:var(--faint)}
.nx-input:focus{outline:none;border-color:var(--ink)}
.nx-link{color:var(--mute);transition:color .2s}
.nx-link:hover{color:var(--ink)}
.nx-scroll{scrollbar-width:none}
.nx-scroll::-webkit-scrollbar{display:none}
.nx-arrow{background:color-mix(in srgb,var(--bg) 70%,transparent)}
.nx-arrow:hover{background:color-mix(in srgb,var(--bg) 88%,transparent)}

/* 3D tilt */
.nx-tilt{transform-style:preserve-3d;transform:perspective(1000px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg)) scale(var(--s,1));
  transition:transform .35s cubic-bezier(.2,.8,.2,1);will-change:transform}
.nx-tilt[data-active="true"]{transition:transform .08s linear}
.nx-glare{background:radial-gradient(circle at var(--gx,50%) var(--gy,50%),rgba(255,255,255,.22),transparent 55%);opacity:0;transition:opacity .3s;pointer-events:none}
.nx-tilt[data-active="true"] .nx-glare{opacity:1}

/* Top-10 outlined numerals */
.nx-num{font-family:'Bebas Neue',Impact,sans-serif;line-height:.8;color:var(--bg);-webkit-text-stroke:3px var(--stroke);paint-order:stroke fill;transition:color .5s}

/* Motion */
.nx-rise{animation:nx-rise .8s cubic-bezier(.2,.8,.2,1) both;animation-delay:var(--d,0ms)}
@keyframes nx-rise{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}
.nx-reveal{opacity:0;transform:translateY(22px);transition:opacity .7s cubic-bezier(.2,.8,.2,1) var(--d,0ms),transform .7s cubic-bezier(.2,.8,.2,1) var(--d,0ms)}
.nx-reveal[data-in="true"]{opacity:1;transform:none}
.nx-caret{display:inline-block;width:.09em;height:.82em;margin-left:.07em;background:var(--red);vertical-align:-.04em;animation:nx-blink 1s steps(1) infinite}
@keyframes nx-blink{50%{opacity:0}}
.nx-float{animation:nx-float 4s ease-in-out infinite}
@keyframes nx-float{0%,100%{transform:translateZ(60px) translateY(0)}50%{transform:translateZ(60px) translateY(-6px)}}
.nx-shot{transition:transform .8s cubic-bezier(.2,.8,.2,1)}
.group:hover .nx-shot{transform:scale(1.06)}
@keyframes nx-live{0%{box-shadow:0 0 0 0 rgba(70,211,105,.6)}100%{box-shadow:0 0 0 7px rgba(70,211,105,0)}}
.nx-live{animation:nx-live 2s ease-out infinite}
.nx-steam{animation:nx-steam 3s ease-in-out infinite}
@keyframes nx-steam{0%{opacity:0;transform:translateY(8px)}50%{opacity:.8}100%{opacity:0;transform:translateY(-14px)}}

/* Intro splash */
.nx-intro{position:fixed;inset:0;z-index:100;background:#000;display:grid;place-items:center;animation:nx-intro-out .5s ease 1.7s forwards}
.nx-intro span{font-family:'Bebas Neue',Impact,sans-serif;font-size:min(46vw,300px);color:#E50914;line-height:1;text-shadow:0 0 60px rgba(229,9,20,.55);
  animation:nx-intro-zoom 2s cubic-bezier(.6,0,.9,.4) forwards}
@keyframes nx-intro-zoom{0%{transform:scale(.7);opacity:0}20%{opacity:1;transform:scale(1)}75%{opacity:1}100%{transform:scale(9);opacity:0}}
@keyframes nx-intro-out{to{opacity:0;visibility:hidden}}

/* Quick-contact buttons */
.nx-fab{position:fixed;right:clamp(14px,3vw,28px);bottom:clamp(14px,3vw,28px);z-index:60;display:flex;flex-direction:column;gap:12px;
  opacity:0;transform:translateY(18px) scale(.92);pointer-events:none;transition:opacity .45s,transform .45s cubic-bezier(.2,.8,.2,1)}
.nx-fab[data-in="true"]{opacity:1;transform:none;pointer-events:auto}
.nx-fab-btn{position:relative;display:grid;place-items:center;width:56px;height:56px;border-radius:50%;color:#fff;box-shadow:0 18px 34px -14px rgba(0,0,0,.6);transition:transform .25s}
.nx-fab-btn:hover{transform:translateY(-4px) scale(1.06)}
.nx-fab-wa{background:linear-gradient(135deg,#25D366,#128C7E)}
.nx-fab-gm{background:linear-gradient(135deg,#EA4335,#FBBC05)}
.nx-fab-btn::before{content:"";position:absolute;inset:0;border-radius:50%;border:2px solid currentColor;animation:nx-fabping 3s cubic-bezier(.2,.6,.3,1) infinite}
.nx-fab-gm::before{animation-delay:1.5s}
@keyframes nx-fabping{0%{transform:scale(1);opacity:.5}100%{transform:scale(1.75);opacity:0}}
.nx-fab-label{position:absolute;right:calc(100% + 12px);white-space:nowrap;border-radius:4px;background:var(--surface);color:var(--ink);box-shadow:inset 0 0 0 1px var(--line);
  padding:8px 14px;font-size:13px;font-weight:700;opacity:0;transform:translateX(8px);pointer-events:none;transition:opacity .22s,transform .22s}
.nx-fab-btn:hover .nx-fab-label,.nx-fab-btn:focus-visible .nx-fab-label{opacity:1;transform:none}
@media (max-width:420px){.nx-fab-label{display:none}.nx-fab-btn{width:52px;height:52px}}

@media (prefers-reduced-motion:reduce){
  .nx-tilt{transform:none!important}
  .nx-rise,.nx-caret,.nx-float,.nx-live,.nx-steam,.nx-fab-btn::before{animation:none!important}
  .nx-intro{display:none}
  .nx-reveal{opacity:1;transform:none;transition:none}
  .nx-shot{transition:none}
  .nx *{scroll-behavior:auto!important}
}
`;

/* ───────────────────────── Helpers ───────────────────────── */

const artPalettes = [
  ["#3a0a0e", "#E50914"],
  ["#1c1c1c", "#B20710"],
  ["#2b0d3a", "#E50914"],
  ["#0d1f2d", "#E50914"],
  ["#2a1a0a", "#ff5a36"],
  ["#101010", "#831010"],
];

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function artFor(name: string) {
  const h = hash(name);
  const [a, b] = artPalettes[h % artPalettes.length];
  return `linear-gradient(${115 + (h % 5) * 18}deg, ${a} 0%, ${a} 38%, ${b} 150%)`;
}

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
      { threshold: 0.06, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} data-in={shown} className={`nx-reveal ${className}`} style={{ "--d": `${delay}ms` } as CSSProperties}>
      {children}
    </div>
  );
}

function Tilt({ children, className = "", max = 7, scale = 1.03 }: { children: ReactNode; className?: string; max?: number; scale?: number }) {
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
    <div ref={ref} onPointerMove={onMove} onPointerLeave={reset} onPointerCancel={reset} className={`nx-tilt group ${className}`}>
      {children}
    </div>
  );
}

/** A Netflix-style horizontal row with hover arrows. */
function Row({ id, title, hint, children }: { id?: string; title: string; hint?: ReactNode; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => {
    const el = ref.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };
  return (
    <section id={id} className="scroll-mt-20 pt-10 sm:pt-14">
      <div className={`${WRAP} ${PAD} flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2`}>
        <h2 className="text-xl font-extrabold sm:text-2xl">{title}</h2>
        {hint}
      </div>
      <div className={`${WRAP} group/row relative`}>
        <button onClick={() => scroll(-1)} aria-label="Scroll left" className="nx-arrow absolute inset-y-4 left-0 z-10 hidden w-12 place-items-center opacity-0 transition group-hover/row:opacity-100 md:grid">
          <ChevronLeft className="h-8 w-8" />
        </button>
        <div ref={ref} className={`nx-scroll flex snap-x snap-mandatory gap-3 overflow-x-auto py-6 sm:gap-4 ${PAD}`}>
          {children}
        </div>
        <button onClick={() => scroll(1)} aria-label="Scroll right" className="nx-arrow absolute inset-y-4 right-0 z-10 hidden w-12 place-items-center opacity-0 transition group-hover/row:opacity-100 md:grid">
          <ChevronRight className="h-8 w-8" />
        </button>
      </div>
    </section>
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
  return txt;
}

type RepoStatus = "loading" | "live" | "fallback";
function useRepos() {
  const [repos, setRepos] = useState<Repo[]>(FALLBACK_REPOS);
  const [status, setStatus] = useState<RepoStatus>("loading");
  useEffect(() => {
    let off = false;
    const KEY = "nx-repos-v1";
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

function Art({ kind }: { kind: ArtKind }) {
  const common = { viewBox: "0 0 300 220", preserveAspectRatio: "xMidYMid slice" as const, className: "h-full w-full", "aria-hidden": true };
  if (kind === "code")
    return (
      <svg {...common}>
        <rect width="300" height="220" fill="#0b0b0b" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect key={i} x={24 + (i % 3) * 22} y={30 + i * 26} width={80 + ((i * 37) % 120)} height="10" rx="3" fill={["#E50914", "#ffffff", "#8c8c8c", "#b20710"][i % 4]} opacity=".9" />
        ))}
        <text x="214" y="180" fontSize="46" fontWeight="800" fill="#E50914" fontFamily="Bebas Neue, Impact, sans-serif">{"</>"}</text>
      </svg>
    );
  if (kind === "mountain")
    return (
      <svg {...common}>
        <defs><linearGradient id="nxm" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#7ec8f2" /><stop offset="1" stopColor="#ffe9c9" /></linearGradient></defs>
        <rect width="300" height="220" fill="url(#nxm)" />
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
          <path className="nx-steam" d="M125 80 q-10 -14 0 -26" />
          <path className="nx-steam" style={{ animationDelay: "1s" }} d="M150 82 q-10 -14 0 -26" />
          <path className="nx-steam" style={{ animationDelay: "2s" }} d="M175 80 q-10 -14 0 -26" />
        </g>
        <path d="M100 100 H200 L190 170 Q150 190 110 170Z" fill="#fff8ec" stroke="#b9722c" strokeWidth="4" />
        <path d="M200 114 q30 4 20 26 q-8 12 -26 10" fill="none" stroke="#b9722c" strokeWidth="4" />
        <ellipse cx="150" cy="104" rx="50" ry="8" fill="#c27a3a" />
      </svg>
    );
  if (kind === "road")
    return (
      <svg {...common}>
        <defs><linearGradient id="nxr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ff9a62" /><stop offset="1" stopColor="#ffe4bd" /></linearGradient></defs>
        <rect width="300" height="220" fill="url(#nxr)" />
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
  const [dark, setDark] = useState(true);
  const [intro, setIntro] = useState(true);
  const { repos, status } = useRepos();

  useEffect(() => {
    let d = !window.matchMedia("(prefers-color-scheme: light)").matches;
    try {
      const saved = localStorage.getItem("nx-theme");
      if (saved) d = saved === "dark";
    } catch {
      /* storage unavailable */
    }
    setDark(d);

    let skip = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    try {
      if (sessionStorage.getItem("nx-intro")) skip = true;
      else sessionStorage.setItem("nx-intro", "1");
    } catch {
      /* storage unavailable */
    }
    if (skip) {
      setIntro(false);
      return;
    }
    const t = setTimeout(() => setIntro(false), 2200);
    return () => clearTimeout(t);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    try {
      localStorage.setItem("nx-theme", next ? "dark" : "light");
    } catch {
      /* storage unavailable */
    }
  };

  return (
    <div className="nx min-h-screen" data-theme={dark ? "dark" : "light"} style={{ colorScheme: dark ? "dark" : "light" }}>
      <style>{css}</style>
      {intro && (
        <div className="nx-intro" onClick={() => setIntro(false)} aria-hidden="true">
          <span>S</span>
        </div>
      )}
      <Nav dark={dark} onToggle={toggle} />
      <main>
        <Hero repoCount={repos.length} />
        <LiveSites dark={dark} />
        <Top10 />
        <Experience />
        <CaseStudies dark={dark} />
        <Repos repos={repos} status={status} />
        <Genres dark={dark} />
        <Gallery />
        <Stats dark={dark} />
        <Education />
        <Contact />
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
}

function Nav({ dark, onToggle }: { dark: boolean; onToggle: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const links = [
    { h: "#top", l: "Home" },
    { h: "#live", l: "Live sites" },
    { h: "#stack", l: "Stack" },
    { h: "#experience", l: "Experience" },
    { h: "#repos", l: "Repos" },
    { h: "#contact", l: "Contact" },
  ];
  return (
    <header className="fixed inset-x-0 top-0 z-40 transition-colors duration-300" style={scrolled ? { background: "var(--bg)", boxShadow: "0 8px 24px -12px rgba(0,0,0,.45)" } : { background: "var(--nav-grad)" }}>
      <div className={`${WRAP} ${PAD} flex h-16 items-center justify-between gap-4`}>
        <div className="flex items-center gap-8">
          <a href="#top" className="nx-display nx-red text-3xl tracking-wider sm:text-4xl" aria-label="Sachin Bodare — home">
            SACHIN
          </a>
          <nav className="hidden items-center gap-5 text-sm font-semibold lg:flex" aria-label="Primary">
            {links.map((i) => (
              <a key={i.h} href={i.h} className="nx-link">
                {i.l}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <a href="#repos" aria-label="Search repositories" className="grid h-9 w-9 place-items-center rounded-full transition hover:bg-[var(--sec)]">
            <Search className="h-5 w-5" />
          </a>
          <button
            onClick={onToggle}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            aria-pressed={!dark}
            className="relative grid h-9 w-9 place-items-center rounded-full transition hover:bg-[var(--sec)]"
          >
            <Sun className={`absolute h-5 w-5 transition-all duration-500 ${dark ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-0 opacity-0"}`} />
            <Moon className={`absolute h-5 w-5 transition-all duration-500 ${dark ? "-rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"}`} />
          </button>
          <img src={portraitAsset} alt="" width={32} height={32} className="hidden h-8 w-8 rounded object-cover sm:block" />
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="nx-redbtn px-4 py-1.5 text-sm">
            Hire me
          </a>
        </div>
      </div>
      <nav aria-label="Sections" className="nx-scroll flex gap-5 overflow-x-auto px-4 pb-2.5 text-sm font-semibold lg:hidden">
        {links.map((i) => (
          <a key={i.h} href={i.h} className="nx-link shrink-0">
            {i.l}
          </a>
        ))}
      </nav>
    </header>
  );
}

function Hero({ repoCount }: { repoCount: number }) {
  const txt = useTypewriter(ROLES);
  const caseCount = projects.filter((p) => p.caseStudy).length;
  const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;
  return (
    <section id="top" className="relative isolate overflow-hidden pb-24 pt-36 md:pt-40 lg:min-h-[92vh] lg:pb-28">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 60% 70% at 78% 30%, rgba(229,9,20,.30), transparent 60%), radial-gradient(ellipse 50% 50% at 8% 100%, rgba(178,7,16,.18), transparent 70%), var(--bg)",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-44" style={{ background: "linear-gradient(to bottom, transparent, var(--bg))" }} />

      <div className={`${WRAP} ${PAD} grid items-center gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-16`}>
        <div className="order-2 lg:order-1">
          <p className="nx-rise mb-4 flex items-center gap-2 text-sm font-bold tracking-wide" style={d(0)}>
            <span className="h-5 w-1.5 rounded-sm bg-[var(--red)]" /> NOW PLAYING
            <span className="nx-mute" aria-hidden="true">
              ▸ {txt}
              <span className="nx-caret" />
            </span>
          </p>
          <h1 className="nx-display nx-rise text-[4.6rem] leading-[.88] sm:text-[7.5rem] lg:text-[9.5rem]" style={d(100)}>
            <span className="sr-only">Sachin Bodare: software developer, farmer, frontend developer, backend developer and traveller.</span>
            <span aria-hidden="true">
              Sachin
              <br />
              Bodare
            </span>
          </h1>
          <div className="nx-rise mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm sm:text-base" style={d(220)}>
            <span className="font-bold text-[var(--green)]">Open to work</span>
            <span className="nx-mute">Pune, India</span>
            {["3+ yrs", `${liveSites.length} live sites`, `${repoCount} repos`, ...(caseCount > 0 ? [`${caseCount} case studies`] : [])].map((m) => (
              <span key={m} className="rounded-[3px] border border-[var(--line)] px-1.5 text-xs">
                {m}
              </span>
            ))}
          </div>
          <p className="nx-rise mt-5 max-w-xl text-base leading-relaxed sm:text-lg" style={d(320)}>
            I build web apps that hold up in production — travel platforms, HRMS, commerce and SaaS — with React, Next.js, Node and MongoDB. Off screen I'm in the fields or on the road.
          </p>
          <div className="nx-rise mt-8 flex flex-wrap gap-3" style={d(420)}>
            <a href="#live" className="nx-btn px-6 py-2.5 text-base sm:px-8 sm:py-3 sm:text-lg">
              <Play className="h-5 w-5 fill-current sm:h-6 sm:w-6" /> See live sites
            </a>
            <a href="#about" className="nx-sec px-6 py-2.5 text-base sm:px-8 sm:py-3 sm:text-lg">
              <Info className="h-5 w-5 sm:h-6 sm:w-6" /> More info
            </a>
            <a href={OLD_PORTFOLIO} target="_blank" rel="noreferrer" className="nx-chip inline-flex items-center gap-2 px-5 py-2.5 text-base font-semibold sm:py-3">
              <Download className="h-5 w-5" /> Resume
            </a>
          </div>
        </div>

        <div className="nx-rise order-1 flex justify-center lg:order-2 lg:justify-end" style={d(260)}>
          <Tilt max={14} scale={1.04} className="relative">
            <div className="absolute -inset-8 -z-10 rounded-full bg-[#E50914]/25 blur-3xl" />
            <div className="relative h-[19rem] w-60 overflow-hidden rounded-md bg-[var(--surface)] shadow-2xl ring-1 ring-[var(--line)] sm:h-[26rem] sm:w-80 lg:h-[30rem] lg:w-[22rem]">
              <img src={portraitAsset} alt="Sachin Bodare portrait" width={512} height={512} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="nx-glare absolute inset-0" />
              <span className="nx-display absolute bottom-3 left-4 text-5xl text-white">SB</span>
            </div>
            <span className="nx-float absolute -left-3 top-6 rounded bg-[var(--red)] px-3 py-1 text-xs font-bold text-white shadow-lg sm:-left-8" style={{ transform: "translateZ(60px)" }}>
              Recently added
            </span>
            <span className="nx-float absolute -right-2 bottom-12 inline-flex items-center gap-1.5 rounded bg-white px-3 py-1 text-xs font-bold text-black shadow-lg sm:-right-8" style={{ transform: "translateZ(60px)", animationDelay: "1.2s" }}>
              <Coffee className="h-3.5 w-3.5" /> Ships code
            </span>
          </Tilt>
        </div>
      </div>
    </section>
  );
}

function ShotImg({ site }: { site: Site }) {
  const [failed, setFailed] = useState(false);
  const src = `https://image.thum.io/get/width/900/crop/560/noanimate/${site.url}`;
  return (
    <div className="relative aspect-video overflow-hidden" style={failed ? { background: artFor(site.name) } : { background: "var(--raised)" }}>
      {failed ? (
        <span className="nx-display absolute inset-0 grid place-items-center text-7xl text-white/90">{initialsOf(site.name)}</span>
      ) : (
        <img src={src} alt={`${site.name} homepage preview`} width={900} height={560} loading="lazy" onError={() => setFailed(true)} className="nx-shot h-full w-full object-cover object-top" />
      )}
      <span className="absolute left-2 top-2 inline-flex items-center gap-1.5 rounded-[3px] bg-black/70 px-2 py-0.5 text-[11px] font-bold text-white">
        <i className="nx-live h-1.5 w-1.5 rounded-full bg-[#46d369]" /> LIVE
      </span>
      <div className="nx-glare absolute inset-0" />
    </div>
  );
}

function LiveSites({ dark }: { dark: boolean }) {
  const [cat, setCat] = useState("All");
  const list = liveSites.filter((s) => cat === "All" || s.cat === cat);
  return (
    <Row
      id="live"
      title="Trending now: live sites"
      hint={
        <div className="nx-scroll -mx-1 flex max-w-full gap-2 overflow-x-auto px-1 py-1" role="group" aria-label="Filter by genre">
          {siteCats.map((c) => (
            <button key={c} onClick={() => setCat(c)} aria-pressed={cat === c} className="nx-chip shrink-0 px-3.5 py-1 text-sm font-semibold">
              {c}
            </button>
          ))}
        </div>
      }
    >
      {list.map((s) => (
        <div key={s.url} className="w-[78vw] shrink-0 snap-start sm:w-[340px]">
          <Tilt max={6} scale={1.03} className="h-full">
            <article className="nx-card relative flex h-full flex-col overflow-hidden">
              <ShotImg site={s} />
              <div className="flex flex-1 flex-col p-4">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-extrabold leading-tight">{s.name}</h3>
                  <ExternalLink className="nx-mute mt-1 h-4 w-4 shrink-0 transition group-hover:text-[var(--red)]" />
                </div>
                <p className="nx-faint mt-0.5 text-xs font-semibold">{hostOf(s.url)}</p>
                <p className="nx-mute mt-2 line-clamp-3 text-sm leading-relaxed">{s.blurb}</p>
                <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-3 text-xs font-semibold">
                  <span className="nx-tag px-2 py-0.5">{s.cat}</span>
                  {(s.stack ?? []).map((t) => (
                    <span key={t} className="nx-tag inline-flex items-center gap-1 px-2 py-0.5">
                      <TechIcon name={t} dark={dark} size={12} />
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <a href={s.url} target="_blank" rel="noreferrer" aria-label={`Open ${s.name} (${hostOf(s.url)})`} className="absolute inset-0 rounded-md" />
            </article>
          </Tilt>
        </div>
      ))}
    </Row>
  );
}

function Top10() {
  return (
    <Row id="stack" title="Top 10 in my stack" hint={<span className="nx-mute hidden text-sm sm:block">what I reach for first</span>}>
      {topTech.map((t, i) => (
        <div key={t} className="flex shrink-0 snap-start items-end">
          <span className="nx-num -mr-3 text-[8.5rem] sm:text-[11rem]" aria-hidden="true">
            {i + 1}
          </span>
          <Tilt max={8}>
            <div className="nx-card relative flex h-40 w-28 flex-col items-center justify-end gap-3 overflow-hidden p-3 sm:h-56 sm:w-40" style={{ background: artFor(t) }}>
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-white/90 sm:h-14 sm:w-14">
                <TechIcon name={t} dark={false} size={30} />
              </span>
              <span className="nx-display text-3xl leading-none text-white sm:text-4xl">{t}</span>
              <div className="nx-glare absolute inset-0" />
            </div>
          </Tilt>
        </div>
      ))}
    </Row>
  );
}

function Experience() {
  return (
    <Row id="experience" title="Continue watching: experience" hint={<span className="nx-mute hidden text-sm sm:block">newest first</span>}>
      {experience.map((e) => (
        <div key={e.role + e.company} className="w-[82vw] shrink-0 snap-start sm:w-[400px]">
          <Tilt max={5} scale={1.02} className="h-full">
            <article className="nx-card flex h-full flex-col overflow-hidden">
              <div className="relative aspect-[16/7] overflow-hidden" style={{ background: artFor(e.company) }}>
                <span className="nx-display absolute bottom-2 left-4 text-5xl leading-none text-white/95">{initialsOf(e.company)}</span>
                {e.current && <span className="absolute left-3 top-3 rounded bg-[var(--red)] px-2 py-0.5 text-xs font-bold text-white">Now playing</span>}
                <div className="nx-glare absolute inset-0" />
                <div className="absolute inset-x-0 bottom-0 h-1 bg-white/25">
                  <div className="h-full bg-[var(--red)]" style={{ width: `${e.progress}%` }} />
                </div>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-extrabold">{e.role}</h3>
                <p className="text-sm">{e.company}</p>
                <p className="mt-1 text-xs font-semibold text-[var(--green)]">
                  {e.period} <span className="nx-faint">· {e.mode}</span>
                </p>
                <ul className="nx-mute mt-4 space-y-2 text-sm leading-relaxed">
                  {e.bullets.map((b) => (
                    <li key={b} className="grid grid-cols-[10px_minmax(0,1fr)] gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--red)]" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Tilt>
        </div>
      ))}
    </Row>
  );
}

function CaseStudies({ dark }: { dark: boolean }) {
  const list = projects.filter((x) => x.caseStudy);
  if (list.length === 0) return null;
  return (
    <Row id="work" title="My List: case studies">
      {list.map((x) => (
        <div key={x.slug} className="w-[78vw] shrink-0 snap-start sm:w-[320px]">
          <Link to="/case-study/$slug" params={{ slug: x.slug }} className="block h-full rounded-md">
            <Tilt max={6} className="h-full">
              <article className="nx-card flex h-full flex-col overflow-hidden">
                <div className="relative aspect-video overflow-hidden" style={{ background: artFor(x.name) }}>
                  <span className="nx-display absolute inset-0 grid place-items-center text-7xl text-white/90">{initialsOf(x.name)}</span>
                  <span className="absolute right-2 top-2 rounded-[3px] bg-[var(--red)] px-2 py-0.5 text-[11px] font-bold text-white">Case study</span>
                  <div className="nx-glare absolute inset-0" />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="font-extrabold leading-tight">{x.name}</h3>
                  <p className="nx-mute mt-1.5 line-clamp-2 text-sm leading-relaxed">{x.blurb}</p>
                  <div className="mt-auto flex flex-wrap gap-1.5 pt-3 text-xs font-semibold">
                    {x.stack.slice(0, 3).map((s) => (
                      <span key={s} className="nx-tag inline-flex items-center gap-1 px-2 py-0.5">
                        <TechIcon name={s} dark={dark} size={12} />
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Tilt>
          </Link>
        </div>
      ))}
    </Row>
  );
}

function Repos({ repos, status }: { repos: Repo[]; status: RepoStatus }) {
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
  const isNew = (iso: string) => Date.now() - +new Date(iso) < 90 * 864e5;

  return (
    <section id="repos" className={`${WRAP} ${PAD} scroll-mt-20 pt-14 sm:pt-20`}>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold sm:text-3xl">All titles: every GitHub repo</h2>
          <p className="nx-mute mt-2 max-w-2xl text-sm">
            {status === "fallback"
              ? "GitHub's API didn't respond (it rate-limits visitors), so this is a saved snapshot. Open GitHub for the complete list."
              : `${repos.length} public repositories, pulled live and sorted by recent activity.`}
          </p>
        </div>
        <a href={GITHUB} target="_blank" rel="noreferrer" className="nx-chip inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold">
          <Github className="h-4 w-4" /> View profile on GitHub
        </a>
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-[220px] max-w-md flex-1">
            <label htmlFor="repo-search" className="sr-only">
              Search repositories
            </label>
            <Search className="nx-mute absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
            <input id="repo-search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Titles, languages" maxLength={100} className="nx-input w-full py-2.5 pl-10 pr-10 text-sm" />
            {query && (
              <button onClick={() => setQuery("")} aria-label="Clear search" className="nx-mute absolute right-2 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full hover:text-[var(--ink)]">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <label className="sr-only" htmlFor="repo-sort">
            Sort repositories
          </label>
          <select id="repo-sort" value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} className="nx-input px-3 py-2.5 text-sm font-semibold">
            <option value="recent">Recently updated</option>
            <option value="stars">Most starred</option>
            <option value="name">Name A–Z</option>
          </select>
          <button onClick={() => setHideForks((v) => !v)} aria-pressed={hideForks} className="nx-chip px-4 py-2 text-sm font-semibold">
            Hide forks
          </button>
        </div>
        <div className="nx-scroll -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
          {langs.map((l) => (
            <button key={l} onClick={() => setLang(l)} aria-pressed={lang === l} className="nx-chip inline-flex shrink-0 items-center gap-2 px-4 py-1.5 text-sm font-semibold">
              {l !== "All" && <i className="h-2.5 w-2.5 rounded-full" style={{ background: LANG_COLORS[l] ?? "#8b8fa8" }} />}
              {l}
            </button>
          ))}
        </div>
        <p className="nx-faint text-xs" aria-live="polite">
          {status === "loading" ? "Loading from GitHub…" : `${filtered.length} ${filtered.length === 1 ? "title" : "titles"}`}
        </p>
      </div>

      {shown.length === 0 ? (
        <div className="nx-card nx-mute mt-8 p-10 text-center">No titles match. Clear the search or pick another language.</div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {shown.map((r, i) => (
            <Reveal key={r.id} delay={(i % 4) * 60} className="h-full">
              <Tilt max={4} scale={1.02} className="h-full">
                <article className="nx-card relative flex h-full flex-col p-5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-2 text-xs font-bold">
                      {r.fork ? <GitFork className="nx-red h-4 w-4" /> : <Github className="nx-red h-4 w-4" />}
                      {r.fork ? "Fork" : "Original"}
                    </span>
                    <span className="flex items-center gap-2">
                      {!r.fork && isNew(r.pushed_at) && <span className="rounded-[3px] bg-[var(--red)] px-1.5 py-0.5 text-[10px] font-bold text-white">New</span>}
                      {r.homepage && /^https?:\/\//.test(r.homepage) && (
                        <a href={r.homepage} target="_blank" rel="noreferrer" aria-label={`Open ${r.name} live site`} className="nx-tag nx-mute relative z-10 grid h-7 w-7 place-items-center hover:text-[var(--ink)]">
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </span>
                  </div>
                  <h3 className="mt-3 truncate text-lg font-extrabold leading-tight">
                    <a href={r.html_url} target="_blank" rel="noreferrer" className="after:absolute after:inset-0 after:rounded-md">
                      {r.name}
                    </a>
                  </h3>
                  <p className="nx-mute mt-2 line-clamp-2 text-sm leading-relaxed">{r.description ?? "No description yet."}</p>
                  <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-4 text-xs font-semibold">
                    {r.language && (
                      <span className="inline-flex items-center gap-1.5">
                        <i className="h-2.5 w-2.5 rounded-full" style={{ background: LANG_COLORS[r.language] ?? "#8b8fa8" }} />
                        {r.language}
                      </span>
                    )}
                    <span className="nx-mute inline-flex items-center gap-1">
                      <Star className="h-3.5 w-3.5" /> {r.stargazers_count}
                    </span>
                    <span className="nx-mute inline-flex items-center gap-1">
                      <GitFork className="h-3.5 w-3.5" /> {r.forks_count}
                    </span>
                    <span className="nx-faint ml-auto">{formatMonth(r.pushed_at)}</span>
                  </div>
                </article>
              </Tilt>
            </Reveal>
          ))}
        </div>
      )}

      {visible < filtered.length && (
        <div className="mt-10 flex justify-center">
          <button onClick={() => setVisible((v) => Math.min(v + 12, filtered.length))} className="nx-sec px-7 py-3 text-sm">
            <ChevronDown className="h-5 w-5" /> Show {Math.min(12, filtered.length - visible)} more
          </button>
        </div>
      )}
    </section>
  );
}

function Genres({ dark }: { dark: boolean }) {
  return (
    <section id="skills" className={`${WRAP} ${PAD} scroll-mt-20 pt-14 sm:pt-20`}>
      <h2 className="text-2xl font-extrabold sm:text-3xl">Browse by genre: the full stack</h2>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((g, i) => {
          const Icon = g.icon;
          return (
            <Reveal key={g.title} delay={(i % 3) * 70} className="h-full">
              <Tilt max={5} scale={1.02} className="h-full">
                <div className="nx-card h-full p-5">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded bg-[var(--red)] text-white">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="font-extrabold">{g.title}</h3>
                  </div>
                  <ul className="flex flex-wrap gap-2 text-xs font-semibold">
                    {g.items.map((s) => (
                      <li key={s} className="nx-chip inline-flex items-center gap-1.5 px-3 py-1">
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

function Gallery() {
  return (
    <section id="gallery" className={`${WRAP} ${PAD} scroll-mt-20 pt-14 sm:pt-20`}>
      <h2 className="text-2xl font-extrabold sm:text-3xl">Behind the scenes</h2>
      <p className="nx-mute mt-2 text-sm">Roads, fields and chai stops. Swap in your own photos any time.</p>
      <div className="mt-6 grid auto-rows-[190px] grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:auto-rows-[200px]">
        {PHOTOS.map((ph, i) => (
          <Reveal key={ph.title} delay={(i % 4) * 70} className={`h-full ${ph.span ?? ""}`}>
            <Tilt max={5} scale={1.02} className="h-full">
              <figure className="nx-card relative h-full overflow-hidden">
                <div className="h-full w-full">{ph.src ? <img src={ph.src} alt={ph.title} loading="lazy" className="h-full w-full object-cover" /> : <Art kind={ph.art} />}</div>
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-4 text-white">
                  <span className="block text-base font-extrabold leading-tight">{ph.title}</span>
                  <span className="block text-xs opacity-85">{ph.caption}</span>
                </figcaption>
                <div className="nx-glare absolute inset-0" />
              </figure>
            </Tilt>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function StatCard({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <Reveal className="h-full">
      <div className="nx-card h-full p-4 sm:p-5">
        <div className="mb-4 flex items-center gap-2.5">
          <span className="grid h-7 w-7 place-items-center rounded bg-[var(--red)] text-white">{icon}</span>
          <h3 className="text-sm font-extrabold">{title}</h3>
        </div>
        <div className="overflow-hidden rounded">{children}</div>
      </div>
    </Reveal>
  );
}

function Stats({ dark }: { dark: boolean }) {
  const c = dark
    ? { text: "ffffff", sub: "b3b3b3", bg: "181818", trophy: "onedark" }
    : { text: "141414", sub: "5a5a5a", bg: "ffffff", trophy: "flat" };
  const red = "E50914";
  const base = `username=${GITHUB_USER}&hide_border=true&bg_color=00000000&title_color=${red}&text_color=${c.text}&icon_color=${red}`;
  const stats = `https://github-readme-stats.vercel.app/api?${base}&show_icons=true&count_private=true&include_all_commits=true`;
  const langs = `https://github-readme-stats.vercel.app/api/top-langs/?${base}&layout=compact&langs_count=10`;
  const streak = `https://streak-stats.demolab.com/?user=${GITHUB_USER}&hide_border=true&background=00000000&ring=${red}&fire=${red}&currStreakNum=${c.text}&sideNums=${c.text}&currStreakLabel=${red}&sideLabels=${c.sub}&dates=${c.sub}`;
  const graph = `https://github-readme-activity-graph.vercel.app/graph?username=${GITHUB_USER}&hide_border=true&bg_color=${c.bg}&color=${red}&line=${red}&point=${c.text}&area=true&area_color=${red}&title_color=${c.text}&custom_title=Contribution%20Graph`;
  const trophy = `https://github-profile-trophy.vercel.app/?username=${GITHUB_USER}&theme=${c.trophy}&no-frame=true&no-bg=true&column=7&margin-w=8&margin-h=8`;
  return (
    <section id="stats" className={`${WRAP} ${PAD} scroll-mt-20 pt-14 sm:pt-20`}>
      <h2 className="text-2xl font-extrabold sm:text-3xl">GitHub, in numbers</h2>
      <p className="nx-mute mt-2 max-w-2xl text-sm">Live from GitHub: stats, top languages, streaks and a year of commits.</p>
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <StatCard icon={<BarChart3 className="h-4 w-4" />} title="Overall stats">
          <img src={stats} alt="GitHub stats" loading="lazy" className="h-auto w-full" />
        </StatCard>
        <StatCard icon={<Code2 className="h-4 w-4" />} title="Top languages">
          <img src={langs} alt="Top languages" loading="lazy" className="h-auto w-full" />
        </StatCard>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <StatCard icon={<Activity className="h-4 w-4" />} title="Streak">
          <img src={streak} alt="Streak stats" loading="lazy" className="h-auto w-full" />
        </StatCard>
        <StatCard icon={<Star className="h-4 w-4" />} title="Trophies">
          <img src={trophy} alt="Trophies" loading="lazy" className="h-auto w-full" />
        </StatCard>
      </div>
      <div className="mt-4">
        <StatCard icon={<GitFork className="h-4 w-4" />} title="Contribution graph">
          <img src={graph} alt="Contribution graph" loading="lazy" className="h-auto w-full" />
        </StatCard>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education" className={`${WRAP} ${PAD} scroll-mt-20 pt-14 sm:pt-20`}>
      <h2 className="text-2xl font-extrabold sm:text-3xl">Because you watched: education</h2>
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {education.map((e, i) => {
          const Icon = e.icon;
          return (
            <Reveal key={e.title} delay={i * 80} className="h-full">
              <div className="nx-card h-full p-5">
                <span className="mb-4 grid h-10 w-10 place-items-center rounded bg-[var(--red)] text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="font-extrabold">{e.title}</h3>
                <p className="nx-mute mt-1 text-sm">{e.org}</p>
                <div className="mt-4 flex items-center justify-between text-xs font-semibold">
                  <span className="nx-faint">{e.period}</span>
                  <span className="text-[var(--green)]">{e.detail}</span>
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
    <div className="grid grid-cols-[24px_84px_minmax(0,1fr)] items-center gap-3 border-b border-[var(--line)] px-2 py-3 text-sm transition hover:bg-[var(--sec)]">
      <span className="nx-red">{icon}</span>
      <span className="nx-faint">{label}</span>
      <span className="truncate font-semibold">{value}</span>
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
      <label htmlFor={id} className="nx-mute mb-1.5 block text-xs font-bold">
        {label}
      </label>
      {children}
    </div>
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

  const input = "nx-input w-full px-4 py-3";

  return (
    <section id="contact" className="relative mt-16 scroll-mt-20 overflow-hidden border-t-8 border-[var(--raised)] sm:mt-24">
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 80% at 20% 0%, rgba(229,9,20,.22), transparent 60%), var(--surface)" }} />
      <div className={`${WRAP} ${PAD} relative grid gap-12 py-16 sm:py-24 md:grid-cols-2 md:gap-16`}>
        <div>
          <h2 className="nx-display text-6xl leading-[.95] sm:text-8xl">
            Ready to build?
            <br />
            <span className="nx-red">Let's talk.</span>
          </h2>
          <p className="mt-6 max-w-md text-lg">Messages go straight to my WhatsApp, the fastest way to reach me. For anything longer, email works too.</p>
          <div className="mt-8">
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
        <form onSubmit={onSubmit} className="self-start rounded-md bg-[var(--bg)] p-6 shadow-xl ring-1 ring-[var(--line)] sm:p-10">
          <h3 className="text-2xl font-extrabold sm:text-3xl">Send a message</h3>
          <div className="mt-6 space-y-4">
            <Field id="c-name" label="Your name">
              <input id="c-name" value={name} onChange={(e) => setName(e.target.value)} maxLength={100} required placeholder="Jane Doe" className={input} />
            </Field>
            <Field id="c-email" label="Email (optional)">
              <input id="c-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={255} placeholder="jane@company.com" className={input} />
            </Field>
            <Field id="c-msg" label="Message">
              <textarea id="c-msg" value={message} onChange={(e) => setMessage(e.target.value)} maxLength={1000} required rows={4} placeholder="Tell me about your project" className={`${input} resize-none`} />
              <div className="nx-faint mt-1 text-right text-xs">{message.length}/1000</div>
            </Field>
          </div>
          <button type="submit" className="nx-redbtn mt-5 w-full px-5 py-3.5 text-base">
            Send on WhatsApp <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  const links = [
    { l: "GitHub", h: GITHUB },
    { l: "LinkedIn", h: LINKEDIN },
    { l: "Instagram", h: INSTAGRAM },
    { l: "YouTube", h: YOUTUBE },
    { l: "Email", h: `mailto:${EMAIL}` },
    { l: "WhatsApp", h: `https://wa.me/${WHATSAPP_NUMBER}` },
    { l: "Live sites", h: "#live" },
    { l: "Experience", h: "#experience" },
    { l: "Repos", h: "#repos" },
    { l: "Stack", h: "#stack" },
    { l: "Stats", h: "#stats" },
    { l: "Contact", h: "#contact" },
  ];
  return (
    <footer style={{ background: "var(--surface)" }}>
      <div className={`${WRAP} ${PAD} nx-faint py-12 text-sm`}>
        <p className="mb-6 text-base">Questions? Message {WHATSAPP_DISPLAY}</p>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4">
          {links.map((c) => (
            <li key={c.l}>
              <a href={c.h} {...(c.h.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})} className="underline underline-offset-2 hover:text-[var(--ink)]">
                {c.l}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-10">© {new Date().getFullYear()} Sachin Bodare · Built in Pune</p>
      </div>
    </footer>
  );
}

function BrandIcon({ slug, size = 26, Fallback }: { slug: string; size?: number; Fallback: ComponentType<{ className?: string }> }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <Fallback className="h-6 w-6" />;
  return <img src={`https://cdn.simpleicons.org/${slug}/ffffff`} alt="" width={size} height={size} loading="lazy" onError={() => setFailed(true)} style={{ width: size, height: size }} />;
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
      cls: "nx-fab-wa",
      Fallback: MessageCircle,
      external: true,
    },
    {
      key: "gm",
      label: "Email me",
      href: `mailto:${EMAIL}?subject=${encodeURIComponent("Project enquiry")}`,
      slug: "gmail",
      cls: "nx-fab-gm",
      Fallback: Mail,
      external: false,
    },
  ] as const;
  return (
    <div className="nx-fab" data-in={shown} aria-label="Quick contact">
      {items.map((it) => (
        <a
          key={it.key}
          href={it.href}
          target={it.external ? "_blank" : undefined}
          rel={it.external ? "noreferrer" : undefined}
          aria-label={it.label}
          className={`nx-fab-btn ${it.cls}`}
        >
          <span className="nx-fab-label">{it.label}</span>
          <BrandIcon slug={it.slug} Fallback={it.Fallback} />
        </a>
      ))}
    </div>
  );
}