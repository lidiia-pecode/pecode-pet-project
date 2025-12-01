'use client';

import { useProductColumns } from '@/components/products-page/TableView/components/ProductColumns';
import { TanstackTable } from '@/components/TanstackTable/TanstackTable';
import { Product } from '@/types/Product';

export const TestWrapper = ({ products }: { products: Product[] }) => {
  const columns = useProductColumns();

  return (
    <TanstackTable
      data={products}
      columns={columns}
      totalCount={products.length}
    />
  );
};
