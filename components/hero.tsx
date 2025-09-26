"use client";

import { Download } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import BetaSignupDialog from "@/components/beta-signup-dialog";

export default function Hero() {
  const hero = useTranslations("hero");
  const [showBetaSignup, setShowBetaSignup] = useState(false);

  return (
    <section>
      <div className="content">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
                {hero("headline")}
              </h1>

              <p className="text-xl sm:text-2xl text-primary font-medium">
                {hero("tagline")}
              </p>

              <p className="text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                {hero("description")}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
              <Button
                size="lg"
                className="text-base px-8 py-3 font-semibold rounded-full shadow-lg hover:shadow-xl transition-shadow"
                onClick={() => setShowBetaSignup(true)}
              >
                <Download className="mr-2 h-4 w-4" />
                {hero("primary_cta")}
              </Button>
            </div>

            <div className="space-y-3">
              <div className="flex flex-col items-start space-y-2 text-sm text-muted-foreground">
                <span>{hero("highlights.macos")}</span>
                <span>{hero("highlights.binary")}</span>
              </div>
            </div>
          </div>

          <Image
            src="/xcut-demo.gif"
            alt="XCut Demo"
            className="w-full h-auto rounded-2xl shadow-lg"
            width={600}
            height={400}
          />
        </div>
      </div>

      <BetaSignupDialog
        open={showBetaSignup}
        onOpenChange={setShowBetaSignup}
      />
    </section>
  );
}
