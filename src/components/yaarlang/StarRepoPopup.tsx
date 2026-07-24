import { useEffect, useState } from "react";
import { Star, X } from "lucide-react";

const DISMISSED_KEY = "yaarlang-star-popup-dismissed";
const REPO_URL = "https://github.com/Munishwar001/yaarlang-the-future-of-code";

export function StarRepoPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(DISMISSED_KEY)) {
      setVisible(true);
    }
  }, []);

  const dismiss = () => {
    localStorage.setItem(DISMISSED_KEY, "1");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="animate-reveal-up fixed bottom-5 right-5 z-50 w-[300px] rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-elegant)]">
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss"
        className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
      >
        <X className="h-3.5 w-3.5" />
      </button>
      <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-indigo-50 to-cyan-50 text-indigo-600 ring-1 ring-indigo-100">
        <Star className="h-4 w-4" />
      </div>
      <p className="mt-3 text-sm font-medium text-foreground">Enjoying the docs?</p>
      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
        Give YaarLang a star on GitHub — it helps others find the project.
      </p>
      <a
        href={REPO_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={dismiss}
        className="mt-3 flex items-center justify-center gap-1.5 rounded-lg bg-foreground px-3.5 py-2 text-xs font-semibold text-background transition-all hover:opacity-90"
      >
        <Star className="h-3.5 w-3.5" /> Star on GitHub
      </a>
    </div>
  );
}
