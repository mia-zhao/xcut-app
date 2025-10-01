"use client";

import { BookOpen, TrendingUp } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents({
  className = "",
}: {
  className?: string;
}) {
  const t = useTranslations("blog.toc");
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    let mutationObserver: MutationObserver | null = null;

    // Extract headings from the page
    const extractHeadings = () => {
      const headings = Array.from(document.querySelectorAll("h1, h2, h3"))
        .filter((heading) => heading.id)
        .map((heading) => ({
          id: heading.id,
          text: heading.textContent || "",
          level: parseInt(heading.tagName.charAt(1)),
        }));

      if (headings.length > 0) {
        setToc(headings);

        observer = new IntersectionObserver(
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
          if (element && observer) {
            observer.observe(element);
          }
        });
      }
    };

    extractHeadings();

    mutationObserver = new MutationObserver(() => {
      extractHeadings();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Also try after delays
    const timer1 = setTimeout(extractHeadings, 500);
    const timer2 = setTimeout(extractHeadings, 1500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      if (observer) {
        observer.disconnect();
      }
      if (mutationObserver) {
        mutationObserver.disconnect();
      }
    };
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
        {toc.length === 0 ? (
          <p className="text-sm text-muted-foreground">{t("loading")}</p>
        ) : (
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
        )}
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
