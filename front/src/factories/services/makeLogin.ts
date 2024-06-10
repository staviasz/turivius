import loginUser from '@/services/requests/login';
import type { HttpResponse } from '@/types/contracts/services/httpResponse';
import type { ILogin } from '@/types/login';
import { makeClientAndToken } from './makeClientAndToken';

export default async function makeLogin(body: ILogin): Promise<HttpResponse> {
  const { httpClient } = await makeClientAndToken();
  return loginUser(httpClient, body);
}
