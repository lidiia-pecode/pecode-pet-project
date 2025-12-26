import { Box } from '@mui/material';
import { Cell, flexRender } from '@tanstack/react-table';

import { styles } from './TableCell.styles';
import { ColumnMeta } from '@/types/TanstackTable';

interface ITableCell<T> {
  cell: Cell<T, unknown>;
  width: number;
  stickyLeft?: number;
}

export function TableCell<T>({ cell, width, stickyLeft }: ITableCell<T>) {
  const isPinned = stickyLeft != null;
  const align =
    (cell.column.columnDef.meta as ColumnMeta)?.align ?? 'flex-start';

  return (
    <Box
      sx={{
        width,
        left: stickyLeft,
        justifyContent: align,
        ...styles.base,
        ...(isPinned ? styles.pinned : styles.normal),
      }}
    >
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </Box>
  );
}
