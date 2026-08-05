import { getAllPosts } from "@/lib/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { TextLink } from "@/components/ui/Button";
import { PostCard } from "@/components/journal/PostCard";

export function JournalPreview() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <section className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-36">
      <Reveal>
        <SectionLabel number="02">From the journal</SectionLabel>
      </Reveal>

      <div className="mt-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <Reveal delay={0.05}>
          <h2 className="display max-w-md text-[clamp(2.2rem,4.5vw,3.4rem)]">
            Recent <span className="italic text-terra">dispatches</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <TextLink href="/journal">Read all letters</TextLink>
        </Reveal>
      </div>

      {posts.length > 0 ? (
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {posts.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <PostCard post={p} />
            </Reveal>
          ))}
        </div>
      ) : (
        <p className="eyebrow mt-12 text-muted">
          The first dispatch lands with our first long stay. Stay close.
        </p>
      )}
    </section>
  );
}