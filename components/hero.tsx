import { useTranslations } from "next-intl";
import { Button } from "./ui/button";
import { Link } from "@/i18n/routing";

export default function Hero() {
  const hero = useTranslations("hero");

  return (
    <section className="bg-accent w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-24">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-accent-foreground">
            {hero("headline")}
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base sm:text-lg md:mt-5 md:text-xl text-secondary-foreground">
            {hero("description")}
          </p>
          <div className="mt-5 max-w-md mx-auto flex flex-col sm:flex-row sm:justify-center md:mt-8">
            <Button size="lg" className="w-1/2 mx-auto rounded-md shadow-sm">
              <Link href="https://github.com/mia-zhao/vortex">
                {hero("primary_cta")}
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="mt-3 w-1/2 mx-auto sm:mt-0 md:ml-6 lg:ml-12"
            >
              <Link href="/blog">{hero("secondary_cta")}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
