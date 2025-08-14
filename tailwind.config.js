/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Ancient Chinese inspired color palette
        'rice-paper': '#FAF7F2',
        charcoal: '#2C2C2C',
        'gray-secondary': '#6D6A6A',
        jade: {
          DEFAULT: '#2FA58E',
          50: '#F0FDFB',
          100: '#CCFBF1',
          200: '#99F6E4',
          300: '#5EEAD4',
          400: '#2DD4BF',
          500: '#2FA58E',
          600: '#0D9488',
          700: '#0F766E',
          800: '#115E59',
          900: '#134E4A',
        },
        brass: {
          DEFAULT: '#C7A14A',
          50: '#FDF8E8',
          100: '#FCF2C7',
          200: '#F9E69A',
          300: '#F5D565',
          400: '#F0C638',
          500: '#C7A14A',
          600: '#B8942F',
          700: '#9C7E26',
          800: '#80691E',
          900: '#665417',
        },
        terracotta: {
          DEFAULT: '#D24C3E',
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#D24C3E',
          600: '#DC2626',
          700: '#B91C1C',
          800: '#991B1B',
          900: '#7F1D1D',
        }
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'Fira Sans',
          'Droid Sans',
          'Helvetica Neue',
          'sans-serif',
        ],
        chinese: [
          'Noto Serif SC',
          'serif',
        ],
      },
      spacing: {
        '18': '4.5rem',  // 72px for collapsed sidebar
        '70': '17.5rem', // 280px for expanded sidebar
      },
      borderRadius: {
        'system': '10px',
      },
      boxShadow: {
        'soft': '0 4px 12px rgba(0, 0, 0, 0.08)',
        'medium': '0 8px 24px rgba(0, 0, 0, 0.12)',
        'strong': '0 16px 40px rgba(0, 0, 0, 0.16)',
        'pavilion': `
          0 4px 12px rgba(0, 0, 0, 0.08),
          0 2px 6px rgba(0, 0, 0, 0.04),
          inset 0 1px 0 rgba(255, 255, 255, 0.8)
        `,
      },
      animation: {
        'pulse-soft': 'pulse-soft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 1.2s ease-in-out infinite',
        'breathe': 'breathe 4s ease-in-out infinite',
      },
      keyframes: {
        'pulse-soft': {
          '0%, 100%': {
            opacity: '1',
          },
          '50%': {
            opacity: '0.7',
          },
        },
        shimmer: {
          '0%': {
            'background-position': '-468px 0',
          },
          '100%': {
            'background-position': '468px 0',
          },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.02)' },
        },
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'zen': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      transitionDuration: {
        '200': '200ms',
        '300': '300ms',
        '600': '600ms',
      },
      lineHeight: {
        'body': '1.5',    // 150% for body text
        'heading': '1.2', // 120% for headings
        'relaxed': '1.75', // For contemplative reading
      },
      zIndex: {
        'overlay': '40',
        'modal': '50',
        'tooltip': '60',
      },
      backdropBlur: {
        'zen': '10px',
      },
      aspectRatio: {
        'golden': '1.618',
        'square': '1',
      },
    },
  },
  plugins: [
    // Add custom utilities
    function({ addUtilities, theme }) {
      addUtilities({
        '.transition-smooth': {
          'transition': 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
        },
        '.ease-smooth': {
          'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)',
        },
        '.ease-zen': {
          'transition-timing-function': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        },
        '.focus-ring': {
          '&:focus': {
            'outline': 'none',
            'box-shadow': '0 0 0 3px rgba(47, 165, 142, 0.1)',
            'border-color': theme('colors.jade.500'),
          },
        },
        '.glass': {
          'backdrop-filter': 'blur(10px)',
          'background': 'rgba(255, 255, 255, 0.8)',
        },
        '.ink-wash': {
          'background': 'radial-gradient(ellipse at center, rgba(47, 165, 142, 0.05) 0%, transparent 70%)',
        },
        '.paper-texture': {
          'background-image': 'radial-gradient(circle at 1px 1px, rgba(199, 161, 74, 0.15) 1px, transparent 0)',
          'background-size': '20px 20px',
        },
        '.morning-mist': {
          'background': 'linear-gradient(135deg, #FAF7F2 0%, #F5F2ED 100%)',
        },
        '.evening-jade': {
          'background': 'linear-gradient(135deg, #2FA58E 0%, #268A73 100%)',
        },
        '.autumn-brass': {
          'background': 'linear-gradient(135deg, #C7A14A 0%, #B8942F 100%)',
        },
      });
    },
  ],
};