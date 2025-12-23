'use client';

import { deleteProductById } from '@/lib';
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
import { MouseEvent, useState } from 'react';
import { cardStyles } from '../ProductsCard.styles';
import { Alerts } from '@/components/shared/FormAlert';
import { useAlert } from '@/hooks/useAlert';

interface DeleteProductButtonProps {
  id: number;
  productTitle: string;
  refetch: () => void;
}

export const DeleteProductButton = ({
  id,
  productTitle,
  refetch,
}: DeleteProductButtonProps) => {
  const alert = useAlert();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpen = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteProductById(id);
      alert.success('Product deleted!');
      refetch();
      setOpen(false);
    } catch (err) {
      alert.error('Failed to delete product');
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box sx={cardStyles.deleteButtonWrapper}>
        <IconButton onClick={handleOpen} aria-label='Delete Product'>
          <Delete sx={cardStyles.deleteIcon} />
        </IconButton>
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        onClick={e => e.stopPropagation()}
        disableRestoreFocus
      >
        <DialogTitle sx={cardStyles.dialogTitle}>
          <WarningAmberIcon color='error' />
          {` Delete ${productTitle}`}
        </DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this product?</Typography>
        </DialogContent>

        <DialogActions sx={cardStyles.dialogActions}>
          <Button onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            color='error'
            variant='contained'
            disabled={loading}
          >
            {loading ? < CircularProgress size={24}/> : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>

      <Alerts {...alert} />
    </>
  );
};
