import matter from "gray-matter";

import i18nConfig from "@/i18n/config";
import { Locale } from "@/i18n/routing";
import { BLOG_SLUGS, BlogSlug } from "./blog-slugs";

export const blogRegistry: Record<string, Record<Locale, Promise<string>>> = {};

for (const slug of BLOG_SLUGS) {
  blogRegistry[slug] = {} as Record<Locale, Promise<string>>;

  for (const locale of i18nConfig.locales) {
    try {
      blogRegistry[slug][locale] = import(
        `!!raw-loader!./${locale}/${slug}.mdx`
      ).then((m) => m.default);
    } catch (_) {
      console.warn(`No content found for ${locale}/${slug}`);
    }
  }
}

export type BlogFrontmatter = {
  title: string;
  author: string;
  date: string;
  categories: string[];
  excerpt: string;
  heroImage?: string;
  heroImageAlt?: string;
};

export type BlogPost = BlogFrontmatter & {
  slug: BlogSlug;
  readingTime: string;
};

export async function getBlogPosts(
  locale: Locale = i18nConfig.defaultLocale
): Promise<BlogPost[]> {
  const posts: Array<BlogPost> = [];

  for (const slug of BLOG_SLUGS) {
    try {
      const rawContent = await (blogRegistry[slug][locale] ||
        blogRegistry[slug][i18nConfig.defaultLocale]);

      if (!rawContent) {
        continue;
      }

      const { frontmatter } = await compileMDX(rawContent);
      const readingTime = calculateReadingTime(rawContent);

      posts.push({ ...frontmatter, slug, readingTime });
    } catch (e) {
      console.warn(`Failed to load blog post: ${slug}`, e);
    }
  }

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getBlogPost(
  slug: BlogSlug,
  locale: Locale = i18nConfig.defaultLocale
): Promise<{
  frontmatter: BlogFrontmatter;
  content: string;
  readingTime: string;
} | null> {
  try {
    const rawContent = await (blogRegistry[slug][locale] ||
      blogRegistry[slug][i18nConfig.defaultLocale]);

    if (!rawContent) {
      return null;
    }

    const { frontmatter, content } = await compileMDX(rawContent);
    const readingTime = calculateReadingTime(rawContent);

    return { frontmatter, content, readingTime };
  } catch (e) {
    console.warn(`Failed to load blog post: ${slug}`, e);
    return null;
  }
}

async function compileMDX(
  source: string
): Promise<{ frontmatter: BlogFrontmatter; content: string }> {
  const { content, data } = matter(source);
  return { frontmatter: data as BlogFrontmatter, content };
}

function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes}`;
}
