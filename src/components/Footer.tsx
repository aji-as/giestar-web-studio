import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <div className="mx-auto max-w-7xl px-6 pt-20 pb-10">
        <div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2 text-2xl font-bold">
              <img src="/logo.png" alt="Giestar Logo" className="h-8 w-auto object-contain brightness-0 invert" />
            </div>
            <p className="mt-4 max-w-xs text-white/60">Jasa pembuatan website profesional & template premium untuk UMKM, bisnis lokal, dan kreator yang ingin tampil beda secara online.</p>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-white/40">Navigasi</div>
            <ul className="mt-4 space-y-2">
              <li><Link href="/" className="hover:text-primary-glow">Beranda</Link></li>
              <li><Link href="/produk" className="hover:text-primary-glow">Produk</Link></li>
              <li><Link href="/blog" className="hover:text-primary-glow">Blog</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-white/40">Kontak</div>
            <ul className="mt-4 space-y-2 text-white/70">
              <li>giestar.id@gmail.com</li>
              <li>+62 851-5072-7624</li>
              <li>Pemalang, Jawa Tengah</li>
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-white/40">Sosial</div>
            <ul className="mt-4 space-y-2 text-white/70">
              <li><a href="https://www.instagram.com/giestar_id" target="_blank" rel="noreferrer" className="hover:text-primary-glow">Instagram</a></li>
              <li><a href="https://wa.me/6285150727624" target="_blank" rel="noreferrer" className="hover:text-primary-glow">WhatsApp</a></li>
              <li><a href="https://www.facebook.com/Giestar.id" target="_blank" rel="noreferrer" className="hover:text-primary-glow">Facebook</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-white/40">
          <span>© 2026 Giestar. Semua hak dilindungi.</span>
          <span>Dibuat dengan ♥ dari Pemalang, Jawa Tengah.</span>
        </div>
        <div className="pointer-events-none select-none">
          <div className="mt-4 text-center font-serif italic text-[22vw] leading-none tracking-tighter text-white/[0.04]">giestar</div>
        </div>
      </div>
    </footer>
  );
}
