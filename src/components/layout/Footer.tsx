import Link from "next/link";
import { nav, site, destinations } from "@/lib/site";
import { Mark } from "@/components/ui/Wordmark";

export function Footer() {
  return (
    <footer className="bg-night text-mist">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        {/* top */}
        <div className="grid gap-12 border-b border-mist/15 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:py-24">
          <div>
            <div className="flex items-center gap-3 text-mist">
              <span className="relative grid h-9 w-9 place-items-center">
                <Mark className="text-mist" />
              </span>
              <span className="display text-2xl text-mist">City Nomads</span>
            </div>
            <p className="mt-5 max-w-sm text-pretty text-sm leading-relaxed text-mist/60">
              An independent field journal on the nomadic life — slow travel,
              honest costs, and long stays in a handful of countries we know.
            </p>
            <p className="eyebrow mt-8 text-terra">
              Return; by the fire-light, tell the road again.
            </p>
          </div>

          <div>
            <h3 className="eyebrow text-mist/40">Explore</h3>
            <ul className="mt-5 space-y-3">
              {[{ label: "Home", href: "/" }, ...nav].map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className="link-underline text-sm text-mist/80 hover:text-mist"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="eyebrow text-mist/40">Places we know</h3>
            <ul className="mt-5 space-y-3">
              {destinations.map((d) => (
                <li key={d.slug}>
                  <Link
                    href={`/destinations/${d.slug}`}
                    className="link-underline text-sm text-mist/80 hover:text-mist"
                  >
                    {d.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* bottom */}
        <div className="flex flex-col items-start justify-between gap-4 py-8 text-xs text-mist/40 md:flex-row md:items-center">
          <p>
            © {site.since}–{new Date().getFullYear()} {site.legal}. Written
            slowly, on the road.
          </p>
          <p className="eyebrow">{site.domain}</p>
        </div>
      </div>
    </footer>
  );
}