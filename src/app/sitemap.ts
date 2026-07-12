import type { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const domain = "https://giestar.web.id";

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  // Fetch all published blogs for dynamic paths
  const { data: blogs } = await supabase
    .from("blogs")
    .select("slug, created_at")
    .eq("published", true);

  const blogUrls = (blogs ?? []).map((b) => ({
    url: `${domain}/blog/${b.slug}`,
    lastModified: b.created_at ? new Date(b.created_at) : new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  // Static pages
  const staticUrls = [
    {
      url: domain,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${domain}/produk`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
    {
      url: `${domain}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.7,
    },
  ];

  return [...staticUrls, ...blogUrls];
}
