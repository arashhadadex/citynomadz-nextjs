import type { Metadata } from "next";
import { destinations } from "@/lib/site";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { DestinationCard } from "@/components/destinations/DestinationCard";

export const metadata: Metadata = {
  title: "Destinations",
  description:
    "The handful of countries City Nomadz knows well — Armenia and Greece — with honest guides, lived costs and field notes.",
};

export default function DestinationsPage() {
  return (
    <main className="mx-auto max-w-[1400px] px-5 pb-24 pt-36 md:px-10 md:pb-40 md:pt-44">
      <Reveal>
        <SectionLabel number="01">Destinations</SectionLabel>
      </Reveal>

      <div className="mt-10 max-w-3xl">
        <Reveal delay={0.05}>
          <h1 className="display text-[clamp(2.8rem,7vw,6rem)]">
            A short list, <span className="italic text-terra">kept short</span>.
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-muted">
            We do not cover the world. We cover the places we have slept in,
            shopped in, been bored in, and grown fond of. Each guide below is
            written after a long stay — not a long weekend.
          </p>
        </Reveal>
      </div>

      <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {destinations.map((d, i) => (
          <Reveal key={d.slug} delay={i * 0.08}>
            <DestinationCard d={d} />
          </Reveal>
        ))}
      </div>
    </main>
  );
}