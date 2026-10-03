import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type ThemeKey = "ember" | "ocean" | "neon" | "forest" | "midnight" | "light";

export const themes: { key: ThemeKey; label: string; swatch: string[]; mode: "dark" | "light" }[] = [
  { key: "ember",    label: "Ember",    mode: "dark",  swatch: ["#c95a1e", "#e8558a", "#a56cf0"] },
  { key: "ocean",    label: "Ocean",    mode: "dark",  swatch: ["#3aa6c6", "#66d0d6", "#7b8bff"] },
  { key: "neon",     label: "Neon",     mode: "dark",  swatch: ["#ff3ea5", "#a34ff5", "#3edcff"] },
  { key: "forest",   label: "Forest",   mode: "dark",  swatch: ["#8ecf3f", "#59c8a3", "#e3a04a"] },
  { key: "midnight", label: "Midnight", mode: "dark",  swatch: ["#5c7bff", "#8a6bff", "#4dc4d8"] },
  { key: "light",    label: "Daylight", mode: "light", swatch: ["#d24d1e", "#c33b7a", "#7a4bcf"] },
];

const ThemeCtx = createContext<{
  theme: ThemeKey;
  setTheme: (t: ThemeKey) => void;
}>({ theme: "light", setTheme: () => {} });

const STORAGE = "sb-theme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeKey>("light");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE) as ThemeKey | null;
      if (saved && themes.some((t) => t.key === saved)) {
        setThemeState(saved);
        document.documentElement.setAttribute("data-theme", saved);
      } else {
        document.documentElement.setAttribute("data-theme", "light");
      }
    } catch {}
  }, []);

  const setTheme = (t: ThemeKey) => {
    setThemeState(t);
    document.documentElement.setAttribute("data-theme", t);
    try { localStorage.setItem(STORAGE, t); } catch {}
  };

  return <ThemeCtx.Provider value={{ theme, setTheme }}>{children}</ThemeCtx.Provider>;
}

export const useTheme = () => useContext(ThemeCtx);
