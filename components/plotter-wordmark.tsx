import Link from "next/link";

export function PlotterWordmark() {
  return (
    <Link aria-label="Plotter home" className="site-logo" href="/">
      <span className="site-logo-lockup">
        <svg
          aria-hidden="true"
          fill="none"
          height="18"
          width="18"
          viewBox="4.375 4.375 23.25 23.25"
        >
          <rect
            height="22"
            stroke="currentColor"
            strokeWidth="1.25"
            width="22"
            x="5"
            y="5"
          />
          <circle
            cx="16"
            cy="16"
            r="11"
            stroke="currentColor"
            strokeWidth="1.25"
          />
        </svg>
        <span>Plotter</span>
      </span>
    </Link>
  );
}
