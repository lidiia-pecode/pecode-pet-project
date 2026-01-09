import { useQuery } from '@tanstack/react-query';
import { fetchAssetPairs } from '@/lib/api/market-dashboard/kraken';

export function useAssetPairs() {
  return useQuery<string[]>({
    queryKey: ['asset-pairs'],
    queryFn: async () => {
      const data = await fetchAssetPairs();

      return Object.values(data)
        .filter(pair => pair.status === 'online')
        .map(pair => pair.wsname)
    },
    staleTime: 24 * 60 * 60 * 1000,
  });
}
