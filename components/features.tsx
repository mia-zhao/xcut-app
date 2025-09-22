import { JSX } from "react";

import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Code,
  Smartphone,
  Heading1,
  Search,
  Rocket,
  Globe,
} from "lucide-react";

const iconMap: { [key: string]: JSX.Element } = {
  "open-source": <Code className="h-12 w-12 mb-4 text-primary" />,
  adaptive: <Smartphone className="h-12 w-12 mb-4 text-primary" />,
  markdown: <Heading1 className="h-12 w-12 mb-4 text-primary" />,
  seo: <Search className="h-12 w-12 mb-4 text-primary" />,
  quick: <Rocket className="h-12 w-12 mb-4 text-primary" />,
  global: <Globe className="h-12 w-12 mb-4 text-primary" />,
};

type FeatureKey = Array<
  Extract<
    keyof IntlMessages["features"],
    "open-source" | "adaptive" | "markdown" | "seo" | "quick" | "global"
  >
>;

export default function Features() {
  const features = useTranslations("features");
  const keys: FeatureKey = Object.keys(iconMap) as FeatureKey;

  return (
    <section id="features" className="w-full py-16 flex justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-accent-foreground text-center mb-12">
          {features("title")}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {keys.map((key) => (
            <Card
              key={key}
              className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <CardHeader className="flex items-center">
                {iconMap[key]}
                <CardTitle className="text-xl font-semibold">
                  {features(`${key}.name`)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  {features(`${key}.description`)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
