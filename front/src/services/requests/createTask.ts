import type { HttpClient } from '@/types/contracts/services/httpClient';
import type { HttpResponse } from '@/types/contracts/services/httpResponse';
import type { Task } from '@/types/task';

export const createTask = async (
  httpClient: HttpClient,
  body: Task,
  token: string,
): Promise<HttpResponse> => {
  try {
    const response = await httpClient.request('/tasks', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body,
    });

    return response;
  } catch (error) {
    throw error;
  }
};
