/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,tsx,ts}"],
  theme: {
    extend: {
      colors: {
        text: 'var(--text)',
        dark: 'var(--text-black)',
        accent: 'var(--accent)',
        'nav-bg': 'var(--nav-bg)',
        'nav-border': 'var(--nav-border)',
        'card-bg': 'var(--card-bg)',
        'card-border': 'var(--card-border)',
      },
    },
  },
  plugins: [],
}