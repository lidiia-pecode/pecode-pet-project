import { Row } from '@tanstack/react-table';
import { Box } from '@mui/material';
import { TableCell } from './TableCell';



interface ITableRow<T> {
  row: Row<T>;
  columnWidths: Record<string, number>;
  stickyLefts: Record<string, number>;
}

export function TableRow<T>({ row, columnWidths, stickyLefts }: ITableRow<T>) {
  return (
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
}
