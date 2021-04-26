import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import getAuth from '../services/auth'
import { authState } from '../state/auth'

export const useAuth = () => {
  const [auth, setAuth] = useRecoilState(authState)

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-extra-semi
    ;(async () => {
      const auth = await getAuth()
      setAuth(auth)
    })()
  }, [])

  return auth
}

export default useAuth
