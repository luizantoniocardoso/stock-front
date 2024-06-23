// tailwind.config.js

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements-react/dist/js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        dangerVar: {
          DEFAULT: "#F43500",
          100: "#FEE2E2",
          200: "#FECACA",
          300: "#FCA5A5",
          400: "#F87171",
          500: "#EF4444",
          600: "#DC2626",
          700: "#B91C1C",
          800: "#991B1B",
          900: "#7F1D1D",
        },
        successVar: {
          DEFAULT: "#34D399",
          100: "#D1FAE5",
          200: "#A7F3D0",
          300: "#6EE7B7",
          400: "#34D399",
          500: "#10B981",
          600: "#059669",
          700: "#047857",
          800: "#065F46",
          900: "#064E3B",
        },
        backgroundVar: {
          DEFAULT: "#E2E8F0",
          CONTRA: "#F1F5F9"
        },
        textVar: {
          DEFAULT: "#0F172A",
          600: "#1A202C",
          700: "#1D2331",
          800: "#1E293B",
          900: "#475569",
        },
        contrastVar: {
          DEFAULT: '#F43500',
          600: '#E33300',
          700: '#CC2E00',
          800: '#B52700',
          900: '#9E1C00',
        },
      }
    },
  },
  darkMode: "class",
  plugins: [require("tw-elements-react/dist/plugin.cjs")]
};
