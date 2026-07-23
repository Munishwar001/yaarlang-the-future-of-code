import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ChevronRight, Search } from "lucide-react";
import { Nav } from "@/components/yaarlang/Nav";
import { Footer } from "@/components/yaarlang/Sections";

export const Route = createFileRoute("/docs")({
  head: () => ({
    meta: [
      { title: "Documentation — YaarLang" },
      { name: "description", content: "Guides, language tour, and reference docs for YaarLang." },
    ],
  }),
  component: DocsPage,
});

const items = [
  "Getting Started", "Installation", "Language Tour", "Standard Library",
  "Package Manager", "Async & Concurrency", "FFI", "Deployment",
];

function DocsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-8">
          <div className="text-xs font-semibold uppercase tracking-widest text-indigo-500">Documentation</div>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">Docs that respect your time.</h1>
          <p className="mt-3 max-w-2xl text-[17px] leading-relaxed text-muted-foreground">
            Searchable, versioned, and packed with runnable examples.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-elegant)]">
          <div className="grid grid-cols-1 md:grid-cols-[240px_minmax(0,1fr)]">
            <aside className="border-b border-border bg-secondary/40 p-5 md:border-b-0 md:border-r">
              <div className="mb-4 flex items-center gap-2 rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-muted-foreground">
                <Search className="h-3.5 w-3.5" /> Search docs
              </div>
              <ul className="space-y-1 text-sm">
                {items.map((it, i) => (
                  <li
                    key={it}
                    className={`flex cursor-pointer items-center justify-between rounded-lg px-2.5 py-1.5 ${
                      i === 2 ? "bg-indigo-50 text-indigo-700" : "text-muted-foreground hover:bg-secondary"
                    }`}
                  >
                    {it} {i === 2 && <ChevronRight className="h-3.5 w-3.5" />}
                  </li>
                ))}
              </ul>
            </aside>
            <div className="p-8">
              <div className="text-xs text-muted-foreground">Guide / Language Tour</div>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">A quick tour of YaarLang</h2>
              <div className="mt-4 flex gap-2 border-b border-border">
                {["Overview", "Syntax", "Types", "Modules"].map((t, i) => (
                  <button
                    key={t}
                    className={`px-3 py-2 text-sm ${i === 1 ? "border-b-2 border-indigo-500 font-medium" : "text-muted-foreground"}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                Every YaarLang program is a sequence of statements. Declare a variable with{" "}
                <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-[13px]">maan_lo</code>, and print
                a value with <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-[13px]">bol</code>.
              </p>
              <pre className="mt-5 rounded-2xl bg-[#0f172a] p-5 font-mono text-[12.5px] leading-6 text-slate-200">
{`maan_lo naam = "Duniya"
maan_lo sum = 10 + 20

bol naam
bol sum`}
              </pre>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
