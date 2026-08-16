/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: '#FBF8F5',
        charcoal: '#16283D',
        clay: {
          DEFAULT: '#B06A76',
          light: '#E3B8BF',
          dark: '#7A424C',
        },
        sage: {
          DEFAULT: '#33544C',
          light: '#6C8C82',
          dark: '#1F332E',
        },
        muted: '#5B6B78',
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
        'clay-gradient': 'linear-gradient(135deg, #B06A76 0%, #E3B8BF 50%, #B06A76 100%)',
        'sage-gradient': 'linear-gradient(135deg, #33544C 0%, #6C8C82 50%, #33544C 100%)',
        'dark-gradient': 'linear-gradient(135deg, #16283D 0%, #0A121C 100%)',
      },
      boxShadow: {
        'clay': '0 4px 24px rgba(176, 106, 118, 0.25)',
        'sage': '0 4px 24px rgba(51, 84, 76, 0.25)',
        'card': '0 2px 40px rgba(22, 40, 61, 0.08)',
        'card-hover': '0 8px 60px rgba(22, 40, 61, 0.15)',
      },
    },
  },
  plugins: [],
}
