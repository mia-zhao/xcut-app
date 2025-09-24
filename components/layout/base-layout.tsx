import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Noto_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

import { ThemeProvider } from "@/components/theme/theme-provider";
import { Locale, routing } from "@/i18n/routing";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
      <head>
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/logo.svg" />
      </head>
      <body className={`${notoSans.className} antialiased`}>
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
