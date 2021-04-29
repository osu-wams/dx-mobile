import 'dotenv/config';

export default {
  name: 'My Oregon State',
  slug: 'MyOregonState',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
  },
  web: {
    favicon: './assets/favicon.png',
  },
  extra: {
    USE_STORYBOOK: process.env.USE_STORYBOOK === '1',
  },
  packagerOpts: {
    config: 'metro.config.js',
    sourceExts: [
      'expo.ts',
      'expo.tsx',
      'expo.js',
      'expo.jsx',
      'ts',
      'tsx',
      'js',
      'jsx',
      'json',
      'wasm',
      'svg',
    ],
  },
  scheme: 'dx-mobile',
  android: {
    intentFilters: [
      {
        action: 'VIEW',
        data: [{ scheme: 'dx-mobile' }],
        category: ['BROWSABLE', 'DEFAULT'],
      },
    ],
  },
};
