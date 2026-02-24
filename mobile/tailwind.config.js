/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'oscillate-bg': '#000000',
        'oscillate-surface': '#050505',
        'oscillate-surface-hover': '#0a0a0a',
        'oscillate-emerald': '#10b981',
        'oscillate-emerald-glow': 'rgba(16, 185, 129, 0.15)',
        'oscillate-emerald-intense': '#34d399',
        'oscillate-gold': '#d4af37',
        'oscillate-gold-glow': 'rgba(212, 175, 55, 0.15)',
        'oscillate-gold-intense': '#f3e5ab',
        'oscillate-border': '#111111',
        'oscillate-lazulite': '#2563eb',
        'oscillate-lazulite-glow': 'rgba(37, 99, 235, 0.15)',
        'oscillate-warning': '#f59e0b',
      }
    },
  },
  plugins: [],
}
