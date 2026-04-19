import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/ghost-app',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
