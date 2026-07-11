import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ArrowUpRight, MessageCircle, CreditCard, Rocket, CheckCircle2, Sparkles, MousePointerClick, FileCode2 } from "lucide-react";
import { Nav } from "@/components/Nav";
import { HeroWave } from "@/components/HeroWave";
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
      // page load (hero content)
      gsap.from("[data-load]", {
        y: 30,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
      });

      // Pinned hero: hero stays fixed while the next section (overlay) slides up over it
      const hero = heroRef.current;
      const overlay = overlayRef.current;
      if (hero) {
        ScrollTrigger.create({
          trigger: hero,
          start: "top top",
          end: "+=100%",
          pin: true,
          pinSpacing: false, // let overlay section scroll up ON TOP of pinned hero
          anticipatePin: 1,
        });
        // Hero content gently scales & fades while pinned
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
      // Overlay section rises with a growing border-radius as the hero is pinned
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

      // Section reveals — use fromTo + once so elements never stay hidden
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

      // Marquee
      gsap.to(".marquee-track", { xPercent: -50, duration: 30, ease: "none", repeat: -1 });

      // Step cards stagger
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

      // Refresh after fonts/images settle so triggers are correct
      ScrollTrigger.refresh();
      const onLoad = () => ScrollTrigger.refresh();
      window.addEventListener("load", onLoad);
      const t = setTimeout(() => ScrollTrigger.refresh(), 400);
      return () => {
        window.removeEventListener("load", onLoad);
        clearTimeout(t);
      };
    }, rootRef);
    return () => ctx.revert();
  }, [hydrated]);



  return (
    <div ref={rootRef} className="min-h-screen bg-background">
      <Nav dark />

      {/* HERO — pinned, layered blue waves */}
      <div ref={heroRef} className="relative h-screen w-full">
        <HeroWave height="screen">
          <div data-hero-inner className="mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-16 pt-28">
            <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] items-end">
              <div>
                <div data-load className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" /> Web Agency & Template Studio
                </div>
                <h1 data-load className="text-balance text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold leading-[0.95] tracking-tight">
                  Crafted websites. <br />
                  <span className="font-serif italic">Built to scale.</span>
                </h1>
              </div>
              <p data-load className="text-sm md:text-base text-white/70 max-w-sm md:justify-self-end">
                Giestar merancang dan mengirim template premium serta project custom untuk brand yang ingin tampil beda — cepat, elegan, dan siap tumbuh.
              </p>
            </div>

            <div data-load className="mt-10 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl p-2 pr-5">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-white/90 to-white/60 text-primary font-bold">G</div>
                <div>
                  <div className="text-sm font-semibold flex items-center gap-1.5">Giestar Studio <ArrowUpRight className="h-3.5 w-3.5" /></div>
                  <div className="text-[11px] text-white/60 uppercase tracking-widest">Web & Template Platform</div>
                </div>
              </div>
              <Link to="/product" className="inline-flex items-center gap-2 rounded-full bg-white text-ink px-6 py-3 font-semibold hover:bg-white/90 transition">
                Lihat Katalog <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#how" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 font-semibold hover:bg-white/10 transition">
                Cara Pembelian
              </a>
            </div>
          </div>
        </HeroWave>
      </div>

      {/* OVERLAY reveal — About (slides up over pinned hero) */}
      <section ref={overlayRef} id="about" className="relative z-20 bg-background shadow-elegant">
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

        {/* KEUNGGULAN */}
        <div id="keunggulan" className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, oklch(0.25 0.15 265) 0%, oklch(0.35 0.22 262) 60%, oklch(0.5 0.24 258) 100%)" }}>
          <div className="mx-auto max-w-7xl px-6 py-24 md:py-32 text-white">
            <div data-reveal className="grid gap-10 md:grid-cols-[1fr_1.2fr] items-end">
              <div>
                <div className="text-[11px] uppercase tracking-[0.25em] text-white/70 font-semibold">Keunggulan</div>
                <h2 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                  Unleashing the potential <br /> of your <span className="font-serif italic">brand</span>
                </h2>
              </div>
              <p className="text-white/70 max-w-md md:justify-self-end">
                Dari strategi sampai eksekusi visual — kami merancang solusi yang bekerja, menarik perhatian, dan meninggalkan kesan di hati audiens Anda.
              </p>
            </div>

            <div data-reveal className="mt-14 grid gap-5 md:grid-cols-3">
              {/* Featured white card */}
              <div className="step-card rounded-3xl bg-white text-foreground p-7 flex flex-col shadow-elegant">
                <div className="text-[11px] uppercase tracking-widest text-primary font-semibold">01 — Signature</div>
                <h3 className="mt-3 text-2xl font-bold">Desain & Web Craft</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  Setiap website kami rancang tidak hanya indah, tapi berorientasi hasil. Interaksi intuitif, grafis menarik, dan konsistensi visual yang membangun kepercayaan brand Anda dari halaman pertama.
                </p>
                <div className="mt-auto pt-8 flex items-center justify-between">
                  <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-ink text-white px-5 py-3 text-sm font-semibold hover:opacity-90 transition">Mulai project Anda</a>
                  <a href="#contact" className="grid h-11 w-11 place-items-center rounded-full bg-ink text-white hover:opacity-90 transition" aria-label="Mulai"><ArrowUpRight className="h-4 w-4" /></a>
                </div>
              </div>
              {/* Light blue cards */}
              {[
                { n: "02", t: "Strategi Brand", d: "Positioning tajam & narasi yang membedakan Anda dari kompetitor." },
                { n: "03", t: "Arah Kreatif", d: "Direksi visual dari moodboard hingga sistem desain siap pakai." },
              ].map((c) => (
                <div key={c.n} className="step-card rounded-3xl p-7 flex flex-col text-white" style={{ background: "linear-gradient(160deg, oklch(0.72 0.14 258) 0%, oklch(0.6 0.18 260) 100%)" }}>
                  <div className="text-[11px] uppercase tracking-widest text-white/80 font-semibold">{c.n} — Service</div>
                  <h3 className="mt-3 text-2xl font-bold">{c.t}</h3>
                  <p className="mt-3 text-sm text-white/80 leading-relaxed">{c.d}</p>
                  <div className="mt-auto pt-8 flex items-center justify-between">
                    <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-white text-ink px-5 py-3 text-sm font-semibold hover:bg-white/90 transition">Mulai project Anda</a>
                    <a href="#contact" className="grid h-11 w-11 place-items-center rounded-full bg-white text-ink hover:bg-white/90 transition" aria-label="Mulai"><ArrowRight className="h-4 w-4" /></a>
                  </div>
                </div>
              ))}
            </div>

            {/* Perks strip */}
            <div data-reveal className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { n: "2–4h", l: "Waktu pengerjaan" },
                { n: "120+", l: "Template siap pakai" },
                { n: "95%", l: "Klien puas & repeat" },
                { n: "24/7", l: "Support & konsultasi" },
              ].map((s) => (
                <div key={s.l} className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur px-6 py-5">
                  <div className="text-3xl font-bold">{s.n}</div>
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
              <div className="text-[11px] uppercase tracking-[0.25em] text-primary font-semibold">Cara Pembelian</div>
              <h2 className="mt-3 text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]">
                Delapan langkah <span className="font-serif italic">sederhana</span> untuk website Anda.
              </h2>
            </div>
            <p className="text-muted-foreground max-w-sm">
              Proses transparan dari pemilihan template sampai project siap live — cukup 2–4 jam pengerjaan.
            </p>
          </div>
          <div className="steps-grid mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => {
              const featured = i === 0;
              const blue = i % 2 === 1;
              return (
                <div
                  key={s.title}
                  className={`step-card group relative rounded-3xl p-6 flex flex-col min-h-[260px] transition ${
                    featured
                      ? "bg-white shadow-elegant"
                      : blue
                        ? "text-white shadow-card"
                        : "bg-white shadow-card border"
                  }`}
                  style={blue ? { background: "linear-gradient(160deg, oklch(0.75 0.13 258) 0%, oklch(0.62 0.18 260) 100%)" } : undefined}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[11px] uppercase tracking-widest font-semibold ${blue ? "text-white/85" : "text-primary"}`}>
                      Step {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className={`grid h-10 w-10 place-items-center rounded-xl ${blue ? "bg-white/20 text-white" : "bg-secondary text-primary"}`}>
                      <s.icon className="h-4 w-4" />
                    </div>
                  </div>
                  <h3 className={`mt-6 text-xl font-bold leading-tight ${blue ? "text-white" : ""}`}>{s.title}</h3>
                  {featured && (
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                  )}
                  {!featured && (
                    <p className={`mt-2 text-sm leading-relaxed ${blue ? "text-white/80" : "text-muted-foreground"}`}>{s.desc}</p>
                  )}
                  <div className="mt-auto pt-6 flex items-center justify-between">
                    <a
                      href="#contact"
                      className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold transition ${
                        blue ? "bg-white text-ink hover:bg-white/90" : "bg-ink text-white hover:opacity-90"
                      }`}
                    >
                      Mulai langkah ini
                    </a>
                    <div className={`grid h-10 w-10 place-items-center rounded-full transition group-hover:-translate-y-0.5 ${
                      blue ? "bg-white text-ink" : "bg-ink text-white"
                    }`}>
                      <ArrowUpRight className="h-4 w-4" />
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
