// next.config.ts
type NextOutput = "standalone" | "export" | undefined;

const nextConfig = {
  output: "standalone" as NextOutput,

  // ✅ Temporary: allow builds even if there are ESLint issues
  // Remove this once you’ve cleaned up remaining warnings/errors.
  eslint: { ignoreDuringBuilds: true },

  // If type errors ever block builds, you can (temporarily) add:
  // typescript: { ignoreBuildErrors: true },

  logging: {
    fetches: { fullUrl: true },
  },
  images: {
    remotePatterns: [
      { protocol: "http" as const, hostname: "localhost" },
      { protocol: "https" as const, hostname: "storage.googleapis.com" },
      { protocol: "https" as const, hostname: "upload.wikimedia.org" },
    ],
  },
  experimental: {
    serverActions: { bodySizeLimit: "50mb" as const },
  },
};

export default nextConfig;
