import { Link } from "@tanstack/react-router";
import { Search, Sun, Github } from "lucide-react";
import { Logo } from "./Logo";

const links = ["Features", "Documentation", "Playground"];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 glass">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-6">
        <a href="/" className="flex items-center gap-2">
          <Logo className="h-8 w-8" />
          <span className="text-[15px] font-semibold tracking-tight">YaarLang</span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) =>
            l === "Documentation" ? (
              <Link
                key={l}
                to="/docs"
                className="rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {l}
              </Link>
            ) : (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {l}
              </a>
            )
          )}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <div className="hidden items-center gap-2 rounded-lg border border-border bg-secondary/60 px-3 py-1.5 text-xs text-muted-foreground md:flex">
            <Search className="h-3.5 w-3.5" />
            <span>Search docs</span>
            <kbd className="rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px]">⌘K</kbd>
          </div>
          <button className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:text-foreground">
            <Sun className="h-4 w-4" />
          </button>
          <a
            href="https://github.com/Munishwar001/yaarlang-the-future-of-code"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg bg-foreground px-3.5 py-2 text-sm font-medium text-background transition-all hover:opacity-90"
          >
            <Github className="h-4 w-4" /> GitHub
          </a>
        </div>
      </div>
    </header>
  );
}
