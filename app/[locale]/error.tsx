"use client";

import { useTranslations } from "next-intl";
import BaseError from "@/components/layout/error";

export default function ErrorPage() {
  const t = useTranslations("Error");

  const error = {
    title: t("title"),
    description: t("description"),
    tryAgain: t("tryAgain"),
    backHome: t("backHome"),
  };

  return <BaseError errorMsg={error} />;
}
