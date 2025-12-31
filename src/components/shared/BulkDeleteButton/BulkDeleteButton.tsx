'use client';
import { Button } from '@mui/material';
import { useGlobalStore } from '@/store/globalStore';

interface BulkDeleteButtonProps {
  onBulkDelete: () => void;
}

export const BulkDeleteButton = ({ onBulkDelete }: BulkDeleteButtonProps) => {
  const userRole = useGlobalStore(state => state.user?.role);
  const canDelete = userRole === 'admin';

  if (!canDelete) return null;

  return (
    <Button
      size='small'
      color='error'
      variant='outlined'
      onClick={onBulkDelete}
    >
      Delete Selected
    </Button>
  );
};
