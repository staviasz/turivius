import createTasks from '@/services/requests/createTask';
import type { HttpResponse } from '@/types/contracts/services/httpResponse';
import type { Task } from '@/types/task';
import { makeClientAndToken } from './makeClientAndToken';

export default async function makeCreateTask(body: Task, token?: string): Promise<HttpResponse> {
  const { httpClient, jwtToken } = await makeClientAndToken();
  const authTopken = token || jwtToken;
  return createTasks(httpClient, authTopken, body);
}
