import { setRequestLocale } from "next-intl/server";

import FAQ from "@/components/faq";
import Features from "@/components/features";
import Hero from "@/components/hero";
import WhyXCut from "@/components/why-xcut";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = (await params).locale;
  setRequestLocale(locale);
  return (
    <main className="flex flex-col grow">
      <Hero />
      <WhyXCut />
      <Features />
      <FAQ />
    </main>
  );
}
