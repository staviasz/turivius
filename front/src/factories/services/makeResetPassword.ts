import { makeClientAndToken } from '@/factories/services/makeClientAndToken';
import { resetPassword } from '@/services/requests/resetPassword';
import type { HttpResponse } from '@/types/contracts/services/httpResponse';

export const makeResetPassword = async (email: string): Promise<HttpResponse> => {
  const { httpClient } = await makeClientAndToken();
  return resetPassword(httpClient, email);
};
