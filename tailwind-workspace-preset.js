/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      screens: {
        'xxs': '320px', // You can adjust this value according to your needs
        'xs': '375px', // You can adjust this value according to your needs
      },
      colors: {
        brand: {
          base: '#1677ff',
          'base-light': '#4096ff'
        },
        status: {
          blue: '#1677ff',
          'blue-light': '#4096ff',
          green: '#3C9F19',
          red: '#ff4d4f',
          'red-light': "#ff7875",
          orange: '#E48900',
        },
      },
    },
  },
};
