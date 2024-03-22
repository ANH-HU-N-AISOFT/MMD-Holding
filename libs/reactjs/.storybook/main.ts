import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    // '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-designs',
    {
      name: '@storybook/addon-essentials',
      options: {
        docs: true,
        actions: true,
        backgrounds: true,
        controls: true,
      },
    },
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {
      builder: {
        viteConfigPath: 'libs/reactjs/vite.config.ts',
      },
    },
  },
  typescript: {
    check: true,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      propFilter: prop => {
        return prop.parent ? !/node_modules/.test(prop.parent.fileName) : true;
      },
    },
  },
  docs: {
    autodocs: true,
  },
};

export default config;

// To customize your Vite configuration you can use the viteFinal field.
// Check https://storybook.js.org/docs/react/builders/vite#configuration
// and https://nx.dev/packages/storybook/documents/custom-builder-configs
