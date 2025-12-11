import { getCategories } from "@/lib/api/products/categories";
import { useQuery } from "@tanstack/react-query";

export const useCategories = () => {
return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 60,
  });
}