"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface CategoriesCardProps {
  categories: string[];
  totalCounts: Record<string, number>;
  filteredCounts: Record<string, number>;
}

export default function CategoriesCard({
  categories,
  totalCounts,
  filteredCounts,
}: CategoriesCardProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [_, startTransition] = useTransition();
  const currentCategory = searchParams.get("category");
  const t = useTranslations("blog.categories");

  const handleCategoryClick = (category: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      if (category === currentCategory) {
        params.delete("category");
      } else {
        params.set("category", category);
      }
      router.push(`/blog?${params.toString()}`);
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const totalCount = totalCounts[category] || 0;
            const filteredCount = filteredCounts[category] || 0;
            const isFiltered = searchParams.get("q") || currentCategory;

            return (
              <Badge
                key={category}
                variant="secondary"
                className={cn(
                  "cursor-pointer hover:bg-secondary/80 transition-colors",
                  currentCategory === category &&
                    "bg-primary text-primary-foreground hover:bg-primary/90",
                  // Gray out categories with 0 filtered results
                  isFiltered && filteredCount === 0 && "opacity-50"
                )}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
                <span className="ml-1 text-xs">
                  {isFiltered ? <>({filteredCount})</> : <>({totalCount})</>}
                </span>
              </Badge>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
