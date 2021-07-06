import dev from './env.dev';
import prod from './env.prod';

const env: {
  API_URL: string;
  BASE_URL: string;
  AUTH_STORE_KEY: string;
  AUTH_REFRESH_JWT?: string;
} = __DEV__ ? dev : prod;

if (__DEV__) {
  console.debug(`Loaded env from app/config/${__DEV__ ? 'env.dev.ts' : 'env.prod.ts'}`);
  for (const key in env) {
    if (Object.prototype.hasOwnProperty.call(env, key)) {
      const value = env[key];
      console.debug(`${key}: ${value}`);
    }
  }
}

export default env;
