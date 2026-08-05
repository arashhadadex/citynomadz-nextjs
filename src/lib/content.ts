import matter from "gray-matter";
import { rawContent } from "./content-registry";

export type Post = {
  slug: string;
  title: string;
  date: string;
  country: string;
  excerpt: string;
  tags: string[];
  published: boolean;
  readingTime: string;
  content: string;
};

export type DestinationPage = {
  slug: string;
  title: string;
  intro: string;
  highlights: string[];
  seasons: { best: string; when: string; temp: string };
  content: string;
};

function readMdx(raw: string): { data: Record<string, unknown>; content: string } {
  const { data, content } = matter(raw);
  return { data: data as Record<string, unknown>, content };
}

export function getAllPosts(): Post[] {
  return Object.entries(rawContent.posts)
    .map(([slug, mdx]) => {
      const { data, content } = readMdx(mdx);
      return {
        slug,
        title: String(data.title ?? slug),
        date: String(data.date ?? ""),
        country: String(data.country ?? ""),
        excerpt: String(data.excerpt ?? ""),
        tags: (data.tags as string[]) ?? [],
        published: data.published !== false,
        readingTime: readingTimeOf(content),
        content,
      };
    })
    .filter((p) => p.published)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | undefined {
  const mdx = rawContent.posts[slug];
  if (!mdx) return undefined;
  const { data, content } = readMdx(mdx);
  return {
    slug,
    title: String(data.title ?? slug),
    date: String(data.date ?? ""),
    country: String(data.country ?? ""),
    excerpt: String(data.excerpt ?? ""),
    tags: (data.tags as string[]) ?? [],
    published: data.published !== false,
    readingTime: readingTimeOf(content),
    content,
  };
}

export function getDestination(slug: string): DestinationPage | undefined {
  const mdx = rawContent.destinations[slug];
  if (!mdx) return undefined;
  const { data, content } = readMdx(mdx);
  return {
    slug,
    title: String(data.title ?? slug),
    intro: String(data.intro ?? ""),
    highlights: (data.highlights as string[]) ?? [],
    seasons: (data.seasons as DestinationPage["seasons"]) ?? {
      best: "",
      when: "",
      temp: "",
    },
    content,
  };
}

export function readingTimeOf(mdx: string): string {
  const words = mdx.replace(/```[^`]*```/g, "").split(/\s+/).length;
  const mins = Math.max(1, Math.round(words / 200));
  return `${mins} min read`;
}