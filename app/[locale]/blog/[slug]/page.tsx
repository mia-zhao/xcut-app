import {
  blogRegistry,
  type BlogSlug,
  getBlogPost,
} from "@/content/blog/blog-registry";
import i18nConfig from "@/i18n/config";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import BreadCrumb from "../breadcrumb";
import Blog from "./blog";

export const dynamicParams = false;

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: BlogSlug; locale: string }>;
}) {
  const { slug, locale } = await params;

  setRequestLocale(locale);

  const rawContents = blogRegistry[slug];

  if (!rawContents) {
    notFound();
  }

  const rawContent = await (rawContents[locale] ||
    rawContents[i18nConfig.defaultLocale]);

  if (!rawContent) {
    notFound();
  }

  const { frontmatter, content } = await getBlogPost(rawContent);

  return (
    <>
      <div className="my-8 ml">
        <BreadCrumb title={frontmatter.title} />
      </div>
      <Blog frontmatter={frontmatter} content={content} />
    </>
  );
}
