import { Table } from '@tanstack/react-table';
import { Box } from '@mui/material';
import { TableHeaderCell } from './TableHeaderCell';
import { tableHeaderStyles } from './TableHeader.styles';


interface ITableHeader<T> {
  table: Table<T>;
  stickyLefts: Record<string, number>;
}

export function TableHeader<T>({ table, stickyLefts }: ITableHeader<T>) {
  return (
    <Box
      sx={tableHeaderStyles.container}
    >
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
