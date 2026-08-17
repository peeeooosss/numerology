import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        midnight: "#080914",
        cosmic: "#11142a",
        cosmic2: "#1b1d3a",
        gold: "#d4af37",
        goldlite: "#f3de8a",
        copper: "#c97d4a",
        cream: "#f6f1e7",
        lav: "#aaa6c4",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      boxShadow: {
        goldglow: "0 0 25px rgba(212,175,55,.4), 0 0 60px rgba(212,175,55,.14)",
        cardglow: "0 0 0 1px rgba(212,175,55,.16), 0 20px 60px -20px rgba(0,0,0,.65)",
      },
      keyframes: {
        "spin-slow": { from: { transform: "rotate(0deg)" }, to: { transform: "rotate(360deg)" } },
        "pulse-glow": { "0%, 100%": { boxShadow: "0 0 18px rgba(212,175,55,.3)" }, "50%": { boxShadow: "0 0 32px rgba(212,175,55,.65), 0 0 70px rgba(212,175,55,.2)" } },
        float: { "0%, 100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-8px)" } },
      },
      animation: {
        "spin-slow": "spin-slow 140s linear infinite",
        "pulse-glow": "pulse-glow 2.6s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
