import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <div className="mx-auto max-w-7xl px-6 pt-20 pb-10">
        <div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2 text-2xl font-bold">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-blue-gradient">G</span>
              giestar<span className="text-primary-glow">.</span>
            </div>
            <p className="mt-4 max-w-xs text-white/60">Agency jasa pembuatan website & marketplace template premium untuk brand, startup, dan kreator.</p>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-white/40">Sitemap</div>
            <ul className="mt-4 space-y-2">
              <li><Link to="/" className="hover:text-primary-glow">Home</Link></li>
              <li><Link to="/product" className="hover:text-primary-glow">Product</Link></li>
              <li><Link to="/blog" className="hover:text-primary-glow">Blog</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-white/40">Contact</div>
            <ul className="mt-4 space-y-2 text-white/70">
              <li>hello@giestar.id</li>
              <li>+62 812-3456-7890</li>
              <li>Jakarta, Indonesia</li>
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-white/40">Social</div>
            <ul className="mt-4 space-y-2 text-white/70">
              <li>Instagram</li>
              <li>Dribbble</li>
              <li>Behance</li>
            </ul>
          </div>
        </div>
        <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-white/40">
          <span>© 2026 giestar. All rights reserved.</span>
          <span>Crafted with care in Jakarta.</span>
        </div>
        <div className="pointer-events-none select-none">
          <div className="mt-4 text-center font-serif italic text-[22vw] leading-none tracking-tighter text-white/[0.04]">giestar</div>
        </div>
      </div>
    </footer>
  );
}
