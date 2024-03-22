import { Parameters } from '@storybook/react';
import './tailwind-imports.css';

export const parameters: Parameters = {
  // Match tất cả props "on..." (onClick, ...)
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    expanded: true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
