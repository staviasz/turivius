import type { HttpClient } from '@/types/contracts/services/httpClient';

export const deleteTask = async (
  httpClient: HttpClient,
  id: number,
  token: string,
): Promise<void> => {
  try {
    await httpClient.request(`/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return;
  } catch (error) {
    throw error;
  }
};
