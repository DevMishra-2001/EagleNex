/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
        display: ['"Sora"', '"Plus Jakarta Sans"', "sans-serif"],
        serif: ['"Instrument Serif"', "Georgia", "serif"],
      },
      // Theme-aware colours: values come from CSS variables in index.css
      // (dark = default, [data-theme="light"] flips them).
      colors: {
        ink: {
          950: "rgb(var(--ink-950) / <alpha-value>)",
          900: "rgb(var(--ink-900) / <alpha-value>)",
          800: "rgb(var(--ink-800) / <alpha-value>)",
          700: "rgb(var(--ink-700) / <alpha-value>)",
        },
        // "white" = foreground colour (white in dark, near-black in light)
        white: "rgb(var(--fg) / <alpha-value>)",
        // always-white, for text/icons on gradient or coloured backgrounds
        pure: "#ffffff",
        zinc: {
          200: "rgb(var(--zinc-200) / <alpha-value>)",
          300: "rgb(var(--zinc-300) / <alpha-value>)",
          400: "rgb(var(--zinc-400) / <alpha-value>)",
          500: "rgb(var(--zinc-500) / <alpha-value>)",
          600: "rgb(var(--zinc-600) / <alpha-value>)",
        },
        brand: {
          violet: "#8b5cf6",
          cyan: "#22d3ee",
          pink: "#ec4899",
        },
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        grow: {
          from: { transform: "scaleX(0)" },
          to: { transform: "scaleX(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        "spin-slow": "spin-slow 12s linear infinite",
        shimmer: "shimmer 6s linear infinite",
      },
    },
  },
  plugins: [],
};
