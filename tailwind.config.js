/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'Poppins': ['"Poppins"', ...defaultTheme.fontFamily.sans],
        'Playfair-Display': ['"Playfair Display"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}