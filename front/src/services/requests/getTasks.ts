import type { HttpClient } from '@/types/contracts/services/httpClient';
import type { HttpResponse } from '@/types/contracts/services/httpResponse';

export const getTasks = async (
  httpClient: HttpClient,
  month: string,
  year: string,
  token: string,
): Promise<HttpResponse> => {
  try {
    const response = await httpClient.request(`/tasks/?month=${month}&year=${year}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
