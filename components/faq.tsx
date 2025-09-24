import { useTranslations } from "next-intl";
import Link from "next/link";

export default function FAQ() {
  const t = useTranslations("faq");

  const faqKeys: Array<keyof IntlMessages["faq"]["items"]> = [
    "what-is-xcut",
    "why-accessibility",
    "which-apps",
    "deep-scan",
    "is-my-data-private",
    "feedback",
  ];

  return (
    <section id="faq">
      <div className="content">
        <h2>{t("title")}</h2>
        <div className="space-y-4 max-w-4xl mx-auto">
          {faqKeys.map((key) => (
            <details
              key={key}
              className="group rounded-2xl border border-border/50 bg-background shadow-sm hover:shadow-md transition-shadow [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="cursor-pointer select-none p-6 flex items-start justify-between gap-4">
                <span className="font-semibold text-left text-lg">
                  {t(`items.${key}.q`)}
                </span>
                <span className="text-muted-foreground transition-transform group-open:rotate-45 flex-shrink-0 text-xl font-light">
                  +
                </span>
              </summary>
              <div className="px-6 pb-6 pt-0 text-muted-foreground leading-relaxed">
                {t.rich(`items.${key}.a`, {
                  feedback: (chunks) => (
                    <Link
                      className="underline"
                      href="/feedback"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {chunks}
                    </Link>
                  ),
                })}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
