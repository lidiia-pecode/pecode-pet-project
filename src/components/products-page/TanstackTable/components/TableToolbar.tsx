import { Box, Button, Chip, IconButton } from "@mui/material";
import ViewColumnIcon from '@mui/icons-material/ViewColumn';

interface ITableToolbarProps {
  selectedRowsCount: number;
  totalRowsCount: number;
  onOpenColumnMenu: (e: React.MouseEvent<HTMLElement>) => void;
  onClearRowSelection: () => void;
};

export const TableToolbar = ({
  selectedRowsCount,
  totalRowsCount,
  onOpenColumnMenu,
  onClearRowSelection
}: ITableToolbarProps) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
    <IconButton onClick={onOpenColumnMenu}>
      <ViewColumnIcon />
    </IconButton>

    {selectedRowsCount > 0 && (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Button
          size='small'
          onClick={onClearRowSelection}
        >
          Clear Selection
        </Button>

        <Chip
          label={`${selectedRowsCount} of ${totalRowsCount} row(s) selected`}
          color='primary'
          variant='outlined'
          size='small'
        />
      </Box>
    )}
  </Box>
);
