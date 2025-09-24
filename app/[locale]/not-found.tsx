import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center mx-auto">
      <h1 className="text-4xl font-bold mb-4">{t("title")}</h1>
      <p className="text-xl mb-8">{t("description")}</p>
      <div className="flex gap-4">
        <Button variant="default">
          <Link href="/">{t("backHome")}</Link>
        </Button>
      </div>
    </div>
  );
}
