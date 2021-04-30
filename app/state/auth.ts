import { atom } from 'recoil';
import env from '../config/env';
import { Auth } from '../types';

export const authState = atom<Auth>({
  key: 'authState',
  default: {
    apiUrl: env.API_URL,
    jwt: undefined,
    refresh: undefined,
  },
});
