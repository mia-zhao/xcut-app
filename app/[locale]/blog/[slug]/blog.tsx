import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";
import { MDXRemote } from "next-mdx-remote/rsc";

import { mdxComponents } from "@/components/blog/mdx-components";
import TableOfContents from "@/components/blog/table-of-contents";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BlogFrontmatter } from "@/content/blog/blog-registry";
import { Link } from "@/i18n/routing";

interface BlogProps {
  content: string;
  frontmatter: BlogFrontmatter;
  readingTime: string;
}

export default function Blog({ content, frontmatter, readingTime }: BlogProps) {
  const t = useTranslations("blog");
  const format = useFormatter();

  return (
    <main className="flex flex-col grow">
      <div className="content">
        {/* Back Button */}
        <Link href="/blog" className="inline-block mb-6">
          <Button
            variant="ghost"
            className="gap-2 hover:gap-3 transition-all hover:bg-primary/5"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("backToBlog")}
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <article className="lg:col-span-2">
            {/* Header */}
            <header className="mb-16">
              <h1 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold mb-8 leading-[1.1] tracking-tight">
                {frontmatter.title}
              </h1>

              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {frontmatter.categories.map((category) => (
                  <Badge key={category} variant="secondary">
                    {category}
                  </Badge>
                ))}
              </div>

              <p className="text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed font-light">
                {frontmatter.excerpt}
              </p>

              <div className="flex flex-wrap items-center gap-8 text-sm text-muted-foreground pb-8 border-b border-border/50">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <time dateTime={frontmatter.date}>
                    {format.dateTime(new Date(frontmatter.date), {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                </div>
                {readingTime && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{t("readingTime", { time: readingTime })}</span>
                  </div>
                )}
              </div>
            </header>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <MDXRemote source={content} components={mdxComponents} />
            </div>

            {/* Footer */}
            <div className="my-12">
              <Link href="/blog">
                <Button
                  variant="ghost"
                  className="gap-2 hover:gap-3 transition-all hover:border-primary/50 hover:bg-primary/5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {t("backToBlog")}
                </Button>
              </Link>
            </div>
          </article>

          {/* Table of Contents Sidebar - Hidden on mobile */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-8">
              <TableOfContents />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
