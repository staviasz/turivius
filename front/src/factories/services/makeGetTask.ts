import getTasks from '@/services/requests/getTasks';
import type { HttpResponse } from '@/types/contracts/services/httpResponse';
import { makeClientAndToken } from './makeClientAndToken';

export default async function makeGetTask(token?: string): Promise<HttpResponse> {
  const { httpClient, jwtToken } = await makeClientAndToken();
  const authToken = token || jwtToken;
  return getTasks(httpClient, authToken);
}
