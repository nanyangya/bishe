import { defineStore } from "pinia";

const STORAGE_KEY = "portfolio-theme";

export type ThemeMode = "light" | "dark";

export function readStoredTheme(): ThemeMode {
  if (typeof window === "undefined") return "light";
  const v = localStorage.getItem(STORAGE_KEY);
  if (v === "light" || v === "dark") return v;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/** 在应用挂载前调用，避免首屏颜色闪烁 */
export function applyInitialTheme() {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.theme = readStoredTheme();
}

export const useThemeStore = defineStore("theme", {
  state: () => ({
    theme: readStoredTheme() as ThemeMode,
  }),
  getters: {
    isDark: (s) => s.theme === "dark",
  },
  actions: {
    setTheme(mode: ThemeMode) {
      this.theme = mode;
      document.documentElement.dataset.theme = mode;
      localStorage.setItem(STORAGE_KEY, mode);
    },
    toggleTheme() {
      this.setTheme(this.theme === "dark" ? "light" : "dark");
    },
  },
});
