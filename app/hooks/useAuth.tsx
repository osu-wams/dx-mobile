import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import getAuth from '../services/auth';
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
      }
    })();
  }, []);

  return auth;
};

export default useAuth;
