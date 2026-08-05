import { Calculator, ArrowLeftRight, CloudSun, LayoutDashboard } from "lucide-react";
import { tools } from "@/lib/site";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";

const icons = {
  costs: Calculator,
  currency: ArrowLeftRight,
  weather: CloudSun,
  dashboard: LayoutDashboard,
};

export function Features() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-36">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
        <div>
          <Reveal>
            <SectionLabel number="03">The tools</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display mt-10 text-[clamp(2.2rem,4.5vw,3.6rem)]">
              Built for the path, <span className="italic text-terra">not</span>{" "}
              for the dashboard.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-sm text-pretty text-muted">
              Practical instruments are on the way — honest numbers over
              shiny ones. Here is what we are making, in the order it earns a
              place on the road.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="eyebrow mt-8 text-muted">
              Rendered from lived costs · arriving through {""}
              {new Date().getFullYear() + 1}
            </p>
          </Reveal>
        </div>

        <div className="grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2">
          {tools.map((t, i) => {
            const Icon = icons[t.id as keyof typeof icons];
            return (
              <Reveal key={t.id} delay={i * 0.06} className="h-full">
                <div className="group flex h-full flex-col bg-cream p-7 transition-colors duration-500 hover:bg-scrim">
                  <div className="flex items-start justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-full border border-line text-terra transition-colors group-hover:bg-terra group-hover:text-paper">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="eyebrow text-muted">{t.number}</span>
                  </div>
                  <span className="eyebrow mt-16 inline-flex w-fit rounded-full bg-olive/15 px-3 py-1 text-olive">
                    {t.status}
                  </span>
                  <h3 className="display mt-3 text-2xl text-ink">{t.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {t.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}