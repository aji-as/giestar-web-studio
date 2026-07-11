import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";
import { Nav } from "@/components/Nav";
import { HeroWave } from "@/components/HeroWave";
import { Footer } from "@/components/Footer";
import { BLOGS } from "@/lib/data";
import { useHydrated } from "@/hooks/useHydrated";

export const Route = createFileRoute("/blog")({
  component: BlogList,
  head: () => ({
    meta: [
      { title: "Blog — Giestar" },
      { name: "description", content: "Artikel tentang teknologi web, desain UI, dan tren industri dari tim Giestar." },
      { property: "og:title", content: "Blog — Giestar" },
      { property: "og:description", content: "Artikel teknologi & UI dari Giestar." },
    ],
  }),
});

function BlogList() {
  const hydrated = useHydrated();
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!hydrated) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-load]", { y: 40, opacity: 0, duration: 0.9, stagger: 0.08, ease: "power3.out" });
      gsap.from(".blog-card", { y: 40, opacity: 0, duration: 0.7, stagger: 0.06, ease: "power3.out", delay: 0.3 });
    }, rootRef);
    return () => ctx.revert();
  }, [hydrated]);

  const [featured, ...rest] = BLOGS;

  return (
    <div ref={rootRef} className="min-h-screen bg-background">
      <Nav />

      <section className="pt-32 pb-12 bg-hero-gradient text-white grain">
        <div className="mx-auto max-w-7xl px-6">
          <div data-load className="text-xs uppercase tracking-widest text-primary-glow">Journal</div>
          <h1 data-load className="mt-3 text-5xl md:text-7xl font-bold tracking-tight text-balance max-w-4xl">
            Catatan tentang <span className="font-serif italic">craft</span>, teknologi, dan UI.
          </h1>
          <p data-load className="mt-5 text-white/70 max-w-xl">Insight dari tim Giestar seputar desain, kode, dan strategi membangun web modern.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <Link to="/blog/$slug" params={{ slug: featured.slug }} className="blog-card group grid md:grid-cols-2 gap-8 rounded-3xl border bg-card overflow-hidden shadow-card hover:shadow-elegant transition">
          <div className={`aspect-[4/3] md:aspect-auto bg-gradient-to-br ${featured.gradient} grain`} />
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-primary font-semibold">
              <span>Featured</span> <span className="h-px w-6 bg-primary/30" /> <span className="text-muted-foreground">{featured.category}</span>
            </div>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight">{featured.title}</h2>
            <p className="mt-4 text-muted-foreground">{featured.excerpt}</p>
            <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
              <span>{featured.date}</span><span>·</span><span>{featured.readTime}</span>
              <ArrowUpRight className="ml-auto h-5 w-5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition" />
            </div>
          </div>
        </Link>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((b) => (
            <Link key={b.slug} to="/blog/$slug" params={{ slug: b.slug }} className="blog-card group rounded-3xl overflow-hidden border bg-card shadow-card hover:shadow-elegant transition">
              <div className={`aspect-[4/3] bg-gradient-to-br ${b.gradient} grain relative`}>
                <div className="absolute top-4 left-4 rounded-full bg-black/30 backdrop-blur text-white text-xs px-3 py-1">{b.category}</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold group-hover:text-primary transition">{b.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{b.excerpt}</p>
                <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{b.date} · {b.readTime}</span>
                  <ArrowUpRight className="h-4 w-4 opacity-50 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
