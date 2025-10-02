import { TableOfContentsSkeleton } from "@/components/blog/table-of-contents";

export default function Loading() {
  return (
    <main className="flex flex-col grow">
      <div className="content animate-pulse">
        {/* Back Button Skeleton */}
        <div className="mb-6">
          <div className="h-10 w-32 bg-muted/50 rounded"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content Skeleton */}
          <article className="lg:col-span-2">
            {/* Header Skeleton */}
            <header className="mb-16">
              <div className="h-12 w-3/4 bg-muted/50 rounded mb-8"></div>

              <div className="flex flex-wrap gap-3 mb-8">
                <div className="h-6 w-20 bg-muted/50 rounded-full"></div>
                <div className="h-6 w-32 bg-muted/50 rounded-full"></div>
              </div>

              <div className="h-6 w-full bg-muted/50 rounded mb-6"></div>
              <div className="h-6 w-5/6 bg-muted/50 rounded mb-6"></div>

              <div className="flex flex-wrap items-center gap-8 pb-8 border-b border-border/50">
                <div className="h-5 w-32 bg-muted/50 rounded"></div>
                <div className="h-5 w-24 bg-muted/50 rounded"></div>
              </div>
            </header>

            {/* Content Skeleton */}
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="h-5 bg-muted/50 rounded w-full"></div>
                <div className="h-5 bg-muted/50 rounded w-11/12"></div>
                <div className="h-5 bg-muted/50 rounded w-10/12"></div>
              </div>

              <div className="h-8 bg-muted/60 rounded w-2/3 mt-12"></div>

              <div className="space-y-3">
                <div className="h-5 bg-muted/50 rounded w-full"></div>
                <div className="h-5 bg-muted/50 rounded w-10/12"></div>
                <div className="h-5 bg-muted/50 rounded w-11/12"></div>
                <div className="h-5 bg-muted/50 rounded w-9/12"></div>
              </div>

              <div className="h-64 bg-muted/40 rounded-xl my-8"></div>

              <div className="h-8 bg-muted/60 rounded w-1/2 mt-12"></div>

              <div className="space-y-2 ml-6">
                <div className="h-5 bg-muted/50 rounded w-10/12"></div>
                <div className="h-5 bg-muted/50 rounded w-9/12"></div>
                <div className="h-5 bg-muted/50 rounded w-11/12"></div>
              </div>
            </div>
          </article>

          {/* Table of Contents Skeleton - Hidden on mobile */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-8">
              <TableOfContentsSkeleton />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
