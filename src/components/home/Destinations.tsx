import { destinations } from "@/lib/site";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { TextLink } from "@/components/ui/Button";
import { DestinationCard } from "@/components/destinations/DestinationCard";

export function Destinations() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-36">
      <Reveal>
        <SectionLabel number="01">The ground we know</SectionLabel>
      </Reveal>

      <div className="mt-10 flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <Reveal delay={0.05}>
          <h2 className="display max-w-lg text-[clamp(2.2rem,5vw,4rem)]">
            A short list we keep <span className="italic text-terra">short</span>.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="max-w-sm text-pretty text-muted">
            No directory of every country. Just the handful we have walked,
            budgeted, and returned to. As we stay longer, the list grows —
            slowly, on purpose.
          </p>
        </Reveal>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {destinations.map((d, i) => (
          <Reveal key={d.slug} delay={i * 0.08}>
            <DestinationCard d={d} />
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <div className="mt-14 flex justify-center">
          <TextLink href="/destinations">Read the field notes on all destinations</TextLink>
        </div>
      </Reveal>
    </section>
  );
}