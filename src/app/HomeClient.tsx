"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, MessageCircle, CreditCard, Rocket, CheckCircle2, Sparkles, MousePointerClick, FileCode2, ShoppingBag, X, ExternalLink } from "lucide-react";
import { Nav } from "@/components/Nav";
import { HeroWave } from "@/components/HeroWave";
import { Footer } from "@/components/Footer";
import { formatIDR, waLink, type ProductRow } from "@/lib/supabase";
import { useHydrated } from "@/hooks/useHydrated";

const STEPS = [
  { icon: MousePointerClick, title: "Pilih Template", desc: "Lihat-lihat koleksi template kami dan pilih yang paling cocok untuk bisnis Anda." },
  { icon: FileCode2, title: "Pilih Tipe Pembelian", desc: "Mau langsung pakai (produk jadi) atau mau dikembangkan sendiri (source code)?" },
  { icon: MessageCircle, title: "Chat via WhatsApp", desc: "Hubungi admin kami langsung. Tidak ada antrian panjang, langsung direspons." },
  { icon: Sparkles, title: "Ceritakan Kebutuhan", desc: "Ceritakan nama bisnis, warna, konten, atau kustomisasi yang Anda inginkan." },
  { icon: CreditCard, title: "Proses Pembayaran", desc: "Pembayaran mudah via transfer bank atau metode digital favorit Anda." },
  { icon: Rocket, title: "Proses Pesanan", desc: "Untuk paket jadi, kami langsung bantu setup di domain Anda. Untuk source code, file akan langsung dikirim." },
  { icon: Sparkles, title: "Selesai 2–5 Jam", desc: "Instalasi paket website jadi rata-rata selesai hanya dalam 1x24 jam saja setelah data lengkap." },
  { icon: CheckCircle2, title: "Website Siap!", desc: "Website siap digunakan untuk bisnis Anda, atau file source code sudah di tangan Anda." },
];

const ROW_GRADIENTS = [
  "bg-gradient-to-r from-slate-950 to-indigo-950",
  "bg-gradient-to-r from-indigo-950 to-blue-950",
  "bg-gradient-to-r from-blue-950 to-blue-900",
  "bg-gradient-to-r from-blue-900 to-blue-800",
  "bg-gradient-to-r from-blue-800 to-blue-600",
  "bg-gradient-to-r from-blue-600 to-blue-500",
  "bg-gradient-to-r from-blue-500 to-cyan-500",
  "bg-gradient-to-r from-cyan-500 to-cyan-400",
];

