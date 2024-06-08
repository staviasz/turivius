import { makeClientAndToken } from '@/factories/services/makeClientAndToken';
import signUp from '@/services/requests/signUp';
import type { HttpResponse } from '@/types/contracts/services/httpResponse';
import type { SignUp } from '@/types/signUp';

export const makeSignUp = async (body: SignUp): Promise<HttpResponse> => {
  const { httpClient } = await makeClientAndToken();
  return signUp(httpClient, body);
};
