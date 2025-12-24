'use client';

import { Delete } from '@mui/icons-material';
import {
  Box,
  IconButton,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  DialogTitle,
  CircularProgress,
} from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { styles } from './DeleteButton.styles';
import { useProductsStore } from '@/store/productsStore';


interface DeleteButtonProps {
  open: boolean;
  loading: boolean;
  productTitle?: string;
  productCategory?: string;
  toggleOpen: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleDelete: () => Promise<void>;
}

export const DeleteButton = ({
  open,
  loading,
  productTitle,
  productCategory,
  toggleOpen,
  handleDelete,
}: DeleteButtonProps) => {
  const userRole = useProductsStore(state => state.role);
  if (userRole !== 'admin') {
    return null;
  }

  return (
    <>
      <Box
        sx={{
          ...styles.wrapper,
          ...(productTitle ? styles.wrapperCard : styles.wrapperCategory),
        }}
      >
        <IconButton onClick={toggleOpen} aria-label='Delete Product'>
          <Delete
            sx={{
              ...styles.deleteIcon,
              ...(productTitle
                ? styles.deleteIconCard
                : styles.deleteIconCategory),
            }}
          />
        </IconButton>
      </Box>

      <Dialog
        open={open}
        onClose={toggleOpen}
        onClick={e => e.stopPropagation()}
        disableRestoreFocus
      >
        <DialogTitle sx={styles.dialogTitle}>
          <WarningAmberIcon color='error' />
          {` Delete ${productTitle || productCategory}`}
        </DialogTitle>
        <DialogContent>
          <Typography>{`Are you sure you want to delete this ${
            productTitle ? 'product' : 'category'
          } ?`}</Typography>
        </DialogContent>

        <DialogActions sx={styles.dialogActions}>
          <Button onClick={toggleOpen} disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            color='error'
            variant='contained'
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
