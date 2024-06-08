import type { HttpClient } from '@/types/contracts/services/httpClient';
import type { HttpResponse } from '@/types/contracts/services/httpResponse';
import type { SignUp } from '@/types/signUp';

export default async function signUp(httpClient: HttpClient, body: SignUp): Promise<HttpResponse> {
  try {
    const response = await httpClient.request('/auth/register', {
      method: 'POST',
      body,
    });
    return response;
  } catch (error) {
    throw error;
  }
}
