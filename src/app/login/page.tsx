"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@/lib/supabase";
import { Eye, EyeOff, LogIn } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const supabase = createBrowserClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError("Email atau password salah. Silakan coba lagi.");
      setLoading(false);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  }

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center p-4" style={{ background: "radial-gradient(ellipse at 50% 0%, oklch(0.35 0.22 265) 0%, oklch(0.09 0.05 265) 55%, oklch(0.06 0.03 265) 100%)" }}>
      {/* Animated grid */}
      <div className="fixed inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "linear-gradient(oklch(1 0 0) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      <div className="relative z-10 w-full max-w-sm">
        {/* Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-3">
            <img src="/logo.png" alt="Giestar Logo" className="h-9 w-auto object-contain brightness-0 invert" />
          </div>
          <p className="text-white/50 text-sm">Dashboard Admin</p>
        </div>

        {/* Card */}
        <div className="rounded-3xl border border-white/10 p-8" style={{ background: "oklch(0.14 0.04 265 / 0.8)", backdropFilter: "blur(20px)" }}>
          <h1 className="text-white text-xl font-bold mb-1">Selamat datang kembali</h1>
          <p className="text-white/50 text-sm mb-6">Masuk untuk mengelola konten website.</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-white/60 uppercase tracking-widest block mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@giestar.id"
                className="w-full rounded-xl bg-white/5 border border-white/10 text-white px-4 py-3 text-sm outline-none focus:border-white/40 focus:bg-white/8 transition placeholder:text-white/30"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-white/60 uppercase tracking-widest block mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full rounded-xl bg-white/5 border border-white/10 text-white px-4 py-3 pr-11 text-sm outline-none focus:border-white/40 transition placeholder:text-white/30"
                />
                <button type="button" onClick={() => setShowPw((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition">
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-xl bg-red-500/15 border border-red-500/25 px-4 py-3 text-sm text-red-300">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white transition disabled:opacity-60"
              style={{ background: "linear-gradient(135deg, oklch(0.45 0.24 265), oklch(0.6 0.22 258))" }}
            >
              {loading ? (
                <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              ) : (
                <LogIn className="h-4 w-4" />
              )}
              {loading ? "Memproses..." : "Masuk ke Dashboard"}
            </button>
          </form>
        </div>

        <p className="text-center text-white/30 text-xs mt-6">
          Hanya untuk admin Giestar Web Studio
        </p>
      </div>
    </div>
  );
}
