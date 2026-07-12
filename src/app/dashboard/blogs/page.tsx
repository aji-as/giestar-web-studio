"use client";

import { useState } from "react";
import { useBlogs } from "@/lib/useBlogs";
import { type BlogRow } from "@/lib/supabase";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import BlogForm from "./BlogForm";

export default function BlogsPage() {
  const { blogs, loading, addBlog, updateBlog, deleteBlog } = useBlogs();
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<BlogRow | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  function openNew() { setEditing(null); setFormOpen(true); }
  function openEdit(b: BlogRow) { setEditing(b); setFormOpen(true); }

  async function handleDelete(id: string) {
    if (!confirm("Hapus artikel ini?")) return;
    setDeleting(id);
    await deleteBlog(id).finally(() => setDeleting(null));
  }

  const published = blogs.filter((b) => b.published).length;
  const draft = blogs.filter((b) => !b.published).length;

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Blog</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Kelola artikel dan konten blog website Anda.</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 rounded-xl bg-primary text-primary-foreground px-4 py-2.5 text-sm font-semibold hover:bg-primary/90 transition">
          <Plus className="h-4 w-4" /> Tulis Artikel
        </button>
      </div>

      {/* Stats pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { label: `${blogs.length} total`, color: "bg-muted text-muted-foreground" },
          { label: `${published} published`, color: "bg-emerald-100 text-emerald-700" },
          { label: `${draft} draft`, color: "bg-amber-100 text-amber-700" },
        ].map((s) => (
          <span key={s.label} className={`text-xs px-3 py-1.5 rounded-full font-semibold ${s.color}`}>{s.label}</span>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-2xl border bg-card overflow-hidden">
        {loading ? (
          <div className="p-8 space-y-3">
            {[1, 2, 3].map((i) => <div key={i} className="h-14 rounded-xl bg-muted animate-pulse" />)}
          </div>
        ) : blogs.length === 0 ? (
          <div className="p-16 text-center">
            <div className="text-4xl mb-3">📝</div>
            <div className="font-semibold">Belum ada artikel</div>
            <p className="text-sm text-muted-foreground mt-1">Klik "Tulis Artikel" untuk mulai.</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/30">
                <th className="text-left px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Artikel</th>
                <th className="text-left px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider hidden sm:table-cell">Kategori</th>
                <th className="text-left px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider hidden md:table-cell">Tanggal</th>
                <th className="text-left px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider hidden md:table-cell">Waktu Baca</th>
                <th className="text-center px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y">
              {blogs.map((b) => (
                <tr key={b.id} className="hover:bg-muted/20 transition">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {b.image ? (
                        <img src={b.image} alt={b.title} className="w-10 h-10 rounded-xl object-cover flex-shrink-0 border" />
                      ) : (
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${b.gradient} flex-shrink-0`} />
                      )}
                      <div>
                        <div className="font-semibold line-clamp-1">{b.title}</div>
                        <div className="text-[11px] text-muted-foreground">/blog/{b.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{b.category}</td>
                  <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{b.date}</td>
                  <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{b.read_time}</td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => updateBlog(b.id, { published: !b.published })}
                      className={`inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full font-semibold transition ${
                        b.published ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200" : "bg-amber-100 text-amber-700 hover:bg-amber-200"
                      }`}
                    >
                      {b.published ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                      {b.published ? "Published" : "Draft"}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => openEdit(b)} className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition">
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button onClick={() => handleDelete(b.id)} disabled={deleting === b.id} className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground hover:bg-red-50 hover:text-red-500 transition disabled:opacity-50">
                        {deleting === b.id ? <span className="h-3.5 w-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
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
        <BlogForm
          blog={editing}
          onClose={() => setFormOpen(false)}
          onSave={async (data) => {
            if (editing) await updateBlog(editing.id, data);
            else await addBlog(data as Omit<BlogRow, "id" | "created_at">);
            setFormOpen(false);
          }}
        />
      )}
    </div>
  );
}
