import axios, { AxiosResponse } from 'axios';
import * as WebBrowser from 'expo-web-browser';
import Constants from 'expo-constants';
import env from '../config/env';
import { Auth } from '../types';
import { secureStorage } from '../utils/storage';

axios.defaults.baseURL = env.BASE_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const clearAuth = async () => secureStorage.remove(env.AUTH_STORE_KEY);

const persistToken = async (o: { type: string; url?: string }): Promise<boolean> => {
  const matches = o?.url?.match('^.*token=(.*)$');
  __DEV__ && console.log(`Login response with token found matches: ${matches}`);
  if (matches && matches[1]) {
    await secureStorage.save<Auth>(env.AUTH_STORE_KEY, {
      baseUrl: env.BASE_URL,
      refresh: matches[1],
    });
    return true;
  }
  return false;
};

const openBrowserAuth = (linkingUrl: string) =>
  WebBrowser.openAuthSessionAsync(`${env.BASE_URL}/login?redirectUri=${linkingUrl}`, linkingUrl);

export const startAuthSession = async (): Promise<boolean> => {
  try {
    const result = await openBrowserAuth(Constants.linkingUri);
    const persisted = await persistToken(result);
    if (!persisted) {
      await clearAuth();
    }
    return persisted;
  } catch (e) {
    // ! Dead-end for the user, handle this with a meaningful error UI
    await clearAuth();
    __DEV__ && console.error('startAuthSession error:', e);
    return false;
  }
};

export const envOrAuth = async (): Promise<Auth> => {
  if (env.AUTH_REFRESH_JWT) {
    __DEV__ &&
      console.debug(
        `AUTH_REFRESH_JWT set in ENV, will use this for authentication. If failures occur you can either unset the ENV, or create a new refresh token and update the ENV to match.`,
      );
    return { baseUrl: env.BASE_URL, refresh: env.AUTH_REFRESH_JWT };
  }
  return secureStorage.load<Auth>(env.AUTH_STORE_KEY);
};

export const fetchToken = async (): Promise<Auth | undefined> => {
  try {
    const auth = await envOrAuth();
    if (auth && auth.refresh) {
      const response: AxiosResponse = await axios.get(`${env.API_URL}/user/token`, {
        headers: {
          Authorization: auth.refresh,
        },
      });
      const { token } = response.data;
      __DEV__ &&
        console.debug(
          'Auth service has existing REFRESH token, fetched new JWT token',
          response.data,
        );

      axios.defaults.headers.common.Authorization = token;

      return { ...auth, jwt: token };
    } else {
      __DEV__ &&
        console.debug(
          'Auth service missing stored REFRESH token, forcing user through authentication for a new REFRESH token.',
        );
      return undefined;
    }
  } catch (err: any) {
    await clearAuth();
    throw err;
  }
};
