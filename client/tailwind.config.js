/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        buildmart: {
          navy: '#0F172A',
          amber: '#F59E0B',
          amberHover: '#D97706',
        }
      }
    },
  },
  plugins: [],
}
