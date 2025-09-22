import React, { ReactNode } from "react";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Locale, routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

const geistSans = localFont({
  src: "../../public/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../../public/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default async function BaseLayout({
  children,
  locale,
}: {
  children: ReactNode;
  locale?: Locale;
}) {
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    // The suppressHydrationWarning prop is set to true to suppress warnings related to
    // discrepancies between server-rendered and client-rendered attributes. This is
    // intentional, as the theme configuration is managed on the client side, leading
    // to potential differences during hydration.
    <html suppressHydrationWarning={true} lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
