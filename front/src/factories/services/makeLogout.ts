import logout from '@/services/requests/logout';
import type { HttpResponse } from '@/types/contracts/services/httpResponse';
import { makeClientAndToken } from './makeClientAndToken';

export default async function makeLogout(token?: string): Promise<HttpResponse> {
  const { httpClient, jwtToken } = await makeClientAndToken();
  const authToken = token || jwtToken;
  return logout(httpClient, authToken);
}
