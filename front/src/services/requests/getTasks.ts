import type { HttpClient } from '@/types/contracts/services/httpClient';
import type { HttpResponse } from '@/types/contracts/services/httpResponse';

export default async function getTasks(
  httpClient: HttpClient,
  jwtToken: string,
): Promise<HttpResponse> {
  try {
    const response = await httpClient.request('/task', {
      method: 'GET',

      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
}
