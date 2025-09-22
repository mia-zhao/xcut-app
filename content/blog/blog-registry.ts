import { Locale } from "@/i18n/routing";
import i18nConfig from "@/i18n/config";
import matter from "gray-matter";

export const BLOG_SLUGS = [
  "how-to-use-markdown-in-next-js",
  "deploy-to-cloudflare",
] as const;

export const blogRegistry: Record<string, Record<Locale, Promise<string>>> = {};

for (const slug of BLOG_SLUGS) {
  blogRegistry[slug] = {} as Record<Locale, Promise<string>>;

  for (const locale of i18nConfig.locales) {
    try {
      blogRegistry[slug][locale] = import(
        `!!raw-loader!./${locale}/${slug}.mdx`
      ).then((m) => m.default);
    } catch (e) {
      console.warn(`No content found for ${locale}/${slug}`);
    }
  }
}

export type BlogSlug = keyof typeof blogRegistry;

export type BlogFrontmatter = {
  title: string;
  author: string;
  date: string;
  lastmod: string;
  categories: string[];
  excerpt: string;
};

export type BlogPost = BlogFrontmatter & { slug: BlogSlug };

export async function getBlogPosts(locale: Locale = i18nConfig.defaultLocale) {
  const posts: Array<BlogPost> = [];

  for (const slug of BLOG_SLUGS) {
    try {
      const rawContent = await (blogRegistry[slug][locale] ||
        blogRegistry[slug][i18nConfig.defaultLocale]);

      if (!rawContent) {
        continue;
      }

      const { frontmatter } = await compileMDX(rawContent);

      posts.push({ ...frontmatter, slug });
    } catch (e) {
      console.warn(`Failed to load blog post: ${slug}`, e);
    }
  }

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getBlogPost(
  source: string
): Promise<{ frontmatter: BlogFrontmatter; content: string }> {
  const { content: code, frontmatter } = await compileMDX(source);

  return { frontmatter, content: code };
}

async function compileMDX(
  source: string
): Promise<{ frontmatter: BlogFrontmatter; content: string }> {
  const { content, data } = matter(source);

  return { frontmatter: data as BlogFrontmatter, content };
}
