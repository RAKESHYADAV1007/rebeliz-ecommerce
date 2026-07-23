/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f8f4f0',
          100: '#f1e8e0',
          200: '#e3d1c1',
          300: '#d5baa2',
          400: '#c7a383',
          500: '#b98c64',
          600: '#a0714d',
          700: '#875636',
          800: '#6e3b1f',
          900: '#552008',
          950: '#3d1204',
        },
        secondary: {
          50: '#f5f3f0',
          100: '#ebe7e1',
          200: '#d7cfc3',
          300: '#c3b7a5',
          400: '#af9f87',
          500: '#9b8769',
          600: '#876f51',
          700: '#735739',
          800: '#5f3f21',
          900: '#4b2709',
          950: '#371005',
        },
        accent: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '2xl': '1rem',
      },
      boxShadow: {
        'premium': '0 20px 40px rgba(0, 0, 0, 0.1)',
        'premium-lg': '0 30px 60px rgba(0, 0, 0, 0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
