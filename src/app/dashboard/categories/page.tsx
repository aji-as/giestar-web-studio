"use client";

import { useState } from "react";
import { useCategories } from "@/lib/useCategories";
import { Plus, Pencil, Trash2, X, Check } from "lucide-react";

export default function CategoriesPage() {
  const { categories, loading, addCategory, updateCategory, deleteCategory } = useCategories();
  const [newCatName, setNewCatName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    setError("");
    setSubmitting(true);
    try {
      await addCategory(newCatName.trim());
      setNewCatName("");
    } catch (err: any) {
      setError(err.message ?? "Gagal menambahkan kategori.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleStartEdit = (id: string, name: string) => {
    setEditingId(id);
    setEditName(name);
  };

  const handleSaveEdit = async (id: string) => {
    if (!editName.trim()) return;
    setError("");
    setSubmitting(true);
    try {
      await updateCategory(id, editName.trim());
      setEditingId(null);
    } catch (err: any) {
      setError(err.message ?? "Gagal mengubah kategori.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus kategori ini? Produk yang menggunakan kategori ini tidak akan terhapus, tapi kategori mereka di web akan kosong/tidak valid.")) return;
    setError("");
    try {
      await deleteCategory(id);
    } catch (err: any) {
      setError(err.message ?? "Gagal menghapus kategori.");
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-2xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Kategori</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Kelola kategori untuk katalog template produk Anda.</p>
      </div>

      {/* Add Form */}
      <form onSubmit={handleAdd} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Nama kategori baru..."
          value={newCatName}
          onChange={(e) => setNewCatName(e.target.value)}
          className="flex-1 rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary/50 transition"
          required
        />
        <button
          type="submit"
          disabled={submitting}
          className="flex items-center gap-2 rounded-xl bg-primary text-primary-foreground px-4 py-2.5 text-sm font-semibold hover:bg-primary/90 transition disabled:opacity-60"
        >
          <Plus className="h-4 w-4" /> Tambah
        </button>
      </form>

      {error && <div className="rounded-xl bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive mb-4">{error}</div>}

      {/* List */}
      <div className="rounded-2xl border bg-card overflow-hidden">
        {loading ? (
          <div className="p-8 space-y-3">
            {[1, 2, 3].map((i) => <div key={i} className="h-12 rounded-xl bg-muted animate-pulse" />)}
          </div>
        ) : categories.length === 0 ? (
          <div className="p-10 text-center text-muted-foreground">Belum ada kategori.</div>
        ) : (
          <div className="divide-y">
            {categories.map((c) => (
              <div key={c.id} className="flex items-center justify-between p-4 hover:bg-muted/10 transition">
                {editingId === c.id ? (
                  <div className="flex items-center gap-2 flex-1 mr-4">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="flex-1 rounded-lg border border-border bg-background px-3 py-1.5 text-sm outline-none focus:border-primary/50"
                      autoFocus
                    />
                    <button onClick={() => handleSaveEdit(c.id)} disabled={submitting} className="p-2 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition">
                      <Check className="h-4 w-4" />
                    </button>
                    <button onClick={() => setEditingId(null)} className="p-2 rounded-lg bg-gray-50 text-gray-500 hover:bg-gray-100 transition">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <span className="font-medium text-sm">{c.name}</span>
                    <div className="flex items-center gap-1">
                      <button onClick={() => handleStartEdit(c.id, c.name)} className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition">
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button onClick={() => handleDelete(c.id)} className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground hover:bg-red-50 hover:text-red-500 transition">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
