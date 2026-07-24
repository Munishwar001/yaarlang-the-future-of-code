import { Folder, FileCode, Terminal, Sparkles, Circle } from "lucide-react";

const tokens = {
  kw: "text-[#c084fc]",
  fn: "text-[#7dd3fc]",
  str: "text-[#86efac]",
  cm: "text-slate-500",
  pn: "text-slate-400",
  id: "text-slate-100",
  num: "text-[#fcd34d]",
};

export function CodeEditor() {
  return (
    <div className="relative">
      {/* glow */}
      <div className="absolute -inset-8 -z-10 rounded-[36px] bg-gradient-to-tr from-indigo-400/25 via-cyan-300/20 to-transparent blur-3xl" />
      <div className="overflow-hidden rounded-3xl border border-border bg-[#0f172a] shadow-[0_30px_80px_-20px_rgb(17_24_39_/_0.35)]">
        {/* window chrome */}
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-red-400/80" />
          <span className="h-3 w-3 rounded-full bg-amber-400/80" />
          <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
          <div className="mx-auto flex items-center gap-2 rounded-lg bg-white/5 px-3 py-1 text-xs text-slate-300">
            <Circle className="h-3 w-3 fill-emerald-400 text-emerald-400" />
            main.yl — YaarLang
          </div>
        </div>

        <div className="grid grid-cols-[168px_minmax(0,1fr)]">
          {/* sidebar */}
          <aside className="border-r border-white/5 bg-white/[0.02] p-3 text-xs text-slate-400">
            <div className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-widest text-slate-500">
              <Folder className="h-3 w-3" /> Explorer
            </div>
            <ul className="space-y-1.5">
              <li className="flex items-center gap-2 rounded-md bg-white/10 px-2 py-1 text-white">
                <FileCode className="h-3.5 w-3.5 text-cyan-300" />
                main.yl
              </li>
            </ul>
            <div className="mt-5 mb-2 flex items-center gap-2 text-[10px] uppercase tracking-widest text-slate-500">
              <Sparkles className="h-3 w-3" /> AI Assistant
            </div>
            <div className="rounded-lg border border-white/5 bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 p-2 text-[11px] leading-relaxed text-slate-300">
              Add another calculation?
              <div className="mt-1 text-indigo-300">↳ Try maan_lo total = sum + 5</div>
            </div>
          </aside>

          {/* editor */}
          <div className="relative">
            <div className="flex items-center gap-1 border-b border-white/5 bg-white/[0.02] px-3 pt-2 text-xs text-slate-400">
              <span className="rounded-t-md bg-[#0f172a] px-3 py-1.5 text-slate-200 shadow-[inset_0_-1px_0_0_theme(colors.indigo.400)]">
                main.yl
              </span>
            </div>
            <pre className="relative overflow-hidden px-2 py-4 font-mono text-[13px] leading-6">
              {[
                ["1", <><span className={tokens.cm}>// A warm hello from YaarLang</span></>],
                ["2", <><span className={tokens.kw}>maan_lo</span> <span className={tokens.id}>naam</span> <span className={tokens.kw}>=</span> <span className={tokens.str}>"Duniya"</span></>],
                ["3", <><span className={tokens.kw}>maan_lo</span> <span className={tokens.id}>sum</span> <span className={tokens.kw}>=</span> <span className={tokens.num}>10</span> <span className={tokens.kw}>+</span> <span className={tokens.num}>20</span></>],
                ["4", <><span className={tokens.fn}>bol</span> <span className={tokens.id}>naam</span></>],
                ["5", ""],
                ["6", <><span className={tokens.fn}>bol</span> <span className={tokens.id}>sum</span><span className="animate-caret text-indigo-300">▍</span></>],
              ].map(([n, c], i) => (
                <div key={i} className="grid grid-cols-[36px_minmax(0,1fr)]">
                  <span className="select-none text-right pr-3 text-slate-600">{n}</span>
                  <span>{c}</span>
                </div>
              ))}
              {/* autocomplete */}
              <div className="absolute left-24 top-[132px] w-56 rounded-xl border border-white/10 bg-[#111a2e]/95 p-1 shadow-2xl backdrop-blur">
                {[
                  ["sum", "var"],
                  ["naam", "var"],
                ].map(([n, t], i) => (
                  <div
                    key={n}
                    className={`flex items-center justify-between rounded-md px-2 py-1.5 text-xs ${
                      i === 0 ? "bg-indigo-500/20 text-white" : "text-slate-300"
                    }`}
                  >
                    <span className="font-mono">{n}</span>
                    <span className="text-[10px] text-slate-500">{t}</span>
                  </div>
                ))}
              </div>
            </pre>

            {/* terminal */}
            <div className="border-t border-white/5 bg-black/40 px-4 py-3 font-mono text-xs text-slate-300">
              <div className="mb-1 flex items-center gap-2 text-slate-500">
                <Terminal className="h-3.5 w-3.5" /> Output
              </div>
              <div><span className="text-emerald-400">$</span> yaarlang main.yl</div>
              <div className="text-slate-100">Duniya</div>
              <div className="text-slate-100">30</div>
              <div className="text-slate-500">Program exited with code 0 · 8ms</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
