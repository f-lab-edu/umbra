import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [{ hostname: 'image.tmdb.org' }],
    unoptimized: true,
  },
  assetPrefix: '..',
  trailingSlash: true,
};

export default nextConfig;
