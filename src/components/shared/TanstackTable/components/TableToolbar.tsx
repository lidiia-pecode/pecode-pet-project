import { Box, Button, Chip, IconButton, SxProps } from "@mui/material";
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import { Theme } from "@emotion/react";

interface ITableToolbarProps {
  selectedRowsCount: number;
  totalRowsCount: number;
  onOpenColumnMenu: (e: React.MouseEvent<HTMLElement>) => void;
  onClearRowSelection: () => void;
};

export const TableToolbarStyles = {
  outerBox: { display: 'flex', alignItems: 'center', gap: 2 },
  innerBox: { display: 'flex', alignItems: 'center', gap: 1 },
} satisfies Record<string, SxProps<Theme>>;

export const TableToolbar = ({
  selectedRowsCount,
  totalRowsCount,
  onOpenColumnMenu,
  onClearRowSelection,
}: ITableToolbarProps) => (
  <Box sx={TableToolbarStyles.outerBox}>
    <IconButton onClick={onOpenColumnMenu}>
      <ViewColumnIcon />
    </IconButton>

    {selectedRowsCount > 0 && (
      <Box sx={TableToolbarStyles.innerBox}>
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
