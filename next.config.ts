import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.suicaodex.com',
        port: '',
        pathname: '/covers/**',
        search: '',
      },
    ],
  },
};

export default nextConfig;
