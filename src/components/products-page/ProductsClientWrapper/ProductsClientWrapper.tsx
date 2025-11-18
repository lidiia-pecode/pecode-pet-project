// components/products-page/ProductsClientWrapper/ProductsClientWrapper.tsx
'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/lib/api/products';
import { ProductsPagination } from '../ProductsPagination';
import { ProductsList } from '../ProductsList';

export default function ProductClientWrapper() {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const { data, isLoading } = useQuery({
    queryKey: ['products', currentPage],
    queryFn: () => getProducts({ page: currentPage, limit }),
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <ProductsList products={data?.products ?? []} variant='grid' />
      <ProductsPagination
        currentPage={currentPage}
        totalPages={data?.totalPages ?? 1}
        onChange={setCurrentPage}
      />
    </div>
  );
}
