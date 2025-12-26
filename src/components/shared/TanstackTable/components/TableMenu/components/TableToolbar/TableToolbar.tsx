import { Box, Button, Chip, IconButton } from "@mui/material";
import ViewColumnIcon from '@mui/icons-material/ViewColumn';

import { styles } from "./TableToolbar.styles";

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
  onClearRowSelection,
}: ITableToolbarProps) => (
  <Box sx={styles.outerBox}>
    <IconButton onClick={onOpenColumnMenu}>
      <ViewColumnIcon />
    </IconButton>

    {selectedRowsCount > 0 && (
      <Box sx={styles.innerBox}>
        <Button size='small' onClick={onClearRowSelection}>
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
