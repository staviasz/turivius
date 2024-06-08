import { makeClientAndToken } from '@/factories/services/makeClientAndToken';
import { login } from '@/services/requests/login';
import type { HttpResponse } from '@/types/contracts/services/httpResponse';
import type { Login } from '@/types/login';

export const makeLogin = async (body: Login): Promise<HttpResponse> => {
  const { httpClient } = await makeClientAndToken();
  return login(httpClient, body);
};
