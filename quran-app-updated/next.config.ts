import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/hadits/**/*": ["./src/data/hadits/**/*.json"],
  },
};

export default nextConfig;
