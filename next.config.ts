import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    // Bytes come from cdn.sanity.io (or local public files). Skip the host image optimizer.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/projects/24-Myndir",
        destination: "/projects/24-myndir",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
