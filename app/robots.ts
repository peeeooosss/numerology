import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
        disallow: ["/admin", "/login", "/dashboard", "/api", "/reports"],
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/login",
          "/dashboard",
          "/api",
          "/reports",
        ],
      },
    ],
    sitemap: "https://magicofnumbers.in/sitemap.xml",
  };
}
