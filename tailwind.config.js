/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: '#FAFAF7',
        charcoal: '#1A1A1A',
        gold: {
          DEFAULT: '#C9A96E',
          light: '#E8D5B0',
          dark: '#A8843E',
        },
        muted: '#6B6B6B',
        surface: '#FFFFFF',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'Manrope', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C9A96E 0%, #E8D5B0 50%, #C9A96E 100%)',
        'dark-gradient': 'linear-gradient(135deg, #1A1A1A 0%, #2D2D2D 100%)',
      },
      boxShadow: {
        'gold': '0 4px 24px rgba(201, 169, 110, 0.25)',
        'card': '0 2px 40px rgba(26, 26, 26, 0.08)',
        'card-hover': '0 8px 60px rgba(26, 26, 26, 0.15)',
      },
    },
  },
  plugins: [],
}
