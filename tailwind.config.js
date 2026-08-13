/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: '#F7F1E6',
        charcoal: '#17140F',
        clay: {
          DEFAULT: '#B8562F',
          light: '#E0916A',
          dark: '#8A3F1D',
        },
        sage: {
          DEFAULT: '#48583F',
          light: '#7C9172',
          dark: '#2E3928',
        },
        muted: '#6B6259',
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
        'clay-gradient': 'linear-gradient(135deg, #B8562F 0%, #E0916A 50%, #B8562F 100%)',
        'sage-gradient': 'linear-gradient(135deg, #48583F 0%, #7C9172 50%, #48583F 100%)',
        'dark-gradient': 'linear-gradient(135deg, #17140F 0%, #2D2620 100%)',
      },
      boxShadow: {
        'clay': '0 4px 24px rgba(184, 86, 47, 0.25)',
        'sage': '0 4px 24px rgba(72, 88, 63, 0.25)',
        'card': '0 2px 40px rgba(23, 20, 15, 0.08)',
        'card-hover': '0 8px 60px rgba(23, 20, 15, 0.15)',
      },
    },
  },
  plugins: [],
}
