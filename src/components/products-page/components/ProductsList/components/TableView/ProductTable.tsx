'use client';

import { useState } from 'react';
import { SortingState } from '@tanstack/react-table';

import { useProductsStore } from '@/store/productsStore';
import { useProducts } from '@/hooks/products/useProducts';
import { useProductColumns } from './components/ProductColumns/ProductColumns';
import { TanstackTable } from '@/components/shared/TanstackTable';
import { EmptyState } from '@/components/shared/EmptyState';

export const ProductTable = () => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const { data, isLoading } = useProducts(sorting);

  const currentPage = useProductsStore(state => state.currentPage);

  const products = data?.products || [];
  const total = data?.total || 0;

  const columns = useProductColumns();

  const columnVisibility = useProductsStore(state => state.columnVisibility);
  const setColumnVisibility = useProductsStore(
    state => state.setColumnVisibility
  );

  const columnOrder = useProductsStore(state => state.columnOrder);
  const setColumnOrder = useProductsStore(state => state.setColumnOrder);

  const pageSelections = useProductsStore(state => state.pageSelections);
  const setPageSelection = useProductsStore(state => state.setPageSelection);

  if (!data?.products?.length) {
    return (
      <EmptyState
        title='No products found'
        subtitle='Try adjusting your filters or search query'
      />
    );
  }

  return (
    <TanstackTable
      data={products}
      columns={columns}
      isLoading={isLoading}
      totalCount={total}
      stateProps={{
        sorting,
        setSorting,
        columnVisibility,
        setColumnVisibility,
        columnOrder,
        setColumnOrder,
        pageSelections,
        setPageSelection,
        page: currentPage,
      }}
    />
  );
};
