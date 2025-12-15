import { Row } from '@tanstack/react-table';
import { Box } from '@mui/material';
import { TableCell } from './TableCell';
import { tableRowStyles } from './TableRow.styles';



interface ITableRow<T> {
  row: Row<T>;
  columnWidths: Record<string, number>;
  stickyLefts: Record<string, number>;
}

export function TableRow<T>({ row, columnWidths, stickyLefts }: ITableRow<T>) {
  return (
    <Box sx={tableRowStyles.container}>
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
