import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { DestinationMeta } from "@/lib/site";

export function DestinationCard({
  d,
  tall = false,
}: {
  d: DestinationMeta;
  tall?: boolean;
}) {
  return (
    <Link
      href={`/destinations/${d.slug}`}
      className="group block"
      aria-label={`${d.name} — ${d.tagline}`}
    >
      <div
        className={`relative overflow-hidden ${tall ? "aspect-[4/5]" : "aspect-[4/5]"} rounded-sm`}
      >
        <img
          src={`/art/${d.slug}-1200.webp`}
          srcSet={`/art/${d.slug}-480.webp 480w, /art/${d.slug}-720.webp 720w, /art/${d.slug}-960.webp 960w, /art/${d.slug}-1200.webp 1200w`}
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 94vw"
          alt={`${d.name} — ${d.tagline}`}
          width={1024}
          height={1365}
          className="h-full w-full scale-[1.01] object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night/70 via-night/10 to-transparent" />

        <span className="eyebrow absolute right-5 top-5 text-mist/90">
          {d.index}
        </span>

        {/* large serif name slides into view on hover */}
        <div className="absolute inset-0 grid place-items-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <span className="display text-[clamp(2.6rem,7vw,5rem)] text-mist drop-shadow-md">
            {d.name}
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-5">
          <div className="flex items-end justify-between">
            <div>
              <p className="display text-3xl text-mist">{d.name}</p>
              <p className="eyebrow mt-1 text-mist/70">{d.capital}</p>
            </div>
            <span className="grid h-11 w-11 place-items-center rounded-full border border-mist/40 text-mist transition-all duration-500 group-hover:bg-terra group-hover:border-terra">
              <ArrowUpRight className="h-5 w-5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-4">
        <p className="flex-1 text-pretty text-sm leading-relaxed text-muted line-clamp-2">
          {d.blurb}
        </p>
      </div>
    </Link>
  );
}