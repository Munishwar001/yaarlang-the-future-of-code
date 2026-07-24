import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { docsGroups } from "@/lib/docs-nav";

// Plain substring matching against the label + curated keywords, instead of
// cmdk's default fuzzy scorer — on a ~12-page docs site, fuzzy subsequence
// matching surfaces unrelated pages (e.g. "galti" fuzzy-matching "CLI Usage").
// Substring matching keeps results predictable and keyword-accurate.
function filterDocsSearch(value: string, search: string, keywords?: string[]) {
  const query = search.trim().toLowerCase();
  if (!query) return 1;
  const haystack = [value, ...(keywords ?? [])].join(" ").toLowerCase();
  return haystack.includes(query) ? 1 : 0;
}

export function SiteSearch() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((prev) => !prev);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const goTo = (path: string) => {
    setOpen(false);
    navigate({ to: path });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search documentation"
        className="hidden items-center gap-2 rounded-lg border border-border bg-secondary/60 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground sm:flex"
      >
        <Search className="h-3.5 w-3.5" />
        <span className="hidden md:inline">Search docs</span>
        <kbd className="rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px]">⌘K</kbd>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="overflow-hidden p-0">
          <DialogTitle className="sr-only">Search documentation</DialogTitle>
          <DialogDescription className="sr-only">Search and jump to a documentation page</DialogDescription>
          <Command
            filter={filterDocsSearch}
            className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5"
          >
            <CommandInput placeholder="Search documentation..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              {docsGroups.map((group) => (
                <CommandGroup key={group.title} heading={group.title}>
                  {group.items.map((item) => (
                    <CommandItem
                      key={item.path}
                      value={item.label}
                      keywords={item.keywords}
                      onSelect={() => goTo(item.path)}
                    >
                      {item.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  );
}
