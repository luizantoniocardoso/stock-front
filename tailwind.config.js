/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
      "./node_modules/tw-elements-react/dist/js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        warningVar: {
          DEFAULT: "#F43500",
        },
        successVar: {
          DEFAULT: "#34D399"
        },
        backgroundVar: {
          DEFAULT: "#E2E8F0",
          CONTRA: "#F1F5F9"
        },
        textVar: {
          DEFAULT: "#0F172A",
        },
        contrastVar: {
          DEFAULT: '#F43500',
          600: '#E33300',
          700: '#CC2E00',
        },
      }
    },
  
  },
  darkMode: "class",
  plugins: [require("tw-elements-react/dist/plugin.cjs")]
  }