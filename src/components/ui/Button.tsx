import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Magnetic } from "./Magnetic";

type BtnProps = {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline" | "ghost";
  external?: boolean;
  className?: string;
};

const base =
  "group inline-flex items-center gap-3 rounded-full px-6 py-3.5 text-[0.82rem] font-medium tracking-wide transition-colors duration-300";

const variants: Record<NonNullable<BtnProps["variant"]>, string> = {
  solid: "bg-terra text-paper hover:bg-terra-deep",
  outline:
    "border border-ink/25 text-ink hover:border-terra hover:text-terra",
  ghost: "text-ink hover:text-terra",
};

export function Btn({
  href,
  children,
  variant = "solid",
  external = false,
  className = "",
}: BtnProps) {
  const cls = `${base} ${variants[variant]} ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      <ArrowUpRight
        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        aria-hidden
      />
    </>
  );
  return (
    <Magnetic strength={external ? 0.3 : 0.2}>
      {external ? (
        <a href={href} target="_blank" rel="noreferrer" className={cls}>
          {inner}
        </a>
      ) : (
        <Link href={href} className={cls}>
          {inner}
        </Link>
      )}
    </Magnetic>
  );
}

export function TextLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`link-underline inline-flex items-center gap-2 font-medium text-terra ${className}`}
    >
      {children}
      <ArrowRight className="h-4 w-4" aria-hidden />
    </Link>
  );
}