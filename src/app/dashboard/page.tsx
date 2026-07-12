"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Package, BookOpen, TrendingUp, Eye, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function DashboardPage() {
  const [stats, setStats] = useState({ totalProducts: 0, activeProducts: 0, totalBlogs: 0, publishedBlogs: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [{ count: tp }, { count: ap }, { count: tb }, { count: pb }] = await Promise.all([
        supabase.from("products").select("*", { count: "exact", head: true }),
        supabase.from("products").select("*", { count: "exact", head: true }).eq("status", "active"),
        supabase.from("blogs").select("*", { count: "exact", head: true }),
        supabase.from("blogs").select("*", { count: "exact", head: true }).eq("published", true),
      ]);
      setStats({ totalProducts: tp ?? 0, activeProducts: ap ?? 0, totalBlogs: tb ?? 0, publishedBlogs: pb ?? 0 });
      setLoading(false);
    }
    load();
  }, []);

  const cards = [
    { label: "Total Produk", value: stats.totalProducts, sub: `${stats.activeProducts} aktif`, icon: Package, color: "from-blue-600 to-indigo-600", href: "/dashboard/products" },
    { label: "Total Blog", value: stats.totalBlogs, sub: `${stats.publishedBlogs} dipublikasikan`, icon: BookOpen, color: "from-violet-600 to-purple-600", href: "/dashboard/blogs" },
    { label: "Produk Aktif", value: stats.activeProducts, sub: "tampil di website", icon: Eye, color: "from-emerald-600 to-teal-600", href: "/dashboard/products" },
    { label: "Blog Published", value: stats.publishedBlogs, sub: "artikel publik", icon: TrendingUp, color: "from-amber-500 to-orange-500", href: "/dashboard/blogs" },
  ];

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">Selamat datang, kelola semua konten Giestar dari sini.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((card) => (
          <Link key={card.label} href={card.href} className="group rounded-2xl border bg-card p-5 hover:shadow-elegant transition">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-3`}>
              <card.icon className="h-5 w-5 text-white" />
            </div>
            <div className="text-2xl font-bold">
              {loading ? <span className="h-7 w-10 bg-muted rounded animate-pulse block" /> : card.value}
            </div>
            <div className="text-xs text-muted-foreground mt-1">{card.label}</div>
            <div className="text-[11px] text-muted-foreground/70 mt-0.5">{card.sub}</div>
          </Link>
        ))}
      </div>

      {/* Quick links */}
      <div className="grid md:grid-cols-2 gap-4">
        <Link href="/dashboard/products" className="group flex items-center gap-4 rounded-2xl border bg-card p-6 hover:shadow-card transition">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center flex-shrink-0">
            <Package className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <div className="font-semibold">Kelola Produk</div>
            <div className="text-sm text-muted-foreground">Tambah, edit, dan hapus template produk.</div>
          </div>
          <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition" />
        </Link>
        <Link href="/dashboard/blogs" className="group flex items-center gap-4 rounded-2xl border bg-card p-6 hover:shadow-card transition">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center flex-shrink-0">
            <BookOpen className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <div className="font-semibold">Kelola Blog</div>
            <div className="text-sm text-muted-foreground">Tulis dan publikasikan artikel baru.</div>
          </div>
          <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition" />
        </Link>
      </div>
    </div>
  );
}
