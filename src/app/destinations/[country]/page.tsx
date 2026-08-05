import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, MapPin, Clock, Coins, CloudSun } from "lucide-react";
import { destinations, type DestinationMeta } from "@/lib/site";
import { getDestination } from "@/lib/content";
import { renderMDX } from "@/lib/mdx";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Btn } from "@/components/ui/Button";

type Params = { params: Promise<{ country: string }> };

export function generateStaticParams() {
  return destinations.map((d) => ({ country: d.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { country } = await params;
  const meta = destinations.find((d) => d.slug === country);
  if (!meta) return { title: "Destination" };
  return {
    title: `${meta.name} — A nomad's field guide`,
    description: meta.blurb,
    openGraph: {
      title: `${meta.name} — ${meta.tagline} · City Nomads`,
      description: meta.blurb,
    },
  };
}

const facts = (d: DestinationMeta) => [
  { icon: MapPin, label: "Capital", value: d.capital },
  { icon: MapPin, label: "Region", value: d.region },
  { icon: Clock, label: "Timezone", value: d.timezone },
  { icon: Coins, label: "Currency", value: d.currency },
];

export default async function DestinationPage({ params }: Params) {
  const { country } = await params;
  const meta = destinations.find((d) => d.slug === country);
  const page = getDestination(country);

  if (!meta || !page) {
    return (
      <main className="mx-auto max-w-3xl px-5 pt-40 text-center">
        <h1 className="display text-4xl">Unknown ground.</h1>
        <p className="mt-4 text-muted">
          We have not mapped this one yet.
        </p>
        <div className="mt-10">
          <Btn href="/destinations">All destinations</Btn>
        </div>
      </main>
    );
  }

  const body = await renderMDX(page.content);
  const index = destinations.findIndex((d) => d.slug === country);
  const next = destinations[(index + 1) % destinations.length];

  return (
    <main>
      {/* hero */}
      <section className="mx-auto max-w-[1400px] px-5 pt-32 md:px-10 md:pt-40">
        <Reveal>
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 eyebrow text-muted transition-colors hover:text-terra"
          >
            <ArrowLeft className="h-4 w-4" /> All destinations
          </Link>
        </Reveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <Reveal delay={0.05}>
              <p className="eyebrow text-terra">
                {meta.index} · {meta.country}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="display mt-4 text-[clamp(3rem,8vw,7.5rem)]">
                {meta.name}
              </h1>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="display mt-6 text-2xl italic text-terra">
                {meta.tagline}
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted">
                {meta.blurb}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.2} y={30}>
            <div className="relative overflow-hidden rounded-sm border border-line">
              <img
                src={`/art/${meta.slug}.svg`}
                alt={`${meta.name} — field note artwork`}
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-night/70 px-5 py-4 text-mist backdrop-blur-sm">
                <span className="eyebrow">{meta.capital}</span>
                <span className="eyebrow text-terra">{meta.region}</span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* facts */}
        <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-line bg-line md:grid-cols-4">
          {facts(meta).map((f, i) => (
            <Reveal key={f.label} delay={i * 0.05} className="h-full">
              <div className="flex h-full flex-col justify-between gap-6 bg-cream p-6">
                <f.icon className="h-5 w-5 text-terra" />
                <div>
                  <p className="eyebrow text-muted">{f.label}</p>
                  <p className="display mt-1 text-lg text-ink">{f.value}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* intro statement */}
      <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
        <Reveal>
          <p className="display max-w-4xl text-[clamp(1.6rem,3.6vw,2.9rem)] leading-snug text-ink">
            {page.intro}
          </p>
        </Reveal>
      </section>

      {/* highlights */}
      {page.highlights.length > 0 && (
        <section className="border-y border-line bg-cream">
          <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 md:py-20">
            <Reveal>
              <SectionLabel number="I">What stays with you</SectionLabel>
            </Reveal>
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {page.highlights.map((h, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <div className="flex gap-4 border-t border-line pt-5">
                    <span className="eyebrow text-terra">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="display max-w-xs text-xl leading-snug text-ink">
                      {h}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* body + seasons */}
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
        <div className="grid gap-16 lg:grid-cols-[1.5fr_1fr]">
          <article className="mdx-body">{body}</article>

          <aside className="lg:pt-4">
            <div className="rounded-sm border border-line bg-cream p-7">
              <div className="flex items-center gap-3">
                <CloudSun className="h-5 w-5 text-terra" />
                <h2 className="display text-xl text-ink">When to come</h2>
              </div>
              <dl className="mt-6 space-y-5">
                <div>
                  <dt className="eyebrow text-muted">Best season</dt>
                  <dd className="mt-1 display text-lg text-ink">
                    {page.seasons.best}
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow text-muted">The window</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-soil">
                    {page.seasons.when}
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow text-muted">In the air</dt>
                  <dd className="mt-1 display text-lg text-ink">
                    {page.seasons.temp}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="mt-8 rounded-sm border border-terra/30 bg-terra/5 p-7">
              <p className="eyebrow text-terra">Field note</p>
              <p className="mt-3 text-pretty text-sm leading-relaxed text-soil">
                Numbers in the journal are what we actually paid — rounded to
                the nearest 100 — not tourist-board averages.
              </p>
            </div>
          </aside>
        </div>

        {/* next destination */}
        <div className="mt-24 flex items-center justify-between border-t border-line pt-8">
          <div>
            <p className="eyebrow text-muted">Next on the map</p>
            <Link
              href={`/destinations/${next.slug}`}
              className="group display mt-2 inline-flex items-baseline gap-4 text-3xl text-ink md:text-4xl"
            >
              {next.name}
              <span className="text-xl italic text-terra transition-transform duration-300 group-hover:translate-x-2">
                →
              </span>
            </Link>
          </div>
          <p className="hidden text-right eyebrow text-muted md:block">
            {next.index}
          </p>
        </div>
      </div>
    </main>
  );
}