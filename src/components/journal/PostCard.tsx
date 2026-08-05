import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Post } from "@/lib/content";

export function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/journal/${post.slug}`}
      className="group flex h-full flex-col border-t border-line py-6"
    >
      <div className="flex items-center justify-between gap-4">
        <span className="eyebrow text-muted">{post.country}</span>
        <span className="eyebrow text-terra">{post.readingTime}</span>
      </div>
      <h3 className="display mt-4 max-w-sm text-2xl leading-tight text-ink transition-colors group-hover:text-terra">
        {post.title}
      </h3>
      <p className="mt-3 flex-1 text-pretty text-sm leading-relaxed text-muted line-clamp-3">
        {post.excerpt}
      </p>
      <div className="mt-5 flex items-center justify-between">
        <span className="eyebrow text-muted">
          {new Date(post.date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>
        <ArrowRight className="h-4 w-4 text-terra transition-transform duration-300 group-hover:translate-x-1" />
      </div>
    </Link>
  );
}