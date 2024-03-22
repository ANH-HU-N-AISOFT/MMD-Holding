/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        brand: {
          light: 'rgba(249, 230, 233, 0.8)',
          base: '#C00027',
          disable: 'rgba(192, 0, 39, 0.5)',
        },
        secondary: {
          orange: '#FFC9AD',
          purple: '#D4C9FF',
          blue: '#BAEAFF',
          green: '#C2EED6',
          yellow: '#FFE1A6',
          red: '#FF9090',
        },
        status: {
          blue: '#2A85FF',
          green: '#3C9F19',
          red: '#E53A22',
          orange: '#E48900',
        },
        grey: {
          100: '#FFFFFF',
          200: '#FCFCFD',
          300: '#F4F5F6',
          400: '#E6E8EC',
          500: '#B1B5C3',
          600: '#777E91',
          700: '#353945',
          800: '#23262F',
          900: '#141414',
        },
      },
    },
  },
};
