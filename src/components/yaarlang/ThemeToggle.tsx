import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useModeAnimation, ThemeAnimationType } from "react-theme-switch-animation";

const themeToggleClassName =
  "grid h-9 w-9 place-items-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:text-foreground";

// react-theme-switch-animation is browser-only (it drives the View Transition
// API), so this is split out and only mounted client-side — see ThemeToggle below.
function AnimatedThemeToggle() {
  const { ref, toggleSwitchTheme, isDarkMode } = useModeAnimation({
    animationType: ThemeAnimationType.CIRCLE,
    duration: 750,
  });

  return (
    <button ref={ref} type="button" onClick={toggleSwitchTheme} aria-label="Toggle theme" className={themeToggleClassName}>
      {isDarkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
    </button>
  );
}

export function ThemeToggle() {
  // Renders the same static button during SSR and the initial client render
  // (so hydration matches), then swaps in the real hook-driven button once
  // mounted in the browser — calling the hook during SSR crashes it.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <button type="button" aria-label="Toggle theme" className={themeToggleClassName}>
        <Sun className="h-4 w-4" />
      </button>
    );
  }

  return <AnimatedThemeToggle />;
}
