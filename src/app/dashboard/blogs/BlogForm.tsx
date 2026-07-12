"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import gsap from "gsap";
import { type BlogRow, GRADIENT_OPTIONS, BLOG_CATEGORIES } from "@/lib/supabase";
import { ImageUpload } from "@/components/ImageUpload";

type FormData = Omit<BlogRow, "id" | "created_at">;

const DEFAULT: FormData = {
  title: "", slug: "", excerpt: "", content: "",
  category: "Development", date: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
  read_time: "5 min", image: "", gradient: GRADIENT_OPTIONS[0], published: false,
};

export default function BlogForm({
  blog,
  onClose,
  onSave,
}: {
  blog: BlogRow | null;
  onClose: () => void;
  onSave: (data: FormData) => Promise<void>;
}) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState<FormData>(blog ? {
    title: blog.title, slug: blog.slug, excerpt: blog.excerpt, content: blog.content,
    category: blog.category, date: blog.date, read_time: blog.read_time,
    image: blog.image || "", gradient: blog.gradient, published: blog.published,
  } : DEFAULT);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    gsap.fromTo(drawerRef.current, { x: "100%" }, { x: "0%", duration: 0.35, ease: "power3.out" });
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);

  function set<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((f) => {
      const next = { ...f, [key]: value };
      // Auto generate slug if title changes (and it's a new blog)
      if (key === "title" && !blog) {
        next.slug = (value as string).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
      }
      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      await onSave(form);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div className="flex-1 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Drawer */}
      <div ref={drawerRef} className="w-full max-w-2xl bg-card border-l overflow-y-auto flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b sticky top-0 bg-card z-10">
          <div>
            <h2 className="font-bold text-base">{blog ? "Edit Artikel" : "Tulis Artikel Baru"}</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Isi konten dan detail artikel</p>
          </div>
          <button onClick={onClose} className="grid h-8 w-8 place-items-center rounded-full hover:bg-secondary transition">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 p-6 space-y-5">
          {/* Judul & Slug */}
          <div className="grid sm:grid-cols-2 gap-3">
            <Field label="Judul Artikel" required>
              <input className={inputCls} value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="Contoh: Tren UI 2026..." required />
            </Field>
            <Field label="Slug (URL)" required>
              <input className={inputCls} value={form.slug} onChange={(e) => set("slug", e.target.value)} placeholder="tren-ui-2026" required />
            </Field>
          </div>

          {/* Kategori, Tanggal, Waktu Baca */}
          <div className="grid sm:grid-cols-3 gap-3">
            <Field label="Kategori" required>
              <select className={inputCls} value={form.category} onChange={(e) => set("category", e.target.value)} required>
                {BLOG_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Tanggal Terbit" required>
              <input className={inputCls} value={form.date} onChange={(e) => set("date", e.target.value)} placeholder="5 Juli 2026" required />
            </Field>
            <Field label="Estimasi Baca" required>
              <input className={inputCls} value={form.read_time} onChange={(e) => set("read_time", e.target.value)} placeholder="5 min" required />
            </Field>
          </div>

          {/* Ringkasan */}
          <Field label="Ringkasan Singkat (Excerpt)" required>
            <textarea className={`${inputCls} resize-none h-16`} value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} placeholder="Ringkasan singkat untuk ditampilkan di daftar blog." required />
          </Field>

          {/* Isi Artikel */}
          <Field label="Isi Konten Artikel" hint="Bisa menggunakan Markdown / HTML dasar." required>
            <textarea className={`${inputCls} resize-y h-48`} value={form.content} onChange={(e) => set("content", e.target.value)} placeholder="Tulis isi artikel di sini..." required />
          </Field>

          {/* Gambar Cover */}
          <Field label="Gambar Cover Blog" hint="Bisa berupa file upload atau URL">
            <ImageUpload 
              value={form.image || ""} 
              onChange={(url) => set("image", url)} 
              folder="blogs" 
            />
          </Field>

          {/* Gradient */}
          <Field label="Warna Gradient Cover">
            <div className="grid grid-cols-6 sm:grid-cols-12 gap-2">
              {GRADIENT_OPTIONS.map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => set("gradient", g)}
                  className={`aspect-square rounded-lg bg-gradient-to-br ${g} border-2 transition ${form.gradient === g ? "border-primary scale-110 shadow-md" : "border-transparent"}`}
                  title={g}
                />
              ))}
            </div>
          </Field>

          {/* Published */}
          <Field label="Status Publikasi">
            <button type="button" onClick={() => set("published", !form.published)}
              className={`w-full py-2.5 rounded-lg text-sm font-medium border transition flex items-center justify-center gap-2 ${form.published ? "bg-emerald-500 text-white border-emerald-500" : "border-border text-muted-foreground hover:bg-secondary"}`}>
              {form.published ? "🟢 Sudah Dipublikasikan (Tampil di Web)" : "⚪ Masih Draft (Tidak Tampil)"}
            </button>
          </Field>

          {error && <div className="rounded-xl bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive">{error}</div>}

          {/* Submit */}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-xl border text-sm font-semibold hover:bg-secondary transition">Batal</button>
            <button type="submit" disabled={saving} className="flex-1 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 disabled:opacity-60 transition">
              {saving ? "Menyimpan..." : blog ? "Simpan Perubahan" : "Publikasikan Artikel"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, hint, required, children }: { label: string; hint?: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      {children}
      {hint && <p className="text-[11px] text-muted-foreground/70 mt-1">{hint}</p>}
    </div>
  );
}

const inputCls = "w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition placeholder:text-muted-foreground/50";
