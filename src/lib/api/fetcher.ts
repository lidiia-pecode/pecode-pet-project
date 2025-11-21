import { EXTERNAL_API } from "../constants";

export async function apiGet<T>(
  path: string,
): Promise<T> {
  const res = await fetch(`${EXTERNAL_API}${path}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error(`API Error: ${res.status} ${res.statusText}`);
  }

  const data: T = await res.json();
  return data;
}
