import type { HttpClient } from '@/types/contracts/services/httpClient';

export interface ChangePassword {
  password: string;
  code: string;
  accountId: string;
}

export const changePassword = (httpClient: HttpClient, body: ChangePassword, token: string) => {
  try {
    const response = httpClient.request('/auth/changepassword', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
