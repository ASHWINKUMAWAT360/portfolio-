/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00f0ff',
          50: '#ecfeff',
          100: '#cffafe',
          400: '#22d3ee',
          500: '#00f0ff',
          600: '#0891b2',
        },
        secondary: {
          DEFAULT: '#a855f7',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
        },
        dark: {
          950: '#06070b',
          900: '#0a0a0f',
          850: '#0f111a',
          800: '#141724',
          700: '#1e2235',
        }
      },
      fontFamily: {
        inter: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'neon-cyan': '0 0 25px rgba(0, 240, 255, 0.45)',
        'neon-purple': '0 0 25px rgba(168, 85, 247, 0.45)',
        'neon-emerald': '0 0 25px rgba(16, 185, 129, 0.45)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glow-lg': '0 0 50px -10px rgba(0, 240, 255, 0.25)',
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
        'spin-reverse': 'spin-reverse 16s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'spin-reverse': {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        }
      }
    },
  },
  plugins: [],
}
