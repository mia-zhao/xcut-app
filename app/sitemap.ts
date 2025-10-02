import { MetadataRoute } from "next";

import { BLOG_SLUGS } from "@/content/blog/blog-slugs";
import i18nConfig from "@/i18n/config";

export const dynamic = "force-static";

const { locales, defaultLocale } = i18nConfig;

type ChangeFrequency = "daily" | "weekly" | "monthly" | "yearly";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://xcut.app";
  const currentDate = new Date().toISOString();

  const routes: Array<{
    path: string;
    priority: number;
    changeFreq: ChangeFrequency;
  }> = [
    { path: "", priority: 1, changeFreq: "daily" },
    { path: "/blog", priority: 0.9, changeFreq: "weekly" },
    { path: "/feedback", priority: 0.7, changeFreq: "monthly" },
    { path: "/terms", priority: 0.5, changeFreq: "yearly" },
    { path: "/privacy", priority: 0.5, changeFreq: "yearly" },
  ];

  const buildUrl = (locale: string, path: string = ""): string => {
    const localePrefix = locale === defaultLocale ? "" : `/${locale}`;
    return `${baseUrl}${localePrefix}${path}`;
  };

  const sitemapEntries: MetadataRoute.Sitemap = [
    // Main routes
    ...locales.flatMap((locale) =>
      routes.map((route) => ({
        url: buildUrl(locale, route.path),
        lastModified: currentDate,
        changeFrequency: route.changeFreq,
        priority: route.priority,
      }))
    ),

    // Blog posts
    ...locales.flatMap((locale) =>
      BLOG_SLUGS.map((slug) => ({
        url: buildUrl(locale, `/blog/${slug}`),
        lastModified: currentDate,
        changeFrequency: "weekly" as ChangeFrequency,
        priority: 0.9,
      }))
    ),
  ];

  return sitemapEntries;
}
