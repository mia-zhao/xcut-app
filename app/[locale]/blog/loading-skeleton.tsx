import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function LoadingSkeleton() {
  return (
    <main className="bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-title mb-8">Our Blog</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            {Array.from({ length: 2 }, (_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>

          <div className="space-y-8">
            <SkeletonCard />

            <SkeletonCard />

            <SkeletonCard />
          </div>
        </div>
      </div>
    </main>
  );
}

export function SkeletonCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-4 w-full" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Skeleton className="mb-4 h-5 w-1/4"></Skeleton>
        <Skeleton className="mb-4 h-5 w-5/6"></Skeleton>
        <Skeleton className="mb-4 h-5 w-2/3"></Skeleton>
      </CardContent>
    </Card>
  );
}
