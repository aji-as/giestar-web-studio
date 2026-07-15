"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import gsap from "gsap";
import { type ProductRow, GRADIENT_OPTIONS } from "@/lib/supabase";
import { ImageUpload } from "@/components/ImageUpload";
import { useCategories } from "@/lib/useCategories";

type FormData = Omit<ProductRow, "id" | "created_at">;

const DEFAULT = (defaultCat = "Landing"): FormData => ({
  name: "", category: defaultCat, price_jadi: 0, price_source: 0,
  description: "", image: "", demo_url: "", source_code_url: "", tags: [],
  gradient: GRADIENT_OPTIONS[0], featured: false, status: "active",
});

export default function ProductForm({
  product,
  onClose,
  onSave,
}: {
  product: ProductRow | null;
  onClose: () => void;
  onSave: (data: FormData) => Promise<void>;
}) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const { categories: dbCategories, loading: catLoading } = useCategories();
  const [form, setForm] = useState<FormData>(product ? {
    name: product.name, category: product.category, price_jadi: product.price_jadi,
    price_source: product.price_source, description: product.description, image: product.image || "",
    demo_url: product.demo_url, source_code_url: product.source_code_url || "", tags: product.tags, gradient: product.gradient,
    featured: product.featured, status: product.status,
  } : DEFAULT());
  
  // Set default category when categories are loaded
  useEffect(() => {
    if (!product && dbCategories.length > 0 && !form.category) {
      set("category", dbCategories[0].name);
    }
  }, [dbCategories, product]);

  const [tagsInput, setTagsInput] = useState((product?.tags ?? []).join(", "));
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
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);
    const tags = tagsInput.split(",").map((t) => t.trim()).filter(Boolean);
    try {
      await onSave({ ...form, tags });
    } catch (err: any) {
      setError(err.message ?? "Terjadi kesalahan.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div className="flex-1 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Drawer */}
      <div ref={drawerRef} className="w-full max-w-lg bg-card border-l overflow-y-auto flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b sticky top-0 bg-card z-10">
          <div>
            <h2 className="font-bold text-base">{product ? "Edit Produk" : "Tambah Produk Baru"}</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Isi semua informasi template</p>
          </div>
          <button onClick={onClose} className="grid h-8 w-8 place-items-center rounded-full hover:bg-secondary transition">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 p-6 space-y-5">
          {/* Nama */}
          <Field label="Nama Template" required>
            <input className={inputCls} value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Contoh: Aurora Studio" required />
          </Field>

          {/* Kategori */}
          <Field label="Kategori" required>
            <select className={inputCls} value={form.category} onChange={(e) => set("category", e.target.value)} required>
              {catLoading ? (
                <option>Memuat kategori...</option>
              ) : (
                dbCategories.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)
              )}
            </select>
          </Field>

          {/* Harga */}
          <div className="grid grid-cols-2 gap-3">
            <Field label="Harga Produk Jadi (Rp)" required>
              <input type="number" className={inputCls} value={form.price_jadi || ""} onChange={(e) => set("price_jadi", Number(e.target.value))} placeholder="1500000" required min={0} />
            </Field>
            <Field label="Harga Source Code (Rp)" required>
              <input type="number" className={inputCls} value={form.price_source || ""} onChange={(e) => set("price_source", Number(e.target.value))} placeholder="3500000" required min={0} />
            </Field>
          </div>

          {/* Deskripsi */}
          <Field label="Deskripsi Singkat" required>
            <textarea className={`${inputCls} resize-none h-20`} value={form.description} onChange={(e) => set("description", e.target.value)} placeholder="Deskripsikan template ini dalam 1-2 kalimat." required />
          </Field>

          {/* URL / File Gambar */}
          <Field label="Gambar Cover" hint="Pilih file gambar atau masukkan URL langsung">
            <ImageUpload 
              value={form.image} 
              onChange={(url) => set("image", url)} 
              folder="products" 
            />
          </Field>

          {/* URL Demo */}
          <Field label="URL Demo Live" hint="Link website demo yang sudah di-hosting">
            <input className={inputCls} value={form.demo_url} onChange={(e) => set("demo_url", e.target.value)} placeholder="https://demo.giestar.id/aurora" />
          </Field>

          {/* URL Source Code */}
          <Field label="URL Source Code" hint="Link untuk mengunduh/membeli source code">
            <input className={inputCls} value={form.source_code_url} onChange={(e) => set("source_code_url", e.target.value)} placeholder="https://gumroad.com/l/xxx" />
          </Field>

          {/* Tags */}
          <Field label="Tags Teknologi" hint="Pisah dengan koma. Contoh: Next.js, Tailwind, GSAP">
            <input className={inputCls} value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} placeholder="Next.js, Tailwind, GSAP" />
          </Field>

          {/* Gradient */}
          <Field label="Warna Gradient">
            <div className="grid grid-cols-6 gap-2">
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
            <div className={`mt-2 h-10 rounded-lg bg-gradient-to-r ${form.gradient}`} />
          </Field>

          {/* Status + Featured */}
          <div className="grid grid-cols-2 gap-3">
            <Field label="Status">
              <div className="flex gap-2">
                {(["active", "draft"] as const).map((s) => (
                  <button key={s} type="button" onClick={() => set("status", s)}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium border transition capitalize ${form.status === s ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:bg-secondary"}`}>
                    {s === "active" ? "Aktif" : "Draft"}
                  </button>
                ))}
              </div>
            </Field>
            <Field label="Unggulan di Beranda">
              <button type="button" onClick={() => set("featured", !form.featured)}
                className={`w-full py-2 rounded-lg text-sm font-medium border transition flex items-center justify-center gap-2 ${form.featured ? "bg-yellow-400 text-black border-yellow-400" : "border-border text-muted-foreground hover:bg-secondary"}`}>
                ⭐ {form.featured ? "Ya, unggulan" : "Tidak"}
              </button>
            </Field>
          </div>

          {error && <div className="rounded-xl bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive">{error}</div>}

          {/* Submit */}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-xl border text-sm font-semibold hover:bg-secondary transition">Batal</button>
            <button type="submit" disabled={saving} className="flex-1 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 disabled:opacity-60 transition">
              {saving ? "Menyimpan..." : product ? "Simpan Perubahan" : "Tambah Produk"}
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
