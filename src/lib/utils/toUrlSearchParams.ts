export function toUrlSearchParams(
  searchParams: Record<string, string | string[] | undefined>
): URLSearchParams {
  const params = new URLSearchParams();

  const entries = Object.entries(searchParams ?? {});

  for (const [key, value] of entries) {
    if (value == null) {
      continue;
    }

    if (Array.isArray(value)) {
      for (const item of value) {
        if (typeof item === 'string') {
          params.append(key, item);
        }
      }
    } else if (typeof value === 'string') {
      params.set(key, value);
    }
  }

  return params;
}
