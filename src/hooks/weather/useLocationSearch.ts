import { MAP_CONFIG } from '@/components/weather/constants';
import { NominatimResult } from '@/types/Weather';
import { useState, useEffect, useCallback } from 'react';


export const useLocationSearch = (query: string) => {
  const [suggestions, setSuggestions] = useState<NominatimResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearSuggestions = useCallback(() => {
    setSuggestions([]);
    setError(null);
  }, []);

  useEffect(() => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      clearSuggestions();
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    const timeout = setTimeout(async () => {
      setLoading(true);
      setError(null);

      try {
        const url = new URL('https://nominatim.openstreetmap.org/search');
        url.searchParams.set('format', 'json');
        url.searchParams.set('q', trimmedQuery);
        url.searchParams.set('limit', String(MAP_CONFIG.SEARCH_LIMIT));

        const response = await fetch(url.toString(), {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error('Search failed');
        }

        const data = await response.json();
        setSuggestions(data);
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          setError('Failed to search locations');
          console.error('Location search error:', err);
        }
      } finally {
        setLoading(false);
      }
    }, MAP_CONFIG.SEARCH_DEBOUNCE);

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [query, clearSuggestions]);

  return { suggestions, loading, error, clearSuggestions };
};
