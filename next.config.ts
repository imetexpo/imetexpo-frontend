import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '/**',
      },
    ],
    // Allow unoptimized images as fallback
    unoptimized: process.env.NODE_ENV === 'development',
  },
  // Disable strict SSL for development only
  ...(process.env.NODE_ENV === 'development' && {
    serverExternalPackages: [],
  }),
};

export default nextConfig;
