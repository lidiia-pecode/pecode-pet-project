export function getSortedItemsByQuery<T extends string | { name: string }>(
  items: T[],
  query: string
): T[] {
  const trimmedQuery = query.trim().toLowerCase();

  if (!trimmedQuery) return items;

  const getValue = (item: T): string =>
    typeof item === 'string' ? item : item.name;

  return items
    .filter(item => getValue(item).toLowerCase().includes(trimmedQuery))
    .sort((a, b) => {
      const aLower = getValue(a).toLowerCase();
      const bLower = getValue(b).toLowerCase();
      const aStarts = aLower.startsWith(trimmedQuery);
      const bStarts = bLower.startsWith(trimmedQuery);

      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;

      return aLower.localeCompare(bLower);
    });
}
