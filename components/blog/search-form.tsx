"use client";

import { Search, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const t = useTranslations("blog.search");
  const [searchValue, setSearchValue] = useState(searchParams.get("q") || "");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      if (searchValue) {
        params.set("q", searchValue);
      } else {
        params.delete("q");
      }
      // Maintain category if it exists
      const category = searchParams.get("category");
      if (category) {
        params.set("category", category);
      }
      router.push(`/blog?${params.toString()}`);
    });
  };

  const clearInput = () => {
    setSearchValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2">
      <div className="relative flex-1">
        <Input
          type="text"
          name="search"
          placeholder={t("placeholder")}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="flex-1"
        />
        {searchValue && (
          <button
            type="button"
            onClick={clearInput}
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      <Button type="submit" disabled={isPending} className="shrink-0">
        <Search className="h-4 w-4 mr-2" />
        {t("search")}
      </Button>
    </form>
  );
}
