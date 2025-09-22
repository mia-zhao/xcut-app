import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";
import i18nConfig from "./config";

export const routing = defineRouting({
  ...i18nConfig,
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
