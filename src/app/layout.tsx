import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Instrument_Serif } from "next/font/google";
import "../styles.css";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://giestar.web.id"),
  title: {
    default: "Giestar — Jasa Pembuatan Website Pemalang & Template Premium",
    template: "%s — Giestar",
  },
  description:
    "Jasa pembuatan website Pemalang profesional & template website modern terjangkau. Beli produk website jadi atau source code premium dengan harga transparan.",
  keywords: [
    "jasa pembuatan website pemalang",
    "jasa website pemalang",
    "website terjangkau",
    "website modern",
    "template website",
    "design website modern",
    "buat website pemalang",
    "jasa website murah",
    "giestar web studio"
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Giestar — Jasa Pembuatan Website Pemalang & Template Premium",
    description:
      "Beli template website modern siap pakai atau pesan jasa pembuatan website premium di Pemalang. Harga transparan, pengerjaan cepat.",
    url: "https://giestar.web.id",
    siteName: "Giestar Web Studio",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Giestar — Jasa Pembuatan Website Pemalang & Template Premium",
    description: "Jasa pembuatan website Pemalang profesional & template website modern terjangkau.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Giestar Web Studio",
    "image": "https://giestar.web.id/logo.png",
    "@id": "https://giestar.web.id/#organization",
    "url": "https://giestar.web.id",
    "telephone": "+6285150727624",
    "priceRange": "Rp900.000 - Rp5.000.000",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Pemalang, Jawa Tengah",
      "addressLocality": "Pemalang",
      "addressRegion": "Jawa Tengah",
      "postalCode": "52311",
      "addressCountry": "ID"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -6.8903,
      "longitude": 109.3814
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "sameAs": [
      "https://www.instagram.com/giestar_id",
      "https://wa.me/6285150727624",
      "https://www.facebook.com/Giestar.id"
    ]
  };

  return (
    <html lang="id" className={`scroll-smooth ${sans.variable} ${serif.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

