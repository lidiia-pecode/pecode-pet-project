'use client';

import Link from 'next/link';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
} from '@mui/material';
import { Product } from '@/types/Product';
import { CARD_SX, MEDIA_SX, PRICE_SX, TITLE_SX } from './styles';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const productUrl = `/products/${product.id}`;

  return (
    <Card
      component={Link}
      href={productUrl}
      sx={{ ...CARD_SX, textDecoration: 'none', cursor: 'pointer' }}
    >
      <CardMedia
        component='img'
        image={product.image}
        alt={product.title}
        sx={MEDIA_SX}
      />

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant='subtitle1' sx={TITLE_SX}>
          {product.title}
        </Typography>

        <Typography variant='body2' sx={PRICE_SX}>
          ${product.price}
        </Typography>
      </CardContent>

      <CardActions>
        <Button size='small'>View</Button>
      </CardActions>
    </Card>
  );
};
