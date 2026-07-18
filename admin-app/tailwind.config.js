/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#1C1C1C",
        paper: "#FAFAF8",
        line: "#D8D5CC",
        accent: "#123832",
        danger: "#A8492E",
        // Palet "scrapbook" milik situs publik — dipakai khusus di halaman
        // /cetak supaya hasil cetak/PDF konsisten dengan tampilan galeri.
        cetakInk: "#17241E",
        parchment: "#F6F1E4",
        parchment2: "#EFE7D2",
        cetakEmerald: {
          DEFAULT: "#123832",
          light: "#1E5C50",
        },
        cetakGold: "#B8923F",
        cetakClay: "#A8492E",
        cetakDusk: "#2F4858",
      },
      fontFamily: {
        mono: ["var(--font-mono)", "monospace"],
        // Trio font situs publik, dipakai lewat class font-cetak-* di /cetak.
        cetakDisplay: ["var(--font-cetak-display)", "serif"],
        cetakBody: ["var(--font-cetak-body)", "sans-serif"],
        cetakStamp: ["var(--font-cetak-stamp)", "monospace"],
      },
    },
  },
  plugins: [],
};
