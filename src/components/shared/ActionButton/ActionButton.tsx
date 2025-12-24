'use client';

import {
  Dialog,
  DialogContent,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import { ReactElement } from 'react';
import { useProductsStore } from '@/store/productsStore';
import { styles } from './ActionButton.styles';

type ActionButtonMode = 'create' | 'edit';

interface ActionButtonProps {
  mode: ActionButtonMode;
  entityName: string;
  buttonText?: string;
  icon: ReactElement;
  form: ReactElement;
  open: boolean;
  size?: 'small' | 'medium' | 'large';
  onToggle: () => void;
}

export const ActionButton = ({
  mode,
  entityName,
  buttonText,
  icon,
  form,
  open,
  size = 'medium',
  onToggle,
}: ActionButtonProps) => {
  const userRole = useProductsStore(state => state.role);

  if (userRole !== 'admin') return null;

  const actionLabel =
    mode === 'create' ? `Add ${entityName}` : `Edit ${entityName}`;

  return (
    <>
      <Tooltip title={actionLabel} arrow>
        <IconButton
          size={size}
          onClick={onToggle}
          aria-label={actionLabel}
          sx={{
            ...styles.buttonBasic,
            ...(mode === 'edit' && styles.updateButtonVar),
          }}
        >
          {icon}
          <Typography sx={styles.buttonText}>
            {buttonText && buttonText}
          </Typography>
        </IconButton>
      </Tooltip>

      <Dialog open={open} onClose={onToggle} fullWidth>
        <DialogContent>{form}</DialogContent>
      </Dialog>
    </>
  );
};
