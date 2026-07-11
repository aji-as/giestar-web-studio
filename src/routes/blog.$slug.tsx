import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Nav } from "@/components/Nav";
import { HeroWave } from "@/components/HeroWave";
import { Footer } from "@/components/Footer";
import { BLOGS } from "@/lib/data";
import { useHydrated } from "@/hooks/useHydrated";

export const Route = createFileRoute("/blog/$slug")({
  component: BlogDetail,
  loader: ({ params }) => {
    const blog = BLOGS.find((b) => b.slug === params.slug);
    if (!blog) throw notFound();
    return { blog };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.blog.title} — Giestar Blog` },
          { name: "description", content: loaderData.blog.excerpt },
          { property: "og:title", content: loaderData.blog.title },
          { property: "og:description", content: loaderData.blog.excerpt },
          { property: "og:type", content: "article" },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen grid place-items-center bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Artikel tidak ditemukan</h1>
        <Link to="/blog" className="mt-6 inline-flex items-center gap-2 text-primary">← Kembali ke Blog</Link>
      </div>
    </div>
  ),
  errorComponent: ({ reset }) => (
    <div className="min-h-screen grid place-items-center">
      <button onClick={reset} className="rounded-full bg-primary text-primary-foreground px-6 py-3">Coba lagi</button>
    </div>
  ),
});

function BlogDetail() {
  const { blog } = Route.useLoaderData();
  const hydrated = useHydrated();
  const rootRef = useRef<HTMLDivElement>(null);
  const related = BLOGS.filter((b) => b.slug !== blog.slug).slice(0, 3);

  useEffect(() => {
    if (!hydrated) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-load]", { y: 40, opacity: 0, duration: 0.9, stagger: 0.08, ease: "power3.out" });
      gsap.from(".related-card", { y: 40, opacity: 0, duration: 0.7, stagger: 0.08, ease: "power3.out", scrollTrigger: undefined });
    }, rootRef);
    return () => ctx.revert();
  }, [hydrated, blog.slug]);

  return (
    <div ref={rootRef} className="min-h-screen bg-background">
      <Nav />

      <HeroWave>
        <div className="mx-auto max-w-3xl px-6 pt-32 pb-20">
          <Link data-load to="/blog" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
            <ArrowLeft className="h-4 w-4" /> Semua artikel
          </Link>
          <div data-load className="mt-8 flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-white/85 font-semibold">
            <span>{blog.category}</span><span className="h-px w-6 bg-white/30" /><span className="text-white/60">{blog.date} · {blog.readTime}</span>
          </div>
          <h1 data-load className="mt-4 text-4xl md:text-6xl font-bold tracking-tight text-balance leading-[1.05]">{blog.title}</h1>
          <p data-load className="mt-6 text-lg md:text-xl text-white/70">{blog.excerpt}</p>
        </div>
      </HeroWave>

      <article className="pb-16">
        <div data-load className={`mx-auto max-w-5xl -mt-16 md:-mt-24 relative z-20 aspect-[16/9] rounded-3xl bg-gradient-to-br ${blog.gradient} grain shadow-elegant`} />

        <div data-load className="mx-auto max-w-3xl px-6 mt-12 prose prose-lg">
          <p className="text-lg leading-relaxed text-foreground/90">{blog.content}</p>
          <p className="mt-6 text-lg leading-relaxed text-foreground/90">
            Ini adalah bagian eksplorasi lebih lanjut dari topik ini. Di dunia yang bergerak cepat, pendekatan yang matang datang dari kombinasi eksperimen dan disiplin. Setiap keputusan desain punya trade-off—yang penting adalah menyadari trade-off itu dan memilih dengan sengaja.
          </p>
          <blockquote className="mt-8 border-l-4 border-primary pl-6 font-serif italic text-2xl text-foreground">
            "Desain yang baik itu invisible—dia bekerja tanpa perlu dijelaskan."
          </blockquote>
          <p className="mt-6 text-lg leading-relaxed text-foreground/90">
            Terapkan prinsip ini pada project Anda berikutnya: fokus pada satu big idea, refine detail-nya, dan buang segala yang tidak melayani ide itu.
          </p>
        </div>
      </article>

      <section className="mx-auto max-w-7xl px-6 py-24 border-t">
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">Related <span className="font-serif italic">reads</span></h2>
          <Link to="/blog" className="text-sm font-semibold text-primary inline-flex items-center gap-1">Semua <ArrowUpRight className="h-4 w-4" /></Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {related.map((b) => (
            <Link key={b.slug} to="/blog/$slug" params={{ slug: b.slug }} className="related-card group rounded-3xl overflow-hidden border bg-card shadow-card hover:shadow-elegant transition">
              <div className={`aspect-[4/3] bg-gradient-to-br ${b.gradient} grain`} />
              <div className="p-6">
                <div className="text-xs uppercase tracking-widest text-primary font-semibold">{b.category}</div>
                <h3 className="mt-2 text-lg font-bold group-hover:text-primary transition">{b.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{b.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
