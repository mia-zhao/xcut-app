import NextMdx from "@next/mdx";
import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const withMDX = NextMdx({
  extension: /\.mdx?$/,
  options: {
    webpack(config) {
      config.module.rules.push({
        test: /\.mdx$/,
        use: "raw-loader",
      });
      return config;
    },
  },
});

const nextConfig = withNextIntl(
  withMDX({
    pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  })
);

if (process.env.NODE_ENV === "development") {
  await setupDevPlatform();
}

export default nextConfig;
