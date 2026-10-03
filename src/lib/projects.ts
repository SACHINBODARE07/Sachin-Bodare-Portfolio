import githubRepos from "./github-repos.json";

export type Accent = "ember" | "teal" | "violet" | "pink" | "lime" | "sky";

export const accentClass: Record<Accent, { text: string; bg: string; border: string; ring: string }> = {
  ember: { text: "text-ember", bg: "bg-ember/10", border: "border-ember/40", ring: "ring-ember/30" },
  teal: { text: "text-teal", bg: "bg-teal/10", border: "border-teal/40", ring: "ring-teal/30" },
  violet: { text: "text-violet", bg: "bg-violet/10", border: "border-violet/40", ring: "ring-violet/30" },
  pink: { text: "text-pink", bg: "bg-pink/10", border: "border-pink/40", ring: "ring-pink/30" },
  lime: { text: "text-lime", bg: "bg-lime/10", border: "border-lime/40", ring: "ring-lime/30" },
  sky: { text: "text-sky", bg: "bg-sky/10", border: "border-sky/40", ring: "ring-sky/30" },
};

export type CaseStudy = {
  problem: string;
  solution: string;
  role: string;
  year: string;
  highlights: string[];
  features: string[];
  stackDetail: { label: string; items: string[] }[];
};

export type Project = {
  slug: string;
  name: string;
  category: "Web App" | "SaaS" | "E-Commerce" | "Enterprise" | "EdTech" | "Healthcare" | "Marketplace" | "Social" | "IoT" | "Fintech" | "Dashboard" | "Non-profit" | "Ops" | "HR" | "B2B" | "Community";
  stack: string[];
  blurb: string;
  href: string;
  repo: string; // owner/name for github APIs
  accent: Accent;
  tag: string;
  updatedAt?: string;
  fork?: boolean;
  caseStudy?: CaseStudy;
};

const GH = "SACHINBODARE07";
const url = (r: string) => `https://github.com/${GH}/${r}`;

