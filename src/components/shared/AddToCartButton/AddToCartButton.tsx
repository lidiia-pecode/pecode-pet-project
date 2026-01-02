'use client';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Button, IconButton, Tooltip } from '@mui/material';

import { useProductsStore } from '@/store/productsStore';
import { CartItem } from '@/store/slices/cartSlice';
import { styles } from './AddToCartButton.styles';
import { useGlobalStore } from '@/store/globalStore';

type Props = {
  product: CartItem;
  variant?: 'full' | 'icon';
};

export const AddToCartButton = ({ product, variant = 'full' }: Props) => {
  const userRole = useGlobalStore(state => state.user?.role);
  const addToCart = useProductsStore(s => s.addToCart);
  const cartItems = useProductsStore(s => s.cart);

  const isInCart = cartItems.some(item => item.id === product.id);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  if (userRole === 'admin') return null;

  if (variant === 'icon') {
    return (
      <Tooltip title={isInCart ? 'Already in cart' : 'Add to cart'}>
        <IconButton onClick={handleAdd} sx={styles.buttonIcon}>
          {isInCart ? <CheckCircleIcon /> : <ShoppingCartIcon />}
        </IconButton>
      </Tooltip>
    );
  }

  return (
    <Button
      variant='contained'
      color={isInCart ? 'success' : 'primary'}
      size='large'
      startIcon={isInCart ? <CheckCircleIcon /> : <ShoppingCartIcon />}
      onClick={handleAdd}
      sx={styles.buttonText}
    >
      {isInCart ? 'Added' : 'Add to Cart'}
    </Button>
  );
};
