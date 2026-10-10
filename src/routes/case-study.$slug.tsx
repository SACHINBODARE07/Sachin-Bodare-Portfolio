import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Github, ExternalLink, Sparkles, CheckCircle2, Layers, Calendar, User, Target, Wrench } from "lucide-react";
import { getProject, projects, accentClass, type Project, type CaseStudy } from "@/lib/projects";
import { ThemeToggle } from "@/components/ThemeToggle";
import { CursorGlow } from "@/components/CursorGlow";
import { ThemeProvider } from "@/lib/theme";

export const Route = createFileRoute("/case-study/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project || !project.caseStudy) throw notFound();
    return { project };
  },
  head: ({ loaderData }: { loaderData?: { project: Project } }) => {
    const p = loaderData?.project;
    const title = p ? `${p.name} — Case Study · Sachin Bodare` : "Case Study";
    const desc = p?.blurb ?? "Project case study by Sachin Bodare.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: () => <ThemeProvider><CaseStudyPage /></ThemeProvider>,
  errorComponent: ({ error }) => (
    <div className="min-h-screen grid place-items-center p-6 text-center">
      <div>
        <p className="text-mono text-xs text-muted-foreground mb-3">Something broke</p>
        <p className="text-foreground mb-6">{error instanceof Error ? error.message : String(error)}</p>
        <Link to="/" className="text-ember underline">Back home</Link>
      </div>
    </div>
  ),
  notFoundComponent: () => (
    <div className="min-h-screen grid place-items-center p-6 text-center">
      <div>
        <p className="text-mono text-xs text-muted-foreground mb-3">404</p>
        <h1 className="text-display text-4xl mb-4">Case study not found</h1>
        <Link to="/" className="text-ember underline">Back home</Link>
      </div>
    </div>
  ),
});

