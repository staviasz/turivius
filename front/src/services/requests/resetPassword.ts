import type { HttpClient } from '@/types/contracts/services/httpClient';
import type { HttpResponse } from '@/types/contracts/services/httpResponse';

export const resetPassword = (httpClient: HttpClient, email: string): Promise<HttpResponse> => {
  try {
    const response = httpClient.request('/auth/resetpassword', {
      method: 'POST',
      body: {
        email,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
