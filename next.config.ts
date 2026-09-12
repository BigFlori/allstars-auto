import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Quote request form allows up to 7 photos (15 MB total after
      // client-side compression); leave headroom for text fields and
      // multipart overhead.
      bodySizeLimit: "18mb",
    },
  },
};

export default nextConfig;
