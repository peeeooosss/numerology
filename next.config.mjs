/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // @react-pdf/renderer uses Node.js-only APIs and is only imported by API routes.
  experimental: {
    serverComponentsExternalPackages: ["@react-pdf/renderer", "canvas"],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
