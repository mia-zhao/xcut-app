import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getBlogData } from "./_actions/search";
import { BlogPost } from "@/content/blog/blog-registry";
import { Link } from "@/i18n/routing";
import SearchForm from "@/components/blog/search-form";
import CategoriesCard from "@/components/blog/categories-card";
import { getTranslations, getFormatter } from "next-intl/server";

export const runtime = "edge";

export default async function BlogPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const { locale } = await params;
  const { q, category } = await searchParams;

  const {
    posts,
    totalPosts,
    categoryCounts: filteredCounts,
    allCategories,
  } = await getBlogData({
    locale,
    query: q,
    category: category,
  });

  const { categoryCounts: totalCounts } = await getBlogData({ locale });

  const t = await getTranslations("blog");

  return (
    <main className="bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-title mb-8">
          {t("title")}
          {posts.length !== totalPosts && (
            <span className="text-lg font-normal text-muted-foreground ml-2">
              ({t("postCount", { count: posts.length, total: totalPosts })})
            </span>
          )}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Blog Posts */}
          <div className="md:col-span-2 space-y-8">
            {posts.length > 0 ? (
              posts.map((post) => <BlogPostCard post={post} key={post.slug} />)
            ) : (
              <Card className="p-6">
                <p className="text-center text-muted-foreground">
                  {t("postNotFound")}
                </p>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Search */}
            <Card>
              <CardHeader>
                <CardTitle>{t("search.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <SearchForm />
              </CardContent>
            </Card>

            {/* Categories */}
            <CategoriesCard
              categories={allCategories}
              totalCounts={totalCounts}
              filteredCounts={filteredCounts}
            />

            {/* Recent Posts */}
            <RecentPostsCard blogPosts={posts} />
          </div>
        </div>
      </div>
    </main>
  );
}

const BlogPostCard = async ({ post }: { post: BlogPost }) => {
  const t = await getTranslations("blog");
  const format = await getFormatter();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-body">{post.excerpt}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          {t("dateAndAuthor", {
            date: format.dateTime(new Date(post.date), {
              year: "numeric",
              month: "short",
              day: "numeric",
            }),
            author: post.author,
          })}
        </div>
        <Link href={`/blog/${post.slug}`} className="post-link">
          {t("readMore")}
        </Link>
      </CardFooter>
    </Card>
  );
};

const RecentPostsCard = async ({
  blogPosts,
}: {
  blogPosts: Array<BlogPost>;
}) => {
  const t = await getTranslations("blog.recentPosts");

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
      </CardHeader>
      <CardContent>
        {blogPosts.length === 0 ? (
          <p>{t("noRecentPosts")}</p>
        ) : (
          <ul className="space-y-2">
            {blogPosts.slice(0, 5).map((post) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="post-link">
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};
