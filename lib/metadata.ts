import i18nConfig from "@/i18n/config";

const { defaultLocale, locales } = i18nConfig;

export function generateAlternates(baseUrl: string, path: string) {
  return Object.fromEntries(
    locales.map((l) => [
      l,
      baseUrl + (l === defaultLocale ? path : `/${l}${path}`),
    ])
  );
}
