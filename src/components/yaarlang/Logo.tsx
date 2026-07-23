export function Logo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 shadow-[0_6px_20px_-6px_rgb(79_70_229_/_0.6)] ${className}`}
    >
      <svg viewBox="0 0 24 24" className="h-[58%] w-[58%]" fill="none">
        <path
          d="M5 4 L12 12.5 L19 4 M12 12.5 V20"
          stroke="white"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
