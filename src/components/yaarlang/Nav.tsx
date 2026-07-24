import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Search, Sun, Moon, Github, Menu } from "lucide-react";
import { useModeAnimation, ThemeAnimationType } from "react-theme-switch-animation";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "./Logo";

const links = ["Features", "Documentation", "Playground"];

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

function ThemeToggle() {
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

function NavLink({ label, onNavigate, className }: { label: string; onNavigate?: () => void; className: string }) {
  if (label === "Documentation") {
    return (
      <Link to="/docs" onClick={onNavigate} className={className}>
        {label}
      </Link>
    );
  }
  return (
    <a href={`#${label.toLowerCase()}`} onClick={onNavigate} className={className}>
      {label}
    </a>
  );
}

function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Open menu"
          className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:text-foreground md:hidden"
        >
          <Menu className="h-4 w-4" />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-3/4 sm:max-w-xs">
        <SheetTitle className="flex items-center gap-2">
          <Logo className="h-7 w-7" />
          YaarLang
        </SheetTitle>
        <nav className="mt-4 flex flex-col gap-1">
          {links.map((l) => (
            <NavLink
              key={l}
              label={l}
              onNavigate={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-base text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            />
          ))}
        </nav>
        <a
          href="https://github.com/Munishwar001/yaarlang-the-future-of-code"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setOpen(false)}
          className="mt-4 flex items-center justify-center gap-1.5 rounded-lg bg-foreground px-3.5 py-2.5 text-sm font-medium text-background transition-all hover:opacity-90"
        >
          <Github className="h-4 w-4" /> GitHub
        </a>
      </SheetContent>
    </Sheet>
  );
}

export function Nav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 glass">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-6">
        <a href="/" className="flex items-center gap-2">
          <Logo className="h-8 w-8" />
          <span className="text-[15px] font-semibold tracking-tight">YaarLang</span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <NavLink
              key={l}
              label={l}
              className="rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            />
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <div className="hidden items-center gap-2 rounded-lg border border-border bg-secondary/60 px-3 py-1.5 text-xs text-muted-foreground md:flex">
            <Search className="h-3.5 w-3.5" />
            <span>Search docs</span>
            <kbd className="rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px]">⌘K</kbd>
          </div>
          <ThemeToggle />
          <a
            href="https://github.com/Munishwar001/yaarlang-the-future-of-code"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 rounded-lg bg-foreground px-3.5 py-2 text-sm font-medium text-background transition-all hover:opacity-90 md:flex"
          >
            <Github className="h-4 w-4" /> GitHub
          </a>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
