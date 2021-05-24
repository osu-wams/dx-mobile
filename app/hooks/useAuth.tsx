import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { fetchToken, startAuthSession } from '../services/auth';
import { authState, applicationState } from '../state';

export const useAuth = () => {
  const [auth, setAuth] = useRecoilState(authState);
  const appState = useRecoilValue(applicationState);
  const resetAuthState = useResetRecoilState(authState);

  const getAuth = async (): Promise<void> => {
    try {
      const auth = await fetchToken();
      if (auth) {
        __DEV__ && console.log('getAuth', auth);
        setAuth((previous) => ({ ...previous, ...auth, isAuthenticated: true }));
      } else {
        resetAuthState();
      }
    } catch {
      resetAuthState();
    }
  };

  useEffect(() => {
    (async () => {
      if (appState.STATE === 'LOADED') {
        const { isAuthenticated, jwt } = auth;
        if (!isAuthenticated) {
          const freshToken = await fetchToken();
          if (freshToken) {
            setAuth((previous) => ({ ...previous, ...freshToken, isAuthenticated: true }));
          }
        } else if (!jwt) {
          await getAuth();
        }
      }
    })();
  }, [auth, appState.STATE]);

  useEffect(() => {
    (async () => {
      if (appState.STATE === 'LOGIN') {
        const startedSession = await startAuthSession();
        if (startedSession) {
          await getAuth();
        } else {
          resetAuthState();
        }
      }
    })();
  }, [appState.STATE]);

  return auth;
};

export default useAuth;
