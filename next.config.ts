import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,

  outputFileTracingIncludes: {
    "/api/auth/register": ["./app/generated/prisma/**/*"],
    "/api/auth/login": ["./app/generated/prisma/**/*"],
    "/api/auth/me": ["./app/generated/prisma/**/*"],
    "/api/auth/logout": ["./app/generated/prisma/**/*"],
    "/api/*": ["./app/generated/prisma/**/*"],
  },

  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
