import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import { getFormatter, getTranslations } from "next-intl/server";

import { Badge } from "@/components/ui/badge";
import type { BlogPost } from "@/content/blog/blog-registry";
import { Link } from "@/i18n/routing";

export default async function BlogCard({ post }: { post: BlogPost }) {
  const t = await getTranslations("blog");
  const format = await getFormatter();

  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <article className="h-full flex flex-col p-8 rounded-2xl border border-primary/20 bg-card hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-1">
        <div className="flex flex-wrap gap-2 mb-4">
          {post.categories.map((category) => (
            <Badge key={category} variant="secondary">
              {category}
            </Badge>
          ))}
        </div>

        {/* Title with arrow */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold line-clamp-2 flex-1 leading-tight">
            {post.title}
          </h3>
          <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 ml-2 flex-shrink-0" />
        </div>

        {/* Excerpt */}
        <p className="text-muted-foreground mb-6 line-clamp-3 flex-grow leading-relaxed">
          {post.excerpt}
        </p>

        {/* Meta info */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground pt-4 border-t border-border/50">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <time dateTime={post.date}>
              {format.dateTime(new Date(post.date), {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </time>
          </div>
          {post.readingTime && (
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{t("readingTime", { time: post.readingTime })}</span>
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
