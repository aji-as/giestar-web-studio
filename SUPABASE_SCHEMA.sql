-- =============================================
-- Giestar Web Studio — Supabase Schema
-- Jalankan script ini di Supabase SQL Editor:
-- Dashboard → SQL Editor → New Query → Paste → Run
-- =============================================

-- ============ TABLE: products ============
CREATE TABLE IF NOT EXISTS products (
  id          uuid            DEFAULT gen_random_uuid() PRIMARY KEY,
  name        text            NOT NULL,
  category    text            NOT NULL,
  price_jadi  bigint          NOT NULL DEFAULT 0,
  price_source bigint         NOT NULL DEFAULT 0,
  description text            NOT NULL DEFAULT '',
  image       text            NOT NULL DEFAULT '',
  demo_url    text            NOT NULL DEFAULT '',
  source_code_url text        NOT NULL DEFAULT '',
  tags        text[]          NOT NULL DEFAULT '{}',
  gradient    text            NOT NULL DEFAULT 'from-indigo-600 via-blue-500 to-cyan-400',
  featured    boolean         NOT NULL DEFAULT false,
  status      text            NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'draft')),
  created_at  timestamptz     DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Public: read only active products
CREATE POLICY "public_read_active_products" ON products
  FOR SELECT USING (status = 'active');

-- Authenticated: full access
CREATE POLICY "auth_all_products" ON products
  FOR ALL USING (auth.role() = 'authenticated');


-- ============ TABLE: blogs ============
CREATE TABLE IF NOT EXISTS blogs (
  id          uuid            DEFAULT gen_random_uuid() PRIMARY KEY,
  slug        text            UNIQUE NOT NULL,
  title       text            NOT NULL,
  excerpt     text            NOT NULL DEFAULT '',
  content     text            NOT NULL DEFAULT '',
  category    text            NOT NULL DEFAULT 'Development',
  date        text            NOT NULL DEFAULT '',
  read_time   text            NOT NULL DEFAULT '5 min',
  gradient    text            NOT NULL DEFAULT 'from-indigo-600 via-blue-500 to-cyan-400',
  published   boolean         NOT NULL DEFAULT false,
  created_at  timestamptz     DEFAULT now()
);

ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Public: read only published blogs
CREATE POLICY "public_read_published_blogs" ON blogs
  FOR SELECT USING (published = true);

-- Authenticated: full access
CREATE POLICY "auth_all_blogs" ON blogs
  FOR ALL USING (auth.role() = 'authenticated');


