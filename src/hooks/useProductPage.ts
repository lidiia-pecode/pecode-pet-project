'use client';
import { useMemo, useState } from 'react';
import { useProductQuery } from './useProductQuery';
import { useProducts } from './useProducts';
import { useProductHandlers } from './useProductHandlers';
import { useResponsive } from './useResponsive';
import { queryToFilters } from '@/lib/utils/productQuery';
import { Product } from '@/types/Product';
import { useViewMode } from './useViewMode';

export const useProductPage = () => {
  const { isTablet, isMobile } = useResponsive();
  const { query, updateQuery } = useProductQuery();
  const handlers = useProductHandlers(query, updateQuery);
  const filters = useMemo(() => queryToFilters(query), [query]);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const openProduct = (product: Product) => setSelectedProduct(product);
  const closeProduct = () => setSelectedProduct(null);
  const toggleMobileFilters = () => setIsMobileFiltersOpen(prev => !prev);
  const closeMobileFilters = () => setIsMobileFiltersOpen(false);

  const { viewMode, setViewMode } = useViewMode();
  const currentMode = isMobile ? 'grid' : viewMode;

  const { data, isError, isFetching } = useProducts({
    page: query.page,
    limit: query.limit,
    filters,
    sort: query.sort,
  });

  const isLoadingInitial = isFetching && !data;
  const products = data?.data ?? [];
  const totalPages = data?.totalPages ?? 1;

  return {
    isTablet,
    isMobile,
    currentMode,
    isMobileFiltersOpen,
    products,
    totalPages,
    filters,
    query,
    isLoadingInitial,
    isFetching,
    isError,
    selectedProduct,
    handlers,
    setViewMode,
    toggleMobileFilters,
    closeMobileFilters,
    openProduct,
    closeProduct,
  };
};
