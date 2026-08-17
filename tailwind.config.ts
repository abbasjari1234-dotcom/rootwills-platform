import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#070706',
          900: '#0E0E0C',
          850: '#141411',
          800: '#1A1A16',
          700: '#262621',
          600: '#383832',
        },
        cream: {
          DEFAULT: '#F5EFE6',
          light: '#FAF7F2',
          muted: '#E6DEC9',
          dim: '#B5AFA4',
        },
        champagne: {
          DEFAULT: '#C9A227',
          soft: '#E4C767',
          dim: '#9B7C1B',
          glow: 'rgba(201, 162, 39, 0.15)',
        },
        emerald: {
          fresh: '#10B981',
          dark: '#064E3B',
          glow: 'rgba(16, 185, 129, 0.15)',
        },
        stone: {
          900: '#1C1917',
          800: '#292524',
          700: '#44403C',
          600: '#57534E',
          500: '#78716C',
          400: '#A8A29E',
          300: '#D6D3D1',
          200: '#E7E5E4',
          100: '#F5F5F4',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Cormorant Garamond', 'Fraunces', 'Playfair Display', 'serif'],
        sans: ['var(--font-sans)', 'Inter', 'General Sans', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'IBM Plex Mono', 'monospace'],
      },
      boxShadow: {
        'gold-glow': '0 0 25px -5px rgba(201, 162, 39, 0.25)',
        'emerald-glow': '0 0 25px -5px rgba(16, 185, 129, 0.25)',
        'subtle': '0 4px 20px -2px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
