import { Card, CardContent, CardActions, Button } from '@mui/material';
import { Product } from '@/types/Product';
import { ProductPreviewLayout } from './ProductPreviewLayout';
import * as styles from './styles/ProductCard.styles';

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

export const ProductCard = ({ product, onClick }: ProductCardProps) => {
  return (
    <Card onClick={onClick} sx={styles.cardStyles}>
      <CardContent sx={styles.contentStyles}>
        <ProductPreviewLayout
          product={product}
          imageSx={styles.mediaStyles}
          titleSx={styles.titleStyles}
          priceSx={styles.priceStyles}
          ratingSize='small'
        />
      </CardContent>
      <CardActions sx={styles.actionsStyles}>
        <Button fullWidth variant='contained'>
          View
        </Button>
      </CardActions>
    </Card>
  );
};
