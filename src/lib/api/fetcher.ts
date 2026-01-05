export interface APIErrorResponse {
  error?: string;
  message?: string;
  [key: string]: unknown;
}

export class APIError extends Error {
  public readonly status: number;
  public readonly statusText: string;
  public readonly url: string;
  public readonly responseData: APIErrorResponse | null;

  constructor(
    message: string,
    response: Response,
    responseData: APIErrorResponse | null = null
  ) {
    super(message);
    this.name = 'APIError';
    this.status = response.status;
    this.statusText = response.statusText;
    this.url = response.url;
    this.responseData = responseData;
  }
}

export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

const API = 'https://api.escuelajs.co/api/v1';

export async function apiRequest<TResponse, TBody = undefined>(
  path: string,
  method: HTTPMethod = 'GET',
  body?: TBody,
  headers?: Record<string, string>
): Promise<TResponse> {
  const res = await fetch(`${API}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json', ...headers },
    body: body ? JSON.stringify(body) : undefined,
    cache: 'no-store',
  });

  if (!res.ok) {
    let errorData: APIErrorResponse | null = null;
    try {
      errorData = await res.json();
    } catch (e) {
      console.log(e);
    }

    const message =
      errorData?.error ||
      errorData?.message ||
      `API Error: ${res.status} ${res.statusText}`;

    throw new APIError(message, res, errorData);
  }

  return res.json() as Promise<TResponse>;
}

export const apiGet = <T>(path: string, headers?: Record<string, string>) =>
  apiRequest<T>(path, 'GET', undefined, headers);

export const apiPost = <T, B>(path: string, body: B) =>
  apiRequest<T, B>(path, 'POST', body);

export const apiPut = <T, B>(path: string, body: B) =>
  apiRequest<T, B>(path, 'PUT', body);

export const apiDelete = (path: string) => apiRequest(path, 'DELETE');
