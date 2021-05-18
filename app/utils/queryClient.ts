import { QueryClient } from 'react-query';
import { Auth } from '../types';

const queryClient = new QueryClient();

queryClient.setDefaultOptions({
  queries: {
    enabled: false,
  },
});

export default queryClient;

export const updateQueryClientOptions = (queryClient: QueryClient, { apiUrl, jwt }: Auth) => {
  queryClient.setDefaultOptions({
    queries: {
      enabled: true,
      queryFn: async ({ queryKey }) => {
        const url = `${apiUrl}${queryKey}`;
        __DEV__ && console.debug(`queryClient fetching ${url} with JWT: ${jwt}`);
        const response = await fetch(url, {
          headers: {
            Authorization: jwt,
          },
        });
        const data = await response.json();
        if (response.ok) return data;
        if (response.status === 401) {
          __DEV__ &&
            console.error(`Removing JWT token, caught error ${response.status} : ${data.error}`);
          // TODO: Remove REFRESH from storage and cause user to go through full SAML cycle?
          // TODO: Fetch a new JWT and try again? (utils/auth#fetchToken)
        }
        throw new Error(data.error);
      },
      retry: false,
    },
  });
};
