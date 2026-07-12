"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Nav } from "@/components/Nav";
import { HeroWave } from "@/components/HeroWave";
import { Footer } from "@/components/Footer";
import { useHydrated } from "@/hooks/useHydrated";
import type { BlogRow } from "@/lib/supabase";

export default function BlogDetailClient({
  blog,
  related,
}: {
  blog: BlogRow;
  related: BlogRow[];
}) {
  const hydrated = useHydrated();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hydrated) return;
    let ctx: any;
    (async () => {
      const { default: gsap } = await import("gsap");
      ctx = gsap.context(() => {
        gsap.from("[data-load]", {
          y: 40,
          opacity: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
        });
        gsap.from(".related-card", {
          y: 40,
          opacity: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: undefined,
        });
      }, rootRef);
    })();
    return () => ctx?.revert();
  }, [hydrated, blog.slug]);

  return (
    <div ref={rootRef} className="min-h-screen bg-background">
      <Nav />

      <HeroWave>
        <div className="mx-auto max-w-3xl px-6 pt-32 pb-20">
          <Link
            data-load
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> Semua artikel
          </Link>
          <div
            data-load
            className="mt-8 flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-white/85 font-semibold"
          >
            <span>{blog.category}</span>
            <span className="h-px w-6 bg-white/30" />
            <span className="text-white/60">
              {blog.date} · {blog.read_time}
            </span>
          </div>
          <h1
            data-load
            className="mt-4 text-4xl md:text-6xl font-bold tracking-tight text-balance leading-[1.05]"
          >
            {blog.title}
          </h1>
          <p data-load className="mt-6 text-lg md:text-xl text-white/70">
            {blog.excerpt}
          </p>
        </div>
      </HeroWave>

      <article className="pb-16">
        <div data-load className="mx-auto max-w-5xl -mt-16 md:-mt-24 relative z-20 aspect-[16/9] rounded-3xl overflow-hidden shadow-elegant bg-card">
          {blog.image ? (
            <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
          ) : (
            <div className={`absolute inset-0 bg-gradient-to-br ${blog.gradient} grain`} />
          )}
        </div>

        <div data-load className="mx-auto max-w-3xl px-6 mt-12 prose prose-lg">
          <p className="text-lg leading-relaxed text-foreground/90 whitespace-pre-wrap">
            {blog.content}
          </p>
        </div>
      </article>

      <section className="mx-auto max-w-7xl px-6 py-24 border-t">
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">
            Related <span className="font-serif italic">reads</span>
          </h2>
          <Link
            href="/blog"
            className="text-sm font-semibold text-primary inline-flex items-center gap-1"
          >
            Semua <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {related.map((b) => (
            <Link
              key={b.slug}
              href={`/blog/${b.slug}`}
              className="related-card group rounded-3xl overflow-hidden border bg-card shadow-card hover:shadow-elegant transition"
            >
              <div
                className={`aspect-[4/3] bg-gradient-to-br ${b.gradient} grain`}
              />
              <div className="p-6">
                <div className="text-xs uppercase tracking-widest text-primary font-semibold">
                  {b.category}
                </div>
                <h3 className="mt-2 text-lg font-bold group-hover:text-primary transition">
                  {b.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                  {b.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
