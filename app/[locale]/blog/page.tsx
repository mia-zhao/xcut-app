import { BookOpen } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import BlogCard from "@/components/blog-card";
import { getBlogPosts } from "@/content/blog/blog-registry";
import { Locale } from "@/i18n/routing";
import { generateAlternates } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog.metadata" });

  return {
    title: t("title"),
    description: t("description"),
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/blog`,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/blog`,
      languages: generateAlternates(
        process.env.NEXT_PUBLIC_BASE_URL || "https://xcut.app",
        "/blog"
      ),
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("blog");
  const posts = await getBlogPosts(locale);

  return (
    <main className="flex flex-col grow">
      <div className="content py-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3 md:text-4xl font-bold mb-8 tracking-tight">
            {t("title")}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* Blog Posts Grid */}
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted/50 mb-6 shadow-lg">
              <BookOpen className="w-10 h-10 text-muted-foreground" />
            </div>
            <p className="text-lg text-muted-foreground">{t("noPosts")}</p>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {posts.map((post, index) => (
                <div
                  key={post.slug}
                  className="animate-in fade-in-0 slide-in-from-bottom-4"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animationFillMode: "backwards",
                  }}
                >
                  <BlogCard key={post.slug} post={post} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
