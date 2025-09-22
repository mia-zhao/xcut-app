"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const t = useTranslations("CookieConsent");

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem("cookieConsent");
    if (!hasConsented) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true");
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "false");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 flex justify-center items-center z-50">
      <Card className="w-full max-w-3xl shadow-lg">
        <CardContent className="p-6">
          <div className="grid gap-4">
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{t("title")}</h3>
                <p className="text-sm text-gray-500 mt-1">{t("description")}</p>
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDecline}
                className="text-sm"
              >
                {t("decline")}
              </Button>
              <Button size="sm" onClick={handleAccept} className="text-sm">
                {t("accept")}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
