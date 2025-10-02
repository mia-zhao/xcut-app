import { MDXComponents } from "mdx/types";
import Image from "next/image";

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const mdxComponents: MDXComponents = {
  h2: ({ children }) => {
    const slug = generateSlug(children?.toString() || "");
    return (
      <h2
        id={slug}
        className="text-left text-2xl md:text-3xl font-bold text-foreground mb-4 mt-12 leading-tight scroll-mt-24"
      >
        {children}
      </h2>
    );
  },
  h3: ({ children }) => {
    const slug = generateSlug(children?.toString() || "");
    return (
      <h3
        id={slug}
        className="text-xl md:text-2xl font-semibold text-foreground mb-3 mt-8 scroll-mt-24"
      >
        {children}
      </h3>
    );
  },
  h4: ({ children }) => {
    const slug = generateSlug(children?.toString() || "");
    return (
      <h4
        id={slug}
        className="text-lg md:text-xl font-semibold text-foreground mb-3 mt-6 scroll-mt-24"
      >
        {children}
      </h4>
    );
  },
  p: ({ children }) => (
    <div className="text-foreground/90 mb-5 leading-relaxed text-base md:text-lg">
      {children}
    </div>
  ),
  ul: ({ children }) => (
    <ul className="list-disc mb-5 ml-6 space-y-2 text-base md:text-lg marker:text-primary">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal mb-5 ml-6 space-y-2 text-base md:text-lg marker:text-primary marker:font-semibold">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="text-foreground/90 leading-relaxed pl-1">{children}</li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-primary/40 pl-6 py-2 my-6 italic text-muted-foreground bg-muted/30 rounded-r-lg">
      {children}
    </blockquote>
  ),
  code: ({ children }) => (
    <code className="text-sm bg-muted/80 px-2 py-1 rounded font-mono text-primary border border-border/50">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="bg-muted/50 p-6 rounded-xl overflow-x-auto mb-6 border border-border/50 shadow-sm">
      {children}
    </pre>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-primary hover:text-primary/80 underline underline-offset-4 decoration-primary/30 hover:decoration-primary/60 transition-colors"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  ),
  img: ({ src, alt, title, ...props }) => {
    // Determine size based on title attribute
    // Usage: ![alt](image.png "small") or ![alt](image.png "large")
    const sizeClasses = {
      small: "max-w-md",
      medium: "max-w-2xl", // default
      large: "max-w-4xl",
      full: "max-w-full",
    };

    const size = (title?.toLowerCase() as keyof typeof sizeClasses) || "medium";
    const maxWidth = sizeClasses[size] || sizeClasses.medium;

    const dimensions = {
      small: {
        width: 600,
        height: 400,
        sizes: "(max-width: 768px) 100vw, 448px",
      },
      medium: {
        width: 800,
        height: 600,
        sizes: "(max-width: 768px) 100vw, 672px",
      },
      large: {
        width: 1200,
        height: 800,
        sizes: "(max-width: 768px) 100vw, 896px",
      },
      full: { width: 1400, height: 900, sizes: "100vw" },
    };

    const { width, height, sizes } = dimensions[size] || dimensions.medium;

    return (
      <figure className={`my-8 ${maxWidth} mx-auto`}>
        <div className="relative rounded-xl overflow-hidden shadow-lg border border-border/20">
          <Image
            src={src || ""}
            alt={alt || ""}
            width={width}
            height={height}
            className="w-full h-auto"
            sizes={sizes}
            {...props}
          />
        </div>
        {alt && (
          <figcaption className="text-center text-sm text-muted-foreground mt-3">
            {alt}
          </figcaption>
        )}
      </figure>
    );
  },
  strong: ({ children }) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="italic text-foreground/90">{children}</em>
  ),
  hr: () => <hr className="my-12 border-border/50" />,
  table: ({ children }) => (
    <div className="overflow-x-auto my-8">
      <table className="w-full border-collapse text-base">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-muted/50">{children}</thead>,
  tbody: ({ children }) => <tbody>{children}</tbody>,
  tr: ({ children }) => (
    <tr className="hover:bg-muted/30 transition-colors">{children}</tr>
  ),
  th: ({ children }) => (
    <th className="bg-muted/80 px-6 py-3 text-left font-semibold border border-border text-foreground">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-6 py-3 border border-border">{children}</td>
  ),
};
