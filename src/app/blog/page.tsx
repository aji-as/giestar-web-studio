"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { Nav } from "@/components/Nav";
import { HeroWave } from "@/components/HeroWave";
import { Footer } from "@/components/Footer";
import { usePublicBlogs } from "@/lib/useBlogs";
import { useHydrated } from "@/hooks/useHydrated";

export default function BlogList() {
  const hydrated = useHydrated();
  const { blogs, loading } = usePublicBlogs();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hydrated) return;
    (async () => {
      const { default: gsap } = await import("gsap");
      gsap.from("[data-load]", { y: 40, opacity: 0, duration: 0.9, stagger: 0.08, ease: "power3.out" });
    })();
  }, [hydrated]);

  useEffect(() => {
    if (!hydrated || loading) return;
    (async () => {
      const { default: gsap } = await import("gsap");
      gsap.fromTo(".blog-card", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.06, ease: "power3.out", delay: 0.3 });
    })();
  }, [hydrated, loading, blogs]);

  const [featured, ...rest] = blogs;

  return (
    <div ref={rootRef} className="min-h-screen bg-background">
      <Nav />

      <HeroWave>
        <div className="mx-auto max-w-7xl px-6 pt-32 pb-16">
          <div data-load className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" /> Journal
          </div>
          <h1 data-load className="mt-5 text-5xl md:text-7xl font-bold tracking-tight text-balance max-w-4xl leading-[0.95]">
            Catatan tentang <span className="font-serif italic">craft</span>, teknologi, dan UI.
          </h1>
          <p data-load className="mt-5 text-white/70 max-w-xl">Insight dari tim Giestar seputar desain, kode, dan strategi membangun web modern.</p>
        </div>
      </HeroWave>

      <section className="mx-auto max-w-7xl px-6 py-16">
        {loading ? (
          <div className="space-y-12">
            <div className="h-[400px] w-full rounded-3xl bg-muted animate-pulse" />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => <div key={i} className="h-[300px] rounded-3xl bg-muted animate-pulse" />)}
            </div>
          </div>
        ) : blogs.length === 0 ? (
          <div className="rounded-3xl border p-16 text-center">
            <div className="text-2xl font-bold">Belum ada artikel</div>
            <p className="mt-2 text-muted-foreground">Artikel baru akan segera hadir.</p>
          </div>
        ) : (
          <>
            {featured && (
              <Link href={`/blog/${featured.slug}`} className="blog-card group grid md:grid-cols-2 gap-8 rounded-3xl border bg-card overflow-hidden shadow-card hover:shadow-elegant transition">
                <div className="aspect-[4/3] md:aspect-auto relative overflow-hidden">
                  {featured.image ? (
                    <img src={featured.image} alt={featured.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  ) : (
                    <div className={`absolute inset-0 bg-gradient-to-br ${featured.gradient} grain`} />
                  )}
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-primary font-semibold">
                    <span>Featured</span> <span className="h-px w-6 bg-primary/30" /> <span className="text-muted-foreground">{featured.category}</span>
                  </div>
                  <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight">{featured.title}</h2>
                  <p className="mt-4 text-muted-foreground">{featured.excerpt}</p>
                  <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{featured.date}</span><span>·</span><span>{featured.read_time}</span>
                    <ArrowUpRight className="ml-auto h-5 w-5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition" />
                  </div>
                </div>
              </Link>
            )}

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((b) => (
                <Link key={b.slug} href={`/blog/${b.slug}`} className="blog-card group rounded-3xl overflow-hidden border bg-card shadow-card hover:shadow-elegant transition flex flex-col">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    {b.image ? (
                      <img src={b.image} alt={b.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    ) : (
                      <div className={`absolute inset-0 bg-gradient-to-br ${b.gradient} grain`} />
                    )}
                    <div className="absolute top-4 left-4 rounded-full bg-black/30 backdrop-blur text-white text-xs px-3 py-1 z-10">{b.category}</div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold group-hover:text-primary transition">{b.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2 flex-1">{b.excerpt}</p>
                    <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                      <span>{b.date} · {b.read_time}</span>
                      <ArrowUpRight className="h-4 w-4 opacity-50 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </section>

      <Footer />
    </div>
  );
}
