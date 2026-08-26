import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#050B08',
          900: '#0A140F',
          850: '#0F1E17',
          800: '#15291F',
          700: '#1E382B',
          600: '#2A4D3B',
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
          light: '#FFF4D0',
          dim: '#8C6E12',
          glow: 'rgba(201, 162, 39, 0.18)',
        },
        emerald: {
          950: '#022C22',
          900: '#064E3B',
          800: '#065F46',
          700: '#047857',
          600: '#059669',
          500: '#10B981',
          400: '#34D399',
          300: '#6EE7B7',
          glow: 'rgba(16, 185, 129, 0.2)',
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
        'gold-glow': '0 0 30px -5px rgba(228, 199, 103, 0.3)',
        'emerald-glow': '0 0 30px -5px rgba(16, 185, 129, 0.3)',
        'royal-depth': '0 20px 50px -10px rgba(2, 44, 34, 0.8), 0 0 30px rgba(228, 199, 103, 0.15)',
        '3d-float': '0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 25px rgba(16, 185, 129, 0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float-slow': 'float 6s ease-in-out infinite',
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
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
