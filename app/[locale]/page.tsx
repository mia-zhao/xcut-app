import CookieConsent from "@/components/common/cookie-consent";
import ScrollButton from "@/components/common/scroll-button";
import Features from "@/components/features";
import Hero from "@/components/hero";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import Pricing from "@/components/pricing";
import { setRequestLocale } from "next-intl/server";

export const dynamicParams = false;

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = (await params).locale;
  setRequestLocale(locale);
  return (
    <>
      <Header />
      <main className="flex flex-col gap-8 grow items-center sm:items-start">
        <Hero />
        <Features />
        <Pricing />
      </main>
      <Footer />
      <ScrollButton />
      <CookieConsent />
    </>
  );
}
