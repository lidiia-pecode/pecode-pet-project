import { ColumnMeta } from "@/types/TanstackTable";
import { Box } from "@mui/material";
import { Cell, flexRender } from "@tanstack/react-table";

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
        display: 'flex',
        alignItems: 'center',
        justifyContent: align,
        px: 1,
        borderRight: '1px solid #f0f0f0',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        position: isPinned ? 'sticky' : 'relative',
        left: stickyLeft,
        backgroundColor: isPinned ? 'background.paper' : 'inherit',
        zIndex: isPinned ? 2 : 1,
      }}
    >
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </Box>
  );
}
