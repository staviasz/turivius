import type { ChangePassword } from '@/services/requests/changePassword';
import type { HttpClient } from '@/types/contracts/services/httpClient';

export interface ValidateCode extends Omit<ChangePassword, 'password'> {}

export const validateCode = (httpClient: HttpClient, body: ValidateCode, token: string) => {
  try {
    const response = httpClient.request('/auth/validatecode', {
      method: 'POST',
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
