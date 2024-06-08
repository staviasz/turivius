import { makeClientAndToken } from '@/factories/services/makeClientAndToken';
import { deleteTask } from '@/services/requests/deleteTask';

export const makeDeleteTask = async (id: number): Promise<void> => {
  const { httpClient, token } = await makeClientAndToken();
  return deleteTask(httpClient, id, token);
};
