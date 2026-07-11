import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ArrowUpRight, MessageCircle, CreditCard, Rocket, CheckCircle2, Sparkles, MousePointerClick, FileCode2 } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PRODUCTS, formatIDR, waLink } from "@/lib/data";
import { useHydrated } from "@/hooks/useHydrated";

export const Route = createFileRoute("/")({ component: Home });

const STEPS = [
  { icon: MousePointerClick, title: "Pilih Template", desc: "Jelajahi katalog dan tentukan template favorit Anda." },
  { icon: FileCode2, title: "Pilih Tipe Pembelian", desc: "Produk jadi (siap deploy) atau source code (full custom)." },
  { icon: MessageCircle, title: "Chat Admin WhatsApp", desc: "Hubungi tim kami untuk memulai diskusi." },
  { icon: Sparkles, title: "Diskusi Kebutuhan", desc: "Ceritakan brand, konten, dan penyesuaian yang diinginkan." },
  { icon: CreditCard, title: "Pembayaran", desc: "Selesaikan pembayaran melalui metode yang tersedia." },
  { icon: Rocket, title: "Project Dikerjakan", desc: "Tim developer kami mulai mengeksekusi project Anda." },
  { icon: Sparkles, title: "Tunggu 2–4 Jam", desc: "Waktu pengerjaan cepat tanpa mengorbankan kualitas." },
  { icon: CheckCircle2, title: "Project Selesai", desc: "File dikirim, siap live, garansi revisi kecil." },
];

