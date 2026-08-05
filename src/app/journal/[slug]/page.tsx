import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAllPosts, getPost } from "@/lib/content";
import { renderMDX } from "@/lib/mdx";
import { Btn } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { PostCard } from "@/components/journal/PostCard";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Dispatch" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    return (
      <main className="mx-auto max-w-3xl px-5 pt-40 text-center">
        <h1 className="display text-4xl">This dispatch is lost.</h1>
        <p className="mt-4 text-muted">
          The trail fades here — the others are still on the map.
        </p>
        <div className="mt-10">
          <Btn href="/journal">Back to the journal</Btn>
        </div>
      </main>
    );
  }

  const body = await renderMDX(post.content);
  const date = new Date(post.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const related = getAllPosts()
    .filter((p) => p.slug !== post.slug && p.country === post.country)
    .concat(getAllPosts().filter((p) => p.slug !== post.slug))
    .filter((p, i, arr) => arr.findIndex((x) => x.slug === p.slug) === i)
    .slice(0, 2);

  return (
    <main className="mx-auto max-w-[1400px] px-5 pb-24 pt-32 md:px-10 md:pt-40">
      <Reveal>
        <Link
          href="/journal"
          className="inline-flex items-center gap-2 eyebrow text-muted transition-colors hover:text-terra"
        >
          <ArrowLeft className="h-4 w-4" /> Journal
        </Link>
      </Reveal>

      <div className="mx-auto mt-12 max-w-3xl">
        <Reveal delay={0.05}>
          <div className="flex flex-wrap items-center gap-4">
            <span className="eyebrow text-terra">{post.country}</span>
            <span className="h-px w-6 bg-line" />
            <span className="eyebrow text-muted">{date}</span>
            <span className="h-px w-6 bg-line" />
            <span className="eyebrow text-muted">{post.readingTime}</span>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="display mt-6 text-[clamp(2.4rem,6vw,4.8rem)] leading-[1.02]">
            {post.title}
          </h1>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-8 text-pretty text-xl leading-relaxed text-muted">
            {post.excerpt}
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <hr className="mx-auto my-14 max-w-3xl border-line" />
      </Reveal>

      <article className="mdx-body mx-auto max-w-3xl">{body}</article>

      {post.tags.length > 0 && (
        <div className="mx-auto mt-14 flex max-w-3xl flex-wrap gap-3">
          {post.tags.map((t) => (
            <span
              key={t}
              className="eyebrow rounded-full border border-line px-4 py-1.5 text-muted"
            >
              {t}
            </span>
          ))}
        </div>
      )}

      {related.length > 0 && (
        <section className="mt-24">
          <p className="eyebrow mx-auto max-w-3xl text-terra">Keep reading</p>
          <div className="mx-auto mt-6 grid max-w-3xl gap-6 sm:grid-cols-2">
            {related.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}