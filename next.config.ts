import type { NextConfig } from "next";

module.exports = {
  images: {
    remotePatterns: [
      {
         hostname: '**',
      }
    ],
  },
}

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
