/* eslint-disable @typescript-eslint/no-var-requires */
const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('../../tailwind-workspace-preset.js')],
  content: [
    // Lắng nghe trong app
    join(__dirname, './src/**/*.{js,ts,jsx,tsx}'),
    join(__dirname, '../../libs/**/*.{js,ts,jsx,tsx}'), // Listen files in "libs" at root workspace
    ...createGlobPatternsForDependencies(__dirname),
  ],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {},
  },
  plugins: [],
};
