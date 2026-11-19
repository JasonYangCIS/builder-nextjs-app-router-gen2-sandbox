import BuilderDevTools from "@builder.io/dev-tools/next";
import type { NextConfig } from "next";

const nextConfig: NextConfig = BuilderDevTools()({
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    // Allow Turbopack to follow the symlinked local @builder.io/sdk-react build.
    turbopackAdditionalRoots: {
      localBuilderSdk: {
        path: "/Users/jyang/Desktop/development/builder/packages/sdks/output/react",
      },
    },
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
});

export default nextConfig;
