import { Suspense } from "react";
import { SimpleFooter } from "@/components/layout/footer";
import Header from "@/components/layout/header";
import LoadingSkeleton from "./loading-skeleton";
import {routing} from '@/i18n/routing';
import { hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

export default async function Layout({params, children}: { params: Promise<{ locale: string }>;
  children: React.ReactNode }) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <div className="grow w-full">
        <Suspense fallback={<LoadingSkeleton />}>{children}</Suspense>
      </div>
      <footer className="py-4">
        <SimpleFooter />
      </footer>
    </>
  );
}
