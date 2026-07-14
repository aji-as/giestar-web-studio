"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Search, X, ArrowUpRight, ShoppingBag, FileCode2, ExternalLink, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Nav } from "@/components/Nav";
import { HeroWave } from "@/components/HeroWave";
import { Footer } from "@/components/Footer";
import { formatIDR, waLink, type ProductRow, type CategoryRow } from "@/lib/supabase";
import { useHydrated } from "@/hooks/useHydrated";

export default function ProductPageClient({
  initialProducts,
  initialCategories,
}: {
  initialProducts: ProductRow[];
  initialCategories: CategoryRow[];
}) {
  const hydrated = useHydrated();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("All");
  const [sort, setSort] = useState<"default" | "price-asc" | "price-desc">("default");
  const [selected, setSelected] = useState<ProductRow | null>(null);
  const [page, setPage] = useState(1);
  const rootRef = useRef<HTMLDivElement>(null);

  const PAGE_SIZE = 9;

  const categories = useMemo(() => {
    return ["All", ...initialCategories.map((c) => c.name)];
  }, [initialCategories]);

  // Pencarian & filter dilakukan langsung di memori dari data yang sudah dimuat server.
  // Instan, tanpa round-trip ke Supabase pada tiap ketikan. Pencarian utamanya berdasarkan
  // nama template (juga mencakup kategori, deskripsi, dan tag). Query multi-kata → semua
  // kata harus cocok (AND).
  const filteredProducts = useMemo(() => {
    const tokens = q.trim().toLowerCase().split(/\s+/).filter(Boolean);
    return initialProducts.filter((p) => {
      if (cat !== "All" && p.category !== cat) return false;
      if (tokens.length === 0) return true;
      const haystack = `${p.name} ${p.category} ${p.description} ${p.tags.join(" ")}`.toLowerCase();
      return tokens.every((t) => haystack.includes(t));
    });
  }, [initialProducts, q, cat]);

  // Urutkan hasil filter berdasarkan harga (price_jadi). useMemo terpisah agar
  // pengurutan tidak memicu filter dihitung ulang, dan sebaliknya. Semua di memori.
  const sortedProducts = useMemo(() => {
    if (sort === "default") return filteredProducts;
    const arr = [...filteredProducts];
    arr.sort((a, b) =>
      sort === "price-asc" ? a.price_jadi - b.price_jadi : b.price_jadi - a.price_jadi,
    );
    return arr;
  }, [filteredProducts, sort]);

  // Reset ke halaman pertama tiap kali pencarian, kategori, atau urutan berubah agar
  // hasil yang tampil selalu dari awal.
  useEffect(() => {
    setPage(1);
  }, [q, cat, sort]);

  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / PAGE_SIZE));
  const pagedProducts = useMemo(
    () => sortedProducts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [sortedProducts, page],
  );

  useEffect(() => {
    if (!hydrated) return;
    (async () => {
      const { default: gsap } = await import("gsap");
      gsap.from("[data-load]", { y: 40, opacity: 0, duration: 0.9, stagger: 0.08, ease: "power3.out" });
    })();
  }, [hydrated]);

  // Animasikan kartu saat mount & pergantian kategori. Ketikan pencarian sengaja tidak
  // memicu ulang animasi agar hasil terasa instan dan tidak berkedip.
  useEffect(() => {
    if (!hydrated) return;
    (async () => {
      const { default: gsap } = await import("gsap");
      gsap.fromTo(".prod-card", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.04, ease: "power2.out" });
    })();
  }, [cat, page, sort, hydrated]);

  return (
    <div ref={rootRef} className="min-h-screen bg-background">
      <Nav />

      <HeroWave>
        <div className="mx-auto max-w-7xl px-6 pt-32 pb-20">
          
          <h1 data-load className="mt-5 text-5xl md:text-7xl font-bold tracking-tight text-balance max-w-4xl leading-[0.95]">
            Temukan <span className="font-serif italic text-yellow-300">website</span>,yang sesui untuk bisnismu.
          </h1>
          <p data-load className="mt-5 text-white/70 max-w-xl">Pilih template sesuai kategori atau cari berdasarkan nama. Klik kartu untuk melihat detail dan harga.</p>

          <div data-load className="mt-10 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Cari template..."
                className="w-full rounded-full bg-white/10 border border-white/20 pl-11 pr-4 py-3.5 outline-none focus:border-white text-white placeholder:text-white/50 backdrop-blur"
              />
            </div>

            <div className="relative min-w-[200px]">
              <select
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                className="w-full appearance-none rounded-full bg-white/10 border border-white/20 pl-6 pr-10 py-3.5 text-sm font-medium text-white outline-none focus:border-white transition backdrop-blur cursor-pointer"
              >
                {categories.map((c) => (
                  <option key={c} value={c} className="bg-slate-950 text-white">
                    {c === "All" ? "Semua Kategori" : c}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white/60">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>

            <div className="relative min-w-[200px]">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as typeof sort)}
                className="w-full appearance-none rounded-full bg-white/10 border border-white/20 pl-6 pr-10 py-3.5 text-sm font-medium text-white outline-none focus:border-white transition backdrop-blur cursor-pointer"
              >
                <option value="default" className="bg-slate-950 text-white">Urutkan Harga</option>
                <option value="price-asc" className="bg-slate-950 text-white">Harga Terendah</option>
                <option value="price-desc" className="bg-slate-950 text-white">Harga Tertinggi</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white/60">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </HeroWave>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="text-sm text-muted-foreground mb-6">
          {`${filteredProducts.length} template ditemukan`}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="rounded-3xl border p-16 text-center">
            <div className="text-2xl font-bold">Tidak ada yang cocok</div>
            <p className="mt-2 text-muted-foreground">Coba kata kunci atau kategori lain.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pagedProducts.map((p) => {
              return (
                <article
                  key={p.id}
                  className="prod-card group relative aspect-[16/10] rounded-3xl overflow-hidden cursor-pointer shadow-card hover:shadow-elegant transition"
                  onClick={() => setSelected(p)}
                >
                  {p.image ? (
                    <img src={p.image} alt={p.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-103" />
                  ) : (
                    <div className={`absolute inset-0 bg-gradient-to-br ${p.gradient}`} />
                  )}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />

                  {/* Default State */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-between">
                    <div className="flex items-start justify-between relative z-10">
                      <span className="rounded-full bg-black/40 backdrop-blur text-white text-[11px] uppercase tracking-widest px-4 py-2">{p.category}</span>
                      <span className="text-xs font-semibold text-white uppercase tracking-widest drop-shadow-md">{new Date(p.created_at).getFullYear()}</span>
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-6 pt-16 bg-gradient-to-t from-black/95 via-black/70 to-transparent flex flex-col justify-end translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                     <div className="flex items-center justify-between text-white">
                       <span className="text-xl font-bold text-yellow-300">{formatIDR(p.price_jadi)}</span>
                     </div>
                     <p className="mt-1.5 text-xs text-white/80 line-clamp-2 leading-snug">{p.description}</p>
                     <div className="mt-3 flex flex-wrap gap-1.5">
                       {p.tags.slice(0, 3).map((t) => (
                         <span key={t} className="text-[10px] rounded-full px-2.5 py-0.5 bg-white/20 text-white backdrop-blur">{t}</span>
                       ))}
                     </div>
                  </div>

                  {/* Floating Action Button */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 border border-white/20 backdrop-blur-md text-white rounded-full flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-500 shadow-xl pointer-events-none z-10">
                     <ArrowUpRight className="h-5 w-5" />
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {filteredProducts.length > 0 && totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="grid h-10 w-10 place-items-center rounded-full border transition hover:bg-secondary disabled:opacity-40 disabled:pointer-events-none"
              aria-label="Halaman sebelumnya"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {Array.from({ length: totalPages }).map((_, i) => {
              const n = i + 1;
              return (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className={`grid h-10 w-10 place-items-center rounded-full border text-sm font-semibold transition ${
                    n === page ? "bg-ink text-white border-transparent" : "hover:bg-secondary"
                  }`}
                >
                  {n}
                </button>
              );
            })}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="grid h-10 w-10 place-items-center rounded-full border transition hover:bg-secondary disabled:opacity-40 disabled:pointer-events-none"
              aria-label="Halaman berikutnya"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </section>

      {selected && <ProductModal product={selected} onClose={() => setSelected(null)} />}
      <Footer />
    </div>
  );
}

function ProductModal({ product, onClose }: { product: ProductRow; onClose: () => void }) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      const { default: gsap } = await import("gsap");
      gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25 });
      gsap.fromTo(cardRef.current,
        { y: 60, opacity: 0, scale: 0.92, rotateX: 4 },
        { y: 0, opacity: 1, scale: 1, rotateX: 0, duration: 0.5, ease: "back.out(1.4)" }
      );
    })();
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
        <div className="h-40 sm:h-48 relative overflow-hidden flex-shrink-0">
          {product.image ? (
            <img src={product.image} alt={product.name} className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient}`} />
          )}
          <div className="absolute inset-0 bg-black/40" />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 grid h-8 w-8 place-items-center rounded-full bg-black/30 backdrop-blur text-white hover:bg-black/50 transition z-10"
          >
            <X className="h-3.5 w-3.5" />
          </button>
          <div className="absolute inset-0 flex flex-col justify-end p-4 text-white pointer-events-none">
            <div className="text-[10px] uppercase tracking-[0.2em] text-white/70 font-semibold">{product.category}</div>
            <div className="mt-0.5 font-serif italic text-2xl leading-tight">{product.name}</div>
          </div>
        </div>

        {/* Body */}
        <div className="px-4 py-3">
          <p className="text-sm text-muted-foreground leading-snug line-clamp-2">{product.description}</p>

          {/* Tags */}
          <div className="mt-2 flex flex-wrap gap-1.5">
            {product.tags.map((t) => (
              <span key={t} className="text-[10px] rounded-full bg-secondary px-2.5 py-0.5 font-medium">{t}</span>
            ))}
          </div>

          {/* Demo Link */}
          {product.demo_url && (
            <div className="mt-2">
              <a href={product.demo_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
                <ExternalLink className="h-4 w-4" /> Lihat Demo Website
              </a>
            </div>
          )}

          {/* Prices inline */}
          <div className="mt-2.5 flex gap-3">
            <div className="flex-1 rounded-xl bg-muted/50 px-4 py-1.5">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Produk Jadi</div>
              <div className="text-lg font-bold text-amber-500">{formatIDR(product.price_jadi)}</div>
            </div>
            <div className="flex-1 rounded-xl bg-muted/50 px-4 py-1.5">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Source Code</div>
              <div className="text-lg font-bold text-amber-500">{formatIDR(product.price_source)}</div>
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-2.5 grid grid-cols-2 gap-2">
            <a
              href={waLink(`Halo Giestar, saya ingin BELI PRODUK JADI: ${product.name}`)}
              target="_blank" rel="noreferrer"
              className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold hover:bg-primary/90 transition"
            >
              <ShoppingBag className="h-3.5 w-3.5" /> Beli Jadi
            </a>
            <a
              href={waLink(`Halo Giestar, saya ingin BELI SOURCE CODE: ${product.name}`)}
              target="_blank" rel="noreferrer"
              className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-ink text-white px-4 py-2 text-sm font-semibold hover:opacity-90 transition"
            >
              <FileCode2 className="h-3.5 w-3.5" /> Source Code
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
