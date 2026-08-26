import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#021710', // Deepest Royal Forest
          900: '#062D21', // Rich Botanical Emerald
          850: '#0A382A',
          800: '#0F4837', // Emerald Glass Base
          700: '#145A46',
          600: '#1C745C',
        },
        cream: {
          DEFAULT: '#F7F5EE',
          light: '#FFFDF8',
          muted: '#E6DEC9',
          dim: '#B5AFA4',
        },
        champagne: {
          DEFAULT: '#C9A227',
          soft: '#E4C767',
          light: '#FFF4D0',
          dim: '#8C6E12',
          glow: 'rgba(228, 199, 103, 0.25)',
        },
        emerald: {
          950: '#021F17',
          900: '#063D2E',
          800: '#08533F',
          700: '#0A6E53',
          600: '#059669',
          500: '#10B981',
          400: '#34D399',
          300: '#6EE7B7',
          glow: 'rgba(16, 185, 129, 0.3)',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Cormorant Garamond', 'Fraunces', 'Playfair Display', 'serif'],
        sans: ['var(--font-sans)', 'Inter', 'General Sans', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'IBM Plex Mono', 'monospace'],
      },
      boxShadow: {
        'gold-glow': '0 0 35px -5px rgba(228, 199, 103, 0.4)',
        'emerald-glow': '0 0 35px -5px rgba(52, 211, 153, 0.4)',
        'royal-depth': '0 25px 60px -10px rgba(2, 23, 16, 0.9), 0 0 35px rgba(16, 185, 129, 0.25)',
        '3d-float': '0 30px 60px -15px rgba(0, 0, 0, 0.8), 0 0 30px rgba(228, 199, 103, 0.2)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(1.5deg)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.9' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
