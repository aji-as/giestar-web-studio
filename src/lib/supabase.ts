import { createClient } from "@supabase/supabase-js";
import { createBrowserClient as createBrowserClientSSR } from "@supabase/ssr";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Standard client for hooks and client components
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// SSR-aware browser client (for auth in client components)
export function createBrowserClient() {
  return createBrowserClientSSR(SUPABASE_URL, SUPABASE_ANON_KEY);
}

// ─── Types ────────────────────────────────────────────────────────────────────

export type ProductRow = {
  id: string;
  name: string;
  category: string;
  price_jadi: number;
  price_source: number;
  description: string;
  image: string;
  demo_url: string;
  source_code_url: string;
  tags: string[];
  gradient: string;
  featured: boolean;
  status: "active" | "draft";
  created_at: string;
};

export type BlogRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  read_time: string;
  image?: string;
  gradient: string;
  published: boolean;
  created_at: string;
};

export type CategoryRow = {
  id: string;
  name: string;
  created_at: string;
};

export const GRADIENT_OPTIONS = [
  "from-indigo-600 via-blue-500 to-cyan-400",
  "from-slate-900 via-slate-700 to-slate-500",
  "from-blue-700 via-blue-500 to-sky-300",
  "from-fuchsia-600 via-pink-500 to-rose-400",
  "from-amber-500 via-orange-400 to-red-400",
  "from-emerald-600 via-teal-500 to-cyan-400",
  "from-violet-700 via-purple-500 to-fuchsia-400",
  "from-yellow-500 via-orange-500 to-pink-500",
  "from-blue-800 via-indigo-600 to-blue-400",
  "from-rose-500 via-pink-500 to-fuchsia-500",
  "from-emerald-500 via-teal-500 to-cyan-500",
  "from-teal-500 via-cyan-500 to-blue-500",
] as const;

export const PRODUCT_CATEGORIES = [
  "Landing",
  "Portfolio",
  "E-Commerce",
  "SaaS",
  "Blog",
  "Agency",
] as const;

export const BLOG_CATEGORIES = ["UI/UX", "Development", "Design"] as const;

export const formatIDR = (n: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n);

export const WA_NUMBER = "6285150727624";
export const waLink = (msg: string) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
