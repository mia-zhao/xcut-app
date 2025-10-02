"use client";

import { BookOpen, TrendingUp } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContentsSkeleton() {
  return (
    <div className="bg-card rounded-xl border border-border shadow-sm p-6 animate-pulse">
      <div className="flex items-center mb-4">
        <div className="w-1 h-6 bg-primary rounded-full mr-3"></div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-muted/50 rounded"></div>
          <div className="h-5 w-40 bg-muted/50 rounded"></div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-9 bg-muted/50 rounded-lg w-11/12"></div>
        <div className="h-9 bg-muted/50 rounded-lg w-10/12"></div>
        <div className="h-9 bg-muted/50 rounded-lg w-full ml-4"></div>
        <div className="h-9 bg-muted/50 rounded-lg w-9/12 ml-4"></div>
        <div className="h-9 bg-muted/50 rounded-lg w-11/12"></div>
        <div className="h-9 bg-muted/50 rounded-lg w-10/12 ml-4"></div>
        <div className="h-9 bg-muted/50 rounded-lg w-full"></div>
        <div className="h-9 bg-muted/50 rounded-lg w-9/12 ml-4"></div>
      </div>
      <div className="mt-6 pt-4 border-t border-border/50">
        <div className="h-4 w-32 bg-muted/50 rounded mb-2"></div>
        <div className="h-1.5 bg-muted rounded-full"></div>
      </div>
    </div>
  );
}

export default function TableOfContents({
  className = "",
}: {
  className?: string;
}) {
  const t = useTranslations("blog.toc");
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const headings = Array.from(document.querySelectorAll("h2, h3"))
      .filter((heading) => heading.id)
      .map((heading) => ({
        id: heading.id,
        text: heading.textContent || "",
        level: parseInt(heading.tagName.charAt(1)),
      }));

    setToc(headings);
    setIsLoading(false);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0% -35% 0%",
        threshold: 0.1,
      }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  if (isLoading) {
    return <TableOfContentsSkeleton />;
  }

  return (
    <div
      className={`bg-card rounded-xl border border-border shadow-sm ${className}`}
    >
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="w-1 h-6 bg-primary rounded-full mr-3"></div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">
              {t("title")}
            </h3>
          </div>
        </div>
        <nav className="space-y-1">
          {toc.map((item) => {
            const isActive = activeId === item.id;
            const isSubheading = item.level > 2;

            return (
              <button
                key={item.id}
                onClick={() => handleClick(item.id)}
                className={`
                  block w-full text-left py-2 px-3 rounded-lg text-sm transition-all duration-200
                  ${isSubheading ? "ml-4 text-xs" : ""}
                  ${
                    isActive
                      ? "bg-primary/10 text-primary font-medium border-l-2 border-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }
                `}
              >
                <span
                  className={`block ${
                    isActive ? "translate-x-1" : ""
                  } transition-transform duration-200`}
                >
                  {item.text}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Progress indicator */}
      <div className="px-6 pb-4">
        <div className="flex items-center text-xs text-muted-foreground mb-2">
          <TrendingUp className="w-3 h-3 mr-1" />
          {t("readingProgress")}
        </div>
        <div className="w-full bg-muted rounded-full h-1.5">
          <div
            className="bg-primary h-1.5 rounded-full transition-all duration-300 ease-out"
            style={{
              width: `${Math.min(
                100,
                ((toc.findIndex((item) => item.id === activeId) + 1) /
                  toc.length) *
                  100
              )}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
