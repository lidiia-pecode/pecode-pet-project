import { getProducts } from "@/lib";
import { useProductsStore } from "@/store/productsStore";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useProducts = () => {
  const currentPage = useProductsStore(state => state.currentPage);
  const filters = useProductsStore(state => state.filters);
  const sortOption = useProductsStore(state => state.sortOption);

  return useQuery({
    queryKey: ['products', currentPage, filters, sortOption],
    queryFn: () => getProducts({ page: currentPage, filters, sortOption }),
    placeholderData: keepPreviousData,
  });
};
