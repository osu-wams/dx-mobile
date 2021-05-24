import { atom } from 'recoil';
import { ApplicationStates } from '../types';

export const applicationState = atom<{
  STATE: ApplicationStates;
}>({
  key: 'applicationState',
  default: {
    STATE: 'BOOT',
  },
});
