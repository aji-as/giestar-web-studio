import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Katalog Template Website Modern & Premium",
  description:
    "Pilihan template website modern siap pakai. Temukan desain landing page, e-commerce, portofolio, dan SaaS terjangkau untuk bisnis Anda.",
  alternates: {
    canonical: "/produk",
  },
  openGraph: {
    title: "Katalog Template Website Premium — Giestar",
    description: "Cari, filter, dan pilih template website terbaik dengan desain modern dan harga terjangkau.",
    url: "https://giestar.web.id/produk",
  },
};

export default function ProdukLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
