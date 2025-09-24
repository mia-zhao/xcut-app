import { MetadataRoute } from "next";

import i18nConfig from "@/i18n/config";

export const dynamic = "force-static";

const { locales, defaultLocale } = i18nConfig;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const routes = ["", "/feedback", "/terms", "/privacy"];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Add default locale paths at root
  for (const route of routes) {
    sitemapEntries.push({
      url: `${baseUrl}${route}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: route === "" ? 1 : 0.8,
    });
  }

  // Add paths for other locales
  for (const locale of locales) {
    if (locale !== defaultLocale) {
      for (const route of routes) {
        sitemapEntries.push({
          url: `${baseUrl}/${locale}${route}`,
          lastModified: new Date().toISOString(),
          changeFrequency: "weekly",
          priority: route === "" ? 1 : 0.8,
        });
      }
    }
  }

  return sitemapEntries;
}
