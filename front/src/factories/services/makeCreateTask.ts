import { createTask } from '@/services/requests/createTask';
import type { HttpResponse } from '@/types/contracts/services/httpResponse';
import type { Task } from '@/types/task';
import { makeClientAndToken } from './makeClientAndToken';

export const makeCreateTask = async (body: Task): Promise<HttpResponse> => {
  const { httpClient, token } = await makeClientAndToken();
  return createTask(httpClient, body, token);
};
