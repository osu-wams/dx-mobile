import { atom } from 'recoil';
import env from '../config/env';
import { Auth } from '../types';

export const authState = atom<Auth>({
  key: 'authState',
  default: {
    baseUrl: env.BASE_URL,
    isAuthenticated: false,
    jwt: undefined,
    refresh: undefined,
  },
});
