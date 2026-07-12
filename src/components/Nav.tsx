"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Beranda" },
  { to: "/produk", label: "Produk" },
  { to: "/blog", label: "Blog" },
];

// `dark` prop dipertahankan agar pemanggilan lama (<Nav dark />) tetap kompatibel,
// namun tampilan sengaja dibuat SAMA di semua halaman: satu pill putih solid dengan
// teks gelap + shadow, sehingga selalu kontras baik di atas hero gelap maupun section terang.
export function Nav({ dark = false }: { dark?: boolean }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-6xl`}>
      <nav className="flex items-center justify-between rounded-full border border-black/10 bg-white/95 px-5 py-3 text-foreground shadow-card backdrop-blur-xl supports-[backdrop-filter]:bg-white/85">
        <Link href="/" className="flex items-center gap-2 font-bold tracking-tight text-lg">
          <img src="/logo.png" alt="Giestar Logo" className="h-7 w-auto object-contain" />
        </Link>
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => {
            const isActive = l.to === "/" ? pathname === "/" : pathname?.startsWith(l.to);
            return (
              <Link key={l.to} href={l.to} className={`px-4 py-2 text-sm font-medium rounded-full hover:bg-black/5 ${isActive ? "bg-black/10" : ""}`}>
                {l.label}
              </Link>
            );
          })}
        </div>
        <a href="#contact" className="hidden md:inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold hover:bg-primary/90 transition">
          Hubungi Kami <span aria-hidden>↗</span>
        </a>
        <button onClick={() => setOpen((v) => !v)} className="md:hidden grid h-9 w-9 place-items-center rounded-full border border-black/10 bg-black/5 text-foreground hover:bg-black/10 transition" aria-label="Menu">
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </nav>
      {open && (
        <div className="md:hidden mt-2 rounded-3xl border border-black/10 bg-white p-3 text-foreground shadow-elegant">
          {links.map((l) => {
            const isActive = l.to === "/" ? pathname === "/" : pathname?.startsWith(l.to);
            return (
              <Link key={l.to} href={l.to} onClick={() => setOpen(false)} className={`block px-4 py-3 rounded-2xl font-medium hover:bg-black/5 ${isActive ? "bg-black/10" : ""}`}>
                {l.label}
              </Link>
            );
          })}
          <a href="#contact" onClick={() => setOpen(false)} className="mt-1 block text-center rounded-2xl bg-primary text-primary-foreground px-4 py-3 font-semibold">Hubungi Kami</a>
        </div>
      )}
    </header>
  );
}
