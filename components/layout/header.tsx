"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";

import BetaSignupDialog from "@/components/beta-signup-dialog";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";

export default function Header() {
  const header = useTranslations("header");
  const keys: Array<keyof IntlMessages["header"]["menu"]> = [
    "features",
    "blog",
  ];
  const [showBetaSignup, setShowBetaSignup] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="content py-6">
        <div className="grid grid-cols-3 items-center gap-4">
          {/* Logo - Left */}
          <div className="flex justify-start">
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
          </div>

          {/* Navigation - Center */}
          <nav className="hidden md:flex justify-center">
            <div className="flex items-center bg-muted/50 backdrop-blur-sm rounded-full py-3 px-2 border border-border/50 shadow-sm">
              {keys.map((key) => (
                <div key={key.toString()}>
                  <Link
                    href={header(`menu.${key}.link`)}
                    className="px-2 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-gradient-to-r hover:from-background/90 hover:to-background/80 hover:shadow-sm rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    {header(`menu.${key}.name`)}
                  </Link>
                </div>
              ))}
            </div>
          </nav>

          {/* CTA Button - Right */}
          <div className="flex justify-end">
            <Button
              onClick={() => setShowBetaSignup(true)}
              className="bg-primary text-primary-foreground px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm"
            >
              {header("menu.download.name")}
            </Button>
          </div>
        </div>
      </div>

      <BetaSignupDialog
        open={showBetaSignup}
        onOpenChange={setShowBetaSignup}
      />
    </header>
  );
}
