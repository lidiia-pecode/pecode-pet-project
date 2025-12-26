import { Box, Typography, Button, Divider } from '@mui/material';
import { ProductRating } from '@/components/shared/ProductRating/ProductRating';
import { styles } from './ProductInfo.styles';
import { IProductRating } from '@/types/Product';

interface ProductInfoProps {
  title: string;
  price: number;
  description: string;
  rating: IProductRating;
}

export const ProductInfo = ({
  title,
  price,
  description,
  rating,
}: ProductInfoProps) => {
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

      <Button
        variant='contained'
        color='primary'
        size='large'
        sx={styles.addToCartButton}
      >
        Add to Cart
      </Button>

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
