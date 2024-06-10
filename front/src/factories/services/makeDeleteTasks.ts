import deleteTasks from '@/services/requests/deleteTask';
import type { HttpResponse } from '@/types/contracts/services/httpResponse';
import { makeClientAndToken } from './makeClientAndToken';

export default async function makeDeleteTask(id: number, token?: string): Promise<HttpResponse> {
  const { httpClient, jwtToken } = await makeClientAndToken();

  const authToken = token || jwtToken;
  return deleteTasks(httpClient, authToken, id);
}
