import axios, { AxiosResponse } from 'axios';
import { QueryClient } from 'react-query';
import { Resetter } from 'recoil';
import { clearAuth } from '../services/auth';
import { Auth } from '../types';

const queryClient = new QueryClient();

queryClient.setDefaultOptions({
  queries: {
    enabled: false,
  },
});

export default queryClient;

export const updateQueryClientOptions = (
  queryClient: QueryClient,
  { baseUrl, jwt }: Auth,
  resetAuthState: Resetter,
) => {
  queryClient.setDefaultOptions({
    queries: {
      enabled: true,
      queryFn: async ({ queryKey }) => {
        const url = `${baseUrl}${queryKey}`;
        __DEV__ && console.debug(`queryClient fetching ${url} with JWT: ${jwt}`);
        const response: AxiosResponse = await axios.get(url, {
          headers: {
            Authorization: jwt,
          },
        });
        return response.data;
      },
      onError: async (err: any) => {
        console.error('onError handler', err.config);
        if (err.message.indexOf('401')) {
          await clearAuth();
          resetAuthState();
          queryClient.clear();
        }
      },
      retry: false,
    },
  });
};
