// Deklarasi tipe agar TypeScript mengenali import file CSS (side-effect import).
// Tanpa ini, editor menandai `import "../styles.css"` sebagai error TS2882,
// meskipun Next.js sebenarnya mendukungnya saat build.
declare module "*.css";
