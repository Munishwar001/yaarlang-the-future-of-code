import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Search, Github, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import type { DocGroup } from "@/lib/docs-nav";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { DocsSidebarNav } from "./DocsSidebar";

const VERSION = "v1.0.1";

export function DocsNav({ groups }: { groups: DocGroup[] }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 glass">
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              type="button"
              aria-label="Open documentation menu"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:text-foreground lg:hidden"
            >
              <Menu className="h-4 w-4" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-3/4 overflow-y-auto sm:max-w-xs">
            <SheetTitle className="flex items-center gap-2">
              <Logo className="h-7 w-7" />
              YaarLang Docs
            </SheetTitle>
            <div className="mt-4">
              <DocsSidebarNav groups={groups} onNavigate={() => setOpen(false)} />
            </div>
          </SheetContent>
        </Sheet>

        <Link to="/" className="flex items-center gap-2">
          <Logo className="h-8 w-8" />
          <span className="text-[15px] font-semibold tracking-tight">YaarLang</span>
        </Link>
        <span className="rounded-full border border-border bg-secondary/60 px-2 py-0.5 text-xs font-medium text-muted-foreground">
          {VERSION}
        </span>

        <div className="ml-auto flex items-center gap-2">
          <div className="hidden items-center gap-2 rounded-lg border border-border bg-secondary/60 px-3 py-1.5 text-xs text-muted-foreground sm:flex">
            <Search className="h-3.5 w-3.5" />
            <span className="hidden md:inline">Search docs</span>
            <kbd className="rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px]">⌘K</kbd>
          </div>
          <a
            href="https://github.com/Munishwar001/yaarlang-the-future-of-code"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View on GitHub"
            className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:text-foreground"
          >
            <Github className="h-4 w-4" />
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
