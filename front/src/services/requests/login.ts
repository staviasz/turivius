import type { HttpClient } from '@/types/contracts/services/httpClient';
import type { HttpResponse } from '@/types/contracts/services/httpResponse';
import type { Login } from '@/types/login';

export const login = async (httpClient: HttpClient, body: Login): Promise<HttpResponse> => {
  try {
    const response = await httpClient.request('/auth', {
      method: 'POST',
      body,
    });

    return response;
  } catch (error) {
    throw error;
  }
};
