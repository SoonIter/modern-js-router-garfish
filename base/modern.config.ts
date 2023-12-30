import path from 'path';
import { appTools, defineConfig } from '@modern-js/app-tools';
import { garfishPlugin } from '@modern-js/plugin-garfish';

// https://modernjs.dev/en/configure/app/usage
export default defineConfig<'rspack'>({
  runtime: {
    router: false,
    masterApp: {
      apps: [
        {
          name: 'Sub',
          entry: 'http://localhost:3000',
          activeWhen: '/sub',
        },
      ],
    },
  },
  source: {
    alias: {
      'react-router': path.join('node_modules', 'react-router'),
      'react-router-dom': path.join('node_modules', 'react-router-dom'),
    },
  },
  output: {
    disableTsChecker: true,
    disableMinimize: true
  },
  plugins: [
    appTools({
      bundler: 'experimental-rspack',
    }),
    garfishPlugin({}),
  ],
});
