export type DocLink = { path: string; label: string; keywords?: string[] };
export type DocGroup = { title: string; items: DocLink[] };

export const docsGroups: DocGroup[] = [
  {
    title: "Getting Started",
    items: [
      {
        path: "/docs/overview",
        label: "Overview",
        keywords: ["what is yaarlang", "hinglish", "compiler pipeline", "lexer", "parser", "codegen", "runtime", "first program"],
      },
      {
        path: "/docs/installation",
        label: "Installation",
        keywords: ["npm install", "npx", "setup", "node", "global"],
      },
      {
        path: "/docs/cli-usage",
        label: "CLI Usage",
        keywords: ["yaarlang command", "run file", "terminal", "yl file"],
      },
    ],
  },
  {
    title: "Language Guide",
    items: [
      {
        path: "/docs/variables",
        label: "Variables & Printing",
        keywords: ["maan_lo", "bol", "declare", "print", "assign", "reassign", "let"],
      },
      {
        path: "/docs/operators",
        label: "Operators",
        keywords: [
          "arithmetic", "comparison", "logical", "assignment", "plus", "minus", "multiply", "divide",
          "sach", "jhoot", "true", "false", "and", "or", "equal", "not equal",
        ],
      },
      {
        path: "/docs/booleans",
        label: "Booleans",
        keywords: ["sach", "jhoot", "boolean", "true", "false"],
      },
      {
        path: "/docs/conditions",
        label: "Conditions",
        keywords: ["agar", "nahito", "if", "else", "if else", "branch"],
      },
      {
        path: "/docs/loops",
        label: "Loops",
        keywords: ["jabtak", "while", "for", "iterate", "repeat", "infinite loop"],
      },
      {
        path: "/docs/functions",
        label: "Functions",
        keywords: ["kaam", "wapis", "return", "function", "def", "parameters", "arguments", "recursion"],
      },
      {
        path: "/docs/arrays",
        label: "Arrays",
        keywords: ["jodo", "nikalo", "lambai", "push", "pop", "insert", "remove", "index", "list", "length"],
      },
      {
        path: "/docs/input",
        label: "Input",
        keywords: ["sun", "read", "prompt", "stdin", "user input"],
      },
      {
        path: "/docs/errors",
        label: "Errors",
        keywords: ["galti", "throw", "exception", "error handling", "try catch"],
      },
      {
        path: "/docs/comments",
        label: "Comments",
        keywords: ["//", "comment", "block comment"],
      },
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
