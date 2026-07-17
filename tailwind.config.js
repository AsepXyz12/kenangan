/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#17241E",
        parchment: "#F6F1E4",
        emerald: {
          DEFAULT: "#123832",
          light: "#1E5C50",
        },
        gold: "#B8923F",
        clay: "#A8492E",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        stamp: ["var(--font-stamp)", "monospace"],
      },
      backgroundImage: {
        weave: "radial-gradient(circle at 1px 1px, rgba(18,56,50,0.08) 1px, transparent 0)",
      },
    },
  },
  plugins: [],
};
