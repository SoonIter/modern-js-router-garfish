import path from 'path';
import { appTools, defineConfig } from '@modern-js/app-tools';
import { garfishPlugin } from '@modern-js/plugin-garfish';

// https://modernjs.dev/en/configure/app/usage
export default defineConfig<'webpack'>({
  runtime: {
    router: false,
  },
  dev: {
    port: 3000,
  },
  server: {
    port: 3000,
  },
  output: {
    disableTsChecker: true,
    disableMinimize: true,
  },
  source: {
    alias: {
      'react-router': path.join('node_modules', 'react-router'),
      'react-router-dom': path.join('node_modules', 'react-router-dom'),
    },
  },
  plugins: [
    appTools({
      bundler: 'webpack',
    }),
    garfishPlugin({}),
  ],
  deploy: {
    microFrontend: {
      externalBasicLibrary: true,
      enableHtmlEntry: true,
    },
  },
});
