import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { getBlogPost } from "@/content/blog/blog-registry";
import { BLOG_SLUGS, BlogSlug } from "@/content/blog/blog-slugs";
import { Locale, routing } from "@/i18n/routing";
import Blog from "./blog";

export const dynamicParams = false;

export async function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    BLOG_SLUGS.map((slug) => ({
      slug,
      locale,
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;

  const result = await getBlogPost(slug as BlogSlug, locale);

  if (!result) {
    return { title: "Post Not Found" };
  }

  return {
    title: result.frontmatter.title,
    description: result.frontmatter.excerpt,
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;

  setRequestLocale(locale);

  const result = await getBlogPost(slug as BlogSlug, locale);

  if (!result) {
    notFound();
  }

  return (
    <Blog
      frontmatter={result.frontmatter}
      content={result.content}
      readingTime={result.readingTime}
    />
  );
}
