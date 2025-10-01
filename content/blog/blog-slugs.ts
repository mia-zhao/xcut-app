export const BLOG_SLUGS = ["beta-release"] as const;

export type BlogSlug = (typeof BLOG_SLUGS)[number];
