import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        border: "hsl(var(--border))",
        // Neon cyberpunk palette
        neon: {
          cyan: "#00ffff",
          purple: "#8b5cf6",
          pink: "#f472b6",
          green: "#10b981",
          yellow: "#fbbf24",
        },
      },
      animation: {
        "pulse-neon": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        glow: "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        glow: {
          "0%": {
            textShadow: "0 0 5px #00ffff, 0 0 10px #00ffff, 0 0 15px #00ffff",
          },
          "100%": {
            textShadow: "0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff",
          },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
}
export default config
