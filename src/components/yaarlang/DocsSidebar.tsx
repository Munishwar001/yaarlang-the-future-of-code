import { Link } from "@tanstack/react-router";
import type { DocGroup } from "@/lib/docs-nav";

export function DocsSidebarNav({ groups, onNavigate }: { groups: DocGroup[]; onNavigate?: () => void }) {
  return (
    <nav className="space-y-6 text-sm">
      {groups.map((group) => (
        <div key={group.title}>
          <div className="px-2.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {group.title}
          </div>
          <ul className="mt-2 space-y-0.5">
            {group.items.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={onNavigate}
                  className="block rounded-lg px-2.5 py-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  activeProps={{
                    className:
                      "!bg-indigo-50 !text-indigo-700 font-medium dark:!bg-indigo-500/10 dark:!text-indigo-300",
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export function DocsSidebar({ groups }: { groups: DocGroup[] }) {
  return (
    <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] shrink-0 overflow-y-auto border-r border-border bg-secondary/20 px-4 py-8 lg:block lg:w-60">
      <DocsSidebarNav groups={groups} />
    </aside>
  );
}
