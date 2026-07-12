import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { Search, X, ArrowUpRight, ArrowRight, ShoppingBag, FileCode2 } from "lucide-react";
import { Nav } from "@/components/Nav";
import { HeroWave } from "@/components/HeroWave";
import { Footer } from "@/components/Footer";
import { PRODUCTS, CATEGORIES, formatIDR, waLink, type Product } from "@/lib/data";
import { useHydrated } from "@/hooks/useHydrated";

export const Route = createFileRoute("/product")({
  component: ProductPage,
  head: () => ({
    meta: [
      { title: "Product — Giestar" },
      { name: "description", content: "Katalog template premium Giestar. Cari, filter, dan pilih template terbaik untuk brand Anda." },
      { property: "og:title", content: "Product — Giestar" },
      { property: "og:description", content: "Katalog template premium Giestar." },
    ],
  }),
});

function ProductPage() {
  const hydrated = useHydrated();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("All");
  const [selected, setSelected] = useState<Product | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchCat = cat === "All" || p.category === cat;
      const matchQ = q.trim() === "" || `${p.name} ${p.description} ${p.tags.join(" ")}`.toLowerCase().includes(q.toLowerCase());
      return matchCat && matchQ;
    });
  }, [q, cat]);

  useEffect(() => {
    if (!hydrated) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-load]", { y: 40, opacity: 0, duration: 0.9, stagger: 0.08, ease: "power3.out" });
    }, rootRef);
    return () => ctx.revert();
  }, [hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    gsap.fromTo(".prod-card", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.04, ease: "power2.out" });
  }, [filtered, hydrated]);

  return (
    <div ref={rootRef} className="min-h-screen bg-background">
      <Nav />

      <HeroWave>
        <div className="mx-auto max-w-7xl px-6 pt-32 pb-20">
          <div data-load className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-yellow-400 animate-pulse" /> Katalog Produk
          </div>
          <h1 data-load className="mt-5 text-5xl md:text-7xl font-bold tracking-tight text-balance max-w-4xl leading-[0.95]">
            Template <span className="font-serif italic text-yellow-300">premium</span>, untuk bisnis & UMKM Anda.
          </h1>
          <p data-load className="mt-5 text-white/70 max-w-xl">Pilih template sesuai kategori atau cari berdasarkan nama. Klik kartu untuk melihat detail dan harga.</p>

          <div data-load className="mt-10 flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Cari template..."
                className="w-full rounded-full bg-white/10 border border-white/20 pl-11 pr-4 py-3.5 outline-none focus:border-white text-white placeholder:text-white/50 backdrop-blur"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`rounded-full px-4 py-2 text-sm font-medium border transition ${cat === c ? "bg-white text-ink border-white" : "border-white/20 text-white/80 hover:bg-white/10"}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      </HeroWave>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="text-sm text-muted-foreground mb-6">{filtered.length} template ditemukan</div>
        {filtered.length === 0 ? (
          <div className="rounded-3xl border p-16 text-center">
            <div className="text-2xl font-bold">Tidak ada yang cocok</div>
            <p className="mt-2 text-muted-foreground">Coba kata kunci atau kategori lain.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p, i) => {
              const blue = i % 3 === 1;
              return (
                <article
                  key={p.id}
                  className="prod-card group relative aspect-square rounded-3xl overflow-hidden cursor-pointer shadow-card hover:shadow-elegant transition"
                  onClick={() => setSelected(p)}
                >
                  <img src={p.image} alt={p.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                  
                  {/* Default State */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-between">
                    <div className="flex items-start justify-between relative z-10">
                      <span className="rounded-full bg-black/40 backdrop-blur text-white text-[11px] uppercase tracking-widest px-4 py-2">{p.category}</span>
                      <span className="text-xs font-semibold text-white uppercase tracking-widest drop-shadow-md">2026</span>
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-8 pt-20 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex flex-col justify-end translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                     <div className="flex items-center justify-between text-white">
                       <span className="text-2xl font-bold text-yellow-300">{formatIDR(p.priceJadi)}</span>
                     </div>
                     <p className="mt-2 text-sm text-white/80 line-clamp-2">{p.description}</p>
                     <div className="mt-4 flex flex-wrap gap-2">
                       {p.tags.slice(0, 3).map((t) => (
                         <span key={t} className="text-[11px] rounded-full px-3 py-1 bg-white/20 text-white backdrop-blur">{t}</span>
                       ))}
                     </div>
                  </div>

                  {/* Floating Action Button */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white text-ink rounded-full flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-500 shadow-xl pointer-events-none z-10">
                     <ArrowUpRight className="h-8 w-8" />
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {selected && <ProductModal product={selected} onClose={() => setSelected(null)} />}
      <Footer />
    </div>
  );
}

function ProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25 });
    gsap.fromTo(cardRef.current,
      { y: 60, opacity: 0, scale: 0.92, rotateX: 4 },
      { y: 0, opacity: 1, scale: 1, rotateX: 0, duration: 0.5, ease: "back.out(1.4)" }
    );
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div ref={backdropRef} onClick={onClose} className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-end sm:items-center justify-center p-3 sm:p-6">
      <div
        ref={cardRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-2xl sm:rounded-3xl bg-card border border-border/60 shadow-elegant overflow-hidden"
        style={{ perspective: "800px" }}
      >
        {/* Compact header strip */}
        <div className="h-36 sm:h-44 relative overflow-hidden flex-shrink-0">
          <img src={product.image} alt={product.name} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 grid h-8 w-8 place-items-center rounded-full bg-black/30 backdrop-blur text-white hover:bg-black/50 transition z-10"
          >
            <X className="h-3.5 w-3.5" />
          </button>
          <div className="absolute inset-0 flex flex-col justify-end p-5 text-white pointer-events-none">
            <div className="text-[10px] uppercase tracking-[0.2em] text-white/70 font-semibold">{product.category}</div>
            <div className="mt-1 font-serif italic text-3xl leading-tight">{product.name}</div>
          </div>
        </div>

        {/* Body */}
        <div className="p-5">
          <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>

          {/* Tags */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {product.tags.map((t) => (
              <span key={t} className="text-[10px] rounded-full bg-secondary px-2.5 py-0.5 font-medium">{t}</span>
            ))}
          </div>

          {/* Prices inline */}
          <div className="mt-4 flex gap-3">
            <div className="flex-1 rounded-xl bg-muted/50 px-4 py-3">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Produk Jadi</div>
              <div className="mt-1 text-lg font-bold text-amber-500">{formatIDR(product.priceJadi)}</div>
            </div>
            <div className="flex-1 rounded-xl bg-muted/50 px-4 py-3">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Source Code</div>
              <div className="mt-1 text-lg font-bold text-amber-500">{formatIDR(product.priceSource)}</div>
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-4 grid grid-cols-2 gap-2">
            <a
              href={waLink(`Halo Giestar, saya ingin BELI PRODUK JADI: ${product.name}`)}
              target="_blank" rel="noreferrer"
              className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary text-primary-foreground px-4 py-2.5 text-sm font-semibold hover:bg-primary/90 transition"
            >
              <ShoppingBag className="h-3.5 w-3.5" /> Beli Jadi
            </a>
            <a
              href={waLink(`Halo Giestar, saya ingin BELI SOURCE CODE: ${product.name}`)}
              target="_blank" rel="noreferrer"
              className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-ink text-white px-4 py-2.5 text-sm font-semibold hover:opacity-90 transition"
            >
              <FileCode2 className="h-3.5 w-3.5" /> Source Code
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
