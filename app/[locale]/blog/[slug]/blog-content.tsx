"use client";

import { useEffect, useState } from "react";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";
import { mdxComponents } from "./mdx-components";

export default function BlogContent({ content }: { content: string }) {
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(
    null
  );

  useEffect(() => {
    const prepareMDX = async () => {
      if (content) {
        try {
          const mdxSource = await serialize(content);
          setMdxSource(mdxSource);
        } catch (error) {
          console.error("Error serializing MDX content:", error);
        }
      }
    };

    prepareMDX();
  }, [content]);

  if (!mdxSource) {
    return <div className="animate-pulse h-96 bg-muted/20 rounded-md"></div>;
  }

  return <MDXRemote {...mdxSource} components={mdxComponents} />;
}
