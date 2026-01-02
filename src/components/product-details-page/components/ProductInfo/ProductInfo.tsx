import { Box, Typography, Divider } from '@mui/material';

import { styles } from './ProductInfo.styles';
import { Product } from '@/types/Product';
import { ProductRating } from '@/components/shared/ProductRating';
import { AddToCartButton } from '@/components/shared/AddToCartButton';

interface ProductInfoProps {
  product: Product;
}

export const ProductInfo = ({ product }: ProductInfoProps) => {
  const { title, price, description, rating } = product;

  return (
    <Box sx={styles.container}>
      <Typography variant='h1' sx={styles.title}>
        {title}
      </Typography>

      <Box sx={styles.ratingContainer}>
        <ProductRating value={rating.rate} size='large' showCount={false} />
        <Typography variant='body2' color='text.secondary'>
          {rating.count} reviews
        </Typography>
      </Box>

      <Typography variant='h4' sx={styles.price}>
        ${price}
      </Typography>

      <AddToCartButton product={{...product, quantity: 1}}/>

      <Divider sx={styles.divider} />

      <Box sx={styles.descriptionContainer}>
        <Typography sx={styles.descriptionTitle}>Description</Typography>
        <Typography variant='h6' sx={styles.descriptionText}>
          {description}
        </Typography>
      </Box>
    </Box>
  );
};
