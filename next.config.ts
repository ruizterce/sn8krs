import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

/** @type {import('next').NextConfig} */
const nextConfig = (phase: string) => ({
  output: "standalone",
  assetPrefix: phase === PHASE_DEVELOPMENT_SERVER ? undefined : undefined,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.stockx.com",
        pathname: "/images/**",
      },
    ],
  },
});

export default nextConfig;
