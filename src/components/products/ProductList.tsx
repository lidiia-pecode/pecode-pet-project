'use client';
import { Box, Typography, CircularProgress } from '@mui/material';
import { Product, ViewMode } from '@/types/Product';
import { ProductCard } from './ProductCard';
import { ProductGridTable } from './ProductGridTable';
import * as styles from './styles/ProductList.styles';

interface ProductListProps {
  products: Product[];
  isLoading: boolean;
  isUpdating: boolean;
  isError: boolean;
  mode: ViewMode;
  onOpenProduct: (product: Product) => void;
}

export const ProductList = ({
  products,
  isLoading,
  isUpdating,
  isError,
  mode,
  onOpenProduct,
}: ProductListProps) => {
  if (isError) {
    return (
      <Box sx={styles.errorBoxStyles}>
        <Typography variant='h5' color='error'>
          Error loading products. Please try again.
        </Typography>
      </Box>
    );
  }

  if (isLoading && !products.length) {
    return (
      <Box sx={styles.loadingBoxStyles}>
        <CircularProgress size={40} color='primary' />
      </Box>
    );
  }

  if (!isUpdating && !products.length) {
    return (
      <Box sx={styles.emptyBoxStyles}>
        <Typography variant='h6' color='text.secondary'>
          No products found matching your criteria.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={styles.containerStyles}>
      {isUpdating && (
        <Box sx={styles.loadingOverlayStyles}>
          <CircularProgress size={40} color='primary' />
        </Box>
      )}

      {mode === 'grid' ? (
        <Box sx={styles.gridStyles}>
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => onOpenProduct(product)}
            />
          ))}
        </Box>
      ) : (
        <ProductGridTable products={products} onOpenProduct={onOpenProduct} />
      )}
    </Box>
  );
};
