import { useTranslations } from "next-intl";
import Image from "next/image";

import { ModeToggle } from "@/components/theme/theme-toggle";
import { Link } from "@/i18n/routing";

export default function Footer() {
  const footer = useTranslations("footer");

  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="content py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="flex flex-col space-y-4 max-w-md">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/logo.svg"
                alt="XCut Logo"
                className="w-6 h-6"
                width={24}
                height={24}
              />
              <span className="font-bold text-lg">XCut</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {footer("about")}
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex flex-col space-y-3">
              <h3 className="text-sm font-semibold">
                {footer("product.title")}
              </h3>
              <div className="flex flex-col space-y-2">
                <FooterLink
                  href="/#features"
                  label={footer("product.features")}
                />
                <FooterLink href="/#faq" label={footer("product.faq")} />
                <FooterLink
                  href="/feedback"
                  label={footer("product.feedback")}
                />
              </div>
            </div>

            <div className="flex flex-col space-y-3">
              <h3 className="text-sm font-semibold">
                {footer("support.title")}
              </h3>
              <div className="flex flex-col space-y-2">
                <FooterLink
                  href="/feedback"
                  label={footer("support.contact")}
                />
                <FooterLink href="/privacy" label={footer("support.privacy")} />
                <FooterLink href="/terms" label={footer("support.terms")} />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <p className="text-sm text-muted-foreground">{footer("message")}</p>
          </div>

          <div className="flex items-center space-x-3">
            <ModeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}

const FooterLink = ({ href, label }: { href: string; label: string }) => {
  return (
    <Link
      href={href}
      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
    >
      {label}
    </Link>
  );
};
