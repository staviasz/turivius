import type { HttpClient } from './../../types/contracts/services/httpClient';
export default async function logout(HttpClient: HttpClient, token: string) {
  try {
    const response = await HttpClient.request('/user/logout', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
}
