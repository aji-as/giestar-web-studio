import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog & Wawasan Teknologi",
  description:
    "Artikel edukatif seputar teknologi web, tips optimasi desain UI/UX, dan panduan coding modern dari tim Giestar Web Studio.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog & Wawasan Teknologi — Giestar",
    description: "Artikel seputar desain, kode, dan strategi membangun website modern dari tim Giestar.",
    url: "https://giestar.web.id/blog",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
