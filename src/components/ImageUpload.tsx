"use client";

import { useState } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { createBrowserClient } from "@/lib/supabase";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
}

export function ImageUpload({ value, onChange, folder = "general" }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate initial size roughly (max 10MB before conversion)
    if (file.size > 10 * 1024 * 1024) {
      setError("Ukuran file awal maksimal 10MB");
      return;
    }

    try {
      setUploading(true);
      setError("");

      // 1. Convert to WebP using Canvas
      const webpBlob = await convertToWebP(file);
      
      // Validate final size (max 2MB)
      if (webpBlob.size > 2 * 1024 * 1024) {
         setError("Ukuran file setelah kompresi masih melebihi 2MB");
         setUploading(false);
         return;
      }

      const supabase = createBrowserClient();
      const fileName = `${folder}/${Math.random().toString(36).substring(2, 15)}-${Date.now()}.webp`;

      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(fileName, webpBlob, { cacheControl: "3600", upsert: false, contentType: "image/webp" });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("images").getPublicUrl(fileName);
      onChange(data.publicUrl);
    } catch (err: any) {
      setError(err.message ?? "Gagal mengunggah gambar.");
    } finally {
      setUploading(false);
      // Reset input value so the same file can be selected again if needed
      e.target.value = "";
    }
  };

  // Helper function to convert Image File to WebP Blob
  function convertToWebP(file: File): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(new Error("Gagal membaca file gambar."));
      reader.onload = (e) => {
        const img = new Image();
        img.onerror = () => reject(new Error("Gagal memuat gambar untuk konversi."));
        img.onload = () => {
          const canvas = document.createElement("canvas");
          
          // Optional: resize if too large (max 1920x1920)
          let { width, height } = img;
          const MAX_SIZE = 1920;
          if (width > MAX_SIZE || height > MAX_SIZE) {
            const ratio = Math.min(MAX_SIZE / width, MAX_SIZE / height);
            width *= ratio;
            height *= ratio;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (!ctx) return reject(new Error("Gagal membuat canvas context."));
          
          ctx.drawImage(img, 0, 0, width, height);
          
          // Convert to WebP with 0.8 quality
          canvas.toBlob(
            (blob) => {
              if (blob) resolve(blob);
              else reject(new Error("Gagal konversi ke WebP."));
            },
            "image/webp",
            0.8
          );
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  }

  return (
    <div className="space-y-2">
      {value ? (
        <div className="relative group rounded-xl border overflow-hidden bg-muted">
          <img src={value} alt="Uploaded" className="w-full h-32 object-cover" />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button
              type="button"
              onClick={() => onChange("")}
              className="flex items-center gap-2 bg-red-500 text-white px-3 py-1.5 rounded-lg text-sm font-semibold hover:bg-red-600 transition"
            >
              <X className="h-4 w-4" /> Hapus
            </button>
          </div>
        </div>
      ) : (
        <label className="relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer hover:bg-muted/50 border-muted-foreground/25 transition">
          <div className="flex flex-col items-center justify-center pt-5 pb-6 text-muted-foreground">
            {uploading ? (
              <>
                <Loader2 className="w-8 h-8 mb-2 animate-spin" />
                <p className="text-sm">Mengunggah...</p>
              </>
            ) : (
              <>
                <Upload className="w-8 h-8 mb-2 opacity-50" />
                <p className="text-sm font-semibold">Klik untuk unggah gambar</p>
                <p className="text-[10px] mt-1 opacity-70">PNG, JPG, WEBP (Max 2MB)</p>
              </>
            )}
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/png, image/jpeg, image/webp"
            onChange={handleUpload}
            disabled={uploading}
          />
        </label>
      )}
      
      {/* OR enter URL manually */}
      <div className="flex items-center gap-2 mt-2">
        <div className="h-px bg-border flex-1" />
        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">ATAU LINK</span>
        <div className="h-px bg-border flex-1" />
      </div>
      <input
        type="text"
        placeholder="https://..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus:border-primary/50 transition placeholder:text-muted-foreground/50 mt-2"
      />
      
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
