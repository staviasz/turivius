import type { HttpClient } from '@/types/contracts/services/httpClient';
import type { HttpResponse } from '@/types/contracts/services/httpResponse';
import type { ILogin } from '@/types/login';

export default async function loginUser(
  httpClient: HttpClient,
  body: ILogin,
): Promise<HttpResponse> {
  try {
    const response = await httpClient.request('/user/login', {
      method: 'POST',
      body,
    });
    console.log(response);

    return response;
  } catch (error) {
    throw error;
  }
}
