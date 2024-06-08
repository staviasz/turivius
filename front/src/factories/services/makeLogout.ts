import { makeClientAndToken } from '@/factories/services/makeClientAndToken';
import { logout } from '@/services/requests/logout';

export const makeLogout = async (token: string): Promise<void> => {
  const { httpClient } = await makeClientAndToken();
  return logout(httpClient, token);
};
