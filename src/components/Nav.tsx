import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/product", label: "Product" },
  { to: "/blog", label: "Blog" },
];

export function Nav({ dark = false }: { dark?: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <header className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-6xl`}>
      <nav className={`flex items-center justify-between rounded-full border px-5 py-3 backdrop-blur-xl ${dark ? "bg-white/10 border-white/15 text-white" : "bg-white/70 border-black/5 text-foreground shadow-card"}`}>
        <Link to="/" className="flex items-center gap-2 font-bold tracking-tight text-lg">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-blue-gradient text-white">G</span>
          <span>giestar<span className="text-primary">.</span></span>
        </Link>
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link key={l.to} to={l.to} activeOptions={{ exact: l.to === "/" }} className="px-4 py-2 text-sm font-medium rounded-full hover:bg-black/5 [&.active]:bg-black/10">
              {l.label}
            </Link>
          ))}
        </div>
        <a href="#contact" className="hidden md:inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold hover:bg-primary/90 transition">
          Talk to us <span aria-hidden>↗</span>
        </a>
        <button onClick={() => setOpen((v) => !v)} className="md:hidden grid h-9 w-9 place-items-center rounded-full bg-black/5" aria-label="Menu">
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </nav>
      {open && (
        <div className={`md:hidden mt-2 rounded-3xl border p-3 backdrop-blur-xl ${dark ? "bg-white/10 border-white/15 text-white" : "bg-white/90 border-black/5 shadow-card"}`}>
          {links.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="block px-4 py-3 rounded-2xl hover:bg-black/5 font-medium">
              {l.label}
            </Link>
          ))}
          <a href="#contact" onClick={() => setOpen(false)} className="mt-1 block text-center rounded-2xl bg-primary text-primary-foreground px-4 py-3 font-semibold">Talk to us</a>
        </div>
      )}
    </header>
  );
}
