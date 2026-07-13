import { supabase } from "@/lib/supabase";
import BlogListClient from "./BlogListClient";

// ISR: daftar artikel dirender di server (konten ada di HTML → SEO) dan diperbarui
// otomatis maksimal tiap 60 detik setelah Anda menamb/mengedit lewat dashboard.
export const revalidate = 60;

export default async function BlogListPage() {
  const { data: blogs } = await supabase
    .from("blogs")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  return <BlogListClient blogs={blogs ?? []} />;
}
