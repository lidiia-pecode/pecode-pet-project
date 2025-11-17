import { Box, Typography } from '@mui/material';
import { Product, ViewMode } from '@/types/Product';
import { ProductCard } from './ProductCard';
import { ProductGridTable } from './ProductGridTable';
import * as styles from './styles/ProductList.styles';

interface ProductListProps {
  products: Product[];
  mode: ViewMode;
  onOpenProduct: (product: Product) => void;
}

export const ProductList = ({
  products,
  mode,
  onOpenProduct,
}: ProductListProps) => {
  if (!products.length) {
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
