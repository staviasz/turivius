import type { HttpClient } from '@/types/contracts/services/httpClient';
import type { HttpResponse } from '@/types/contracts/services/httpResponse';
import type { ISignUp } from '@/types/signUp';

export default async function registerUser(
  httpClient: HttpClient,
  body: ISignUp,
): Promise<HttpResponse> {
  try {
    const response = await httpClient.request('/user/register', {
      method: 'POST',
      body,
    });

    return response;
  } catch (error) {
    throw error;
  }
}
