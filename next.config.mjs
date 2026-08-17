/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // @react-pdf/renderer uses Node.js-only APIs and is only imported by API routes.
  experimental: {
    serverComponentsExternalPackages: ["@react-pdf/renderer", "canvas"],
  },

  // Allow PDF downloads from /public/reports
  async headers() {
    return [
      {
        source: "/reports/:path*",
        headers: [
          { key: "Content-Type", value: "application/pdf" },
          { key: "Cache-Control", value: "no-store" },
        ],
      },
    ];
  },
};

export default nextConfig;
