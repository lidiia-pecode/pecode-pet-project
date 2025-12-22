import { EXTERNAL_API } from '@/lib/constants';

export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export async function apiRequest<TResponse, TBody = undefined>(
  path: string,
  method: HTTPMethod = 'GET',
  body?: TBody,
): Promise<TResponse> {

  const res = await fetch(`${EXTERNAL_API}${path}`, {
    method,
    headers: {'Content-Type': 'application/json'},
    body: body ? JSON.stringify(body) : undefined,
    cache: 'no-store',
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    const message =
      errorData?.error ||
      errorData?.message ||
      `API Error: ${res.status} ${res.statusText}`;
    throw new Error(message);
  }

  return res.json() as Promise<TResponse>;
}

export const apiGet = <T>(path: string) => apiRequest<T>(path, 'GET');

export const apiPost = <T, B>(path: string, body: B) =>
  apiRequest<T, B>(path, 'POST', body);

export const apiDelete = (path: string) => apiRequest(path, 'DELETE');