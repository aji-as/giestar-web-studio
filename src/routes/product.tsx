import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { Search, X, ArrowUpRight, ShoppingBag, FileCode2 } from "lucide-react";
import { Nav } from "@/components/Nav";
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

      <section className="pt-32 pb-16 bg-hero-gradient text-white grain">
        <div className="mx-auto max-w-7xl px-6">
          <div data-load className="text-xs uppercase tracking-widest text-primary-glow">Product Catalog</div>
          <h1 data-load className="mt-3 text-5xl md:text-7xl font-bold tracking-tight text-balance max-w-4xl">
            Template <span className="font-serif italic">premium</span>, siap untuk brand Anda.
          </h1>
          <p data-load className="mt-5 text-white/70 max-w-xl">Cari berdasarkan nama, kategori, atau teknologi. Klik gambar untuk melihat detail.</p>

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
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="text-sm text-muted-foreground mb-6">{filtered.length} template ditemukan</div>
        {filtered.length === 0 ? (
          <div className="rounded-3xl border p-16 text-center">
            <div className="text-2xl font-bold">Tidak ada yang cocok</div>
            <p className="mt-2 text-muted-foreground">Coba kata kunci atau kategori lain.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <article key={p.id} className="prod-card group rounded-3xl overflow-hidden border bg-card shadow-card hover:shadow-elegant transition">
                <button onClick={() => setSelected(p)} className="block w-full text-left">
                  <div className={`aspect-[4/3] bg-gradient-to-br ${p.gradient} relative grain`}>
                    <div className="absolute top-4 left-4 rounded-full bg-black/30 backdrop-blur text-white text-xs px-3 py-1">{p.category}</div>
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                      <span className="font-serif italic text-4xl leading-none">{p.name.split(" ")[0]}</span>
                      <span className="text-sm opacity-80">2026</span>
                    </div>
                  </div>
                </button>
                <div className="p-6">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-lg font-bold">{p.name}</h3>
                    <span className="text-sm font-semibold text-primary">{formatIDR(p.priceJadi)}</span>
                  </div>
                  <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">{p.description}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span key={t} className="text-[11px] rounded-full bg-secondary px-2.5 py-1 text-secondary-foreground">{t}</span>
                    ))}
                  </div>
                  <button onClick={() => setSelected(p)} className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all">
                    Lihat Detail <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              </article>
            ))}
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
    gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    gsap.fromTo(cardRef.current, { y: 40, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" });
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div ref={backdropRef} onClick={onClose} className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm grid place-items-center p-4 overflow-y-auto">
      <div ref={cardRef} onClick={(e) => e.stopPropagation()} className="relative w-full max-w-3xl rounded-3xl bg-card border shadow-elegant overflow-hidden my-8">
        <button onClick={onClose} className="absolute top-4 right-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-black/40 backdrop-blur text-white hover:bg-black/60">
          <X className="h-4 w-4" />
        </button>
        <div className={`aspect-[16/10] bg-gradient-to-br ${product.gradient} relative grain`}>
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <div className="text-xs uppercase tracking-widest opacity-80">{product.category}</div>
            <div className="mt-2 font-serif italic text-5xl md:text-6xl">{product.name}</div>
          </div>
        </div>
        <div className="p-6 md:p-8">
          <p className="text-muted-foreground">{product.description}</p>
          <div className="mt-5 flex flex-wrap gap-1.5">
            {product.tags.map((t) => (
              <span key={t} className="text-xs rounded-full bg-secondary px-3 py-1">{t}</span>
            ))}
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="rounded-2xl border p-4">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Produk Jadi</div>
              <div className="mt-1 text-2xl font-bold">{formatIDR(product.priceJadi)}</div>
            </div>
            <div className="rounded-2xl border p-4">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Source Code</div>
              <div className="mt-1 text-2xl font-bold">{formatIDR(product.priceSource)}</div>
            </div>
          </div>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a
              href={waLink(`Halo Giestar, saya ingin BELI PRODUK JADI: ${product.name}`)}
              target="_blank" rel="noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3.5 font-semibold hover:bg-primary/90"
            >
              <ShoppingBag className="h-4 w-4" /> Beli Product
            </a>
            <a
              href={waLink(`Halo Giestar, saya ingin BELI SOURCE CODE: ${product.name}`)}
              target="_blank" rel="noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-ink text-white px-6 py-3.5 font-semibold hover:opacity-90"
            >
              <FileCode2 className="h-4 w-4" /> Beli Source Code
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
