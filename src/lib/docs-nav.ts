export type DocLink = { path: string; label: string };
export type DocGroup = { title: string; items: DocLink[] };

export const docsGroups: DocGroup[] = [
  {
    title: "Getting Started",
    items: [
      { path: "/docs/overview", label: "Overview" },
      { path: "/docs/installation", label: "Installation" },
      { path: "/docs/cli-usage", label: "CLI Usage" },
    ],
  },
  {
    title: "Language Guide",
    items: [
      { path: "/docs/variables", label: "Variables & Printing" },
      { path: "/docs/operators", label: "Operators" },
      { path: "/docs/conditions", label: "Conditions" },
      { path: "/docs/loops", label: "Loops" },
      { path: "/docs/functions", label: "Functions" },
      { path: "/docs/arrays", label: "Arrays" },
      { path: "/docs/input", label: "Input" },
      { path: "/docs/errors", label: "Errors" },
      { path: "/docs/comments", label: "Comments" },
    ],
  },
];

export const docsPageOrder: DocLink[] = docsGroups.flatMap((g) => g.items);

export function getDocsAdjacent(path: string) {
  const index = docsPageOrder.findIndex((item) => item.path === path);
  return {
    prev: index > 0 ? docsPageOrder[index - 1] : null,
    next: index >= 0 && index < docsPageOrder.length - 1 ? docsPageOrder[index + 1] : null,
  };
}
