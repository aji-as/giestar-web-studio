export type Product = {
  id: string;
  name: string;
  category: string;
  priceJadi: number;
  priceSource: number;
  tags: string[];
  gradient: string;
  image: string;
  description: string;
};

export const CATEGORIES = ["All", "Landing", "Portfolio", "E-Commerce", "SaaS", "Blog", "Agency"] as const;

export const PRODUCTS: Product[] = [
  { id: "aurora", name: "Aurora Studio", category: "Agency", priceJadi: 1500000, priceSource: 3500000, tags: ["Next.js", "Tailwind", "GSAP"], gradient: "from-indigo-600 via-blue-500 to-cyan-400", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800", description: "Template agency premium dengan animasi scroll cinematic dan grid case study." },
  { id: "monolith", name: "Monolith", category: "Portfolio", priceJadi: 1200000, priceSource: 2800000, tags: ["React", "Framer"], gradient: "from-slate-900 via-slate-700 to-slate-500", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800", description: "Portfolio brutalist untuk kreatif dengan typography editorial." },
  { id: "orbit", name: "Orbit SaaS", category: "SaaS", priceJadi: 2000000, priceSource: 4500000, tags: ["Next.js", "Auth", "Dashboard"], gradient: "from-blue-700 via-blue-500 to-sky-300", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800", description: "Landing SaaS lengkap dengan pricing, dashboard preview, dan feature grid." },
  { id: "prisma", name: "Prisma Shop", category: "E-Commerce", priceJadi: 2500000, priceSource: 5500000, tags: ["Shopify", "Cart"], gradient: "from-fuchsia-600 via-pink-500 to-rose-400", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800", description: "E-commerce modern dengan cart, filter, dan checkout smooth." },
  { id: "quill", name: "Quill Journal", category: "Blog", priceJadi: 1000000, priceSource: 2200000, tags: ["MDX", "CMS"], gradient: "from-amber-500 via-orange-400 to-red-400", image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800", description: "Blog editorial dengan reading mode dan MDX support." },
  { id: "vector", name: "Vector Landing", category: "Landing", priceJadi: 900000, priceSource: 2000000, tags: ["Astro", "Tailwind"], gradient: "from-emerald-600 via-teal-500 to-cyan-400", image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&q=80&w=800", description: "Landing page konversi tinggi untuk startup awal." },
  { id: "nova", name: "Nova Agency", category: "Agency", priceJadi: 1800000, priceSource: 4000000, tags: ["Vite", "GSAP"], gradient: "from-violet-700 via-purple-500 to-fuchsia-400", image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&q=80&w=800", description: "Agency template dengan pinned hero dan case study grid." },
  { id: "helio", name: "Helio Portfolio", category: "Portfolio", priceJadi: 1100000, priceSource: 2500000, tags: ["Next.js"], gradient: "from-yellow-500 via-orange-500 to-pink-500", image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&q=80&w=800", description: "Portfolio warm & bright cocok untuk fotografer." },
  { id: "cobalt", name: "Cobalt SaaS", category: "SaaS", priceJadi: 2200000, priceSource: 4800000, tags: ["Stripe", "Auth"], gradient: "from-blue-800 via-indigo-600 to-blue-400", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800", description: "Landing SaaS enterprise dengan integrasi payment." },
];

export type Blog = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  gradient: string;
  content: string;
};

export const BLOGS: Blog[] = [
  {
    slug: "tren-ui-2026",
    title: "Tren UI Design 2026: Dari Brutalist ke Neo-Minimalism",
    excerpt: "Melihat pergeseran tren desain antarmuka yang membentuk web modern tahun ini.",
    category: "UI/UX",
    date: "5 Juli 2026",
    readTime: "6 min",
    gradient: "from-indigo-600 via-blue-500 to-cyan-400",
    content: "Tahun 2026 menandai konvergensi menarik antara pendekatan brutalist yang berani dengan minimalis modern. Desainer mulai memadukan typography editorial berukuran besar dengan whitespace generous, menghasilkan tampilan yang punya karakter kuat namun tetap fungsional. Grid asimetris, tekstur grain halus, dan penggunaan warna oklch memberi kedalaman baru pada web.",
  },
  {
    slug: "gsap-scrolltrigger",
    title: "GSAP ScrollTrigger: Pinned Hero yang Cinematic",
    excerpt: "Panduan membangun hero section yang tetap diam saat konten scroll di atasnya.",
    category: "Development",
    date: "1 Juli 2026",
    readTime: "8 min",
    gradient: "from-purple-600 via-fuchsia-500 to-pink-400",
    content: "Pinned animation adalah teknik di mana section hero tetap terpaku di viewport sementara konten selanjutnya bergulir menutupinya sebagai overlay. Dengan GSAP ScrollTrigger, kita bisa mengatur trigger, pin, dan scrub untuk menghasilkan efek storytelling yang mulus tanpa mengorbankan performa.",
  },
  {
    slug: "tailwind-v4",
    title: "Tailwind v4: CSS-First Configuration",
    excerpt: "Kenapa Tailwind v4 mengubah cara kita mendefinisikan design token.",
    category: "Development",
    date: "24 Juni 2026",
    readTime: "5 min",
    gradient: "from-teal-500 via-cyan-500 to-blue-500",
    content: "Tailwind v4 memindahkan konfigurasi dari JavaScript ke CSS native dengan @theme. Ini bukan sekadar syntax change; ini shift fundamental yang membuat design system lebih transparan, portable, dan dekat dengan browser.",
  },
  {
    slug: "typography-editorial",
    title: "Typography Editorial di Web Agency",
    excerpt: "Kenapa serif italic dan display font besar mendominasi website agency modern.",
    category: "Design",
    date: "18 Juni 2026",
    readTime: "4 min",
    gradient: "from-amber-500 via-orange-500 to-red-500",
    content: "Pairing serif display seperti Instrument Serif dengan sans-serif geometris seperti Space Grotesk menciptakan kontras yang mengingatkan pada majalah cetak berkualitas. Website agency memanfaatkan ini untuk menyampaikan otoritas sekaligus modernitas.",
  },
  {
    slug: "motion-design-web",
    title: "Motion Design: Kapan Berhenti Menambah Animasi",
    excerpt: "Panduan menahan diri agar animasi menjadi aksen, bukan noise.",
    category: "UI/UX",
    date: "10 Juni 2026",
    readTime: "6 min",
    gradient: "from-rose-500 via-pink-500 to-fuchsia-500",
    content: "Animasi terbaik adalah yang tidak disadari user. Alih-alih menganimasikan setiap elemen, fokuslah pada 3-5 moment kunci: page load, section reveal, hero pinned overlay, dan hover state pada CTA utama.",
  },
  {
    slug: "oklch-color",
    title: "Kenapa oklch Menggantikan hex di 2026",
    excerpt: "Ruang warna baru yang lebih perceptually uniform dan future-proof.",
    category: "Design",
    date: "2 Juni 2026",
    readTime: "5 min",
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    content: "oklch memberi kontrol atas lightness, chroma, dan hue secara terpisah dengan konsistensi persepsi manusia. Hasilnya: palette yang lebih harmonis dan dark mode yang lebih mudah diturunkan.",
  },
];

export const WA_NUMBER = "6281234567890";
export const waLink = (msg: string) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

export const formatIDR = (n: number) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);
