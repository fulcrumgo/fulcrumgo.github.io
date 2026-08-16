/**
 * The Fulcrum mark: a lever resting on its pivot.
 * Redrawn as vector from the original logo so it stays crisp at any size
 * and can inherit colour from CSS.
 */
export default function Mark({ className = "h-7 w-7", title }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {/* the lever */}
      <path
        d="M2.6 6.35 20.9 3.1"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
      {/* the pivot */}
      <path
        d="M10.62 8.3a1.6 1.6 0 0 1 2.76 0l5.66 9.6a1.6 1.6 0 0 1-1.38 2.42H6.34a1.6 1.6 0 0 1-1.38-2.42z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Full horizontal lockup: mark + wordmark. */
export function Wordmark({ className = "", markClass = "h-6 w-6" }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Mark className={markClass} />
      <span className="wordmark text-[0.95rem] leading-none">Fulcrum</span>
    </span>
  );
}
