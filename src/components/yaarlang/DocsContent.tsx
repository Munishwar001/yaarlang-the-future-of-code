import type { ReactNode } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, TriangleAlert } from "lucide-react";
import { getDocsAdjacent } from "@/lib/docs-nav";

export function DocsArticle({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <>
      <div className="mb-10">
        <div className="text-xs font-semibold uppercase tracking-widest text-indigo-500">{eyebrow}</div>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
        {description && (
          <p className="mt-3 max-w-2xl text-[17px] leading-relaxed text-muted-foreground">{description}</p>
        )}
      </div>
      {children}
      <DocsPager />
    </>
  );
}

export function DocSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 border-b border-border py-8 first:pt-0 last:border-b-0">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-muted-foreground">{children}</div>
    </section>
  );
}

export function InlineCode({ children }: { children: ReactNode }) {
  return <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-[13px] text-foreground">{children}</code>;
}

export function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="overflow-x-auto rounded-2xl bg-[#0f172a] p-5 font-mono text-[12.5px] leading-6 text-slate-200">
      {code}
    </pre>
  );
}

// Every Language Guide page follows the same shape: what it is, generic
// syntax, a runnable example, its real output, notes, then optional gotchas.
export function GuideBlock({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="mt-2">{children}</div>
    </div>
  );
}

export function NoteList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="list-disc space-y-1.5 pl-5">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

export function MistakeList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-[14px] leading-relaxed text-amber-900 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-200"
        >
          <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function ConceptGuide({
  whatItIs,
  syntax,
  example,
  output,
  notes,
  commonMistakes,
}: {
  whatItIs: ReactNode;
  syntax: string;
  example: string;
  output: string;
  notes: ReactNode[];
  commonMistakes?: ReactNode[];
}) {
  return (
    <div className="space-y-6">
      <p>{whatItIs}</p>
      <GuideBlock label="Syntax">
        <CodeBlock code={syntax} />
      </GuideBlock>
      <GuideBlock label="Example">
        <CodeBlock code={example} />
      </GuideBlock>
      <GuideBlock label="Output">
        <CodeBlock code={output} />
      </GuideBlock>
      <GuideBlock label="Notes & Rules">
        <NoteList items={notes} />
      </GuideBlock>
      {commonMistakes && commonMistakes.length > 0 && (
        <GuideBlock label="Common Mistakes">
          <MistakeList items={commonMistakes} />
        </GuideBlock>
      )}
    </div>
  );
}

function DocsPager() {
  const { pathname } = useLocation();
  const { prev, next } = getDocsAdjacent(pathname);

  if (!prev && !next) return null;

  return (
    <div className="mt-10 flex items-center justify-between gap-4 border-t border-border pt-6">
      {prev ? (
        <Link
          to={prev.path}
          className="group flex max-w-[45%] flex-col items-start rounded-xl border border-border px-4 py-2.5 text-sm transition-colors hover:bg-secondary"
        >
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <ArrowLeft className="h-3 w-3" /> Previous
          </span>
          <span className="font-medium text-foreground">{prev.label}</span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          to={next.path}
          className="group flex max-w-[45%] flex-col items-end rounded-xl border border-border px-4 py-2.5 text-right text-sm transition-colors hover:bg-secondary"
        >
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            Next <ArrowRight className="h-3 w-3" />
          </span>
          <span className="font-medium text-foreground">{next.label}</span>
        </Link>
      ) : (
        <span />
      )}
    </div>
  );
}
