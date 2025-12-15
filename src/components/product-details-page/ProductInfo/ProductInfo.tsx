import { Box, Typography, Button, Divider } from '@mui/material';
import { ProductRating } from '@/components/products-page/shared/ProductRating';
import { productInfoStyles } from './ProductInfo.styles';
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
    <Box sx={productInfoStyles.container}>
      <Typography variant='h1' sx={productInfoStyles.title}>{title}</Typography>
 
      <Box sx={productInfoStyles.ratingContainer}>
        <ProductRating value={rating.rate} size='large' showCount={false} />
        <Typography variant='body2' color='text.secondary'>
          {rating.count} reviews
        </Typography>
      </Box>

      <Typography variant='h4' sx={productInfoStyles.price}>${price}</Typography>

      <Button
        variant='contained'
        color='primary'
        size='large'
        sx={productInfoStyles.addToCartButton}
      >
        Add to Cart
      </Button>

      <Divider sx={productInfoStyles.divider} />

      <Box sx={productInfoStyles.descriptionContainer}>
        <Typography sx={productInfoStyles.descriptionTitle}>
          Description
        </Typography>
        <Typography variant='h6' sx={productInfoStyles.descriptionText}>
          {description}
        </Typography>
      </Box>
    </Box>
  );
};
