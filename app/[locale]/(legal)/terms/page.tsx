import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

import { legalDocuments } from "@/content/legal/legal-registry";
import i18nConfig from "@/i18n/config";
import { generateAlternates } from "@/lib/metadata";

interface Props {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://xcut.app";
  const nonLocalizedPathname = "/terms";
  const url = `${baseUrl}${
    locale === i18nConfig.defaultLocale
      ? nonLocalizedPathname
      : `/${locale}${nonLocalizedPathname}`
  }`;

  return {
    title: t("terms.title"),
    description: t("terms.description"),
    alternates: {
      canonical: url,
      languages: generateAlternates(baseUrl, nonLocalizedPathname),
    },
  };
}

export default async function TermsOfServicePage(props: Props) {
  const params = await props.params;
  const { locale } = params;

  const doc = legalDocuments["terms-of-service"];
  if (!doc) {
    notFound();
  }

  const translation = doc.translations[locale] || doc.translations.en;
  if (!translation) {
    notFound();
  }

  const { default: Content } = await translation();

  return (
    <article>
      <Content />
    </article>
  );
}
