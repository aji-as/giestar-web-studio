
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const domain = "https://giestar.web.id";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard", "/dashboard/*", "/login"],
      },
    ],
    sitemap: `${domain}/sitemap.xml`,
  };
}
