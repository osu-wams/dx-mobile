import { QueryClient } from 'react-query';
import { Auth } from '../types';
import { secureStorage } from '../utils/storage';

const queryClient = new QueryClient();

queryClient.setDefaultOptions({
  queries: {
    enabled: false,
  },
});

export default queryClient;

export const authQueryClient = (queryClient: QueryClient, { apiUrl, jwt }: Auth) => {
  queryClient.setDefaultOptions({
    queries: {
      enabled: true,
      queryFn: async ({ queryKey }) => {
        const url = `${apiUrl}${queryKey}`;
        __DEV__ && console.debug(`queryClient fetching ${url} with JWT: ${jwt}`);
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        const data = await response.json();
        if (response.ok) return data;
        if (response.status === 401) {
          __DEV__ &&
            console.error(`Removing auth token, caught error ${response.status} : ${data.error}`);
          secureStorage.remove('AUTH');
        }
        throw new Error(data.error);
      },
      retry: false,
    },
  });
};
