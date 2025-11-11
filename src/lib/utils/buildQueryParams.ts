export function buildQueryParams(
  params?: Record<string, string | number | boolean | undefined | null>
): string {
  if (!params) return '';

  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value != null) {
      query.append(key, String(value));
    }
  });

  const queryString = query.toString();
  return queryString ? `?${queryString}` : '';
}
