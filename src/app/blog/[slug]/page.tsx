import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import BlogDetailClient from "./BlogDetailClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { data: blog } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!blog) {
    return { title: "Artikel Tidak Ditemukan" };
  }

  const title = `${blog.title} — Blog Giestar`;
  const desc = blog.excerpt;
  const url = `https://giestar.web.id/blog/${slug}`;
  const imageUrl = blog.image || "https://giestar.web.id/logo.png";

  return {
    title,
    description: desc,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title,
      description: desc,
      url,
      type: "article",
      publishedTime: blog.created_at,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: desc,
      images: [imageUrl],
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  const { data: blog } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!blog) notFound();

  const { data: related } = await supabase
    .from("blogs")
    .select("*")
    .eq("published", true)
    .neq("slug", slug)
    .limit(3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://giestar.web.id/blog/${slug}`
    },
    "headline": blog.title,
    "description": blog.excerpt,
    "image": blog.image || "https://giestar.web.id/logo.png",
    "datePublished": blog.created_at,
    "dateModified": blog.created_at,
    "author": {
      "@type": "Organization",
      "name": "Giestar Web Studio",
      "url": "https://giestar.web.id"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Giestar Web Studio",
      "logo": {
        "@type": "ImageObject",
        "url": "https://giestar.web.id/logo.png"
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogDetailClient blog={blog} related={related ?? []} />
    </>
  );
}
