import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: '/foraenquiry',
  // Allow images served from the app itself
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
