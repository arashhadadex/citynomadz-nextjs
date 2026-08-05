import { compileMDX } from "next-mdx-remote/rsc";
import { mdxComponents } from "./mdx-components";

/**
 * Renders an MDX string to React in a server component.
 */
export async function renderMDX(content: string) {
  const { content: jsx } = await compileMDX({
    source: content,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [],
        rehypePlugins: [],
      },
    },
    components: mdxComponents,
  });
  return jsx;
}