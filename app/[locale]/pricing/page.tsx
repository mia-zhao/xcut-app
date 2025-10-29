import { Check } from "lucide-react";
import { Locale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { purchaseUrl } from "@/lib/constants";

export const dynamicParams = false;

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pricing");
  const featureKeys: Array<
    keyof IntlMessages["pricing"]["lifetime"]["features"]
  > = ["all", "updates", "refund"];

  return (
    <div className="max-w-5xl py-8 mx-auto my-auto px-4">
      <div className="mx-auto max-w-2xl sm:text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {t("title")}
        </h2>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          {t("description")}
        </p>
      </div>

      <div className="mt-8 flex justify-center">
        <div className="w-full max-w-sm rounded-3xl bg-background p-8 ring-1 ring-border/40">
          <h3 className="text-lg font-semibold leading-8 text-foreground">
            {t("lifetime.name")}
          </h3>

          <div className="mt-4 flex items-baseline gap-x-2">
            <span className="text-4xl font-bold tracking-tight text-foreground">
              {t("lifetime.price")}
            </span>
          </div>
          <p className="mt-6 text-base leading-7 text-muted-foreground">
            {t("lifetime.description")}
          </p>

          <a
            href={purchaseUrl}
            className="mt-8 block w-full rounded-md bg-primary py-2 px-3 text-center text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {t("lifetime.buttonText")}
          </a>

          <ul
            role="list"
            className="mt-8 space-y-3 text-sm leading-6 text-muted-foreground xl:mt-10"
          >
            {featureKeys.map((key) => (
              <li key={key} className="flex gap-x-3">
                <Check
                  className="h-6 w-5 flex-none text-primary"
                  aria-hidden="true"
                />
                <span>{t(`lifetime.features.${key}`)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
