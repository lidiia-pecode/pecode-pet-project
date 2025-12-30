'use client';

import { useState } from 'react';
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
import { useGlobalStore } from '@/store/globalStore';

type EntityType = 'product' | 'category';

interface DeleteButtonProps {
  entityName: string;
  entityType: EntityType;
  loading?: boolean;
  usedInTable?: boolean;
  onConfirm: (e: React.MouseEvent<Element, MouseEvent>) => Promise<void>;
}

export const DeleteButton = ({
  entityName,
  entityType,
  loading = false,
  usedInTable = false,
  onConfirm,
}: DeleteButtonProps) => {
  const userRole = useGlobalStore(state => state.user?.role);
  const [open, setOpen] = useState(false);

  if (userRole !== 'admin') return null;

  const handleOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(false);
  };

  const handleConfirm = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await onConfirm(e);
    setOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          ...styles.wrapper,
          ...(usedInTable
            ? styles.wrapperTable
            : entityType === 'product'
            ? styles.wrapperCard
            : styles.wrapperCategory),
        }}
      >
        <IconButton onClick={handleOpen} aria-label='Delete'>
          <Delete
            sx={{
              ...styles.deleteIcon,
              ...(entityType === 'product'
                ? styles.deleteIconCard
                : styles.deleteIconCategory),
            }}
          />
        </IconButton>
      </Box>

      <Dialog open={open} onClose={handleClose} disableRestoreFocus>
        <DialogTitle sx={styles.dialogTitle}>
          <WarningAmberIcon color='error' />
          {` Delete ${entityName}`}
        </DialogTitle>

        <DialogContent>
          <Typography>
            Are you sure you want to delete this {entityType}?
          </Typography>
        </DialogContent>

        <DialogActions sx={styles.dialogActions}>
          <Button onClick={handleClose} disabled={loading}>
            Cancel
          </Button>

          <Button
            onClick={handleConfirm}
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
