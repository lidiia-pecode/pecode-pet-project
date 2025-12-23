import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      // {
      //   protocol: 'https',
      //   hostname: 'images.pexels.com',
      //   pathname: '/**',
      // },
      // {
      //   protocol: 'https',
      //   hostname: 'i.imgur.com',
      //   pathname: '/**',
      // },
    ],
  },
};

export default nextConfig;
