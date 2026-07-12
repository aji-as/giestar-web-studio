"use client";

import { useState } from "react";
import { useProducts } from "@/lib/useProducts";
import { formatIDR, type ProductRow } from "@/lib/supabase";
import { Plus, Pencil, Trash2, Star, Eye, EyeOff } from "lucide-react";
import ProductForm from "./ProductForm";

export default function ProductsPage() {
  const { products, loading, addProduct, updateProduct, deleteProduct } = useProducts();
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<ProductRow | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  function openNew() { setEditing(null); setFormOpen(true); }
  function openEdit(p: ProductRow) { setEditing(p); setFormOpen(true); }

  async function handleDelete(id: string) {
    if (!confirm("Hapus produk ini?")) return;
    setDeleting(id);
    await deleteProduct(id).finally(() => setDeleting(null));
  }

  const active = products.filter((p) => p.status === "active").length;
  const draft = products.filter((p) => p.status === "draft").length;
  const featured = products.filter((p) => p.featured).length;

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Produk</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Kelola katalog template website Anda.</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 rounded-xl bg-primary text-primary-foreground px-4 py-2.5 text-sm font-semibold hover:bg-primary/90 transition">
          <Plus className="h-4 w-4" /> Tambah Produk
        </button>
      </div>

      {/* Stats pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { label: `${products.length} total`, color: "bg-muted text-muted-foreground" },
          { label: `${active} aktif`, color: "bg-emerald-100 text-emerald-700" },
          { label: `${draft} draft`, color: "bg-amber-100 text-amber-700" },
          { label: `${featured} unggulan`, color: "bg-blue-100 text-blue-700" },
        ].map((s) => (
          <span key={s.label} className={`text-xs px-3 py-1.5 rounded-full font-semibold ${s.color}`}>{s.label}</span>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-2xl border bg-card overflow-hidden">
        {loading ? (
          <div className="p-8 space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-14 rounded-xl bg-muted animate-pulse" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="p-16 text-center">
            <div className="text-4xl mb-3">📦</div>
            <div className="font-semibold">Belum ada produk</div>
            <p className="text-sm text-muted-foreground mt-1">Klik "Tambah Produk" untuk mulai.</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/30">
                <th className="text-left px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Produk</th>
                <th className="text-left px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider hidden sm:table-cell">Kategori</th>
                <th className="text-left px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider hidden md:table-cell">Harga Jadi</th>
                <th className="text-left px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider hidden lg:table-cell">Harga Source</th>
                <th className="text-center px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Status</th>
                <th className="text-center px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Unggulan</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-muted/20 transition">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${p.gradient} flex-shrink-0 overflow-hidden`}>
                        {p.image && <img src={p.image} alt="" className="w-full h-full object-cover" />}
                      </div>
                      <div>
                        <div className="font-semibold">{p.name}</div>
                        {p.demo_url && <a href={p.demo_url} target="_blank" rel="noreferrer" className="text-[11px] text-primary hover:underline">Lihat Demo →</a>}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{p.category}</td>
                  <td className="px-4 py-3 font-medium hidden md:table-cell">{formatIDR(p.price_jadi)}</td>
                  <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell">{formatIDR(p.price_source)}</td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => updateProduct(p.id, { status: p.status === "active" ? "draft" : "active" })}
                      className={`inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full font-semibold transition ${
                        p.status === "active" ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200" : "bg-amber-100 text-amber-700 hover:bg-amber-200"
                      }`}
                    >
                      {p.status === "active" ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                      {p.status === "active" ? "Aktif" : "Draft"}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => updateProduct(p.id, { featured: !p.featured })}
                      className={`transition ${p.featured ? "text-yellow-500" : "text-muted-foreground hover:text-yellow-400"}`}
                    >
                      <Star className={`h-4 w-4 ${p.featured ? "fill-yellow-400" : ""}`} />
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => openEdit(p)} className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition">
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button onClick={() => handleDelete(p.id)} disabled={deleting === p.id} className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground hover:bg-red-50 hover:text-red-500 transition disabled:opacity-50">
                        {deleting === p.id ? <span className="h-3.5 w-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {formOpen && (
        <ProductForm
          product={editing}
          onClose={() => setFormOpen(false)}
          onSave={async (data) => {
            if (editing) await updateProduct(editing.id, data);
            else await addProduct(data as Omit<ProductRow, "id" | "created_at">);
            setFormOpen(false);
          }}
        />
      )}
    </div>
  );
}
