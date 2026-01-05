/* eslint-disable @next/next/no-img-element */
'use client';

import Link from 'next/link';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Divider,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ClearIcon from '@mui/icons-material/Clear';

import { styles } from './CartDrawer.styles';
import { useProductsStore } from '@/store/productsStore';

interface Props {
  open: boolean;
  onClose: () => void;
}

export const CartDrawer = ({ open, onClose }: Props) => {
  const cart = useProductsStore(s => s.cart);
  const remove = useProductsStore(s => s.removeFromCart);
  const increaseQty = useProductsStore(s => s.increaseQty);
  const decreaseQty = useProductsStore(s => s.decreaseQty);
  const clearCart = useProductsStore(s => s.clearCart);

  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <Drawer anchor='right' open={open} onClose={onClose}>
      <Box sx={styles.container}>
        <Box sx={styles.header}>
          <Typography variant='h6' sx={styles.headerTitle}>
            Shopping Cart
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider />

        <Box sx={styles.items}>
          {!cart.length && (
            <Typography sx={styles.empty}>Your cart is empty</Typography>
          )}

          {cart.map(item => (
            <Box key={item.id} sx={styles.item}>
              <IconButton
                size='small'
                onClick={() => remove(item.id)}
                sx={styles.removeBtn}
                aria-label='Remove product'
              >
                <ClearIcon />
              </IconButton>

              <Link style={styles.link} href={`/products/${item.id}`}>
                <img
                  src={item.images?.[0]}
                  alt={item.title}
                  style={styles.image}
                  loading='lazy'
                />
              </Link>

              <Box sx={styles.info}>
                <Typography sx={styles.title}>{item.title}</Typography>
                <Typography sx={styles.price}>${item.price}</Typography>
              </Box>

              <Box sx={styles.controls}>
                <IconButton
                  size='small'
                  sx={styles.ctrlBtn}
                  onClick={() =>
                    item.quantity <= 1 ? remove(item.id) : decreaseQty(item.id)
                  }
                >
                  <RemoveIcon fontSize='small' />
                </IconButton>

                <Typography sx={styles.qty}>{item.quantity}</Typography>

                <IconButton
                  size='small'
                  sx={styles.ctrlBtn}
                  onClick={() => increaseQty(item.id)}
                >
                  <AddIcon fontSize='small' />
                </IconButton>
              </Box>
            </Box>
          ))}
        </Box>

        <Divider />
        <Box sx={styles.footer}>
          <Typography variant='subtitle1' sx={styles.total}>
            Total: <span>${total.toFixed(2)}</span>
          </Typography>

          {cart.length > 0 && (
            <Button
              variant='outlined'
              fullWidth
              sx={{ mb: 1 }}
              onClick={clearCart}
            >
              Clear Cart
            </Button>
          )}

          <Button disabled={!cart.length} variant='contained' fullWidth>
            Proceed to Checkout
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};
