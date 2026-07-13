import { supabase } from "@/lib/supabase";
import ProductPageClient from "./ProductPageClient";

// ISR: katalog produk + kategori dirender di server (konten ada di HTML → SEO) dan
// diperbarui otomatis maksimal tiap 60 detik. Pencarian & filter tetap berjalan di
// sisi client secara real-time tanpa mengorbankan render awal.
export const revalidate = 60;

export default async function ProductPage() {
  const [{ data: products }, { data: categories }] = await Promise.all([
    supabase
      .from("products")
      .select("*")
      .eq("status", "active")
      .order("created_at", { ascending: false }),
    supabase
      .from("categories")
      .select("*")
      .order("name", { ascending: true }),
  ]);

  return (
    <ProductPageClient
      initialProducts={products ?? []}
      initialCategories={categories ?? []}
    />
  );
}
