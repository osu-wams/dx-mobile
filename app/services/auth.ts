import env from '../config/env';
import { Auth } from '../types';
import { secureStorage } from '../utils/storage';

export default async (): Promise<Auth | undefined> => {
  const auth = await secureStorage.load<Auth>('AUTH');
  let response: Response;
  if (!auth || !auth.refresh) {
    __DEV__ && console.debug('Auth service registering application for JWT and REFRESH tokens');
    return undefined;
  } else {
    response = await fetch(`${env.API_URL}/user/token`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${auth.refresh}`,
      },
    });
    __DEV__ && console.debug(`Auth service refreshing JWT, using REFRESH token: ${auth.refresh}`);
  }
  const { jwt, refresh }: Auth = await response.json();
  await secureStorage.save<Auth>('AUTH', { apiUrl: env.API_URL, jwt, refresh });
  return secureStorage.load<Auth>('AUTH');
};
