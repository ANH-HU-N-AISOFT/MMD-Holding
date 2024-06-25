module.exports = {
  extends: ['plugin:@nx/react', '../../.eslintrc.js'],
  ignorePatterns: ['!**/*'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
  },
};
