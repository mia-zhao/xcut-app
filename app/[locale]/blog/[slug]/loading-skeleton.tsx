import React from "react";
import BreadCrumb from "../breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingSkeleton() {
  return (
    <>
      <div className="my-8 ml">
        <BreadCrumb title="..." />
      </div>
      <article className="max-w-3xl mx-auto p-6 rounded-lg shadow-md">
        <div className="animate-pulse">
          <Skeleton className="mb-4 h-6 w-1/2"></Skeleton>
          <Skeleton className="mb-4 h-6 w-3/4"></Skeleton>
          <Skeleton className="mb-4 h-6 w-full"></Skeleton>
          <Skeleton className="mb-4 h-6 w-5/6"></Skeleton>
          <br />
          <Skeleton className="mb-4 h-6 w-1/2"></Skeleton>
          <Skeleton className="mb-4 h-6 w-5/6"></Skeleton>
          <Skeleton className="mb-4 h-6 w-full"></Skeleton>
          <Skeleton className="mb-4 h-6 w-3/4"></Skeleton>
          <Skeleton className="mb-4 h-6 w-6/7"></Skeleton>
        </div>
      </article>
    </>
  );
}
