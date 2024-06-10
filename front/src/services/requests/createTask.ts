import type { HttpClient } from '@/types/contracts/services/httpClient';
import type { HttpResponse } from '@/types/contracts/services/httpResponse';
import type { Task } from '@/types/task';

export default async function createTasks(
  httpClient: HttpClient,
  jwtToken: string,
  body: Task,
): Promise<HttpResponse> {
  try {
    console.log(jwtToken);

    const response = await httpClient.request('/task', {
      method: 'POST',
      headers: {
        // 'X-CSRF-Token': csrfToken,
        Authorization: `Bearer ${jwtToken}`,
      },
      body,
    });

    return response;
  } catch (error) {
    throw error;
  }
}
