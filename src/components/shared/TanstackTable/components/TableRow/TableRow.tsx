import { Row } from '@tanstack/react-table';
import { Box } from '@mui/material';

import { styles } from './TableRow.styles';
import { TableCell } from './components/TableCell';

interface ITableRow<T> {
  row: Row<T>;
  columnWidths: Record<string, number>;
  stickyLefts: Record<string, number>;
}

export function TableRow<T>({ row, columnWidths, stickyLefts }: ITableRow<T>) {
  return (
    <Box sx={styles.container}>
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
