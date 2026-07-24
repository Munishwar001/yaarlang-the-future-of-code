import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { Nav } from "@/components/yaarlang/Nav";
import { CodeEditor } from "@/components/yaarlang/CodeEditor";
import {
  InstallBanner, Features, Playground, Showcase, Workflow, Performance,
  Ecosystem, CTA, Footer,
} from "@/components/yaarlang/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "YaarLang — Programming should feel natural" },
      { name: "description", content: "Write code that reads like you think. YaarLang keeps things simple, fast, and fun." },
      { property: "og:title", content: "YaarLang — Programming should feel natural" },
      { property: "og:description", content: "A next-generation programming language: readable, powerful, and delightful to use." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-bg opacity-70 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_40%,transparent_100%)]" />
        <div className="absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-br from-indigo-200/60 via-cyan-100/60 to-transparent blur-3xl" />
        <div className="absolute right-[10%] top-40 h-56 w-56 rounded-full bg-cyan-300/40 blur-3xl animate-float-slow" />
        <div className="absolute left-[8%] top-64 h-64 w-64 rounded-full bg-indigo-300/40 blur-3xl animate-float-slow" style={{ animationDelay: "3s" }} />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 pt-20 pb-24 lg:grid-cols-[1.05fr_1fr] lg:pt-28 lg:pb-32">
        <div className="animate-reveal-up">
          <a href="#" className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-1.5 text-xs font-medium text-foreground shadow-[var(--shadow-soft)] backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
            YaarLang 1.0 — now generally available
            <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
          </a>

          <h1 className="mt-7 text-[52px] font-semibold leading-[1.02] tracking-[-0.03em] text-foreground sm:text-[64px] lg:text-[72px]">
            Programming should
            <br />
            feel <span className="text-gradient">natural.</span>
          </h1>

          <p className="mt-6 max-w-xl text-[18px] leading-relaxed text-muted-foreground">
            Write code that reads like you think. YaarLang keeps things simple, fast, and fun.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#install"
              className="group inline-flex items-center gap-2 rounded-xl bg-foreground px-5 py-3 text-sm font-semibold text-background shadow-[var(--shadow-elegant)] transition-all hover:-translate-y-0.5"
            >
              Get Started
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <Link
              to="/docs"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground shadow-[var(--shadow-soft)] transition-all hover:-translate-y-0.5 hover:border-indigo-200"
            >
              View Documentation
            </Link>
          </div>
        </div>

        <div className="animate-reveal-up" style={{ animationDelay: "120ms" }}>
          <CodeEditor />
        </div>
      </div>
    </section>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <InstallBanner />
        <Features />
        <Showcase />
        <Playground />
        <Workflow />
        <Performance />
        <Ecosystem />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
