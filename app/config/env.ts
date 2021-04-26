import dev from './env.dev'
import prod from './env.prod'

const env: {
  API_URL: string
} = __DEV__ ? dev : prod

export default env