function CaseStudyPage() {
  const data = Route.useLoaderData() as { project: Project };
  const project = data.project;
  const a = accentClass[project.accent];
  const cs = project.caseStudy as CaseStudy;
  const related = projects.filter((p) => p.caseStudy && p.slug !== project.slug).slice(0, 3);

  // Use GitHub OG image (real screenshot-style card) as hero visual
  const ogImage = `https://opengraph.githubassets.com/1/${project.repo}`;

  return (
    <div className="min-h-screen grain overflow-x-hidden">
      <CursorGlow />
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border/60">
        <div className="mx-auto max-w-5xl px-5 sm:px-8 h-16 flex items-center justify-between gap-3">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-ember transition">
            <ArrowLeft className="h-4 w-4" /> Back to portfolio
          </Link>
          <div className="flex items-center gap-3">
            <a href={project.href} target="_blank" rel="noreferrer" className="text-mono text-xs text-muted-foreground hover:text-ember inline-flex items-center gap-1">
              <Github className="h-3.5 w-3.5" /> repo
            </a>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <article className="mx-auto max-w-5xl px-5 sm:px-8 py-12 sm:py-16">
        <div className="reveal-up">
          <div className={`inline-flex items-center gap-2 text-mono text-[10px] uppercase tracking-widest ${a.text}`}>
            <span className={`h-1.5 w-1.5 rounded-full bg-current`} />
            {project.category} · {project.tag}
          </div>
          <h1 className="mt-4 text-display text-5xl sm:text-7xl md:text-8xl leading-[0.95]">
            {project.name}
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-3xl leading-relaxed">
            {project.blurb}
          </p>

          <div className="mt-8 flex flex-wrap gap-6 text-mono text-xs">
            <div><div className="text-muted-foreground uppercase tracking-widest text-[10px]">Role</div><div className="text-foreground mt-1 flex items-center gap-1.5"><User className="h-3 w-3" /> {cs.role}</div></div>
            <div><div className="text-muted-foreground uppercase tracking-widest text-[10px]">Year</div><div className="text-foreground mt-1 flex items-center gap-1.5"><Calendar className="h-3 w-3" /> {cs.year}</div></div>
            <div><div className="text-muted-foreground uppercase tracking-widest text-[10px]">Category</div><div className="text-foreground mt-1 flex items-center gap-1.5"><Layers className="h-3 w-3" /> {project.category}</div></div>
          </div>
        </div>

        {/* Hero screenshot (GitHub OG card) */}
        <div className={`relative mt-12 rounded-2xl border ${a.border} ${a.bg} p-2 sm:p-3 overflow-hidden reveal-up`}>
          <div className={`absolute -inset-10 ${a.bg} blur-3xl opacity-40 -z-0`} />
          <div className="relative rounded-xl overflow-hidden bg-surface border border-border">
            <img
              src={ogImage}
              alt={`${project.name} preview`}
              loading="lazy"
              className="w-full h-auto block"
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
            />
          </div>
        </div>

        {/* Problem / Solution */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-border bg-surface/60 p-6 card-lift">
            <div className="flex items-center gap-2 text-mono text-xs text-pink mb-3"><Target className="h-4 w-4" /> PROBLEM</div>
            <p className="text-foreground leading-relaxed">{cs.problem}</p>
          </div>
          <div className="rounded-xl border border-border bg-surface/60 p-6 card-lift">
            <div className="flex items-center gap-2 text-mono text-xs text-lime mb-3"><Sparkles className="h-4 w-4" /> SOLUTION</div>
            <p className="text-foreground leading-relaxed">{cs.solution}</p>
          </div>
        </div>

        {/* Highlights */}
        <section className="mt-16">
          <h2 className="text-display text-3xl sm:text-4xl mb-6">Highlights</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {cs.highlights.map((h) => (
              <div key={h} className={`rounded-lg border ${a.border} ${a.bg} p-4 flex items-start gap-3 card-lift`}>
                <CheckCircle2 className={`h-4 w-4 mt-0.5 shrink-0 ${a.text}`} />
                <span className="text-foreground text-sm">{h}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="mt-16">
          <h2 className="text-display text-3xl sm:text-4xl mb-6">What's inside</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            {cs.features.map((f) => (
              <li key={f} className="rounded-md border border-border/60 bg-surface/40 px-4 py-3 text-muted-foreground hover:text-foreground hover:border-ember transition">
                {f}
              </li>
            ))}
          </ul>
        </section>

        {/* Stack */}
        <section className="mt-16">
          <h2 className="text-display text-3xl sm:text-4xl mb-6 flex items-center gap-3"><Wrench className="h-6 w-6 text-teal" /> Stack</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {cs.stackDetail.map((s) => (
              <div key={s.label} className="rounded-xl border border-border bg-surface/60 p-5">
                <div className="text-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3">{s.label}</div>
                <ul className="flex flex-wrap gap-1.5 text-mono text-xs">
                  {s.items.map((i) => (
                    <li key={i} className="rounded-md bg-secondary px-2 py-1 text-foreground">{i}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-16 rounded-2xl border border-border bg-gradient-to-br from-surface via-surface/60 to-surface-2 p-8 sm:p-10 text-center overflow-hidden relative">
          <div className="absolute -top-20 -right-20 h-48 w-48 rounded-full bg-ember/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-violet/20 blur-3xl" />
          <div className="relative">
            <h3 className="text-display text-3xl sm:text-4xl">Want the full walkthrough?</h3>
            <p className="mt-3 text-muted-foreground">Explore the code or drop me a message.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a href={project.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-ember via-pink to-violet text-primary-foreground px-6 py-3 text-sm font-medium hover:scale-105 transition-transform">
                <Github className="h-4 w-4" /> View repo <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <Link to="/" hash="contact" className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm hover:border-ember hover:text-ember transition">
                Start a project
              </Link>
            </div>
          </div>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="text-display text-3xl sm:text-4xl mb-6">More case studies</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map((p) => {
                const ra = accentClass[p.accent];
                return (
                  <Link
                    key={p.slug}
                    to="/case-study/$slug"
                    params={{ slug: p.slug }}
                    className={`card-lift rounded-xl border border-border bg-surface/60 p-5 block relative overflow-hidden`}
                  >
                    <div className={`absolute -top-10 -right-10 h-24 w-24 rounded-full ${ra.bg} blur-2xl`} />
                    <div className={`relative text-mono text-[10px] uppercase ${ra.text}`}>{p.category}</div>
                    <div className="relative mt-2 text-foreground font-medium">{p.name}</div>
                    <div className="relative mt-1 text-xs text-muted-foreground line-clamp-2">{p.blurb}</div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </article>
    </div>
  );
}
