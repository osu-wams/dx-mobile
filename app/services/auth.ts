import * as WebBrowser from 'expo-web-browser';
import Constants from 'expo-constants';
import env from '../config/env';
import { Auth } from '../types';
import { secureStorage } from '../utils/storage';

const persistToken = async (o: { type: string; url?: string }): Promise<string | null> => {
  const matches = o?.url?.match('^.*token=(.*)$');
  console.log(matches[1]);
  if (matches) {
    await secureStorage.save<Auth>(env.AUTH_STORE_KEY, {
      apiUrl: env.API_URL,
      jwt: matches[1],
    });
    return matches[1];
  }
  return null;
};

const openBrowserAuth = (linkingUrl: string) =>
  WebBrowser.openAuthSessionAsync(`${env.API_URL}/login?redirectUri=${linkingUrl}`, linkingUrl);

export const startAuthSession = async (): Promise<boolean> => {
  let token;
  try {
    const result = await openBrowserAuth(Constants.linkingUri);
    token = await persistToken(result);
    if (!token) {
      throw new Error('startAuthSession failed to persist the token.');
    }

    return true;
  } catch (e) {
    // ! Dead-end for the user, handle this with a meaningful error UI
    console.error(e);
    return false;
  }
};

export default async (): Promise<Auth | undefined> => {
  const auth = await secureStorage.load<Auth>(env.AUTH_STORE_KEY);
  let response: Response;
  if (!auth || !auth.refresh) {
    __DEV__ && console.debug('Auth service registering application for JWT and REFRESH tokens');
    return undefined;
  } else {
    response = await fetch(`${env.API_URL}/api/user`, {
      method: 'GET',
      headers: {
        Authorization: auth.jwt,
      },
    });
    const text = await response.text();
    __DEV__ && console.debug(text);
    return auth;
    /*
    response = await fetch(`${env.API_URL}/user/token`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${auth.refresh}`,
      },
    });
    __DEV__ && console.debug(`Auth service refreshing JWT, using REFRESH token: ${auth.refresh}`);
    */
  }
  const { jwt, refresh }: Auth = await response.json();
  await secureStorage.save<Auth>(env.AUTH_STORE_KEY, { apiUrl: env.API_URL, jwt, refresh });
  return secureStorage.load<Auth>(env.AUTH_STORE_KEY);
};
