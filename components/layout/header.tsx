import { useTranslations } from "next-intl";
import { ModeToggle } from "../theme/theme-toggle";
import LocaleSelector from "../locale/locale-selector";
import { Link } from "@/i18n/routing";

export default function Header() {
  const header = useTranslations("header");
  const keys: Array<keyof IntlMessages["header"]["menu"]> = [
    "home",
    "features",
    "pricing",
    "blog",
  ];

  return (
    <header className="shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center text-primary mb-4 sm:mb-0">
          <img
            src="../../logo.svg"
            alt="Logo"
            className="logo mr-2 w-6 h-6"
            width={24}
            height={24}
          />
          <span className="font-bold text-2xl">{header("siteName")}</span>
        </div>
        <nav className="flex items-center">
          <ul className="flex flex-wrap items-center justify-center space-x-6">
            {keys.map((key) => (
              <li key={key.toString()}>
                {!header(`menu.${key}.link`).startsWith("#") ? (
                  <Link
                    href={header(`menu.${key}.link`)}
                    className="header-link"
                  >
                    {header(`menu.${key}.name`)}
                  </Link>
                ) : (
                  <a
                    href={`/${header(`menu.${key}.link`)}`}
                    className="header-link"
                  >
                    {header(`menu.${key}.name`)}
                  </a>
                )}
              </li>
            ))}
            <li>
              <ModeToggle />
            </li>
            <li>
              <LocaleSelector />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
