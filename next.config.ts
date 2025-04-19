import env from "./lib/utils/env";

type NextOutput = "standalone" | "export" | undefined;

// This accesses the type-safe `env` constant
// on program startup, making the app refuse to start
// if the env configurations are incorrect.
if (!env) {
  throw new Error("Environment configurations are invalid or missing.");
}

const nextConfig = {
  output: "standalone" as NextOutput,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "http" as const,
        hostname: "localhost",
      },
      {
        protocol: "https" as const,
        hostname: "storage.googleapis.com",
      },
      {
        protocol: "https" as const,
        hostname: "upload.wikimedia.org",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb" as const, // large sizes allow for file uploads via actions
    },
    serverExternalPackages: ["pino", "pino-pretty"],
  },
};

export default nextConfig;
