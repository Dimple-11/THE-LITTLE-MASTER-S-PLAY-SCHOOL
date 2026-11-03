/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: '#FFD929',      // Sunshine Yellow
          orange: '#FF941E',      // Tangerine Orange
          deepOrange: '#E87528',  // Deep Orange
          red: '#F21D1D',         // Logo Red
          blue: '#1749D6',        // Royal Blue
          green: '#07852C',       // Chalkboard Green
          cream: '#FFF9E9',       // Warm Cream background
          brown: '#49301F',       // Dark Brown text
          peach: '#FFE3CA',       // Soft Peach
          sky: '#38BDF8',
          purple: '#8B5CF6',
          chalkboard: '#065F22',
        }
      },
      fontFamily: {
        bubble: ['"Fredoka"', '"Nunito"', 'system-ui', 'sans-serif'],
        sans: ['"Quicksand"', '"Nunito"', 'system-ui', 'sans-serif'],
        display: ['"Baloo 2"', '"Fredoka"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '3xl': '1.75rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
      },
      boxShadow: {
        'playful': '0 8px 0px 0px rgba(73, 48, 31, 0.12)',
        'playful-orange': '0 8px 0px 0px #E87528',
        'playful-yellow': '0 8px 0px 0px #FF941E',
        'playful-blue': '0 8px 0px 0px #0F329A',
        'playful-green': '0 8px 0px 0px #055C1E',
        'playful-red': '0 8px 0px 0px #B51414',
        'card': '0 12px 32px -4px rgba(73, 48, 31, 0.08), 0 4px 12px -2px rgba(73, 48, 31, 0.04)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-medium': 'float 4s ease-in-out infinite',
        'float-fast': 'float 3s ease-in-out infinite',
        'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(2deg)' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.03)' },
        }
      }
    },
  },
  plugins: [],
}
