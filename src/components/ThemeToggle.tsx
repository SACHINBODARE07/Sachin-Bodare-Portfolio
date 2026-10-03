import { useEffect, useRef, useState } from "react";
import { Palette, Check } from "lucide-react";
import { themes, useTheme, type ThemeKey } from "@/lib/theme";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <Button
        variant="outline"
        size="icon"
        onClick={() => setOpen((o) => !o)}
        aria-label="Change theme"
        aria-expanded={open}
        className="grid h-9 w-9 place-items-center rounded-full border border-border bg-surface/70 backdrop-blur hover:border-ember hover:text-ember transition-all hover:rotate-45"
      >
        <Palette className="h-4 w-4" />
      </Button>
      {open && (
        <div className="absolute right-0 top-11 z-50 w-56 rounded-xl border border-border bg-popover/95 backdrop-blur shadow-2xl p-2 reveal-up">
          <div className="text-mono text-[10px] uppercase tracking-wider text-muted-foreground px-2 py-1.5">
            Pick a theme
          </div>
          {themes.map((t) => {
            const active = t.key === theme;
            return (
              <Button
                variant="ghost"
                key={t.key}
                onMouseEnter={() => document.documentElement.setAttribute("data-theme", t.key)}
                onMouseLeave={() => document.documentElement.setAttribute("data-theme", theme)}
                onClick={() => { setTheme(t.key as ThemeKey); setOpen(false); }}
                className={`w-full flex items-center gap-3 rounded-lg px-2 py-2 text-sm hover:bg-secondary transition-colors ${active ? "bg-secondary" : ""}`}
              >
                <div className="flex -space-x-1.5">
                  {t.swatch.map((c) => (
                    <span key={c} className="h-4 w-4 rounded-full ring-2 ring-popover" style={{ background: c }} />
                  ))}
                </div>
                <span className="flex-1 text-left text-foreground">{t.label}</span>
                <span className="text-mono text-[9px] uppercase text-muted-foreground">{t.mode}</span>
                {active && <Check className="h-3.5 w-3.5 text-ember" />}
              </Button>
            );
          })}
          <div className="text-mono text-[10px] text-muted-foreground px-2 py-1.5 border-t border-border/60 mt-1">
            Hover to preview · click to apply
          </div>
        </div>
      )}
    </div>
  );
}
