module.exports = {
  extends: ['plugin:@nx/react', '../../.eslintrc.js'],
  ignorePatterns: ['!**/*'],
  rules: {
    '@nx/enforce-module-boundaries': [
      'error',
      {
        allow: ['utilities'],
      },
    ],
  },
};
