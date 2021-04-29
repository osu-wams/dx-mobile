import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import getAuth, { startAuthSession } from '../services/auth';
import { authState } from '../state/auth';

export const useAuth = () => {
  const [auth, setAuth] = useRecoilState(authState);

  useEffect(() => {
    (async () => {
      const auth = await getAuth();
      if (auth) {
        setAuth(auth);
      } else {
        // redirect to saml auth?
        const establishedSession = await startAuthSession();
        if (establishedSession) {
          // great
          console.log('established');
        } else {
          console.error('broken');
        }
      }
    })();
  }, []);

  return auth;
};

export default useAuth;
