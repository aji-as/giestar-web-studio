"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { LayoutDashboard, Package, BookOpen, LogOut, Menu, X, ExternalLink, Tags } from "lucide-react";
import { createBrowserClient } from "@/lib/supabase";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/products", label: "Produk", icon: Package },
  { href: "/dashboard/categories", label: "Kategori", icon: Tags },
  { href: "/dashboard/blogs", label: "Blog", icon: BookOpen },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  async function handleLogout() {
    const supabase = createBrowserClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  const Sidebar = () => (
    <aside className="flex flex-col h-full" style={{ background: "oklch(0.12 0.03 265)" }}>
      {/* Brand */}
      <div className="px-6 pt-6 pb-4 border-b border-white/8">
        <div className="flex items-center justify-between gap-3">
          <img src="/logo.png" alt="Giestar Logo" className="h-6 w-auto object-contain brightness-0 invert" />
          <span className="text-white/30 text-[9px] uppercase tracking-widest self-end">Admin</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map((item) => {
          const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "text-white bg-white/12"
                  : "text-white/50 hover:text-white/80 hover:bg-white/6"
              }`}
            >
              <item.icon className="h-4 w-4 flex-shrink-0" />
              {item.label}
              {isActive && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-yellow-400" />}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-4 border-t border-white/8 space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/50 hover:text-white/80 hover:bg-white/6 transition"
        >
          <ExternalLink className="h-4 w-4" />
          Lihat Website
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/50 hover:text-red-400 hover:bg-red-500/10 transition"
        >
          <LogOut className="h-4 w-4" />
          Keluar
        </button>
      </div>
    </aside>
  );

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Desktop sidebar */}
      <div className="hidden md:block w-56 flex-shrink-0 h-full">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="w-56 h-full"><Sidebar /></div>
          <div className="flex-1 bg-black/50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile header */}
        <div className="md:hidden flex items-center justify-between px-4 py-3 border-b bg-background">
          <button onClick={() => setSidebarOpen(true)} className="grid h-8 w-8 place-items-center rounded-lg hover:bg-secondary">
            <Menu className="h-4 w-4" />
          </button>
          <img src="/logo.png" alt="Giestar Logo" className="h-5 w-auto object-contain" />
          <div className="w-8" />
        </div>

        <main className="flex-1 overflow-y-auto bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}
