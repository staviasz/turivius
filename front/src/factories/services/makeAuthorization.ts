import { makeClientAndToken } from '@/factories/services/makeClientAndToken';
import { authorization } from '@/services/requests/authorization';
import type { HttpResponse } from '@/types/contracts/services/httpResponse';

export const makeAuthorization = async (): Promise<HttpResponse> => {
  const { httpClient, token, refreshToken } = await makeClientAndToken();
  return authorization(httpClient, token, refreshToken);
};
