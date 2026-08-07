import Link from "next/link";
import type { MouseEventHandler } from "react";

/**
 * Brand mark. Two concentric dots + a moving second dot reads as a
 * "city in motion" orbit, while the mark itself stays quiet and modular.
 */
export function Wordmark({
  className = "",
  onClick,
}: {
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}) {
  return (
    <Link
      href="/"
      aria-label="City Nomadz — home"
      onClick={onClick}
      className={`group inline-flex items-center gap-3 ${className}`}
    >
      <Mark aria-hidden />
      <span className="display text-[1.15rem] leading-none tracking-tight text-ink">
        City
        <span className="text-terra">&nbsp;Nomadz</span>
      </span>
    </Link>
  );
}

export function Mark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`relative grid h-9 w-9 place-items-center text-ink ${className}`}
      aria-hidden
    >
      <span className="aura block h-9 w-9" />
      <span className="absolute h-1.5 w-1.5 rounded-full bg-terra transition-transform duration-700 group-hover:translate-x-2 group-hover:translate-y-1" />
    </span>
  );
}