import type { ReactNode } from "react";

/**
 * Numbered editorial section header — mono index + small-caps label + rule.
 */
export function SectionLabel({
  number,
  children,
  light = false,
  className = "",
}: {
  number?: string;
  children: ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center gap-4 ${light ? "text-mist" : "text-muted"} ${className}`}
    >
      {number && (
        <span className="eyebrow text-terra">{number}</span>
      )}
      <span className="eyebrow">{children}</span>
      <span
        className={`h-px flex-1 ${light ? "bg-mist/25" : "bg-line"}`}
        aria-hidden
      />
    </div>
  );
}