-- ============ SEED: Products ============
INSERT INTO products (name, category, price_jadi, price_source, description, image, demo_url, tags, gradient, featured, status) VALUES
('Aurora Studio', 'Agency', 1500000, 3500000, 'Template agency premium dengan animasi scroll cinematic dan grid case study.', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800', '', ARRAY['Next.js', 'Tailwind', 'GSAP'], 'from-indigo-600 via-blue-500 to-cyan-400', true, 'active'),
('Monolith', 'Portfolio', 1200000, 2800000, 'Portfolio brutalist untuk kreatif dengan typography editorial.', 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800', '', ARRAY['React', 'Framer'], 'from-slate-900 via-slate-700 to-slate-500', true, 'active'),
('Orbit SaaS', 'SaaS', 2000000, 4500000, 'Landing SaaS lengkap dengan pricing, dashboard preview, dan feature grid.', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800', '', ARRAY['Next.js', 'Auth', 'Dashboard'], 'from-blue-700 via-blue-500 to-sky-300', true, 'active'),
('Prisma Shop', 'E-Commerce', 2500000, 5500000, 'E-commerce modern dengan cart, filter, dan checkout smooth.', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800', '', ARRAY['Shopify', 'Cart'], 'from-fuchsia-600 via-pink-500 to-rose-400', false, 'active'),
('Quill Journal', 'Blog', 1000000, 2200000, 'Blog editorial dengan reading mode dan MDX support.', 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800', '', ARRAY['MDX', 'CMS'], 'from-amber-500 via-orange-400 to-red-400', false, 'active'),
('Vector Landing', 'Landing', 900000, 2000000, 'Landing page konversi tinggi untuk startup awal.', 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&q=80&w=800', '', ARRAY['Astro', 'Tailwind'], 'from-emerald-600 via-teal-500 to-cyan-400', false, 'active'),
('Nova Agency', 'Agency', 1800000, 4000000, 'Agency template dengan pinned hero dan case study grid.', 'https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&q=80&w=800', '', ARRAY['Vite', 'GSAP'], 'from-violet-700 via-purple-500 to-fuchsia-400', false, 'active'),
('Helio Portfolio', 'Portfolio', 1100000, 2500000, 'Portfolio warm & bright cocok untuk fotografer.', 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&q=80&w=800', '', ARRAY['Next.js'], 'from-yellow-500 via-orange-500 to-pink-500', false, 'active'),
('Cobalt SaaS', 'SaaS', 2200000, 4800000, 'Landing SaaS enterprise dengan integrasi payment.', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800', '', ARRAY['Stripe', 'Auth'], 'from-blue-800 via-indigo-600 to-blue-400', false, 'active');


-- ============ SEED: Blogs ============
INSERT INTO blogs (slug, title, excerpt, content, category, date, read_time, gradient, published) VALUES
('tren-ui-2026', 'Tren UI Design 2026: Dari Brutalist ke Neo-Minimalism', 'Melihat pergeseran tren desain antarmuka yang membentuk web modern tahun ini.', 'Tahun 2026 menandai konvergensi menarik antara pendekatan brutalist yang berani dengan minimalis modern. Desainer mulai memadukan typography editorial berukuran besar dengan whitespace generous, menghasilkan tampilan yang punya karakter kuat namun tetap fungsional. Grid asimetris, tekstur grain halus, dan penggunaan warna oklch memberi kedalaman baru pada web.', 'UI/UX', '5 Juli 2026', '6 min', 'from-indigo-600 via-blue-500 to-cyan-400', true),
('gsap-scrolltrigger', 'GSAP ScrollTrigger: Pinned Hero yang Cinematic', 'Panduan membangun hero section yang tetap diam saat konten scroll di atasnya.', 'Pinned animation adalah teknik di mana section hero tetap terpaku di viewport sementara konten selanjutnya bergulir menutupinya sebagai overlay. Dengan GSAP ScrollTrigger, kita bisa mengatur trigger, pin, dan scrub untuk menghasilkan efek storytelling yang mulus tanpa mengorbankan performa.', 'Development', '1 Juli 2026', '8 min', 'from-purple-600 via-fuchsia-500 to-pink-400', true),
('tailwind-v4', 'Tailwind v4: CSS-First Configuration', 'Kenapa Tailwind v4 mengubah cara kita mendefinisikan design token.', 'Tailwind v4 memindahkan konfigurasi dari JavaScript ke CSS native dengan @theme. Ini bukan sekadar syntax change; ini shift fundamental yang membuat design system lebih transparan, portable, dan dekat dengan browser.', 'Development', '24 Juni 2026', '5 min', 'from-teal-500 via-cyan-500 to-blue-500', true),
('typography-editorial', 'Typography Editorial di Web Agency', 'Kenapa serif italic dan display font besar mendominasi website agency modern.', 'Pairing serif display seperti Instrument Serif dengan sans-serif geometris seperti Space Grotesk menciptakan kontras yang mengingatkan pada majalah cetak berkualitas. Website agency memanfaatkan ini untuk menyampaikan otoritas sekaligus modernitas.', 'Design', '18 Juni 2026', '4 min', 'from-amber-500 via-orange-500 to-red-500', true),
('motion-design-web', 'Motion Design: Kapan Berhenti Menambah Animasi', 'Panduan menahan diri agar animasi menjadi aksen, bukan noise.', 'Animasi terbaik adalah yang tidak disadari user. Alih-alih menganimasikan setiap elemen, fokuslah pada 3-5 moment kunci: page load, section reveal, hero pinned overlay, dan hover state pada CTA utama.', 'UI/UX', '10 Juni 2026', '6 min', 'from-rose-500 via-pink-500 to-fuchsia-500', true),
('oklch-color', 'Kenapa oklch Menggantikan hex di 2026', 'Ruang warna baru yang lebih perceptually uniform dan future-proof.', 'oklch memberi kontrol atas lightness, chroma, dan hue secara terpisah dengan konsistensi persepsi manusia. Hasilnya: palette yang lebih harmonis dan dark mode yang lebih mudah diturunkan.', 'Design', '2 Juni 2026', '5 min', 'from-emerald-500 via-teal-500 to-cyan-500', true);
