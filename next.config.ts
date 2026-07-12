import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Kompresi gzip otomatis untuk semua response
  compress: true,

  // Optimasi gambar — izinkan domain Supabase Storage
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "zcbfnimnkqynptdaulwj.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.simpleicons.org",
      },
    ],
    formats: ["image/avif", "image/webp"],
    // Vercel free tier: batasi ukuran gambar yang di-optimize
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },

  // Headers untuk caching statis & keamanan
  async headers() {
    return [
      {
        // Cache assets statis (gambar, font, dll) selama 1 tahun
        source: "/:all*(svg|jpg|jpeg|png|webp|avif|ico|woff|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Cache halaman publik selama 60 detik, lalu revalidate di background
        source: "/((?!dashboard|login|api).*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=60, stale-while-revalidate=300",
          },
        ],
      },
      {
        // Security headers
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },

  // Optimalkan bundle: pindahkan package berat ke vendor chunk terpisah
  experimental: {
    optimizePackageImports: ["lucide-react", "gsap"],
  },
};

export default nextConfig;
