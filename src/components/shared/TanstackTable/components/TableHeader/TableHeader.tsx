import { Table } from '@tanstack/react-table';
import { Box } from '@mui/material';

import { styles } from './TableHeader.styles';
import { TableHeaderCell } from './components/TableHeaderCell';


interface ITableHeader<T> {
  table: Table<T>;
  stickyLefts: Record<string, number>;
}

export function TableHeader<T>({ table, stickyLefts }: ITableHeader<T>) {
  return (
    <Box sx={styles.container}>
      {table
        .getHeaderGroups()
        .map(group =>
          group.headers.map(header => (
            <TableHeaderCell
              key={header.id}
              header={header}
              stickyLeft={stickyLefts[header.column.id]}
            />
          ))
        )}
    </Box>
  );
}
