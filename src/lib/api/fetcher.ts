
// lib/api/fetcher.ts
import { FAKE_STORE_API_URL } from "./api-constants";

export async function apiGet<T>(
  path: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: Record<string, any>
): Promise<T> {
  const url = new URL(`${FAKE_STORE_API_URL}${path}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  const res = await fetch(url.toString(), { cache: 'no-store' });
  if (!res.ok) {
    throw new Error(`API Error: ${res.status} ${res.statusText}`);
  }

  const data: T = await res.json();
  return data;
}
