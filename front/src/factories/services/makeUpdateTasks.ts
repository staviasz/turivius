import updateTasks from '@/services/requests/updateTask';
import type { HttpResponse } from '@/types/contracts/services/httpResponse';
import type { Task } from '@/types/task';
import { makeClientAndToken } from './makeClientAndToken';

export default async function makeUpdateTask(
  body: Task,
  id: number,
  token?: string,
): Promise<HttpResponse> {
  const { httpClient, jwtToken } = await makeClientAndToken();
  const authTopken = token || jwtToken;
  return updateTasks(httpClient, authTopken, body, id);
}
