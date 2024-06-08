import type { HttpClient } from '@/types/contracts/services/httpClient';

export const logout = async (httpClient: HttpClient, token: string): Promise<void> => {
  try {
    await httpClient.request('/auth/disconnect', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: {
        closeAllSessions: true,
      },
    });
    return;
  } catch (error) {
    throw error;
  }
};
