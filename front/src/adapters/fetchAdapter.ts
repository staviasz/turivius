import type { HttpClient } from '@/types/contracts/services/httpClient';
import type { HttpResponse } from '@/types/contracts/services/httpResponse';
import type { RequestOptions } from '@/types/contracts/services/requestOptions';
import { ErrorApi } from '../services/errors/errorApi';

export class FetchAdapter implements HttpClient {
  async request(url: string, options: RequestOptions): Promise<HttpResponse> {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, {
        method: options.method,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        body: JSON.stringify(options.body),
      });

      if (!response.ok) {
        const body = await response.json();
        throw new ErrorApi(body, response.status, response.statusText);
      }
      return {
        status: response.status,
        body: await response.json(),
      };
    } catch (error) {
      if (error instanceof ErrorApi) {
        throw error;
      }

      const _error = error as Error;
      throw new Error(_error?.message);
    }
  }
}
