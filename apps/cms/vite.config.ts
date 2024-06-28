import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  cacheDir: '../../node_modules/.vite/cms',

  resolve: {
    alias: [{ find: '~', replacement: path.resolve(__dirname, 'src') }],
  },
  server: {
    port: 4200,
    host: 'localhost',
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },

  plugins: [react(), nxViteTsPaths()],

  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          cacheV1_ramda: ['ramda'],
          cacheV1_antd: ['antd'],
          'cacheV1_@ant-design/iconsV1': ['@ant-design/icons'],
        },
      },
    },
  },

  // Uncomment this if you are using workers.
  worker: {
    plugins: () => [nxViteTsPaths()],
  },
});
