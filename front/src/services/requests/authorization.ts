import type { HttpClient } from '@/types/contracts/services/httpClient';
import type { HttpResponse } from '@/types/contracts/services/httpResponse';

export const authorization = async (
  httpClient: HttpClient,
  token: string,
  refreshToken: string,
): Promise<HttpResponse> => {
  try {
    const response = await httpClient.request('/auth/refresh', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: {
        refreshToken,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
