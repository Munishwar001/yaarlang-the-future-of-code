import {
  BookOpen, Zap, Globe, Sparkles, Package, Heart, ShieldCheck, GitBranch, Wrench,
  Play, Save, Share2, Wand2, Bug, Copy, Terminal, Cpu, Gauge, MemoryStick, Timer,
  Command, Boxes, ScanLine, FileText, Braces, PanelsTopLeft, Star, Download, Users, MessageCircle,
  ArrowRight, Search, ChevronRight,
} from "lucide-react";

/* ---------- Features ---------- */
const features = [
  { icon: BookOpen, title: "Readable Syntax", desc: "Clean, expressive grammar that reads like English yet compiles like C." },
  { icon: Zap, title: "Fast Compiler", desc: "Incremental compilation with sub-second feedback for large projects." },
  { icon: Globe, title: "Cross Platform", desc: "One codebase — targets macOS, Linux, Windows, WASM, and mobile." },
  { icon: Sparkles, title: "AI Friendly", desc: "Designed for LLM tooling with structured ASTs and rich metadata." },
  { icon: Package, title: "Package Manager", desc: "Built-in `yaar` CLI. Reproducible builds, workspaces, lockfiles." },
  { icon: Heart, title: "Developer Experience", desc: "Delightful errors, actionable hints, first-class editor support." },
  { icon: ShieldCheck, title: "Memory Safe", desc: "Ownership model with automatic borrow checking — zero runtime GC." },
  { icon: GitBranch, title: "Open Source", desc: "Apache-2.0. Governed by an open RFC process and community." },
  { icon: Wrench, title: "Powerful Tooling", desc: "Debugger, profiler, formatter, linter — batteries included." },
];

