import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import BaseLayout from "@/components/layout/base-layout";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import i18nConfig from "@/i18n/config";
import { routing } from "@/i18n/routing";
import { generateAlternates } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "MetaData" });
  const { defaultLocale } = i18nConfig;

  const title = t("title");
  const description = t("description");
  const keywords = t("keywords")
    .split(",")
    .map((keyword) => keyword.trim());

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://xcut.app";
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
      siteName: "XCut",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: url,
      languages: generateAlternates(baseUrl, "/"),
    },
  };
}

export default async function Layout(
  props: Readonly<{
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
  }>
) {
  const params = await props.params;
  const { children } = props;
  return (
    <BaseLayout locale={params.locale}>
      <div className="relative min-h-screen flex flex-col">
        <Header />
        <div className="flex grow">{children}</div>
        <Footer />
      </div>
    </BaseLayout>
  );
}
