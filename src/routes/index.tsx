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
  Sun,
  Moon,
} from "lucide-react";
import portraitAsset from "@/assets/Sachin-Profile.jpg";
import { projects, projectCategories } from "@/lib/projects";

export const Route = createFileRoute("/")({
  component: Portfolio,
  head: () => ({
    meta: [
      { title: "Sachin Bodare — Full Stack Developer Portfolio" },
      { name: "description", content: "Portfolio of Sachin Bodare — Full Stack Developer shipping production web apps with React, Next.js, Node.js and MongoDB." },
      { name: "color-scheme", content: "light dark" },
      { property: "og:title", content: "Sachin Bodare — Full Stack Developer" },
      { property: "og:description", content: "React · Next.js · Node · MongoDB. Case studies, GitHub stats and a complete public project gallery." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=DM+Sans:wght@400;500;600;700&display=swap",
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

/**
 * Brand icons come from the Simple Icons CDN (https://cdn.simpleicons.org/<slug>/<hex>) — no package to install.
 * `dk: true` = brand colour is too dark for dark mode, so the icon is drawn white there.
 * If an icon fails to load it falls back to initials (orbit) or is hidden (chips).
 */
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

const tierA = ["React", "Next.js", "TypeScript", "Node.js", "MongoDB", "PostgreSQL", "AWS", "Docker", "Redis", "Tailwind", "Express", "Angular"];
const tierB = ["JavaScript", "GraphQL", "Firebase", "MySQL", "Prisma", "Redux", "Vercel", "Netlify", "Git", "Figma", "GitHub Actions", "Postman"];

const floaters: { t: string; l: number; top: number; size: number; dur: number; delay: number; dx: number; dy: number; rot: number }[] = [
  { t: "React", l: 5, top: 14, size: 54, dur: 9, delay: -2, dx: 14, dy: -26, rot: 12 },
  { t: "Next.js", l: 90, top: 11, size: 48, dur: 11, delay: -5, dx: -16, dy: 22, rot: -10 },
  { t: "TypeScript", l: 12, top: 56, size: 46, dur: 10, delay: -1, dx: 20, dy: -18, rot: 8 },
  { t: "Node.js", l: 88, top: 50, size: 56, dur: 12, delay: -7, dx: -12, dy: -24, rot: -14 },
  { t: "MongoDB", l: 4, top: 84, size: 50, dur: 8, delay: -3, dx: 18, dy: -20, rot: 10 },
  { t: "Docker", l: 93, top: 82, size: 46, dur: 10, delay: -6, dx: -18, dy: -16, rot: -8 },
  { t: "Tailwind", l: 28, top: 30, size: 40, dur: 13, delay: -4, dx: 10, dy: 26, rot: 14 },
  { t: "Git", l: 72, top: 26, size: 40, dur: 9, delay: -8, dx: -14, dy: 20, rot: -12 },
  { t: "PostgreSQL", l: 22, top: 90, size: 42, dur: 11, delay: -2, dx: 16, dy: -22, rot: 9 },
  { t: "Figma", l: 78, top: 92, size: 42, dur: 12, delay: -9, dx: -10, dy: -26, rot: -9 },
  { t: "Redis", l: 48, top: 8, size: 38, dur: 10, delay: -5, dx: 12, dy: 18, rot: 10 },
  { t: "GraphQL", l: 52, top: 70, size: 38, dur: 14, delay: -3, dx: -12, dy: -18, rot: -10 },
];

const experience = [
  {
    role: "Software Developer",
    company: "PigoPi Technologies",
    period: "Dec 2025 — Present",
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
    period: "May 2024 — Sep 2024",
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

const css = `
.gl{--ink:#14122b;--mute:#5b5878;--paper:#f3f1ff;--surface:rgba(255,255,255,.58);--solid:#ffffff;--line:rgba(255,255,255,.85);
  --chip:rgba(255,255,255,.8);--input:rgba(255,255,255,.8);--violet:#6d4aff;--vsoft:rgba(109,74,255,.10);--vtext:#4a2fd0;
  --shadow:0 1px 0 rgba(255,255,255,.9) inset,0 24px 60px -24px rgba(80,60,200,.35);
  --b1:rgba(109,74,255,.34);--b2:rgba(46,197,255,.30);--b3:rgba(255,107,107,.24);--b4:rgba(61,220,151,.22);--float-op:.7;
  color:var(--ink);font-family:'DM Sans',system-ui,-apple-system,Segoe UI,sans-serif;-webkit-font-smoothing:antialiased;
  background:var(--paper);position:relative;overflow-x:hidden;transition:background-color .6s ease,color .6s ease}
.gl[data-theme="dark"]{--ink:#f2f0ff;--mute:#a9a5c8;--paper:#0a0918;--surface:rgba(26,23,58,.55);--solid:#1b1838;--line:rgba(255,255,255,.10);
  --chip:rgba(255,255,255,.08);--input:rgba(255,255,255,.06);--violet:#8b6cff;--vsoft:rgba(139,108,255,.18);--vtext:#c9bcff;
  --shadow:0 1px 0 rgba(255,255,255,.06) inset,0 24px 60px -24px rgba(0,0,0,.75);
  --b1:rgba(109,74,255,.42);--b2:rgba(46,197,255,.26);--b3:rgba(255,107,107,.22);--b4:rgba(61,220,151,.16);--float-op:.55}
.gl *{box-sizing:border-box}
.gl-display{font-family:'Bricolage Grotesque','DM Sans',sans-serif;font-weight:800;letter-spacing:-.03em}
.gl ::selection{background:var(--violet);color:#fff}
.gl a:focus-visible,.gl button:focus-visible,.gl input:focus-visible,.gl textarea:focus-visible{outline:3px solid var(--violet);outline-offset:3px}

.gl-mute{color:var(--mute)}
.gl-body{color:color-mix(in srgb,var(--ink) 86%,transparent)}
.gl-chip{background:var(--chip)}
.gl-vchip{background:var(--vsoft);color:var(--vtext)}
.gl-violet{color:var(--violet)}
.gl-btn-ink{background:var(--ink);color:var(--paper);transition:background-color .25s,color .25s,transform .25s}
.gl-btn-ink:hover{background:var(--violet);color:#fff}
.gl-navlink{color:var(--mute);transition:background-color .2s,color .2s}
.gl-navlink:hover{background:var(--chip);color:var(--ink)}
.gl-input{background:var(--input);border:1px solid var(--line);color:var(--ink);transition:border-color .2s,background-color .2s}
.gl-input::placeholder{color:var(--mute);opacity:.65}
.gl-input:focus{border-color:var(--violet);outline:none}
.gl-link:hover{color:var(--violet)}

.gl-glass{background:var(--surface);backdrop-filter:blur(22px) saturate(1.5);-webkit-backdrop-filter:blur(22px) saturate(1.5);
  border:1px solid var(--line);box-shadow:var(--shadow);transition:background-color .6s,border-color .6s}

/* Aurora backdrop — drifting blurred blobs */
.gl-aurora{position:fixed;inset:0;z-index:0;pointer-events:none;overflow:hidden}
.gl-blob{position:absolute;width:62vmax;height:62vmax;border-radius:50%;filter:blur(70px);will-change:transform;
  animation:gl-drift 26s ease-in-out infinite alternate}
.gl-blob.b1{left:-18vmax;top:-20vmax;background:radial-gradient(circle,var(--b1),transparent 65%)}
.gl-blob.b2{right:-22vmax;top:-14vmax;background:radial-gradient(circle,var(--b2),transparent 65%);animation-duration:32s;animation-delay:-8s}
.gl-blob.b3{right:-16vmax;bottom:-26vmax;background:radial-gradient(circle,var(--b3),transparent 65%);animation-duration:29s;animation-delay:-14s}
.gl-blob.b4{left:-20vmax;bottom:-24vmax;background:radial-gradient(circle,var(--b4),transparent 65%);animation-duration:35s;animation-delay:-4s}
@keyframes gl-drift{0%{transform:translate3d(0,0,0) scale(1)}100%{transform:translate3d(6vmax,5vmax,0) scale(1.15)}}
.gl-content{position:relative;z-index:2}

/* Floating tech icons (background layer) */
.gl-floaters{position:fixed;inset:0;z-index:1;pointer-events:none;overflow:hidden;opacity:var(--float-op)}
.gl-floater{position:absolute;display:grid;place-items:center;border-radius:28%;
  background:var(--surface);border:1px solid var(--line);box-shadow:var(--shadow);
  animation:gl-float var(--dur) ease-in-out var(--delay) infinite alternate;will-change:transform}
@keyframes gl-float{0%{transform:translate3d(0,0,0) rotate(0deg)}100%{transform:translate3d(var(--dx),var(--dy),0) rotate(var(--rot))}}

/* Shimmering gradient text */
.gl-shimmer{background:linear-gradient(90deg,#6d4aff,#2ec5ff,#3ddc97,#2ec5ff,#6d4aff);background-size:220% auto;
  -webkit-background-clip:text;background-clip:text;color:transparent;animation:gl-shimmer 7s linear infinite}
@keyframes gl-shimmer{to{background-position:220% center}}

/* Load-in + scroll reveal */
.gl-rise{animation:gl-rise .9s cubic-bezier(.2,.8,.2,1) both;animation-delay:var(--d,0ms)}
@keyframes gl-rise{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:none}}
.gl-reveal{opacity:0;transform:translateY(26px) scale(.98);
  transition:opacity .8s cubic-bezier(.2,.8,.2,1) var(--d,0ms),transform .8s cubic-bezier(.2,.8,.2,1) var(--d,0ms)}
.gl-reveal[data-in="true"]{opacity:1;transform:none}

/* 3D tilt */
.gl-tilt{transform-style:preserve-3d;
  transform:perspective(1000px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg)) scale(var(--s,1));
  transition:transform .4s cubic-bezier(.2,.8,.2,1);will-change:transform}
.gl-tilt[data-active="true"]{transition:transform .08s linear}
.gl-shine{background:radial-gradient(circle at var(--gx,50%) var(--gy,50%),rgba(255,255,255,.5),transparent 55%);
  opacity:0;transition:opacity .3s;pointer-events:none;mix-blend-mode:soft-light}
.gl-tilt[data-active="true"] .gl-shine{opacity:1}

@keyframes gl-bob{0%,100%{transform:translateZ(70px) translateY(0)}50%{transform:translateZ(70px) translateY(-8px)}}
.gl-bob{animation:gl-bob 5s ease-in-out infinite}

/* Double 3D orbit */
.gl-stage{perspective:1600px;--cw:74px;--ch:90px;--gap:58px;--r:clamp(175px,34vw,390px)}
@media (min-width:640px){.gl-stage{--cw:98px;--ch:116px;--gap:76px}}
.gl-orbit{position:absolute;inset:0;transform-style:preserve-3d;transform:rotateX(-9deg)}
.gl-tier{position:absolute;left:50%;width:var(--cw);height:var(--ch);margin-left:calc(var(--cw) / -2);transform-style:preserve-3d}
.gl-tier-a{top:calc(50% - var(--ch) / 2 - var(--gap));animation:gl-spin 44s linear infinite}
.gl-tier-b{top:calc(50% - var(--ch) / 2 + var(--gap));animation:gl-spin 52s linear infinite reverse}
.gl-stage:hover .gl-tier{animation-play-state:paused}
@keyframes gl-spin{to{transform:rotateY(360deg)}}
.gl-face{position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;
  background:var(--solid);border:1px solid var(--line);border-radius:22px;
  box-shadow:0 22px 44px -20px rgba(20,18,43,.45);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px}
.gl-orb{position:absolute;left:50%;top:50%;width:150px;height:150px;margin:-75px 0 0 -75px;border-radius:50%;
  background:radial-gradient(circle at 35% 30%,#fff 0%,#9d86ff 28%,#6d4aff 55%,#2ec5ff 120%);
  box-shadow:0 0 80px 10px rgba(109,74,255,.45)}
.gl-orb::before,.gl-orb::after{content:"";position:absolute;inset:0;border-radius:50%;border:2px solid rgba(109,74,255,.5);
  animation:gl-ping 3.6s cubic-bezier(.2,.6,.3,1) infinite}
.gl-orb::after{animation-delay:1.8s}
@keyframes gl-ping{0%{transform:scale(1);opacity:.8}100%{transform:scale(3);opacity:0}}

/* Floating WhatsApp / Gmail quick-contact */
.gl-fab{position:fixed;right:clamp(14px,3vw,28px);bottom:clamp(14px,3vw,28px);z-index:60;
  display:flex;flex-direction:column;gap:12px;
  opacity:0;transform:translateY(18px) scale(.92);pointer-events:none;
  transition:opacity .45s cubic-bezier(.2,.8,.2,1),transform .45s cubic-bezier(.2,.8,.2,1)}
.gl-fab[data-in="true"]{opacity:1;transform:none;pointer-events:auto}
.gl-fab-btn{position:relative;display:grid;place-items:center;width:56px;height:56px;border-radius:50%;color:#fff;
  box-shadow:0 18px 34px -14px rgba(20,18,43,.6);
  transition:transform .25s cubic-bezier(.2,.8,.2,1),box-shadow .25s}
.gl-fab-btn:hover{transform:translateY(-4px) scale(1.06);box-shadow:0 24px 40px -14px rgba(20,18,43,.7)}
.gl-fab-btn:active{transform:translateY(-1px) scale(1.02)}
.gl-fab-wa{background:linear-gradient(135deg,#25D366,#128C7E)}
.gl-fab-gm{background:linear-gradient(135deg,#EA4335,#FBBC05)}
.gl-fab-btn::before{content:"";position:absolute;inset:0;border-radius:50%;border:2px solid currentColor;
  animation:gl-fab-ping 3s cubic-bezier(.2,.6,.3,1) infinite}
.gl-fab-gm::before{animation-delay:1.5s}
@keyframes gl-fab-ping{0%{transform:scale(1);opacity:.5}100%{transform:scale(1.75);opacity:0}}
.gl-fab-label{position:absolute;right:calc(100% + 12px);white-space:nowrap;border-radius:999px;
  background:var(--solid);color:var(--ink);border:1px solid var(--line);box-shadow:var(--shadow);
  padding:8px 14px;font-size:13px;font-weight:600;opacity:0;transform:translateX(8px);pointer-events:none;
  transition:opacity .22s,transform .22s}
.gl-fab-btn:hover .gl-fab-label,.gl-fab-btn:focus-visible .gl-fab-label{opacity:1;transform:none}
@media (max-width:420px){.gl-fab-label{display:none}.gl-fab-btn{width:52px;height:52px}}

@media (prefers-reduced-motion:reduce){
  .gl-tilt{transform:none!important}
  .gl-tier,.gl-bob,.gl-floater,.gl-blob,.gl-shimmer,.gl-orb::before,.gl-orb::after,.gl-rise,.gl-fab-btn::before{animation:none!important}
  .gl-reveal{opacity:1;transform:none;transition:none}
  .gl *{scroll-behavior:auto!important}
}
`;

/* ───────────────────────── Helpers ───────────────────────── */

const palettes = [
  ["#6d4aff", "#2ec5ff"],
  ["#ff6b6b", "#ffb36b"],
  ["#3ddc97", "#2ec5ff"],
  ["#ff7ac3", "#6d4aff"],
  ["#ffb36b", "#ff6b6b"],
  ["#2ec5ff", "#6d4aff"],
];

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function artFor(name: string) {
  const h = hash(name);
  const [a, b] = palettes[h % palettes.length];
  return `linear-gradient(${125 + (h % 4) * 20}deg, ${a}, ${b})`;
}

function initialsOf(name: string) {
  const parts = name.replace(/[^a-zA-Z0-9 ]/g, " ").trim().split(/\s+/);
  return (parts.length > 1 ? parts[0][0] + parts[1][0] : name.slice(0, 2)).toUpperCase();
}

function TechIcon({ name, dark, size = 16, fallback = false }: { name: string; dark: boolean; size?: number; fallback?: boolean }) {
  const [failed, setFailed] = useState(false);
  const t = TECH[name];
  if (!t) return null;
  const hex = t.dk && dark ? "ffffff" : t.color;
  if (t.lucide) return <Cloud aria-hidden="true" style={{ width: size, height: size, color: `#${hex}` }} />;
  if (failed) {
    return fallback ? (
      <span aria-hidden="true" className="gl-display grid place-items-center rounded-lg text-white" style={{ width: size, height: size, background: `#${t.color}`, fontSize: size * 0.4 }}>
        {initialsOf(name)}
      </span>
    ) : null;
  }
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
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} data-in={shown} className={`gl-reveal ${className}`} style={{ "--d": `${delay}ms` } as CSSProperties}>
      {children}
    </div>
  );
}

function Tilt({ children, className = "", max = 10, scale = 1.03 }: { children: ReactNode; className?: string; max?: number; scale?: number }) {
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
    <div ref={ref} onPointerMove={onMove} onPointerLeave={reset} onPointerCancel={reset} className={`gl-tilt group ${className}`}>
      {children}
    </div>
  );
}

function Heading({ title, sub }: { title: ReactNode; sub?: string }) {
  return (
    <Reveal className="mb-10 max-w-2xl">
      <h2 className="gl-display text-4xl leading-[1.02] sm:text-5xl md:text-6xl">{title}</h2>
      {sub && <p className="gl-mute mt-4 text-base sm:text-lg">{sub}</p>}
    </Reveal>
  );
}

/* ───────────────────────── Page ───────────────────────── */

function Portfolio() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    let d = window.matchMedia("(prefers-color-scheme: dark)").matches;
    try {
      const saved = localStorage.getItem("gl-theme");
      if (saved) d = saved === "dark";
    } catch {
      /* storage unavailable */
    }
    setDark(d);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    try {
      localStorage.setItem("gl-theme", next ? "dark" : "light");
    } catch {
      /* storage unavailable */
    }
  };

  return (
    <div className="gl min-h-screen" data-theme={dark ? "dark" : "light"} style={{ colorScheme: dark ? "dark" : "light" }}>
      <style>{css}</style>

      <div className="gl-aurora" aria-hidden="true">
        <i className="gl-blob b1" />
        <i className="gl-blob b2" />
        <i className="gl-blob b3" />
        <i className="gl-blob b4" />
      </div>

      <div className="gl-floaters" aria-hidden="true">
        {floaters.map((f, i) => (
          <span
            key={f.t}
            className={`gl-floater ${i > 5 ? "hidden sm:grid" : ""}`}
            style={
              {
                left: `${f.l}%`,
                top: `${f.top}%`,
                width: f.size,
                height: f.size,
                "--dur": `${f.dur}s`,
                "--delay": `${f.delay}s`,
                "--dx": `${f.dx}px`,
                "--dy": `${f.dy}px`,
                "--rot": `${f.rot}deg`,
              } as CSSProperties
            }
          >
            <TechIcon name={f.t} dark={dark} size={Math.round(f.size * 0.52)} />
          </span>
        ))}
      </div>

      <div className="gl-content">
        <Nav dark={dark} onToggle={toggle} />
        <main>
          <Hero />
          <Orbit dark={dark} />
          <About />
          <Experience />
          <Projects dark={dark} />
          <Skills dark={dark} />
          <GitHubStats dark={dark} />
          <Education />
          <Contact />
        </main>
        <Footer />
      </div>

      <FloatingContact />
    </div>
  );
}

function BrandIcon({
  slug,
  color,
  size = 26,
  Fallback,
}: {
  slug: string;
  color: string;
  size?: number;
  Fallback: ComponentType<{ className?: string }>;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) return <Fallback className="h-6 w-6" />;
  return (
    <img
      src={`https://cdn.simpleicons.org/${slug}/${color}`}
      alt=""
      width={size}
      height={size}
      loading="lazy"
      onError={() => setFailed(true)}
      style={{ width: size, height: size }}
    />
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
      href: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        "Hi Sachin, I came across your portfolio and would like to talk.",
      )}`,
      slug: "whatsapp",
      cls: "gl-fab-wa",
      Fallback: MessageCircle,
      external: true,
    },
    {
      key: "gm",
      label: "Email me",
      href: `mailto:${EMAIL}?subject=${encodeURIComponent("Project enquiry")}`,
      slug: "gmail",
      cls: "gl-fab-gm",
      Fallback: Mail,
      external: false,
    },
  ] as const;

  return (
    <div className="gl-fab" data-in={shown} aria-label="Quick contact">
      {items.map((it) => {
        const Fallback = it.Fallback;
        return (
          <a
            key={it.key}
            href={it.href}
            target={it.external ? "_blank" : undefined}
            rel={it.external ? "noreferrer" : undefined}
            aria-label={it.label}
            className={`gl-fab-btn ${it.cls}`}
          >
            <span className="gl-fab-label">{it.label}</span>
            <BrandIcon slug={it.slug} color="ffffff" size={26} Fallback={Fallback} />
          </a>
        );
      })}
    </div>
  );
}

function Nav({ dark, onToggle }: { dark: boolean; onToggle: () => void }) {
  const links = [
    { h: "#work", l: "Work" },
    { h: "#experience", l: "Experience" },
    { h: "#skills", l: "Stack" },
    { h: "#stats", l: "Stats" },
    { h: "#contact", l: "Contact" },
  ];
  return (
    <header className="sticky top-3 z-40 px-3 pt-3 sm:px-6">
      <div className="gl-glass mx-auto flex h-14 max-w-[1100px] items-center justify-between gap-2 rounded-full pl-2 pr-2 sm:pl-3">
        <a href="#top" className="flex items-center gap-2.5" aria-label="Sachin Bodare — home">
          <span className="gl-display grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-[#6d4aff] to-[#2ec5ff] text-sm text-white">SB</span>
          <span className="hidden text-sm font-semibold sm:block">Sachin Bodare</span>
        </a>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {links.map((i) => (
            <a key={i.h} href={i.h} className="gl-navlink rounded-full px-4 py-2 text-sm font-medium">
              {i.l}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button
            onClick={onToggle}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            aria-pressed={dark}
            className="gl-chip relative grid h-10 w-10 place-items-center rounded-full transition hover:scale-110"
          >
            <Sun className={`absolute h-5 w-5 transition-all duration-500 ${dark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"}`} />
            <Moon className={`absolute h-5 w-5 transition-all duration-500 ${dark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"}`} />
          </button>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noreferrer"
            className="gl-btn-ink inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold"
          >
            Hire me <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
      <nav aria-label="Sections" className="mx-auto mt-2 flex max-w-[1100px] gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] md:hidden">
        {links.map((i) => (
          <a key={i.h} href={i.h} className="gl-glass shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold">
            {i.l}
          </a>
        ))}
      </nav>
    </header>
  );
}

function Hero() {
  const caseCount = projects.filter((p) => p.caseStudy).length;
  const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;
  return (
    <section id="top" className={`${WRAP} scroll-mt-24 pb-16 pt-12 sm:pt-20 lg:pb-24`}>
      <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <div>
          <span className="gl-glass gl-rise inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold" style={d(0)}>
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3ddc97] opacity-70" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#3ddc97]" />
            </span>
            Open to work · Pune, India
          </span>
          <h1 className="gl-display gl-rise mt-6 text-[2.9rem] leading-[.98] sm:text-7xl lg:text-[5.6rem]" style={d(120)}>
            Hi, I'm Sachin.
            <br />
            I build web apps that <span className="gl-shimmer">hold up in production.</span>
          </h1>
          <p className="gl-mute gl-rise mt-6 max-w-xl text-lg leading-relaxed" style={d(260)}>
            Full-stack developer working across travel platforms, HRMS, commerce and SaaS. React, Next.js, Node and MongoDB, wired for scale.
          </p>
          <div className="gl-rise mt-9 flex flex-wrap gap-3" style={d(400)}>
            <a href="#work" className="inline-flex items-center gap-2 rounded-full bg-[#6d4aff] px-7 py-3.5 text-base font-semibold text-white shadow-[0_14px_30px_-10px_rgba(109,74,255,.7)] transition hover:-translate-y-0.5 hover:bg-[#5b38f0]">
              See my work <ArrowUpRight className="h-5 w-5" />
            </a>
            <a href="#contact" className="gl-glass inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-base font-semibold transition hover:-translate-y-0.5">
              <MessageCircle className="h-5 w-5" /> Start a project
            </a>
            <a href={OLD_PORTFOLIO} target="_blank" rel="noreferrer" className="gl-mute gl-link inline-flex items-center gap-2 rounded-full px-5 py-3.5 text-base font-semibold">
              <Download className="h-5 w-5" /> Resume
            </a>
          </div>
          <p className="gl-mute gl-rise mt-8 text-sm" style={d(520)}>
            3+ years shipping · {caseCount} case studies · {projects.length} public repos
          </p>
        </div>

        <div className="gl-rise flex justify-center lg:justify-end" style={d(300)}>
          <Tilt max={13} scale={1.03} className="relative">
            <div
              className="absolute inset-0 -z-10 rounded-[2rem] opacity-90"
              style={{ background: "linear-gradient(135deg,#ff6b6b,#ffb36b)", transform: "translateZ(-40px) translate(20px,24px) rotate(6deg)" }}
            />
            <div
              className="absolute inset-0 -z-10 rounded-[2rem] opacity-90"
              style={{ background: "linear-gradient(135deg,#2ec5ff,#6d4aff)", transform: "translateZ(-20px) translate(-12px,12px) rotate(-4deg)" }}
            />
            <div className="gl-glass relative h-[22rem] w-72 overflow-hidden rounded-[2rem] p-2 sm:h-[28rem] sm:w-[22rem]">
              <img src={portraitAsset} alt="Sachin Bodare portrait" width={512} height={512} className="h-full w-full rounded-[1.6rem] object-cover" />
              <div className="gl-shine absolute inset-0 rounded-[2rem]" />
            </div>
            <div className="gl-glass gl-bob absolute -left-4 top-10 flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold sm:-left-10">
              <Briefcase className="gl-violet h-4 w-4" /> PigoPi Technologies
            </div>
            <div className="gl-glass gl-bob absolute -right-3 bottom-14 flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold sm:-right-10" style={{ animationDelay: "1.6s" }}>
              <Code2 className="h-4 w-4 text-[#ff6b6b]" /> React · Next.js · Node
            </div>
          </Tilt>
        </div>
      </div>
    </section>
  );
}

function Orbit({ dark }: { dark: boolean }) {
  const renderTier = (list: string[], offset: number) =>
    list.map((t, i) => (
      <div key={t} className="gl-face" style={{ transform: `rotateY(${i * (360 / list.length) + offset}deg) translateZ(var(--r))` }}>
        <span
          className="grid h-[38px] w-[38px] place-items-center rounded-xl sm:h-12 sm:w-12"
          style={{ background: `#${TECH[t].color}${dark ? "26" : "1f"}` }}
        >
          <TechIcon name={t} dark={dark} size={26} fallback />
        </span>
        <span className="px-1 text-center text-[10px] font-bold leading-tight sm:text-xs">{t}</span>
      </div>
    ));

  return (
    <section aria-label="Tech stack" className="py-6 sm:py-10">
      <div className={WRAP}>
        <Heading title="The stack, in orbit." sub="Twenty-four tools across two rings. Hover to pause." />
      </div>
      <div className="gl-stage relative mx-auto h-[310px] w-full max-w-[1200px] overflow-hidden sm:h-[440px]">
        <div className="gl-orb" aria-hidden="true" />
        <div className="gl-orbit">
          <div className="gl-tier gl-tier-a">{renderTier(tierA, 0)}</div>
          <div className="gl-tier gl-tier-b">{renderTier(tierB, 15)}</div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className={`${WRAP} scroll-mt-24 py-16 sm:py-24`}>
      <Reveal>
        <div className="gl-glass grid gap-10 rounded-[2rem] p-7 sm:p-12 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] md:gap-16">
          <p className="gl-display text-3xl leading-[1.12] sm:text-4xl md:text-[2.7rem]">
            I build the boring, load-bearing parts of the internet — auth, RBAC, dashboards, billing — and the polished front ends that sit on top.
          </p>
          <div className="gl-mute space-y-4 text-[15px] leading-relaxed">
            <p>B.E. Computer Engineering from Sinhgad Institute (CGPA 7.69). Currently a Software Developer at PigoPi Technologies, previously trained on MERN at Vinsys IT Services.</p>
            <p>I like small teams, tight feedback loops, and code that survives its second reviewer.</p>
            <p>Outside code: chai, cricket, and documentation rabbit holes.</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className={`${WRAP} scroll-mt-24 py-12 sm:py-16`}>
      <Heading title="Where I've worked." sub="Newest first." />
      <ol className="relative space-y-6 border-l-2 border-[#6d4aff]/30 pl-6 sm:pl-10">
        {experience.map((e, i) => (
          <li key={e.role + e.company} className="relative">
            <span
              className="absolute -left-[33px] top-7 h-4 w-4 rounded-full border-4 sm:-left-[49px]"
              style={{ background: i === 0 ? "#3ddc97" : "#6d4aff", borderColor: "var(--paper)" }}
            />
            <Reveal delay={i * 90}>
              <Tilt max={4} scale={1.01}>
                <article className="gl-glass rounded-3xl p-6 sm:p-8">
                  <header className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <h3 className="gl-display text-2xl sm:text-3xl">{e.role}</h3>
                    <span className="gl-violet text-sm font-semibold">{e.period}</span>
                  </header>
                  <p className="gl-mute mt-1">
                    {e.company} · {e.mode}
                  </p>
                  <ul className="gl-body mt-5 space-y-2.5 text-[15px] leading-relaxed">
                    {e.bullets.map((b) => (
                      <li key={b} className="grid grid-cols-[14px_minmax(0,1fr)] gap-2">
                        <span className="mt-2 h-2 w-2 rounded-full bg-gradient-to-br from-[#6d4aff] to-[#2ec5ff]" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Tilt>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Projects({ dark }: { dark: boolean }) {
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

  useEffect(() => {
    setVisible(9);
  }, [query, category]);

  const shown = filtered.slice(0, visible);

  return (
    <section id="work" className={`${WRAP} scroll-mt-24 py-16 sm:py-24`}>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <Heading title="Things I've built." sub={`${projects.length} public repositories, sorted by recent activity. Open a case study for a closer look.`} />
        <a href={GITHUB} target="_blank" rel="noreferrer" className="gl-glass mb-10 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition hover:-translate-y-0.5">
          <Github className="h-4 w-4" /> All repos on GitHub
        </a>
      </div>

      <div className="space-y-4">
        <div className="relative max-w-md">
          <label htmlFor="project-search" className="sr-only">
            Search projects
          </label>
          <Search className="gl-mute absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2" />
          <input
            id="project-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, stack, tags"
            maxLength={100}
            className="gl-glass gl-input w-full rounded-full py-3 pl-11 pr-11 text-sm"
          />
          {query && (
            <button onClick={() => setQuery("")} aria-label="Clear search" className="gl-mute gl-navlink absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
          {["All", ...projectCategories].map((c) => {
            const active = category === c;
            return (
              <button
                key={c}
                onClick={() => setCategory(c)}
                aria-pressed={active}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${active ? "gl-btn-ink" : "gl-glass hover:-translate-y-0.5"}`}
              >
                {c}
              </button>
            );
          })}
        </div>
        <p className="gl-mute text-sm" aria-live="polite">
          {filtered.length} {filtered.length === 1 ? "result" : "results"}
        </p>
      </div>

      {shown.length === 0 ? (
        <div className="gl-glass gl-mute mt-8 rounded-3xl p-10 text-center">No projects match “{query}”. Clear the search or pick another category.</div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((p, i) => {
            const hasCase = !!p.caseStudy;
            const card = (
              <Tilt max={9} scale={1.03} className="h-full">
                <article className="gl-glass flex h-full flex-col overflow-hidden rounded-3xl">
                  <div className="relative m-2 aspect-[16/10] overflow-hidden rounded-[1.25rem]" style={{ background: artFor(p.name) }}>
                    <span className="gl-display absolute inset-0 grid place-items-center text-7xl text-white/95 drop-shadow-[0_8px_20px_rgba(20,18,43,.3)] sm:text-8xl">
                      {initialsOf(p.name)}
                    </span>
                    <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-[#14122b]">{p.tag}</span>
                    {hasCase && <span className="absolute right-3 top-3 rounded-full bg-[#14122b] px-3 py-1 text-xs font-bold text-white">Case study</span>}
                    <div className="gl-shine absolute inset-0" />
                  </div>
                  <div className="flex flex-1 flex-col p-5 pt-3">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="gl-display text-xl leading-tight">{p.name}</h3>
                      <ArrowUpRight className="gl-mute mt-0.5 h-5 w-5 shrink-0 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#6d4aff]" />
                    </div>
                    <p className="gl-mute mt-2 line-clamp-3 text-sm leading-relaxed">{p.blurb}</p>
                    <div className="mt-auto flex flex-wrap gap-1.5 pt-4 text-xs font-semibold">
                      {p.stack.slice(0, 3).map((s) => (
                        <span key={s} className="gl-vchip inline-flex items-center gap-1.5 rounded-full px-2.5 py-1">
                          <TechIcon name={s} dark={dark} size={12} />
                          {s}
                        </span>
                      ))}
                    </div>
                    {p.updatedAt && (
                      <p className="gl-mute mt-3 text-xs">
                        Updated {new Date(p.updatedAt).toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" })}
                        {p.fork ? " · Fork" : ""}
                      </p>
                    )}
                  </div>
                </article>
              </Tilt>
            );
            return (
              <Reveal key={p.slug} delay={(i % 3) * 80} className="h-full">
                {hasCase ? (
                  <Link to="/case-study/$slug" params={{ slug: p.slug }} className="block h-full rounded-3xl">
                    {card}
                  </Link>
                ) : (
                  <a href={p.href} target="_blank" rel="noreferrer" className="block h-full rounded-3xl">
                    {card}
                  </a>
                )}
              </Reveal>
            );
          })}
        </div>
      )}

      {visible < filtered.length && (
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => setVisible((v) => Math.min(v + 6, filtered.length))}
            className="gl-glass inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition hover:-translate-y-0.5"
          >
            <ChevronDown className="h-4 w-4" /> Show {Math.min(6, filtered.length - visible)} more
          </button>
        </div>
      )}
    </section>
  );
}

function Skills({ dark }: { dark: boolean }) {
  return (
    <section id="skills" className={`${WRAP} scroll-mt-24 py-12 sm:py-16`}>
      <Heading title="Tools I reach for." sub="Grouped by the part of the stack they live in." />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((g, i) => {
          const Icon = g.icon;
          const [a, b] = palettes[i % palettes.length];
          return (
            <Reveal key={g.title} delay={(i % 3) * 80} className="h-full">
              <Tilt max={6} scale={1.02} className="h-full">
                <div className="gl-glass h-full rounded-3xl p-6">
                  <span className="mb-4 grid h-11 w-11 place-items-center rounded-2xl text-white" style={{ background: `linear-gradient(135deg,${a},${b})` }}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="gl-display text-xl">{g.title}</h3>
                  <ul className="mt-4 flex flex-wrap gap-2 text-xs font-semibold">
                    {g.items.map((s) => (
                      <li key={s} className="gl-chip inline-flex items-center gap-1.5 rounded-full px-3 py-1.5">
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

function StatCard({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <Reveal className="h-full">
      <div className="gl-glass h-full rounded-3xl p-5">
        <div className="mb-4 flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-[#6d4aff] text-white">{icon}</span>
          <h3 className="text-sm font-bold">{title}</h3>
        </div>
        <div className="overflow-hidden rounded-xl">{children}</div>
      </div>
    </Reveal>
  );
}

function GitHubStats({ dark }: { dark: boolean }) {
  const c = dark
    ? { title: "8b6cff", text: "f2f0ff", icon: "8b6cff", sub: "a9a5c8", ring: "8b6cff", graphBg: "17142f", graphText: "a9a5c8", trophy: "onedark" }
    : { title: "6d4aff", text: "14122b", icon: "6d4aff", sub: "5b5878", ring: "6d4aff", graphBg: "f7f5ff", graphText: "14122b", trophy: "flat" };
  const base = `username=${GITHUB_USER}&hide_border=true&bg_color=00000000&title_color=${c.title}&text_color=${c.text}&icon_color=${c.icon}`;
  const stats = `https://github-readme-stats.vercel.app/api?${base}&show_icons=true&count_private=true&include_all_commits=true`;
  const langs = `https://github-readme-stats.vercel.app/api/top-langs/?${base}&layout=compact&langs_count=10`;
  const streak = `https://streak-stats.demolab.com/?user=${GITHUB_USER}&hide_border=true&background=00000000&ring=${c.ring}&fire=ff6b6b&currStreakNum=${c.text}&sideNums=${c.text}&currStreakLabel=${c.title}&sideLabels=${c.sub}&dates=${c.sub}`;
  const graph = `https://github-readme-activity-graph.vercel.app/graph?username=${GITHUB_USER}&hide_border=true&bg_color=${c.graphBg}&color=${c.graphText}&line=${c.title}&point=${c.text}&area=true&area_color=${c.title}&title_color=${c.text}&custom_title=Contribution%20Graph`;
  const trophy = `https://github-profile-trophy.vercel.app/?username=${GITHUB_USER}&theme=${c.trophy}&no-frame=true&no-bg=true&column=7&margin-w=8&margin-h=8`;

  return (
    <section id="stats" className={`${WRAP} scroll-mt-24 py-16 sm:py-24`}>
      <Heading title="GitHub, in numbers." sub="Live from GitHub: stats, top languages, streaks and a year of commits." />
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
      <Heading title="Education & learning." />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {education.map((e, i) => {
          const Icon = e.icon;
          const [a, b] = palettes[(i + 2) % palettes.length];
          return (
            <Reveal key={e.title} delay={i * 90} className="h-full">
              <div className="gl-glass h-full rounded-3xl p-6">
                <span className="mb-4 grid h-11 w-11 place-items-center rounded-2xl text-white" style={{ background: `linear-gradient(135deg,${a},${b})` }}>
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="gl-display text-xl leading-tight">{e.title}</h3>
                <p className="gl-mute mt-1 text-sm">{e.org}</p>
                <div className="mt-4 flex items-center justify-between text-xs font-semibold">
                  <span className="gl-mute">{e.period}</span>
                  <span className="gl-violet">{e.detail}</span>
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
    <div className="gl-navlink grid grid-cols-[24px_84px_minmax(0,1fr)] items-center gap-3 rounded-xl px-3 py-3 text-sm">
      <span className="gl-violet">{icon}</span>
      <span>{label}</span>
      <span className="truncate font-medium text-[var(--ink)]">{value}</span>
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
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold">
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

  const input = "gl-input w-full rounded-2xl px-4 py-3";

  return (
    <section id="contact" className={`${WRAP} scroll-mt-24 py-16 sm:py-24`}>
      <Reveal>
        <div className="gl-glass grid gap-12 rounded-[2rem] p-7 sm:p-12 md:grid-cols-2 md:gap-14">
          <div>
            <h2 className="gl-display text-5xl leading-[1] sm:text-6xl">
              Have a project? <span className="gl-shimmer">Let's build it.</span>
            </h2>
            <p className="gl-mute mt-5 max-w-md">Messages go straight to my WhatsApp, the fastest way to reach me. For anything longer, email works too.</p>
            <div className="-mx-3 mt-6">
              <ContactLine icon={<MessageCircle className="h-4 w-4" />} label="WhatsApp" value={WHATSAPP_DISPLAY} href={`https://wa.me/${WHATSAPP_NUMBER}`} />
              <ContactLine icon={<Mail className="h-4 w-4" />} label="Email" value={EMAIL} href={`mailto:${EMAIL}`} />
              <ContactLine icon={<Github className="h-4 w-4" />} label="GitHub" value="SACHINBODARE07" href={GITHUB} />
              <ContactLine icon={<Linkedin className="h-4 w-4" />} label="LinkedIn" value="sachin-bodare" href={LINKEDIN} />
              <ContactLine icon={<Instagram className="h-4 w-4" />} label="Instagram" value="sachinbodare21" href={INSTAGRAM} />
              <ContactLine icon={<Youtube className="h-4 w-4" />} label="YouTube" value="thingsofthings" href={YOUTUBE} />
              <ContactLine icon={<Globe className="h-4 w-4" />} label="Resume" value="sachinbodare-portfolio" href={OLD_PORTFOLIO} />
              <ContactLine icon={<MapPin className="h-4 w-4" />} label="Location" value="Pune, Maharashtra, IN" />
            </div>
          </div>

          <form onSubmit={onSubmit} className="gl-chip self-start space-y-4 rounded-3xl p-6 sm:p-8" style={{ background: "var(--chip)" }}>
            <Field id="c-name" label="Your name">
              <input id="c-name" value={name} onChange={(e) => setName(e.target.value)} maxLength={100} required placeholder="Jane Doe" className={input} />
            </Field>
            <Field id="c-email" label="Email (optional)">
              <input id="c-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={255} placeholder="jane@company.com" className={input} />
            </Field>
            <Field id="c-msg" label="Message">
              <textarea id="c-msg" value={message} onChange={(e) => setMessage(e.target.value)} maxLength={1000} required rows={4} placeholder="Tell me about your project" className={`${input} resize-none`} />
              <div className="gl-mute mt-1 text-right text-xs">{message.length}/1000</div>
            </Field>
            <button type="submit" className="gl-btn-ink inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3.5 text-base font-semibold">
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
    <footer className="pb-10 pt-6">
      <div className={`${WRAP} gl-mute flex flex-col items-start justify-between gap-4 text-sm sm:flex-row sm:items-center`}>
        <span>© {new Date().getFullYear()} Sachin Bodare · Built in Pune</span>
        <div className="flex items-center gap-5 font-medium">
          <a href={GITHUB} target="_blank" rel="noreferrer" className="gl-link">
            GitHub
          </a>
          <a href={LINKEDIN} target="_blank" rel="noreferrer" className="gl-link">
            LinkedIn
          </a>
          <a href={`mailto:${EMAIL}`} className="gl-link">
            Email
          </a>
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="gl-link">
            WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
}