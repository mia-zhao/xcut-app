import { Check, Star } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Pricing() {
  const pricing = useTranslations("pricing");
  const plans = ["trial", "lifetime"] as const;

  return (
    <section id="pricing">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="mb-4">{pricing("title")}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {pricing("description")}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((planKey) => {
            const plan = {
              name: pricing(`${planKey}.name`),
              description: pricing(`${planKey}.description`),
              price: pricing(`${planKey}.price`),
              price_suffix: pricing(`${planKey}.price_suffix`),
              features: pricing.raw(`${planKey}.features`),
              buttonText: pricing(`${planKey}.buttonText`),
              isPrimary: planKey === "lifetime",
            };

            return (
              <Card
                key={planKey}
                className={`relative flex flex-col text-center shadow-lg hover:shadow-xl transition-shadow ${
                  plan.isPrimary
                    ? "border-primary/50 ring-1 ring-primary/20"
                    : "border-border/50"
                }`}
              >
                {plan.isPrimary && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      {pricing("recommended")}
                    </div>
                  </div>
                )}
                <CardHeader className="pb-6">
                  <CardTitle className="text-2xl font-semibold">
                    {plan.name}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="grow flex flex-col justify-between px-6">
                  <div>
                    <div className="mb-8">
                      <span className="text-5xl font-bold">{plan.price}</span>
                      <span className="text-lg font-normal text-muted-foreground ml-1">
                        {plan.price_suffix}
                      </span>
                    </div>
                    <ul className="space-y-4 text-left">
                      {plan.features.map((feature: string, i: number) => (
                        <li key={i} className="flex items-start">
                          <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                <CardFooter className="pt-6">
                  <Button
                    className="w-full font-semibold"
                    size="lg"
                    variant={plan.isPrimary ? "default" : "outline"}
                  >
                    {plan.buttonText}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
