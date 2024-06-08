import { makeClientAndToken } from '@/factories/services/makeClientAndToken';
import { changePassword, type ChangePassword } from '@/services/requests/changePassword';
import type { HttpResponse } from '@/types/contracts/services/httpResponse';

export const makeChangePassword = async (body: ChangePassword): Promise<HttpResponse> => {
  const { httpClient, token } = await makeClientAndToken();
  return changePassword(httpClient, body, token);
};
