import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { fetchToken, startAuthSession } from '../services/auth';
import { authState } from '../state/auth';

export const useAuth = () => {
  const [auth, setAuth] = useRecoilState(authState);

  const getAuth = async (): Promise<boolean> => {
    const auth = await fetchToken();
    if (auth) {
      __DEV__ && console.log('getAuth', auth);
      setAuth(auth);
      return true;
    }
    return false;
  };

  useEffect(() => {
    (async () => {
      const auth = await getAuth();
      if (!auth) {
        const establishedSession = await startAuthSession();
        if (establishedSession) {
          __DEV__ && console.log('New SAML session established.');
          await getAuth();
        } else {
          __DEV__ && console.error('New SAML session failed.');
        }
      }
    })();
  }, []);

  return auth;
};

export default useAuth;
