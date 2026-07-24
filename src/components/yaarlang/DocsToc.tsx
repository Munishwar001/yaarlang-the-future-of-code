import { useActiveSection } from "@/hooks/use-active-section";

export type TocItem = { id: string; label: string };

export function DocsToc({ items }: { items: TocItem[] }) {
  const activeId = useActiveSection(items.map((i) => i.id));

  if (items.length < 2) return null;

  return (
    <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-55 shrink-0 overflow-y-auto py-8 pl-6 xl:block">
      <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">On this page</div>
      <ul className="mt-3 space-y-1 border-l border-border text-sm">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`-ml-px block border-l-2 px-3 py-1 transition-colors ${
                activeId === item.id
                  ? "border-indigo-500 font-medium text-indigo-700 dark:text-indigo-300"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