const featuredProjects: Project[] = [
  {
    slug: "edgetours-travels",
    name: "EdgeTours Travels",
    category: "Web App",
    stack: ["Next.js", "TypeScript", "SSR"],
    blurb: "Server-rendered travel & tours platform with rich booking flow — production app at PigoPi.",
    href: url("EdgeToursTravels_NextJs"),
    repo: `${GH}/EdgeToursTravels_NextJs`,
    accent: "ember",
    tag: "Featured",
    caseStudy: {
      problem: "A niche tour operator needed a fast, SEO-first booking site to replace a static template that couldn't rank or convert.",
      solution: "Rebuilt on Next.js with SSR, image optimization and an atomic booking flow. Booking, availability and payments live behind a typed API.",
      role: "Full-stack lead",
      year: "2025",
      highlights: [
        "Lighthouse 95+ across the board",
        "SSR + ISR for every marketing page",
        "3-step booking with server-verified availability",
        "SEO wired for tour, city and package pages",
      ],
      features: [
        "Package builder with add-ons",
        "Availability calendar",
        "Enquiry → booking → payment pipeline",
        "Admin dashboard with role gating",
        "Blog/CMS for travel content",
      ],
      stackDetail: [
        { label: "Frontend", items: ["Next.js", "TypeScript", "Tailwind", "React Hook Form"] },
        { label: "Backend", items: ["Node.js", "Express", "REST"] },
        { label: "Data", items: ["MongoDB", "Mongoose"] },
        { label: "Infra", items: ["Vercel", "Cloudinary", "Sentry"] },
      ],
    },
  },
  {
    slug: "multi-vendor-ecommerce",
    name: "Multi-Vendor E-Commerce",
    category: "E-Commerce",
    stack: ["Node.js", "MongoDB", "React"],
    blurb: "Vendor onboarding, catalog, cart & orders — the full commerce backbone.",
    href: url("Multi-Vendor-E-Commerce-Platform"),
    repo: `${GH}/Multi-Vendor-E-Commerce-Platform`,
    accent: "teal",
    tag: "Commerce",
    caseStudy: {
      problem: "Standard e-commerce templates assume one seller. Real marketplaces need vendor onboarding, per-vendor payouts and independent inventories.",
      solution: "Built a multi-tenant commerce backbone: each vendor gets a scoped catalog, orders and analytics view; buyers see a unified feed.",
      role: "Full-stack developer",
      year: "2024",
      highlights: [
        "Multi-tenant data model",
        "Vendor KYC & onboarding flow",
        "Split orders per vendor at checkout",
        "Buyer wishlist, reviews, coupons",
      ],
      features: [
        "Product variants & bulk import",
        "Cart & checkout with coupons",
        "Vendor dashboard with sales stats",
        "Admin moderation & payouts",
      ],
      stackDetail: [
        { label: "Frontend", items: ["React", "Redux Toolkit", "Tailwind"] },
        { label: "Backend", items: ["Node.js", "Express", "JWT"] },
        { label: "Data", items: ["MongoDB", "Mongoose", "Redis (cache)"] },
      ],
    },
  },
  {
    slug: "hrms",
    name: "HRMS",
    category: "Enterprise",
    stack: ["TypeScript", "React", "Node"],
    blurb: "Human Resource Management System — roles, attendance & payroll flows.",
    href: url("Human-Resource-Management-System"),
    repo: `${GH}/Human-Resource-Management-System`,
    accent: "violet",
    tag: "Enterprise",
    caseStudy: {
      problem: "HR ops were spread across spreadsheets and email. Attendance, leaves and payroll needed one source of truth with proper roles.",
      solution: "A role-gated HR platform where each persona (employee / manager / HR / admin) sees only what they should, backed by an audit trail.",
      role: "Full-stack developer",
      year: "2024",
      highlights: [
        "RBAC with 4 personas",
        "Leave approval workflow with escalation",
        "Payroll compute + payslip PDF export",
        "Audit log for every write",
      ],
      features: [
        "Attendance & timesheets",
        "Leave balance & approvals",
        "Payroll with tax & deductions",
        "Employee directory & docs",
      ],
      stackDetail: [
        { label: "Frontend", items: ["React", "TypeScript", "MUI"] },
        { label: "Backend", items: ["Node.js", "Express", "JWT", "RBAC"] },
        { label: "Data", items: ["MongoDB", "Mongoose"] },
      ],
    },
  },
  {
    slug: "saas-invoice-billing",
    name: "SaaS Invoice Billing",
    category: "SaaS",
    stack: ["Node.js", "MongoDB", "SaaS"],
    blurb: "Subscription-based invoice & billing engine for SMB customers.",
    href: url("Subscription-SaaS-Invoice-Billing-System"),
    repo: `${GH}/Subscription-SaaS-Invoice-Billing-System`,
    accent: "pink",
    tag: "SaaS",
    caseStudy: {
      problem: "SMBs juggle invoicing across tools with no subscription intelligence. They need billing that thinks in plans and renewals.",
      solution: "Subscription-first billing: plans, seats, prorated upgrades, dunning, and PDF invoices delivered on schedule.",
      role: "Full-stack developer",
      year: "2024",
      highlights: [
        "Plan/seat/proration engine",
        "Automated dunning emails",
        "PDF invoice generation",
        "Multi-tenant SaaS isolation",
      ],
      features: [
        "Plan management",
        "Recurring invoices",
        "Payment link + reminders",
        "Customer portal",
      ],
      stackDetail: [
        { label: "Frontend", items: ["React", "Tailwind"] },
        { label: "Backend", items: ["Node.js", "Express", "Cron"] },
        { label: "Data", items: ["MongoDB"] },
      ],
    },
  },
  {
    slug: "lms",
    name: "Learning Management System",
    category: "EdTech",
    stack: ["Node.js", "React"],
    blurb: "Courses, lessons, enrollments — an end-to-end LMS built from scratch.",
    href: url("Learning-Management-System"),
    repo: `${GH}/Learning-Management-System`,
    accent: "lime",
    tag: "EdTech",
    caseStudy: {
      problem: "Trainers wanted their own LMS instead of paying per-seat on external platforms.",
      solution: "Self-hosted LMS with course authoring, video lessons, quizzes and student progress tracking.",
      role: "Full-stack developer",
      year: "2024",
      highlights: [
        "Course/module/lesson data model",
        "Quiz engine with attempts",
        "Student progress dashboards",
        "Instructor payout view",
      ],
      features: [
        "Course authoring",
        "Enrollments & payments",
        "Quiz + certificate",
        "Discussion per lesson",
      ],
      stackDetail: [
        { label: "Frontend", items: ["React", "Tailwind"] },
        { label: "Backend", items: ["Node.js", "Express"] },
        { label: "Data", items: ["MongoDB"] },
      ],
    },
  },
  {
    slug: "ngo",
    name: "NGO Platform",
    category: "Non-profit",
    stack: ["Next.js", "TypeScript"],
    blurb: "Non-profit website with donations, campaigns & content management.",
    href: url("NGO"),
    repo: `${GH}/NGO`,
    accent: "sky",
    tag: "Non-profit",
    caseStudy: {
      problem: "Small NGOs need a professional web presence with real donation flow — not a Wix page.",
      solution: "A Next.js site with donations, campaigns, volunteer signups and a lightweight CMS the team can run themselves.",
      role: "Full-stack developer",
      year: "2024",
      highlights: [
        "Donations with receipts",
        "Campaign progress bars",
        "Volunteer & event signups",
        "Editable content blocks",
      ],
      features: ["Donation flow", "Events", "Blog / stories", "Newsletter"],
      stackDetail: [
        { label: "Frontend", items: ["Next.js", "TypeScript", "Tailwind"] },
        { label: "Backend", items: ["Node.js"] },
        { label: "Data", items: ["MongoDB"] },
      ],
    },
  },
  {
    slug: "real-estate-booking",
    name: "Real Estate Booking",
    category: "Marketplace",
    stack: ["Node.js", "MongoDB"],
    blurb: "Property listings, search filters and a full booking pipeline.",
    href: url("Real-Estate-Booking-Website"),
    repo: `${GH}/Real-Estate-Booking-Website`,
    accent: "ember",
    tag: "Marketplace",
    caseStudy: {
      problem: "Property discovery needs sharp filters and a trust-building booking flow.",
      solution: "Search-first UX with map, filters and a booking pipeline that keeps agents in the loop.",
      role: "Full-stack developer",
      year: "2024",
      highlights: ["Faceted search", "Map view", "Booking pipeline", "Agent dashboard"],
      features: ["Listings CRUD", "Map + filters", "Booking requests", "Chat with agent"],
      stackDetail: [
        { label: "Frontend", items: ["React", "Tailwind"] },
        { label: "Backend", items: ["Node.js", "Express"] },
        { label: "Data", items: ["MongoDB"] },
      ],
    },
  },
  { slug: "crm", name: "CRM System", category: "B2B", stack: ["Node.js", "React"], blurb: "Leads, pipelines and customer lifecycle management for growing teams.", href: url("CRM-System"), repo: `${GH}/CRM-System`, accent: "teal", tag: "B2B" },
  { slug: "restaurant", name: "Restaurant Management", category: "Ops", stack: ["JavaScript", "Node.js"], blurb: "Menus, orders, tables & billing for restaurant operations.", href: url("Restaurant-Management-System"), repo: `${GH}/Restaurant-Management-System`, accent: "violet", tag: "Ops" },
  { slug: "clinic", name: "Clinic Management", category: "Healthcare", stack: ["Node.js", "MongoDB"], blurb: "Patients, appointments, prescriptions — clinical workflows digitized.", href: url("Clinic-Management-System"), repo: `${GH}/Clinic-Management-System`, accent: "pink", tag: "Healthcare" },
  { slug: "school", name: "School Management", category: "EdTech", stack: ["Node.js", "JavaScript"], blurb: "Students, staff, classes & attendance — a complete school ERP.", href: url("School-Management-System"), repo: `${GH}/School-Management-System`, accent: "lime", tag: "EdTech" },
  { slug: "employee", name: "Employee Management", category: "HR", stack: ["JavaScript", "Node.js"], blurb: "Employee records, leaves & payroll for growing SMBs.", href: url("Employee-Management-System"), repo: `${GH}/Employee-Management-System`, accent: "sky", tag: "HR" },
  { slug: "social", name: "Social Media Clone", category: "Social", stack: ["JavaScript", "Node.js"], blurb: "Posts, likes, follows & feeds — social primitives from the ground up.", href: url("Social-Media-Clone"), repo: `${GH}/Social-Media-Clone`, accent: "ember", tag: "Social" },
  { slug: "drone", name: "Drone Management", category: "IoT", stack: ["JavaScript", "Node.js"], blurb: "Fleet tracking & drone operations dashboard.", href: url("Drone-Management-System"), repo: `${GH}/Drone-Management-System`, accent: "teal", tag: "IoT" },
  { slug: "currency", name: "Advanced Currency Calculator", category: "Fintech", stack: ["TypeScript", "React"], blurb: "Multi-currency conversion with live rates & clean UX.", href: url("Advanced-Currency-Calculator"), repo: `${GH}/Advanced-Currency-Calculator`, accent: "violet", tag: "Fintech" },
  { slug: "mern-challenge", name: "MERN Challenge", category: "Dashboard", stack: ["MongoDB", "Express", "React", "Node"], blurb: "Transaction manager with statistics & data visualization charts.", href: url("mern-challenge"), repo: `${GH}/mern-challenge`, accent: "pink", tag: "Dashboard" },
  { slug: "pg", name: "PayingGuest Website", category: "Marketplace", stack: ["HTML", "JavaScript"], blurb: "PG listings platform with search, filters & booking requests.", href: url("PayingGuest-Website"), repo: `${GH}/PayingGuest-Website`, accent: "lime", tag: "Marketplace" },
  { slug: "bharatbhent", name: "Bharatbhent", category: "Community", stack: ["JavaScript", "Node.js"], blurb: "Community platform bringing people together around Indian culture.", href: url("Bharatbhent"), repo: `${GH}/Bharatbhent`, accent: "sky", tag: "Community" },
];

