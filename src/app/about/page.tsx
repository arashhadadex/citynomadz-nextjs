import type { Metadata } from "next";
import { Map, Compass, PenLine, HeartHandshake } from "lucide-react";
import { site } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "About",
  description:
    "How City Nomads works — who writes it, how we choose places, and how the guides stay honest.",
};

const principles = [
  {
    icon: Compass,
    title: "A short list",
    text: "Three countries, chosen for being ignored. We resist adding a place until we have lived it.",
  },
  {
    icon: Map,
    title: "Long stays",
    text: "No two-night verdicts. A minimum of three months before we write a single word about a city.",
  },
  {
    icon: PenLine,
    title: "Lived numbers",
    text: "Every cost is one we paid — not an aggregate, not a guess. Rounded, honest, dated.",
  },
  {
    icon: HeartHandshake,
    title: "No sponsored rows",
    text: "Nothing here is bought or bartered. The small link that helps the road is clearly marked.",
  },
];

const process = [
  { index: "I", text: "Arrive with no checklist, suitcase small, itinerary blank." },
  { index: "II", text: "Stay long enough to be bored, then happy, then ordinary." },
  { index: "III", text: "Keep quiet ledgers of every cost and every season." },
  { index: "IV", text: "Write it down plainly, then leave before it becomes routine." },
];

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-[1400px] px-5 pb-24 pt-36 md:px-10 md:pb-40 md:pt-44">
      <Reveal>
        <SectionLabel number="04">About this journal</SectionLabel>
      </Reveal>

      <div className="mt-12 grid gap-14 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <Reveal delay={0.05}>
            <h1 className="display text-[clamp(2.4rem,6vw,5.5rem)] leading-[1.02]">
              We stay somewhere just long enough to stop being{" "}
              <span className="italic text-terra">strangers</span>.
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10 max-w-2xl space-y-5 text-pretty text-lg leading-relaxed text-soil">
              <p>
                City Nomads is a one-person field journal on the nomadic life.
                It began as a habit — keeping a notebook while moving slowly
                between {site.domain.split(".")[0]} corners of the world — and
                grew into a place where the notes could be shared.
              </p>
              <p>
                The internet is full of cities ranked, scored, and scraped into
                top-tens. This site is not that. It is a quiet, first-person
                account of three countries we chose for being unremarkable in
                the feeds and remarkable in person.
              </p>
              <p>
                We keep the list short on purpose. A guide written after three
                weeks is a review. A guide written after three months is a
                friendship. We publish only the latter.
              </p>
            </div>
          </Reveal>

          <div className="mt-14">
            <Reveal>
              <SectionLabel number="V">The way we work</SectionLabel>
            </Reveal>
            <div className="mt-8 grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2">
              {process.map((step, i) => (
                <Reveal key={step.index} delay={i * 0.06} className="h-full">
                  <div className="flex h-full gap-5 bg-cream p-7">
                    <span className="eyebrow text-terra">{step.index}</span>
                    <p className="display max-w-xs text-lg leading-snug text-ink">
                      {step.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* sticky principles */}
        <aside className="lg:pt-4">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <SectionLabel>What stays true</SectionLabel>
            </Reveal>
            <div className="mt-8 space-y-2">
              {principles.map((p, i) => (
                <Reveal key={p.title} delay={i * 0.05}>
                  <div className="group flex gap-5 border-b border-line py-6">
                    <p.icon className="mt-0.5 h-5 w-5 shrink-0 text-terra" />
                    <div>
                      <h3 className="display text-xl text-ink">{p.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted">
                        {p.text}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}