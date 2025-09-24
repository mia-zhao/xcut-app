import {
  LaptopMinimal,
  LaptopMinimalCheck,
  LucideIcon,
  Option,
  ScanSearch,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

type Feature = {
  key: keyof IntlMessages["features"]["grid"];
  icon: LucideIcon;
};

export const features: Feature[] = [
  {
    key: "native",
    icon: LaptopMinimal,
  },
  {
    key: "context",
    icon: LaptopMinimalCheck,
  },
  {
    key: "globalShortcut",
    icon: Option,
  },
  {
    key: "deepScan",
    icon: ScanSearch,
  },
];

export default function Features() {
  const t = useTranslations("features");

  return (
    <section id="features">
      <div className="content">
        {/* Header */}
        <div className="mb-12">
          <h2 className="mb-6">{t("title")}</h2>
          <p className="text-center text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("description")}
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-12 md:gap-16">
          <div className="w-full md:w-1/2 flex flex-col items-center">
            <div className="relative w-full max-h-[500px] flex justify-center">
              <Image
                src="/xcut-screenshot.png"
                alt={t("screenshot_alt")}
                width={0}
                height={500}
                className="rounded-2xl shadow-2xl h-auto max-h-[500px] w-auto"
                sizes="(max-width: 768px) 100vw, 500px"
                style={{ objectFit: "contain" }}
              />
            </div>
            <p className="text-sm text-muted-foreground mt-4 text-center">
              {t("screenshot_caption")}
            </p>
          </div>
          {/* Features (right on md+, bottom on mobile) */}
          <div className="w-full md:w-1/2 flex flex-col justify-between h-auto">
            <div className="flex flex-col gap-8 h-full place-content-evenly">
              {features.map(({ key, icon: Icon }) => (
                <div
                  key={key}
                  className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left"
                >
                  <div className="rounded-2xl bg-primary/10 p-4 w-16 h-16 flex items-center justify-center mb-2 sm:mb-0">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">
                      {t(`grid.${key}.name`)}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {t(`grid.${key}.description`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
