import { makeClientAndToken } from '@/factories/services/makeClientAndToken';
import { updateTask } from '@/services/requests/updateTasks';
import type { HttpResponse } from '@/types/contracts/services/httpResponse';
import type { Task } from '@/types/task';

export const makeUpdateTask = async (id: number, body: Partial<Task>): Promise<HttpResponse> => {
  const { httpClient, token } = await makeClientAndToken();
  return updateTask(httpClient, id, body, token);
};
