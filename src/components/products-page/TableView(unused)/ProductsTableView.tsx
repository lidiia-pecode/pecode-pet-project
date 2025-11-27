import { useCallback } from 'react';
import { useProducts } from '@/hooks/useProducts';
import { Box } from '@mui/material';
import { ProductsTableHeader } from './components/ProductsTableHeader';
import { ProductsTableViewSkeleton } from './components/ProductsTableViewSkeleton';
import { EmptyState } from '../ProductsList/components/EmptyState';
import { listTableStyles } from './ProductsTableView.styles';
import { useRouter } from 'next/navigation';
import { columns, gridTemplateColumns } from './components/columns';

export const ProductsTableView = () => {
  const { data, isLoading } = useProducts();
  const router = useRouter();

  const handleOpenProduct = useCallback(
    (id: number) => router.push(`/products/${id}`),
    [router]
  );

  if (isLoading) {
    return <ProductsTableViewSkeleton />;
  }

  if (!data?.products?.length) return <EmptyState />;

  return (
    <Box>
      <ProductsTableHeader />

      {data.products.map(product => (
        <Box
          key={product.id}
          sx={{ ...listTableStyles.row, gridTemplateColumns }}
          onClick={() => handleOpenProduct(product.id)}
        >
          {columns.map(col => (
            <Box
              key={col.key}
              sx={{
                minWidth: 0,
                overflow: 'hidden',
                ...(col.key === 'title' ? {} : { justifySelf: col.align }),
              }}
            >
              {col.render(product, handleOpenProduct)}
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
};