export default function HomeClient({ featuredProducts }: { featuredProducts: ProductRow[] }) {
  const hydrated = useHydrated();
  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<ProductRow | null>(null);
  const [activeStep, setActiveStep] = useState<number | null>(0);

  useEffect(() => {
    if (!hydrated) return;
    let ctx: { revert: () => void } | undefined;

    (async () => {
      const gsapModule = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      const gsap = gsapModule.default;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.from("[data-load]", {
          y: 30,
          opacity: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
        });

        const hero = heroRef.current;
        const overlay = overlayRef.current;
        if (hero) {
          ScrollTrigger.create({
            trigger: hero,
            start: "top top",
            end: "+=100%",
            pin: true,
            pinSpacing: false,
            anticipatePin: 1,
          });
          gsap.to(hero.querySelector("[data-hero-inner]") ?? hero, {
            scale: 0.92,
            opacity: 0.55,
            ease: "none",
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "+=100%",
              scrub: true,
            },
          });
        }
        if (overlay) {
          gsap.fromTo(
            overlay,
            { borderTopLeftRadius: 0, borderTopRightRadius: 0 },
            {
              borderTopLeftRadius: 64,
              borderTopRightRadius: 64,
              ease: "none",
              scrollTrigger: {
                trigger: overlay,
                start: "top bottom",
                end: "top top",
                scrub: true,
              },
            },
          );
        }

        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.fromTo(
            el,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              ease: "power3.out",
              immediateRender: false,
              scrollTrigger: {
                trigger: el,
                start: "top 90%",
                once: true,
              },
            },
          );
        });

        gsap.to(".marquee-track", { xPercent: -50, duration: 30, ease: "none", repeat: -1 });

        gsap.utils.toArray<HTMLElement>(".steps-grid").forEach((grid) => {
          const cards = grid.querySelectorAll<HTMLElement>(".step-card");
          gsap.fromTo(
            cards,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.06,
              duration: 0.7,
              ease: "power3.out",
              immediateRender: false,
              scrollTrigger: { trigger: grid, start: "top 90%", once: true },
            },
          );
        });

        ScrollTrigger.refresh();
        const onLoad = () => ScrollTrigger.refresh();
        window.addEventListener("load", onLoad);
        const t = setTimeout(() => ScrollTrigger.refresh(), 400);
        return () => {
          window.removeEventListener("load", onLoad);
          clearTimeout(t);
        };
      }, rootRef);
    })();

    return () => ctx?.revert();
  }, [hydrated]);



  return (
    <div ref={rootRef} className="min-h-screen bg-background">
      <Nav dark />

      {/* HERO — pinned, layered blue waves */}
      <div ref={heroRef} className="relative h-screen w-full">
        <HeroWave height="screen">
          <div data-hero-inner className="mx-auto flex h-full max-w-7xl flex-col justify-center px-6 pb-16 pt-28">
            <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] items-center">
              <div>

                <h1 data-load className="text-balance text-5xl sm:text-6xl md:text-6xl lg:text-[5rem] font-bold leading-[0.95] tracking-tight">
                  Solusi terjangkau
                  <span className="font-serif italic text-yellow-300"> untuk website impianmu </span>
                </h1>
              </div>
              <p data-load className="text-sm md:text-base text-white/70 max-w-sm md:justify-self-end">
                Giestar menyediakan website modern, terjangkau, dan responsif. Pilih paket website jadi terima beres, atau beli source code template langsung.
              </p>
            </div>

            <div data-load className="mt-10 flex flex-wrap items-center gap-4">
              <Link href="/produk" className="inline-flex items-center gap-2 rounded-full bg-white text-ink px-6 py-3 font-semibold hover:bg-white/90 transition">
                Lihat Produk <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#how" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 font-semibold hover:bg-white/10 transition">
                Cara Order
              </a>
            </div>
          </div>
        </HeroWave>
      </div>

      {/* OVERLAY reveal — About (slides up over pinned hero) */}
      <section ref={overlayRef} id="about" className="relative z-20 bg-background shadow-elegant">
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
          <div data-reveal className="grid gap-10 md:grid-cols-[1fr_1.5fr] items-end">
            <div>              <h2 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">
                Temukan website pilihanmu dengan <span className="font-serif text-yellow-500"> harga terjangkau</span>
              </h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-xl">
            Website modern dengan performa maksimal. Pilih template terbaik untuk UMKM, bisnis lokal, dan profesional Anda
            </p>
          </div>

          <div data-reveal className="mt-16 grid gap-6 md:grid-cols-3">
            {[
              { t: "Tampilan Profesional", d: "Website Anda langsung terlihat profesional dan terpercaya di mata calon pelanggan." },
              { t: "Responsif", d: "Tidak perlu khawatir website tampil berantakan." },
              { t: "Modern", d: "Desain mengikuti tren terbaru dengan tampilan yang elegan dan profesional" },
            ].map((f, i) => (
              <div key={f.t} className="rounded-3xl border bg-card p-8 shadow-card">
                <div className="text-6xl font-serif text-amber-400/60">0{i + 1}</div>
                <h3 className="mt-4 text-xl font-bold">{f.t}</h3>
                <p className="mt-2 text-muted-foreground">{f.d}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Marquee */}
        <div className="border-y bg-secondary/50 py-8 overflow-hidden">
          <div className="marquee-track flex gap-16 md:gap-24 whitespace-nowrap items-center">
            {Array.from({ length: 2 }).map((_, k) => (
              <div key={k} className="flex gap-16 md:gap-24 shrink-0 items-center">
                {["nextdotjs", "react", "tailwindcss", "greensock", "typescript", "vite", "framer", "astro"].map((slug) => (
                  <img
                    key={slug + k}
                    src={`https://cdn.simpleicons.org/${slug}`}
                    alt={slug}
                    loading="lazy"
                    className={`h-10 md:h-12 w-auto opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 ${
                      slug === "nextdotjs" ? "dark:invert" : ""
                    }`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* KEUNGGULAN */}
        <div id="keunggulan" className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, oklch(0.25 0.15 265) 0%, oklch(0.35 0.22 262) 60%, oklch(0.5 0.24 258) 100%)" }}>
          <div className="mx-auto max-w-7xl px-6 py-24 md:py-32 text-white">
            <div data-reveal className="grid gap-10 md:grid-cols-[1fr_1.2fr] items-end">
              <div>
                <h2 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                  Tentukan pilihanmu  <span className="font-serif italic text-yellow-300">sekarang juga!</span>
                </h2>
              </div>
              <p className="text-white/70 max-w-md md:justify-self-end">
                Template modern berkualitas yang dirancang untuk meningkatkan nilai jual. Beli kodenya atau biarkan kami siapkan semuanya sampai live.
              </p>
            </div>

            <div data-reveal className="mt-14 grid gap-5 md:grid-cols-3">
              {/* Featured white card */}
              <div className="step-card rounded-3xl bg-white text-foreground p-7 flex flex-col shadow-elegant">
                <h3 className="mt-3 text-2xl font-bold">Template Siap Pakai</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  Pilih dari berbagai desain profesional untuk company profile, portfolio, hingga SaaS.
                </p>
                <div className="mt-auto pt-8 flex items-center justify-between">
                  <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-ink text-white px-5 py-3 text-sm font-semibold hover:opacity-90 transition">Konsultasi Gratis</a>
                  <a href="#contact" className="grid h-11 w-11 place-items-center rounded-full bg-ink text-white hover:opacity-90 transition" aria-label="Mulai"><ArrowUpRight className="h-4 w-4" /></a>
                </div>
              </div>
              {/* Light blue cards */}
              {[
                { n: "02", t: "Harga Bersahabat", d: "Kualitas tidak harus mahal. Paket kami mulai dari harga yang sangat terjangkau bahkan untuk UMKM kecil sekalipun." },
                { n: "03", t: "Website siap pakai", d: "1x24 jam website Anda sudah siap tayang. Tidak perlu tunggu berminggu-minggu." },
              ].map((c) => (
                <div key={c.n} className="step-card rounded-3xl p-7 flex flex-col text-white" style={{ background: "linear-gradient(160deg, oklch(0.72 0.14 258) 0%, oklch(0.6 0.18 260) 100%)" }}>

                  <h3 className="mt-3 text-2xl font-bold">{c.t}</h3>
                  <p className="mt-3 text-sm text-white/80 leading-relaxed">{c.d}</p>
                  <div className="mt-auto pt-8 flex items-center justify-between">
                    <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-white text-ink px-5 py-3 text-sm font-semibold hover:bg-white/90 transition">Tanya Sekarang</a>
                    <a href="#contact" className="grid h-11 w-11 place-items-center rounded-full bg-white text-ink hover:bg-white/90 transition" aria-label="Mulai"><ArrowRight className="h-4 w-4" /></a>
                  </div>
                </div>
              ))}
            </div>

            {/* Perks strip */}
            <div data-reveal className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { n: "1x24 jam", l: "Proses Instalasi" },
                { n: "50+", l: "Klien puas & terbantu" },
                { n: "100%", l: "Garansi revisi" },
                { n: "24/7", l: "Siap konsultasi" },
              ].map((s) => (
                <div key={s.l} className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur px-6 py-5">
                  <div className="text-3xl font-bold text-yellow-300">{s.n}</div>
                  <div className="text-xs text-white/70 mt-1 uppercase tracking-widest">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* HOW TO BUY */}
        <div id="how" className="mx-auto max-w-7xl px-6 py-24 md:py-32">
          <div data-reveal className="flex items-end justify-between gap-6 flex-wrap">
            <div className="max-w-2xl">
              <div className="text-[11px] uppercase tracking-[0.25em] text-amber-500 font-semibold">Cara Order</div>
              <h2 className="mt-3 text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]">
               Mulai membuat website untuk <span className="font-serif italic text-amber-500"> bisnismu </span>
              </h2>
            </div>
            <p className="text-muted-foreground max-w-sm">
              Delapan langkah yang sederhana untuk wujudkan website impian anda.
            </p>
          </div>
          <div className="steps-grid mt-14 flex flex-col gap-1 w-full">
            {STEPS.map((s, i) => {
              const isActive = activeStep === i;
              const gradientClass = ROW_GRADIENTS[i % ROW_GRADIENTS.length];

              return (
                <div
                  key={s.title}
                  onClick={() => setActiveStep(isActive ? null : i)}
                  className={`step-card group relative rounded-2xl md:rounded-3xl cursor-pointer overflow-hidden transition-all duration-500 text-white ${gradientClass} ${isActive ? "shadow-elegant" : ""}`}
                >
                  <div className="p-6 md:p-8 flex items-center justify-between">
                    <div className="flex items-center gap-4 md:gap-8">
                      <span className="font-serif text-2xl md:text-3xl text-white/70">
                        0{i + 1}
                      </span>
                      <h3 className="text-lg md:text-2xl font-bold tracking-tight">{s.title}</h3>
                    </div>
                    <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-full transition-transform duration-500 bg-white/20 ${isActive ? "rotate-90" : ""}`}>
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  </div>

                  <div
                    className={`grid transition-all duration-500 ease-in-out ${isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 pb-6 md:px-8 md:pb-8 pt-0 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <p className="max-w-xl text-sm md:text-base leading-relaxed text-white/90">
                          {s.desc}
                        </p>
                        <a
                          href="#contact"
                          onClick={(e) => e.stopPropagation()}
                          className="shrink-0 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition bg-white text-ink hover:bg-white/90"
                        >
                          Mulai Sekarang <ArrowUpRight className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* PRODUCTS preview */}
        <div id="products" className="mx-auto max-w-7xl px-6 py-24 md:py-32">
          <div data-reveal className="flex items-end justify-between gap-6 mb-12">
            <div>
              <div className="text-xs uppercase tracking-widest text-amber-500 font-semibold">Produk Unggulan</div>
              <h2 className="mt-3 text-4xl md:text-6xl font-bold tracking-tight">
                Temukan desainmu <span className="font-serif text-amber-500">di sini!</span>
              </h2>
            </div>
            <Link href="/produk" className="hidden sm:inline-flex items-center gap-2 rounded-full border px-5 py-2.5 font-semibold hover:bg-secondary">
              Lihat Semua Produk <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div data-reveal className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-12 -mx-6 px-6 hide-scrollbar">
            {featuredProducts.map((p) => {
              return (
                <article
                  key={p.id}
                  className="group relative shrink-0 w-[85vw] sm:w-[450px] aspect-[16/10] snap-center rounded-3xl overflow-hidden cursor-pointer shadow-card hover:shadow-elegant transition"
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
            
            {/* View All Card */}
            {/* <Link
              href="/produk"
              className="group relative shrink-0 w-[85vw] sm:w-[450px] aspect-[16/10] snap-center rounded-3xl overflow-hidden cursor-pointer shadow-card hover:shadow-elegant transition bg-secondary/30 flex flex-col items-center justify-center border border-border/50 hover:bg-secondary/50"
            >
              <div className="grid h-16 w-16 place-items-center rounded-full bg-primary text-primary-foreground transition-transform duration-500 group-hover:scale-110 shadow-lg">
                <ArrowRight className="h-8 w-8" />
              </div>
              <h3 className="mt-5 text-xl font-bold text-foreground">Lihat Semua Template</h3>
              <p className="mt-2 text-sm text-muted-foreground text-center px-6">Jelajahi puluhan koleksi desain website premium kami.</p>
            </Link> */}
          </div>
        </div>
        {selected && <HomeProductModal product={selected} onClose={() => setSelected(null)} />}

        {/* PRICE */}
        <div id="price" className="bg-[#020E6A] text-white">
          <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
            <div data-reveal className="max-w-3xl">
              <div className="text-xs uppercase tracking-widest text-yellow-400 font-semibold">Harga</div>
              <h2 className="mt-3 text-4xl md:text-6xl font-bold tracking-tight">
                Harga terbaik <span className="font-serif italic text-yellow-400"> untukmu</span>.
              </h2>
              <p className="mt-4 text-white/60 text-lg">Pilih sesuai kebutuhan. Mau langsung pakai atau ingin kembangkan sendiri? Keduanya tersedia dengan harga yang jelas di awal.</p>
            </div>
            <div data-reveal className="mt-14 grid gap-6 md:grid-cols-3">
              {[
                { name: "Produk Jadi", price: "Mulai 15K", desc: "Template sudah kami setup lengkap. Tinggal masukkan konten bisnis Anda, langsung bisa online.", features: ["Setup domain & hosting", "Konten diisi sesuai data Anda", "Revisi minor 1x", "Garansi 7 hari"], cta: "Jelajahi produk", href: "/produk" },
                { name: "Source Code", price: "Mulai  5k", desc: "Dapatkan akses penuh ke source code. Bebas modifikasi dan kembangkan sesuai kebutuhan Anda.", features: ["Full source code terstruktur", "Dokumentasi penggunaan",  "Lisensi 1 project"], cta: "Tanya Source Code", href: "/produk", featured: true },
                { name: "Website Custom", price: "Mulai 50K", desc: "Website dibuat sesuai kebutuhan Anda dari nol. Desain dan fitur menyesuaikan bisnis Anda.", features: ["Setup hosting & domain", "Revisi 2x", "Garansi 7 hari"], cta: "Konsultasi Custom", href: waLink("Halo Giestar, saya ingin konsultasi WEBSITE CUSTOM.") },
              ].map((t) => (
                <div key={t.name} className={`rounded-3xl p-8 md:p-10 border ${t.featured ? "bg-yellow-500 border-transparent" : "border-white/10 bg-white/5"}`}>
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold">{t.name}</h3>
                    <span className={`text-xs uppercase tracking-widest ${t.featured ? "text-white/80" : "text-white/40"}`}>Paket</span>
                  </div>
                  <div className="mt-6 text-5xl font-bold">{t.price}</div>
                  <p className={`mt-3 ${t.featured ? "text-white/80" : "text-white/60"}`}>{t.desc}</p>
                  <ul className="mt-8 space-y-3">
                    {t.features.map((f) => (
                      <li key={f} className="flex items-center gap-3">
                        <CheckCircle2 className="h-4 w-4 shrink-0" /> <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a href={t.href} target="_blank" rel="noreferrer" className={`mt-10 inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold w-full justify-center ${t.featured ? "bg-white text-primary" : "bg-white/10 hover:bg-white/20"}`}>
                    {t.cta} <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CONTACT */}
        <div id="contact" className="mx-auto max-w-7xl px-6 py-24 md:py-32">
          <div data-reveal className="grid gap-10 md:grid-cols-2 items-center">
            <div>
              <div className="text-xs uppercase tracking-widest text-amber-500 font-semibold">Hubungi Kami</div>
              <h2 className="mt-3 text-4xl md:text-6xl font-bold tracking-tight">
                Siap bawa bisnis Anda <br /><span className="font-serif text-amber-500">ke level berikutnya?</span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-md">Konsultasikan kebutuhan website Anda secara gratis. Tidak ada tekanan, tidak ada biaya tersembunyi. Tim kami siap merespons cepat di jam kerja.</p>
              <div className="mt-6 space-y-1 text-sm text-muted-foreground">
                <div>giestar.id@gmail.com</div>
                <div>+62 851-5072-7624</div>
              </div>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                const msg = `Halo Giestar, saya ${fd.get("name")} (${fd.get("email")}). ${fd.get("message")}`;
                window.open(waLink(msg), "_blank");
              }}
              className="rounded-3xl border bg-card p-6 md:p-8 shadow-card space-y-4"
            >
              <div className="text-sm text-center pb-2">Konsultasi <span className="font-serif italic text-primary text-lg">gratis, tanpa komitmen</span></div>
              <input required name="name" placeholder="Nama Anda" className="w-full rounded-2xl border bg-background px-5 py-3.5 outline-none focus:border-primary" />
              <input required type="email" name="email" placeholder="Email atau nomor WhatsApp" className="w-full rounded-2xl border bg-background px-5 py-3.5 outline-none focus:border-primary" />
              <textarea required name="message" placeholder="Ceritakan bisnis Anda & website seperti apa yang Anda butuhkan..." rows={4} className="w-full rounded-2xl border bg-background px-5 py-3.5 outline-none focus:border-primary resize-none" />
              <button className="w-full rounded-full bg-ink text-white py-4 font-semibold hover:opacity-90 transition">Kirim via WhatsApp Sekarang →</button>
            </form>
          </div>
        </div>

        <Footer />
      </section>
    </div>
  );
}

function HomeProductModal({ product, onClose }: { product: ProductRow; onClose: () => void }) {
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
        {/* Compact header */}
        <div className="h-40 sm:h-48 relative overflow-hidden">
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
              href={(product.source_code_url && product.source_code_url.trim().length > 0) ? product.source_code_url : waLink(`Halo Giestar, saya ingin BELI SOURCE CODE: ${product.name}`)}
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
