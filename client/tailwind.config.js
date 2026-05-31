/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'eric-dark': '#1a1d2e',
        'eric-sidebar': '#0f1119',
        'eric-accent': '#3b82f6',
        'eric-status': '#1f2937',
        'eric-light': '#f5f5f7',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
