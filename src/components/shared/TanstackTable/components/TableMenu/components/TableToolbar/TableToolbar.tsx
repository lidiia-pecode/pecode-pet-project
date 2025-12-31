'use client';

import { Box, Button, Chip, IconButton } from '@mui/material';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';

import { styles } from './TableToolbar.styles';
import { BulkDeleteButton } from '@/components/shared/BulkDeleteButton';

interface ITableToolbarProps {
  selectedRowsCount: number;
  totalRowsCount: number;
  onOpenColumnMenu: (e: React.MouseEvent<HTMLElement>) => void;
  onClearRowSelection: () => void;
  onBulkDelete: () => void;
}

export const TableToolbar = ({
  selectedRowsCount,
  totalRowsCount,
  onOpenColumnMenu,
  onClearRowSelection,
  onBulkDelete,
}: ITableToolbarProps) => {
  return (
    <Box sx={styles.outerBox}>
      <IconButton onClick={onOpenColumnMenu}>
        <ViewColumnIcon />
      </IconButton>

      {selectedRowsCount > 0 && (
        <Box sx={styles.innerBox}>
          <BulkDeleteButton onBulkDelete={onBulkDelete} />

          <Button
            size='small'
            variant='outlined'
            color='success'
            onClick={onClearRowSelection}
          >
            Clear Selection
          </Button>

          <Chip
            label={`${selectedRowsCount} of ${totalRowsCount} row(s) selected`}
            color='primary'
            variant='outlined'
          />
        </Box>
      )}
    </Box>
  );
};
