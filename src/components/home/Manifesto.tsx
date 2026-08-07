import { stats } from "@/lib/site";

const text =
  "We are not tourists and we are not expats. We are wanderers with wifi, people who stay somewhere just long enough to stop being strangers — then leave before it becomes routine. Nomads value the fresh eyes almost as much as we value a home. City Nomadz exists to pass those fresh eyes on to you.";

export function Manifesto() {
  return (
    <section className="bg-night text-mist">
      <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-40">
        <p className="eyebrow text-terra">02 · A small creed</p>
        <p className="display mt-10 max-w-4xl text-pretty text-[clamp(1.6rem,3.6vw,3rem)] leading-[1.15] text-mist">
          {text}
        </p>

        <div className="mt-20 grid gap-10 border-t border-mist/15 pt-12 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="display text-6xl text-terra">{s.value}</p>
              <p className="eyebrow mt-3 text-mist/60">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}