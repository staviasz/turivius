import { makeClientAndToken } from '@/factories/services/makeClientAndToken';
import type { ValidateCode } from '@/services/requests/validateCode';
import { validateCode } from '@/services/requests/validateCode';
import type { HttpResponse } from '@/types/contracts/services/httpResponse';

export const makeValidateCode = async (body: ValidateCode): Promise<HttpResponse> => {
  const { httpClient, token } = await makeClientAndToken();
  return validateCode(httpClient, body, token);
};