export function Features() {
  return (
    <section id="features" className="relative mx-auto max-w-7xl px-6 py-28">
      <SectionEyebrow>Features</SectionEyebrow>
      <SectionTitle>Everything a modern language should be.</SectionTitle>
      <SectionLede>
        A carefully designed set of primitives that let you ship fast without giving up safety, clarity, or joy.
      </SectionLede>
      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="group relative overflow-hidden rounded-3xl border border-border bg-card p-7 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-[var(--shadow-lift)]"
          >
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br from-indigo-100 to-cyan-100 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-indigo-50 to-cyan-50 text-indigo-600 ring-1 ring-indigo-100">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="relative mt-5 text-[17px] font-semibold tracking-tight">{title}</h3>
            <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Playground ---------- */
export function Playground() {
  return (
    <section id="playground" className="relative border-y border-border bg-secondary/50">
      <div className="mx-auto max-w-7xl px-6 py-28">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionEyebrow>Playground</SectionEyebrow>
            <SectionTitle className="mt-2">Try YaarLang in your browser.</SectionTitle>
            <SectionLede className="mt-3 max-w-xl">
              An interactive REPL with autocomplete, formatting, sharing, and one-click debugging.
            </SectionLede>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { icon: Play, label: "Run" },
              { icon: Wand2, label: "Format" },
              { icon: Share2, label: "Share" },
              { icon: Save, label: "Save" },
              { icon: Command, label: "Autocomplete" },
              { icon: Bug, label: "Debug" },
            ].map(({ icon: I, label }) => (
              <button
                key={label}
                className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5"
              >
                <I className="h-3.5 w-3.5 text-indigo-500" /> {label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-4 overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-elegant)] md:grid-cols-2">
          <div className="relative min-h-[360px] bg-[#0f172a] p-5 font-mono text-[13px] leading-6">
            <div className="mb-3 flex items-center gap-2 text-xs text-slate-400">
              <FileText className="h-3.5 w-3.5" /> playground.yaar
            </div>
            <pre className="text-slate-200">
{`let fib = fn(n) {
  if n < 2 { return n }
  return fib(n - 1) + fib(n - 2)
}

for i in 0..10 {
  print(fib(i))
}`}
            </pre>
          </div>
          <div className="min-h-[360px] p-5">
            <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
              <Terminal className="h-3.5 w-3.5" /> Output
            </div>
            <pre className="rounded-2xl bg-secondary/70 p-4 font-mono text-[13px] leading-6 text-foreground">
{`0
1
1
2
3
5
8
13
21
34`}
            </pre>
            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-success animate-pulse-glow" />
              Compiled and executed in 8ms
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Showcase snippets ---------- */
const snippets = [
  { title: "Variables", code: `let name = "yaar"
let pi = 3.1415
let active: bool = true` },
  { title: "Functions", code: `fn add(a: int, b: int) -> int {
  return a + b
}` },
  { title: "Loops", code: `for i in 0..5 {
  print(i)
}` },
  { title: "Conditions", code: `if score >= 90 {
  print("A")
} else {
  print("keep going")
}` },
  { title: "Classes", code: `class Point {
  x: float
  y: float
  fn norm() -> float { sqrt(x*x + y*y) }
}` },
  { title: "Async", code: `async fn fetchUser(id) {
  let res = await http.get("/u/" + id)
  return res.json()
}` },
];

export function Showcase() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-28">
      <SectionEyebrow>Language</SectionEyebrow>
      <SectionTitle>Syntax you'll actually enjoy.</SectionTitle>
      <SectionLede>Familiar where it should be, refreshing where it counts.</SectionLede>
      <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {snippets.map((s) => (
          <div
            key={s.title}
            className="group overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-soft)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]"
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-border">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Braces className="h-4 w-4 text-indigo-500" /> {s.title}
              </div>
              <div className="flex items-center gap-1 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
                <button className="grid h-7 w-7 place-items-center rounded-md hover:bg-secondary"><Copy className="h-3.5 w-3.5" /></button>
                <button className="grid h-7 w-7 place-items-center rounded-md hover:bg-secondary"><Play className="h-3.5 w-3.5" /></button>
              </div>
            </div>
            <pre className="bg-[#0f172a] p-5 font-mono text-[12.5px] leading-6 text-slate-200">{s.code}</pre>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Compiler workflow ---------- */
const pipeline = ["Write Code", "Lexer", "Parser", "Compiler", "Optimization", "Execution", "Output"];

export function Workflow() {
  return (
    <section className="relative overflow-hidden border-y border-border bg-secondary/50">
      <div className="mx-auto max-w-7xl px-6 py-28">
        <SectionEyebrow>Compiler</SectionEyebrow>
        <SectionTitle>From source to speed of light.</SectionTitle>
        <SectionLede>An elegant multi-stage pipeline, transparent every step of the way.</SectionLede>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
          {pipeline.map((step, i) => (
            <div key={step} className="flex items-center gap-3">
              <div className="relative rounded-2xl border border-border bg-card px-5 py-3 shadow-[var(--shadow-soft)]">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-cyan-400/10 opacity-0 transition-opacity duration-500 hover:opacity-100" />
                <div className="relative text-sm font-medium">{step}</div>
              </div>
              {i < pipeline.length - 1 && (
                <div className="relative h-px w-6 sm:w-10 bg-gradient-to-r from-indigo-400 to-cyan-400">
                  <div className="absolute inset-0 blur-sm bg-gradient-to-r from-indigo-400 to-cyan-400" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Performance ---------- */
const benchmarks = [
  { icon: Gauge, title: "Compilation Speed", value: "128k", unit: "loc / s", pct: 92 },
  { icon: Cpu, title: "Execution Speed", value: "0.97x", unit: "vs C", pct: 88 },
  { icon: MemoryStick, title: "Memory Usage", value: "-38%", unit: "vs Node", pct: 76 },
  { icon: Timer, title: "Startup Time", value: "4ms", unit: "cold start", pct: 96 },
];

export function Performance() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-28">
      <SectionEyebrow>Performance</SectionEyebrow>
      <SectionTitle>Numbers you can feel.</SectionTitle>
      <SectionLede>Benchmarks run on Apple M2 · Linux x86_64 · Nov 2026.</SectionLede>

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {benchmarks.map(({ icon: I, title, value, unit, pct }) => (
          <div key={title} className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
            <div className="flex items-center gap-2 text-muted-foreground">
              <I className="h-4 w-4 text-indigo-500" />
              <span className="text-sm">{title}</span>
            </div>
            <div className="mt-6 flex items-baseline gap-2">
              <div className="text-4xl font-semibold tracking-tight">{value}</div>
              <div className="text-xs text-muted-foreground">{unit}</div>
            </div>
            <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Ecosystem ---------- */
const ecosystem = [
  { icon: Terminal, title: "CLI", desc: "`yaar` — build, test, run." },
  { icon: Package, title: "Package Manager", desc: "Reproducible dependency graph." },
  { icon: Bug, title: "Debugger", desc: "Time-travel debugging." },
  { icon: Boxes, title: "Extensions", desc: "VS Code, Zed, Neovim, JetBrains." },
  { icon: PanelsTopLeft, title: "LSP Support", desc: "Instant hover, jump, refactor." },
  { icon: Wand2, title: "Formatter", desc: "Zero-config `yaar fmt`." },
  { icon: ScanLine, title: "Linter", desc: "Actionable, fixable diagnostics." },
  { icon: Cpu, title: "Language Server", desc: "Blazing-fast incremental analysis." },
];

export function Ecosystem() {
  return (
    <section className="border-y border-border bg-secondary/50">
      <div className="mx-auto max-w-7xl px-6 py-28">
        <SectionEyebrow>Ecosystem</SectionEyebrow>
        <SectionTitle>A developer toolbelt, batteries included.</SectionTitle>
        <SectionLede>Everything you need. Nothing you don't.</SectionLede>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ecosystem.map(({ icon: I, title, desc }) => (
            <div key={title} className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-elegant)]">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100">
                <I className="h-4.5 w-4.5" />
              </div>
              <div className="mt-4 text-[15px] font-semibold">{title}</div>
              <div className="mt-1 text-sm text-muted-foreground">{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Docs preview ---------- */
export function DocsPreview() {
  const items = ["Getting Started", "Installation", "Language Tour", "Standard Library", "Package Manager", "Async & Concurrency", "FFI", "Deployment"];
  return (
    <section id="documentation" className="mx-auto max-w-7xl px-6 py-28">
      <SectionEyebrow>Documentation</SectionEyebrow>
      <SectionTitle>Docs that respect your time.</SectionTitle>
      <SectionLede>Searchable, versioned, and packed with runnable examples.</SectionLede>

      <div className="mt-14 overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-elegant)]">
        <div className="grid grid-cols-[240px_minmax(0,1fr)]">
          <aside className="border-r border-border bg-secondary/40 p-5">
            <div className="mb-4 flex items-center gap-2 rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-muted-foreground">
              <Search className="h-3.5 w-3.5" /> Search docs
            </div>
            <ul className="space-y-1 text-sm">
              {items.map((it, i) => (
                <li
                  key={it}
                  className={`flex items-center justify-between rounded-lg px-2.5 py-1.5 ${
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
            <h3 className="mt-2 text-2xl font-semibold tracking-tight">A quick tour of YaarLang</h3>
            <div className="mt-4 flex gap-2 border-b border-border">
              {["Overview", "Syntax", "Types", "Modules"].map((t, i) => (
                <button key={t} className={`px-3 py-2 text-sm ${i === 1 ? "border-b-2 border-indigo-500 font-medium" : "text-muted-foreground"}`}>{t}</button>
              ))}
            </div>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              YaarLang is expression-oriented. Almost everything returns a value, which makes composition
              natural and pattern matching a joy.
            </p>
            <pre className="mt-5 rounded-2xl bg-[#0f172a] p-5 font-mono text-[12.5px] leading-6 text-slate-200">
{`let status = match code {
  200 -> "ok"
  404 -> "not found"
  _   -> "unknown"
}`}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Community ---------- */
export function Community() {
  const stats = [
    { icon: Star, label: "GitHub Stars", value: "48.2k" },
    { icon: Download, label: "Downloads", value: "12M/mo" },
    { icon: Users, label: "Contributors", value: "1,240" },
    { icon: MessageCircle, label: "Discord", value: "38k" },
  ];
  const quotes = [
    { name: "Ada L.", role: "Staff Engineer, Northwind", text: "YaarLang gives me the ergonomics of TypeScript with the performance of Rust. It's the first language that got out of my way." },
    { name: "Kenji T.", role: "Systems Architect", text: "The compiler errors alone are worth switching. It reads like a senior engineer pair-programming with you." },
    { name: "Priya S.", role: "Founder, Loomlabs", text: "We migrated our data pipeline in a week. Everything is faster, safer, and honestly — more fun to write." },
  ];
  return (
    <section id="community" className="border-y border-border bg-secondary/50">
      <div className="mx-auto max-w-7xl px-6 py-28">
        <SectionEyebrow>Community</SectionEyebrow>
        <SectionTitle>Built in the open, together.</SectionTitle>
        <SectionLede>A growing community of developers shaping the future of YaarLang.</SectionLede>

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(({ icon: I, label, value }) => (
            <div key={label} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center gap-2 text-muted-foreground"><I className="h-4 w-4 text-indigo-500" /><span className="text-xs">{label}</span></div>
              <div className="mt-3 text-3xl font-semibold tracking-tight">{value}</div>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {quotes.map((q) => (
            <figure key={q.name} className="rounded-3xl border border-border bg-card p-7 shadow-[var(--shadow-soft)]">
              <blockquote className="text-[15px] leading-relaxed text-foreground">"{q.text}"</blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-cyan-400 text-xs font-semibold text-white">
                  {q.name.split(" ").map((s) => s[0]).join("")}
                </div>
                <div>
                  <div className="text-sm font-medium">{q.name}</div>
                  <div className="text-xs text-muted-foreground">{q.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- CTA + Footer ---------- */
export function CTA() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-28">
      <div className="relative overflow-hidden rounded-[32px] border border-border bg-gradient-to-br from-indigo-600 via-indigo-500 to-cyan-500 p-14 text-white shadow-[0_40px_100px_-30px_rgb(79_70_229_/_0.6)]">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-cyan-300/40 blur-3xl" />
        <div className="relative max-w-2xl">
          <h3 className="text-4xl font-semibold tracking-tight sm:text-5xl">Start writing YaarLang today.</h3>
          <p className="mt-4 text-white/80">Install in seconds. Ship in minutes. Enjoy every keystroke.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-indigo-600 shadow-lg transition hover:-translate-y-0.5">
              Get Started <ArrowRight className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-3 rounded-xl border border-white/20 bg-white/10 px-4 py-3 font-mono text-sm">
              <span className="text-white/60">$</span> curl -sSf yaarlang.dev | sh
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const cols = [
    { title: "Product", links: ["Playground", "Packages", "Roadmap", "Changelog"] },
    { title: "Developers", links: ["Documentation", "GitHub", "Blog", "RFCs"] },
    { title: "Community", links: ["Discord", "Twitter", "Contribute", "Events"] },
    { title: "Legal", links: ["License", "Privacy", "Terms", "Security"] },
  ];
  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-[1.4fr_repeat(4,1fr)]">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 text-white">
              <span className="font-bold">Y</span>
            </span>
            <span className="text-[15px] font-semibold tracking-tight">YaarLang</span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">A modern language for developers who care about craft.</p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{c.title}</div>
            <ul className="mt-4 space-y-2 text-sm">
              {c.links.map((l) => (
                <li key={l}><a href="#" className="text-foreground/80 transition-colors hover:text-foreground">{l}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-6 text-xs text-muted-foreground sm:flex-row">
          <div>© 2026 YaarLang. Crafted with care.</div>
          <div>Apache-2.0 · Open Source</div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- shared ---------- */
function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-[var(--shadow-soft)]">
      <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
      {children}
    </div>
  );
}
function SectionTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`mt-5 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl ${className}`}>
      {children}
    </h2>
  );
}
function SectionLede({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={`mt-4 max-w-2xl text-[17px] leading-relaxed text-muted-foreground ${className}`}>{children}</p>;
}
