import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import i18nConfig from "@/i18n/config";
import { generateAlternates } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "feedback" });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://xcut.app";
  const nonLocalizedPathname = "/feedback";
  const url = `${baseUrl}${
    locale === i18nConfig.defaultLocale
      ? nonLocalizedPathname
      : `/${locale}${nonLocalizedPathname}`
  }`;

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: url,
      languages: generateAlternates(baseUrl, nonLocalizedPathname),
    },
  };
}

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
