# Giestar Web Studio

Selamat datang di repository Giestar Web Studio! Website ini telah dimigrasi dari TanStack Start (Vite) ke **Next.js 15 App Router** menggunakan React 19.

## Teknologi Utama
- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS v4 + PostCSS
- **Animasi**: GSAP (GreenSock Animation Platform)
- **Ikon**: Lucide React

## Cara Menjalankan Project (Local Development)

Pastikan Anda sudah menginstal Node.js versi terbaru.

1. Install dependensi:
   ```bash
   npm install
   ```

2. Jalankan development server:
   ```bash
   npm run dev
   ```

3. Buka browser dan arahkan ke [http://localhost:3000](http://localhost:3000)

## Struktur Folder

- `src/app/`: Menyimpan struktur routing Next.js (Home, Produk, Blog)
- `src/components/`: Kumpulan UI Components yang dapat digunakan ulang (Navbar, Footer, HeroWave, dll)
- `src/lib/`: Menyimpan data statis (katalog produk, artikel blog, dan utility format)
- `src/hooks/`: Custom hooks (seperti `useHydrated`)

## Konfigurasi
- **next.config.ts**: Pada Next.js versi 15, file `next.config.ts` **tidak wajib** jika kita tidak membutuhkan pengaturan kustom khusus (seperti custom redirects, manipulasi webpack/turbopack, atau image domains optimization). Konfigurasi bawaan Next.js sudah sangat cukup untuk project ini. Oleh karena itu, kita tidak membuatnya agar direktori tetap bersih.
- **postcss.config.mjs**: Mengkonfigurasi Tailwind CSS v4 di Next.js menggunakan `@tailwindcss/postcss`.

## Lisensi
Hak cipta dilindungi oleh Giestar Web Studio.
