/* eslint-disable @typescript-eslint/no-var-requires */
const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('../../tailwind-workspace-preset.js')],
  content: [
    // Lắng nghe trong app
    join(__dirname, './app/**/*.{js,ts,jsx,tsx}'),
    // Lắng nghe các libs
    join(__dirname, '../../libs/**/*.{js,ts,jsx,tsx}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
