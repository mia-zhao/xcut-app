"use client";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";

export default function ErrorPage({
  errorMsg,
}: {
  errorMsg: IntlMessages["Error"];
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
      <h1 className="text-4xl font-bold mb-4">{errorMsg["title"]}</h1>
      <p className="text-xl mb-8">{errorMsg["description"]}</p>
      <div className="flex space-x-4">
        <Button
          onClick={() => window.location.reload()}
          className="bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc] transition-colors"
        >
          {errorMsg["tryAgain"]}
        </Button>
        <Button variant="outline">
          <Link href="/">{errorMsg["backHome"]}</Link>
        </Button>
      </div>
    </div>
  );
}