function Home() {
  const hydrated = useHydrated();
  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hydrated) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // page load
      gsap.from("[data-load]", { y: 40, opacity: 0, duration: 1, stagger: 0.08, ease: "power3.out" });

      // pin hero + overlay reveal
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "+=100%",
        pin: true,
        pinSpacing: true,
      });
      gsap.to(heroRef.current, {
        scale: 0.9,
        opacity: 0.4,
        ease: "none",
        scrollTrigger: { trigger: heroRef.current, start: "top top", end: "+=100%", scrub: true },
      });

      // section reveals
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      // marquee
      gsap.to(".marquee-track", { xPercent: -50, duration: 30, ease: "none", repeat: -1 });

      // step cards stagger
      gsap.from(".step-card", {
        y: 40,
        opacity: 0,
        stagger: 0.06,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: ".steps-grid", start: "top 80%" },
      });
    }, rootRef);
    return () => ctx.revert();
  }, [hydrated]);

  return (
    <div ref={rootRef} className="min-h-screen bg-background">
      <Nav dark />

      {/* HERO — pinned */}
      <section ref={heroRef} className="relative h-screen w-full overflow-hidden bg-hero-gradient text-white grain">
        <div className="absolute inset-0 opacity-40" style={{ background: "radial-gradient(circle at 80% 30%, oklch(0.7 0.25 260) 0%, transparent 40%)" }} />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-6 pt-20">
          <div className="max-w-4xl">
            <div data-load className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs uppercase tracking-widest backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-glow animate-pulse" /> Agency Web & Template Marketplace
            </div>
            <h1 data-load className="text-balance text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight">
              Bigger, Bolder <br />
              and <span className="font-serif text-primary-glow">Better</span> websites.
            </h1>
            <p data-load className="mt-6 max-w-2xl text-base sm:text-lg text-white/70">
              Giestar meracik template premium dan project custom untuk brand yang ingin tampil beda. Dari landing sederhana sampai marketplace kompleks.
            </p>
            <div data-load className="mt-8 flex flex-wrap gap-3">
              <Link to="/product" className="inline-flex items-center gap-2 rounded-full bg-white text-ink px-6 py-3 font-semibold hover:bg-white/90 transition">
                Lihat Katalog <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#how" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 font-semibold hover:bg-white/10 transition">
                Cara Pembelian
              </a>
            </div>
          </div>
          <div data-load className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl border-t border-white/15 pt-8">
            {[["120+", "Template siap"], ["95%", "Klien puas"], ["2–4h", "Waktu kirim"], ["24/7", "Support"]].map(([n, l]) => (
              <div key={l}>
                <div className="text-3xl sm:text-4xl font-bold">{n}</div>
                <div className="text-xs sm:text-sm text-white/60 mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs uppercase tracking-widest text-white/60 flex items-center gap-2">
          <span className="h-px w-8 bg-white/40" /> Scroll to reveal
        </div>
      </section>

      {/* OVERLAY reveal — About */}
      <section ref={overlayRef} id="about" className="relative z-20 rounded-t-[3rem] bg-background -mt-8 shadow-elegant">
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
          <div data-reveal className="grid gap-10 md:grid-cols-[1fr_1.5fr] items-end">
            <div>
              <div className="text-xs uppercase tracking-widest text-primary font-semibold">About</div>
              <h2 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">
                Studio kecil, <span className="font-serif">obsesi besar</span> pada craft.
              </h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-xl">
              Kami tim kecil yang percaya website hebat lahir dari kombinasi desain sistematis, animasi tepat guna, dan kode yang bersih. Setiap template dan project custom kami rakit dengan standard yang sama.
            </p>
          </div>

          <div data-reveal className="mt-16 grid gap-6 md:grid-cols-3">
            {[
              { t: "Desain Sistematis", d: "Design token, spacing scale, dan komponen konsisten di seluruh halaman." },
              { t: "Animasi Cinematic", d: "GSAP ScrollTrigger untuk pinned hero, overlay reveal, dan micro-interaction." },
              { t: "Kode Bersih", d: "React + Tailwind v4, mudah dikustomisasi dan siap production." },
            ].map((f, i) => (
              <div key={f.t} className="rounded-3xl border bg-card p-8 shadow-card">
                <div className="text-6xl font-serif text-primary/30">0{i + 1}</div>
                <h3 className="mt-4 text-xl font-bold">{f.t}</h3>
                <p className="mt-2 text-muted-foreground">{f.d}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Marquee */}
        <div className="border-y bg-secondary/50 py-6 overflow-hidden">
          <div className="marquee-track flex gap-16 whitespace-nowrap font-serif text-4xl md:text-5xl">
            {Array.from({ length: 2 }).map((_, k) => (
              <div key={k} className="flex gap-16 shrink-0">
                {["Next.js", "React", "Tailwind", "GSAP", "TypeScript", "Vite", "Framer", "Astro"].map((w) => (
                  <span key={w + k} className="text-foreground/80">{w} <span className="text-primary">✦</span></span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* HOW TO BUY */}
        <div id="how" className="mx-auto max-w-7xl px-6 py-24 md:py-32">
          <div data-reveal className="max-w-3xl">
            <div className="text-xs uppercase tracking-widest text-primary font-semibold">Cara Pembelian</div>
            <h2 className="mt-3 text-4xl md:text-6xl font-bold tracking-tight">
              Delapan langkah <span className="font-serif">sederhana</span> untuk website Anda.
            </h2>
          </div>
          <div className="steps-grid mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <div key={s.title} className="step-card group relative rounded-3xl border bg-card p-6 shadow-card hover:shadow-elegant transition">
                <div className="flex items-center justify-between">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-gradient text-white">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <span className="text-3xl font-serif text-primary/30">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-6 text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* PRODUCTS preview */}
        <div id="products" className="mx-auto max-w-7xl px-6 py-24 md:py-32">
          <div data-reveal className="flex items-end justify-between gap-6 mb-12">
            <div>
              <div className="text-xs uppercase tracking-widest text-primary font-semibold">Featured</div>
              <h2 className="mt-3 text-4xl md:text-6xl font-bold tracking-tight">
                Template <span className="font-serif">Pilihan</span>
              </h2>
            </div>
            <Link to="/product" className="hidden sm:inline-flex items-center gap-2 rounded-full border px-5 py-2.5 font-semibold hover:bg-secondary">
              Lihat Semua <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div data-reveal className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.slice(0, 6).map((p) => (
              <Link key={p.id} to="/product" className="group rounded-3xl overflow-hidden border bg-card shadow-card hover:shadow-elegant transition">
                <div className={`aspect-[4/3] bg-gradient-to-br ${p.gradient} relative grain overflow-hidden`}>
                  <div className="absolute inset-0 flex items-end justify-between p-6 text-white">
                    <span className="text-sm uppercase tracking-widest opacity-80">{p.category}</span>
                    <span className="font-serif italic text-3xl">{p.name.split(" ")[0]}</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold">{p.name}</h3>
                    <ArrowUpRight className="h-4 w-4 opacity-40 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition" />
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{p.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* PRICE */}
        <div id="price" className="bg-ink text-white">
          <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
            <div data-reveal className="max-w-3xl">
              <div className="text-xs uppercase tracking-widest text-primary-glow font-semibold">Pricing</div>
              <h2 className="mt-3 text-4xl md:text-6xl font-bold tracking-tight">
                Dua cara <span className="font-serif italic text-primary-glow">memiliki</span>.
              </h2>
              <p className="mt-4 text-white/60 text-lg">Pilih beli produk jadi untuk langsung deploy, atau ambil source code untuk kustomisasi tanpa batas.</p>
            </div>
            <div data-reveal className="mt-14 grid gap-6 md:grid-cols-2">
              {[
                { name: "Produk Jadi", price: "Mulai 900K", desc: "Template sudah kami setup dan siap deploy dengan konten Anda.", features: ["Setup domain & hosting", "Konten diinput", "Revisi minor 2x", "Garansi 7 hari"], cta: "Chat untuk Produk Jadi", href: waLink("Halo Giestar, saya tertarik pembelian PRODUK JADI") },
                { name: "Source Code", price: "Mulai 2 Jt", desc: "File source code lengkap, bebas modifikasi dan resell terbatas.", features: ["Full source code", "Dokumentasi setup", "Free update 3 bulan", "Lisensi 1 project"], cta: "Chat untuk Source Code", href: waLink("Halo Giestar, saya tertarik pembelian SOURCE CODE"), featured: true },
              ].map((t) => (
                <div key={t.name} className={`rounded-3xl p-8 md:p-10 border ${t.featured ? "bg-blue-gradient border-transparent" : "border-white/10 bg-white/5"}`}>
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold">{t.name}</h3>
                    <span className={`text-xs uppercase tracking-widest ${t.featured ? "text-white/80" : "text-white/40"}`}>Package</span>
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
              <div className="text-xs uppercase tracking-widest text-primary font-semibold">Contact</div>
              <h2 className="mt-3 text-4xl md:text-6xl font-bold tracking-tight">
                Siap mulai? <br /><span className="font-serif">Ceritakan idemu.</span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-md">Isi form singkat berikut dan tim kami akan merespon dalam beberapa menit di jam kerja.</p>
              <div className="mt-6 space-y-1 text-sm text-muted-foreground">
                <div>hello@giestar.id</div>
                <div>+62 812-3456-7890</div>
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
              <div className="text-sm text-center pb-2">Let's start <span className="font-serif italic text-primary text-lg">your growth today</span></div>
              <input required name="name" placeholder="Nama Anda" className="w-full rounded-2xl border bg-background px-5 py-3.5 outline-none focus:border-primary" />
              <input required type="email" name="email" placeholder="Email Anda" className="w-full rounded-2xl border bg-background px-5 py-3.5 outline-none focus:border-primary" />
              <textarea required name="message" placeholder="Ceritakan project Anda" rows={4} className="w-full rounded-2xl border bg-background px-5 py-3.5 outline-none focus:border-primary resize-none" />
              <button className="w-full rounded-full bg-ink text-white py-4 font-semibold hover:opacity-90 transition">Leave a request →</button>
            </form>
          </div>
        </div>

        <Footer />
      </section>
    </div>
  );
}
