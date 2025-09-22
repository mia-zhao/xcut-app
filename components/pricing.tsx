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
import { Check } from "lucide-react";

export default function Pricing() {
  const pricing = useTranslations("pricing");
  const planKeys: Array<
    Extract<keyof IntlMessages["pricing"], "basic" | "standard" | "premium">
  > = ["basic", "standard", "premium"];

  return (
    <section id="pricing" className="w-full py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">
          {pricing("title")}
        </h2>
        <p className="text-xl text-center text-muted-foreground mb-12">
          {pricing("description")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {planKeys.map((key) => {
            const plan = {
              name: pricing(`${key}.name`),
              description: pricing(`${key}.description`),
              monthlyPrice: pricing(`${key}.monthlyPrice`),
              features: pricing(`${key}.features`),
              buttonText: pricing(`${key}.buttonText`),
              buttonVariant: pricing(`${key}.buttonVariant`),
              mostPopular: pricing(`${key}.mostPopular`),
            };

            return (
              <Card
                key={key}
                className={`flex flex-col ${
                  plan.mostPopular === "true" ? "border-primary" : ""
                }`}
              >
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="grow">
                  <p className="text-4xl font-bold mb-4">
                    {plan.monthlyPrice}
                    <span className="text-xl font-normal text-muted-foreground">
                      /month
                    </span>
                  </p>
                  <ul className="space-y-2">
                    {plan.features
                      .split(",")
                      .map((feature: string, featureIndex: number) => (
                        <li key={featureIndex} className="flex items-center">
                          <Check className="h-5 w-5 text-primary mr-2" />
                          <span>{feature}</span>
                        </li>
                      ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    variant={plan.buttonVariant as "default" | "outline-solid"}
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
