import { Product } from '@/types/Product';
import { Cell, flexRender, Row } from '@tanstack/react-table';
import { ProductColumnMeta } from '../TanstackTable';
import { Box } from '@mui/material';

interface ITableCell {
  cell: Cell<Product, unknown>;
  width: number;
  stickyLeft?: number;
}

const TableCell = ({ cell, width, stickyLeft }: ITableCell) => {
  const isPinned = stickyLeft != null;
  const align =
    (cell.column.columnDef.meta as ProductColumnMeta)?.align ?? 'flex-start';

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
};

interface ITableRow {
  row: Row<Product>;
  columnWidths: Record<string, number>;
  stickyLefts: Record<string, number>;
}

export const TableRow = ({ row, columnWidths, stickyLefts }: ITableRow) => (
  <Box sx={{ display: 'flex', borderBottom: '1px solid #eee', height: 80 }}>
    {row.getVisibleCells().map(cell => (
      <TableCell
        key={cell.id}
        cell={cell}
        width={columnWidths[cell.column.id]}
        stickyLeft={stickyLefts[cell.column.id]}
      />
    ))}
  </Box>
);
