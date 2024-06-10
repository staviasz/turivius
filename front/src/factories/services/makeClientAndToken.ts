import { FetchAdapter } from '@/adapters/fetchAdapter';
import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/route';
import type { HttpClient } from '@/types/contracts/services/httpClient';
import { getServerSession } from 'next-auth';

interface makeClientAndTokenReturn {
  httpClient: HttpClient;
  csrfToken: string;
  jwtToken: string;
}

export const makeClientAndToken = async (token?: string): Promise<makeClientAndTokenReturn> => {
  const httpClient: HttpClient = new FetchAdapter();

  let csrfToken = '';
  let jwtToken = token || '';
  try {
    const { user } = (await getServerSession(nextAuthOptions)) as any;
    const { csrftoken: token, access_token } = user;

    csrfToken = token;
    jwtToken = access_token;
    console.log(access_token);
  } catch (error) {}
  console.log(jwtToken);

  return { httpClient, csrfToken, jwtToken };
};
