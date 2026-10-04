/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cinzel: ["Cinzel", "Georgia", "serif"],
        cormorant: ["Cormorant Garamond", "Georgia", "serif"],
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      colors: {
        tangled: {
          dark: "#050508",
          deep: "#0a0914",
          violet: "#1c142c",
          purple: "#2a1b4e",
          lantern: "#c9944d",
          gold: "#e6b366",
          warm: "#f7d794",
          glow: "#ffecb3",
          cream: "#f4eedb",
          muted: "#9e9aa8",
        },
      },
    },
  },
  plugins: [],
};
