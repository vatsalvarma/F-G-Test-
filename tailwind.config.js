/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-green': '#B5E550',
        'brand-black': '#1A1A1A',
        'brand-gray': '#2A2A2A',
      }
    },
  },
  plugins: [],
}
