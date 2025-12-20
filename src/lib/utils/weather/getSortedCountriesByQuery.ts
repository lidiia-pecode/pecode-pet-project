import { Country } from "@/types/Weather";

export function getSortedCountriesByQuery(
  countries: Country[],
  query: string
): Country[] {
  const trimmedQuery = query.trim().toLowerCase();

  if (!trimmedQuery) return countries;

  return countries
    .filter(country => country.name.toLowerCase().includes(trimmedQuery))
    .sort((a, b) => {
      const aLower = a.name.toLowerCase();
      const bLower = b.name.toLowerCase();
      const aStarts = aLower.startsWith(trimmedQuery);
      const bStarts = bLower.startsWith(trimmedQuery);

      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;

      return aLower.localeCompare(bLower);
    });
}