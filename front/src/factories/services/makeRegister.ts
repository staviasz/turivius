import registerUser from '@/services/requests/registerUser';
import type { HttpResponse } from '@/types/contracts/services/httpResponse';
import type { ISignUp } from '@/types/signUp';
import { makeClientAndToken } from './makeClientAndToken';

export default async function makeRegister(body: ISignUp): Promise<HttpResponse> {
  const { httpClient } = await makeClientAndToken();
  return registerUser(httpClient, body);
}
