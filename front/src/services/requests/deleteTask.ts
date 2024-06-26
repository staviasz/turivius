import type { HttpClient } from '@/types/contracts/services/httpClient';
import type { HttpResponse } from '@/types/contracts/services/httpResponse';

export default async function deleteTasks(
  httpClient: HttpClient,
  jwtToken: string,
  id: number,
): Promise<HttpResponse> {
  try {
    const response = await httpClient.request(`/task/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
}
