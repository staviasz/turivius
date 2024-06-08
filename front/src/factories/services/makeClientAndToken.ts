import { FetchAdapter } from '@/adapters/fetchAdapter';
import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/route';
import type { HttpClient } from '@/types/contracts/services/httpClient';
import { getServerSession } from 'next-auth';

interface makeClientAndTokenReturn {
  httpClient: HttpClient;
  token: string;
  refreshToken: string;
}

export const makeClientAndToken = async (): Promise<makeClientAndTokenReturn> => {
  const httpClient: HttpClient = new FetchAdapter();

  let token = '';
  let refreshToken = '';
  try {
    const { user } = (await getServerSession(nextAuthOptions)) as any;
    const { token: userToken, refreshToken: userRefreshToken } = user;

    token = userToken;
    refreshToken = userRefreshToken;
  } catch (error) {}

  return { httpClient, token, refreshToken };
};
