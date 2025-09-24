import { useTranslations } from "next-intl";
import Image from "next/image";

import { Link } from "@/i18n/routing";

export default function Header() {
  const header = useTranslations("header");
  const keys: Array<keyof IntlMessages["header"]["menu"]> = ["features"];

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="content py-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <Image
              src="/logo.svg"
              alt="XCut Logo"
              className="w-8 h-8"
              width={32}
              height={32}
            />
            <span className="font-bold text-xl text-foreground">XCut</span>
          </Link>

          <nav className="hidden md:flex">
            <div className="flex items-center bg-muted/50 backdrop-blur-sm rounded-full p-1 border border-border/50">
              {keys.map((key) => (
                <div key={key.toString()}>
                  <Link
                    href={header(`menu.${key}.link`)}
                    className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-background/80 rounded-full transition-all duration-200"
                  >
                    {header(`menu.${key}.name`)}
                  </Link>
                </div>
              ))}
            </div>
          </nav>

          <div className="flex items-center">
            <Link
              href="/"
              className="bg-primary text-primary-foreground px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm"
            >
              {header("menu.download.name")}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
