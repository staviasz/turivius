import type { HttpClient } from '@/types/contracts/services/httpClient';
import type { HttpResponse } from '@/types/contracts/services/httpResponse';
import type { Task } from '@/types/task';

export default async function updateTasks(
  httpClient: HttpClient,
  jwtToken: string,
  body: Task,
  id: number,
): Promise<HttpResponse> {
  try {
    const response = await httpClient.request(`/task/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      body,
    });

    return response;
  } catch (error) {
    throw error;
  }
}
