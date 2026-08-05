import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Dispatches from the nomadic life — field notes, honest costs, seasons, and the small ordinary days worth remembering.",
};

export default function JournalPage() {
  const posts = getAllPosts();

  return (
    <main className="mx-auto max-w-[1400px] px-5 pb-24 pt-36 md:px-10 md:pb-40 md:pt-44">
      <Reveal>
        <SectionLabel number="02">Journal</SectionLabel>
      </Reveal>

      <div className="mt-10 flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <Reveal delay={0.05}>
          <h1 className="display max-w-xl text-[clamp(2.8rem,6.5vw,5.5rem)]">
            Dispatches from the <span className="italic text-terra">road</span>.
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="max-w-sm text-pretty text-muted">
            Notes written in the ordinary hours — after the market run, before
            the evening coffee — about what living somewhere actually feels
            like.
          </p>
        </Reveal>
      </div>

      <div className="mt-16">
        {posts.length === 0 ? (
          <Reveal>
            <p className="eyebrow text-muted">
              The first dispatch is being written somewhere slow. It will land
              here.
            </p>
          </Reveal>
        ) : (
          posts.map((p, i) => (
            <Reveal key={p.slug} delay={0.04}>
              <Link
                href={`/journal/${p.slug}`}
                className="group grid items-baseline gap-3 border-t border-line py-7 last:border-b md:grid-cols-[6rem_1fr_auto] md:gap-8"
              >
                <span className="eyebrow text-terra">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 className="display text-2xl text-ink transition-colors duration-300 group-hover:text-terra md:text-3xl">
                    {p.title}
                  </h2>
                  <p className="mt-2 line-clamp-1 max-w-2xl text-pretty text-sm text-muted">
                    {p.excerpt}
                  </p>
                </div>
                <div className="flex items-center gap-4 md:flex-col md:items-end md:gap-1">
                  <span className="eyebrow text-muted">{p.country}</span>
                  <span className="eyebrow text-muted">{p.readingTime}</span>
                </div>
              </Link>
            </Reveal>
          ))
        )}
      </div>
    </main>
  );
}