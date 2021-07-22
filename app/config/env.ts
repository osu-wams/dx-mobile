import dev from './env.dev';
import prod from './env.prod';
import Constants from 'expo-constants';

// Jest runs in Node which doesn't have access to expo manifest, so __TEST__ is true,
// otherwise set to to what the Expo manifest has configured. This allows for conditionally
// setting RecoilRoot for use-case.tsx or decorators.tsx. Which ultimately makes Storybook
// with state work properly in local development and local test
__TEST__ = Constants.manifest.extra?.__TEST__ ?? true;

const env: {
  API_URL: string;
  BASE_URL: string;
  AUTH_STORE_KEY: string;
  AUTH_REFRESH_JWT?: string;
} = __DEV__ ? dev : prod;

if (__DEV__) {
  console.debug(`Running in with __TEST__:${__TEST__}`);
  console.debug(`Loaded env from app/config/${__DEV__ ? 'env.dev.ts' : 'env.prod.ts'}`);
  for (const key in env) {
    if (Object.prototype.hasOwnProperty.call(env, key)) {
      const value = env[key];
      console.debug(`${key}: ${value}`);
    }
  }
}

export default env;
