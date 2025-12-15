'use client';

import { useState } from 'react';
import { SortingState } from '@tanstack/react-table';

import { useProducts } from '@/hooks/products/useProducts';
import { useProductColumns } from './components/ProductColumns';
import { TanstackTable } from '../../shared/TanstackTable/TanstackTable';
import { useProductsStore } from '@/store/productsStore';

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
