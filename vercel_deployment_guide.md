# Panduan Lengkap Deploy Giestar Web Studio ke Vercel

Proyek Next.js 15 Anda yang terintegrasi dengan Supabase (Database, Auth, dan Storage) dapat di-host secara gratis di Vercel. Ikuti langkah-langkah detail di bawah ini agar proses deployment berjalan lancar dan semua fitur berfungsi 100%.

---

## Langkah 1: Persiapan Repositori Git (GitHub)

Vercel akan memantau repositori Git Anda untuk melakukan build otomatis setiap kali ada perubahan kode.

1. Buat repositori baru di GitHub (misal: `giestar-web-studio`).
2. Pastikan file `.env.local` Anda **tidak diunggah** ke GitHub (sudah otomatis terdaftar di file `.gitignore`).
3. Hubungkan folder proyek lokal Anda dan lakukan commit ke GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: setup proyek siap deploy"
   git branch -M main
   git remote add origin https://github.com/USERNAME/NAMA-REPOSITORI.git
   git push -u origin main
   ```

---

## Langkah 2: Deploy Proyek di Vercel

1. Buka dashboard Vercel di [https://vercel.com/dashboard](https://vercel.com/dashboard) dan masuk menggunakan akun GitHub Anda.
2. Klik tombol **"Add New..."** lalu pilih **"Project"**.
3. Cari repositori GitHub yang baru Anda buat (`giestar-web-studio`) dan klik **"Import"**.
4. Di bagian **Configure Project**:
   - **Framework Preset**: Biarkan terdeteksi otomatis sebagai **Next.js**.
   - **Root Directory**: `./` (biarkan default).

---

## Langkah 3: Konfigurasi Environment Variables di Vercel

Ini adalah langkah paling penting agar website Anda bisa membaca data dari Supabase.

1. Pada konfigurasi project Vercel sebelum mengklik deploy, buka menu dropdown **"Environment Variables"**.
2. Masukkan dua variabel berikut (sesuaikan dengan nilai yang ada di `.env.local` komputer Anda):

| Key | Value (Gunakan URL/Key Supabase Anda) |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://zcbfnimnkqynptdaulwj.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `sb_publishable_euBY7eOrEsjJ76vb2rfHVA_g1He6NH_` |

3. Klik **"Add"** setelah mengisi setiap barisnya.
4. Klik tombol **"Deploy"**. Tunggu proses build selesai sekitar 1-2 menit hingga muncul kembang api! 🥳

---

## Langkah 4: Sinkronisasi redirect URL di Supabase Auth (PENTING!)

Karena proyek ini menggunakan middleware untuk mengamankan halaman `/dashboard`, Supabase perlu tahu ke mana harus mengarahkan user kembali setelah proses autentikasi (login/logout).

Jika Anda tidak mengatur ini, fitur login/logout di website versi production akan error atau redirect ke `localhost`.

1. Buka dashboard Supabase Anda di [https://supabase.com/dashboard](https://supabase.com/dashboard).
2. Pergi ke menu **Authentication** (ikon gembok 🔐) -> **Settings** -> **URL Configuration**.
3. Di bagian **Site URL**:
   - Ganti dengan domain utama Anda: `https://giestar.web.id`
4. Di bagian **Redirect URLs**:
   - Klik **"Add URL"** dan masukkan domain Anda beserta wildcard callback:
     - `https://giestar.web.id/**`
     - *(Opsional)* Jika Anda ingin menguji di URL preview bawaan Vercel, Anda juga bisa menambahkan: `https://*-your-username.vercel.app/**` (gunakan tanda `*` di depan agar semua domain preview Vercel diizinkan).
5. Klik **Save** di pojok bawah.

---

## Langkah 5: Hubungkan Domain Custom (`giestar.web.id`)

Agar website Anda bisa diakses melalui alamat domain kustom Anda:

1. Di dashboard Vercel, buka proyek Anda dan masuk ke menu **Settings** -> **Domains**.
2. Ketik domain Anda: `giestar.web.id` lalu klik **Add**.
3. Pilih opsi redirect yang disarankan (misal mengarahkan `www.giestar.web.id` ke `giestar.web.id`).
4. Vercel akan menampilkan konfigurasi **DNS Records** yang perlu Anda masukkan di panel penyedia domain Anda (seperti Rumahweb, Niagahoster, Domainesia, dll):
   - **A Record**: Arahkan `@` ke IP Vercel (`76.76.21.21`).
   - **CNAME Record**: Arahkan `www` ke `cname.vercel-dns.com`.
5. Setelah DNS ter-update (biasanya memakan waktu 5-30 menit), status di Vercel akan berubah menjadi **Valid Configuration** berwarna hijau dan SSL akan terpasang otomatis.

Website Anda kini telah online dengan aman, cepat, dan terintegrasi penuh dengan Supabase! 🚀
