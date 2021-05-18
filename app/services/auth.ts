import axios from 'axios';
import * as WebBrowser from 'expo-web-browser';
import Constants from 'expo-constants';
import env from '../config/env';
import { Auth } from '../types';
import { secureStorage } from '../utils/storage';

axios.defaults.baseURL = env.BASE_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';

const persistToken = async (o: { type: string; url?: string }): Promise<boolean> => {
  const matches = o?.url?.match('^.*token=(.*)$');
  __DEV__ && console.log(`Login response with token found matches: ${matches}`);
  if (matches && matches[1]) {
    await secureStorage.save<Auth>(env.AUTH_STORE_KEY, {
      apiUrl: env.API_URL,
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
      throw new Error('startAuthSession failed to persist a REFRESH token.');
    }
    return true;
  } catch (e) {
    // ! Dead-end for the user, handle this with a meaningful error UI
    __DEV__ && console.error(e);
    return false;
  }
};

export const fetchToken = async (): Promise<Auth | undefined> => {
  const auth = await secureStorage.load<Auth>(env.AUTH_STORE_KEY);
  if (auth && auth.refresh) {
    const response = await fetch(`${env.API_URL}/user/token`, {
      method: 'GET',
      headers: {
        Authorization: auth.refresh,
      },
    });
    if (!response.ok) return undefined;
    const json = await response.json();
    __DEV__ &&
      console.debug('Auth service has existing REFRESH token, fetched new JWT token', json);

    axios.defaults.headers.common.Authorization = json.token;

    return { ...auth, jwt: json.token };
  }
  __DEV__ &&
    console.debug(
      'Auth service missing stored REFRESH token, forcing user through authentication for a new REFRESH token.',
    );
  return undefined;
};
