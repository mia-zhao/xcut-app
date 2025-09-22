import { Metadata } from "next";
import BaseLayout from "@/components/layout/base-layout";
import { routing } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import i18nConfig from "@/i18n/config";

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale: locale}));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({ locale, namespace: "MetaData" });
  const { locales, defaultLocale } = i18nConfig;

  const title = t("title");
  const description = t("description");
  const keywords = t("keywords")
    .split(",")
    .map((keyword) => keyword.trim());

  const baseUrl = process.env.CLOUDFLARE_DEPLOY_URL;
  const url = locale === defaultLocale ? baseUrl : `${baseUrl}/${locale}`;

  return {
    title,
    description,
    keywords,
    openGraph: {
      type: "website",
      locale,
      url,
      title,
      description,
      siteName: "Vortex",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: url,
      languages: Object.fromEntries(
        locales.map((l) => [
          l,
          l === defaultLocale ? baseUrl : `${baseUrl}/${l}`,
        ])
      ),
    },
  };
}

export default async function Layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const {locale} = await params;
  return (
    <BaseLayout locale={locale}>
      <div className="relative min-h-screen flex flex-col font-(family-name:--font-geist-sans)">
        {children}
      </div>
    </BaseLayout>
  );
}
