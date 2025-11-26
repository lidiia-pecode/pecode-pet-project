import { Product } from "@/types/Product";
import { Box, Button, Chip, IconButton } from "@mui/material";
import { Table } from "@tanstack/react-table";
import ViewColumnIcon from '@mui/icons-material/ViewColumn';

interface ITableToolbarProps {
  table: Table<Product>;
  selectedRowsCount: number;
  totalRowsCount: number;
  onOpenColumnMenu: (e: React.MouseEvent<HTMLElement>) => void;
};

export const TableToolbar = ({
  table,
  selectedRowsCount,
  totalRowsCount,
  onOpenColumnMenu,
}: ITableToolbarProps) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
    <IconButton onClick={onOpenColumnMenu}>
      <ViewColumnIcon />
    </IconButton>

    {selectedRowsCount > 0 && (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Button
          size='small'
          onClick={() => table.resetRowSelection()}
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
