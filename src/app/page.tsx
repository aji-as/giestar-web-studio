import { supabase } from "@/lib/supabase";
import HomeClient from "./HomeClient";

// ISR: halaman di-render statis di server dan diperbarui otomatis maksimal tiap 60 detik.
// Pengunjung dapat konten (produk unggulan) langsung dari HTML → cepat & baik untuk SEO,
// tanpa membebani kuota fungsi Vercel maupun request Supabase per kunjungan.
export const revalidate = 60;

export default async function Home() {
  const { data: featuredProducts } = await supabase
    .from("products")
    .select("*")
    .eq("status", "active")
    .order("created_at", { ascending: false })
    .limit(6);

  return <HomeClient featuredProducts={featuredProducts ?? []} />;
}
