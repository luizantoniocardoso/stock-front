/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
      "./node_modules/tw-elements-react/dist/js/**/*.js"
  ],
  theme: {
      extend: {
        colors: {
          warning: {
            DEFAULT: "#DC2626"
          },
          success: {
            DEFAULT: "#34D399"
          },
          background: {
            DEFAULT: "#E2E8F0",
            CONTRA: "#F1F5F9"
          },
          text: {
            DEFAULT: "#0F172A",
          },
          contrast: {
            DEFAULT: '#F43500',
            600: '#E33300', // Ajuste as cores conforme necessário
            700: '#CC2E00', // Ajuste as cores conforme necessário
          },
        }
      },
    
  },
  darkMode: "class",
  plugins: [require("tw-elements-react/dist/plugin.cjs")]
})