const accents: Accent[] = ["ember", "teal", "violet", "pink", "lime", "sky"];
const humanName = (name: string) => name.replace(/[-_]/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
const categoryFor = (name: string): Project["category"] => {
  const n = name.toLowerCase();
  if (/course|learn|student|school|academy|studisky/.test(n)) return "EdTech";
  if (/chat|social|codebin/.test(n)) return "Social";
  if (/task|backend|test|assignment|practice/.test(n)) return "Ops";
  if (/id-card|user-management/.test(n)) return "Enterprise";
  return "Web App";
};

/** Public GitHub snapshot, sorted by each repository's most recent push. */
export const projects: Project[] = githubRepos.map((repo, index) => {
  const featured = featuredProjects.find((project) => project.repo.toLowerCase() === `${GH}/${repo.name}`.toLowerCase());
  return {
    slug: featured?.slug ?? repo.name.toLowerCase(),
    name: featured?.name ?? humanName(repo.name),
    category: featured?.category ?? categoryFor(repo.name),
    stack: featured?.stack ?? (repo.language ? [repo.language] : []),
    blurb: featured?.blurb ?? repo.description ?? `Explore the ${humanName(repo.name)} repository on GitHub.`,
    href: repo.fork || !featured ? url(repo.name) : featured.href,
    repo: `${GH}/${repo.name}`,
    accent: featured?.accent ?? accents[index % accents.length],
    tag: featured?.tag ?? (repo.fork ? "Fork" : "GitHub"),
    caseStudy: featured?.caseStudy,
    updatedAt: repo.pushedAt,
    fork: repo.fork,
  };
});

export const projectCategories = Array.from(new Set(projects.map((p) => p.category))).sort();
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
