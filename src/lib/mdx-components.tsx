import type { MDXComponents } from "mdx/types";

/**
 * Editorial styling for rendered MDX bodies — a calm, print-like reading
 * experience consistent with the brand.
 */
export const mdxComponents: MDXComponents = {
  h2: ({ children, ...props }) => (
    <h2
      {...props}
      className="display mt-14 text-[clamp(1.7rem,3vw,2.4rem)] text-ink"
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 className="display mt-8 text-xl text-ink" {...props}>
      {children}
    </h3>
  ),
  p: ({ children, ...props }) => (
    <p
      {...props}
      className="mt-5 max-w-[68ch] text-pretty text-[1.05rem] leading-relaxed text-soil"
    >
      {children}
    </p>
  ),
  a: ({ href = "", children, ...props }) => (
    <a
      {...props}
      href={href}
      className="link-underline font-medium text-terra"
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
    >
      {children}
    </a>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-ink">{children}</strong>
  ),
  em: ({ children }) => <em className="italic text-terra-deep">{children}</em>,
  blockquote: ({ children }) => (
    <blockquote className="my-8 border-l-2 border-terra pl-6 font-display text-xl italic text-ink">
      {children}
    </blockquote>
  ),
  ul: ({ children }) => (
    <ul className="mt-5 grid max-w-[68ch] gap-3">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mt-5 grid max-w-[68ch] gap-3 list-decimal pl-5">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="flex gap-3 leading-relaxed text-soil">
      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-terra" />
      <span>{children}</span>
    </li>
  ),
  hr: () => <hr className="my-12 border-line" />,
  img: ({ src = "", alt = "" }) => (
    <img
      src={src}
      alt={alt}
      className="my-8 w-full rounded-sm border border-line"
      loading="lazy"
    />
  ),
  pre: ({ children }) => (
    <pre className="my-8 overflow-x-auto rounded-sm border border-line bg-night p-5 text-sm text-mist">
      {children}
    </pre>
  ),
  code: ({ children }) => (
    <code className="rounded-sm bg-scrim px-1.5 py-0.5 font-mono text-[0.9em] text-terra-deep">
      {children}
    </code>
  ),
};