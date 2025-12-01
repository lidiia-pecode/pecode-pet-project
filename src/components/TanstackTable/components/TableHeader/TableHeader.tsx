import { Table } from '@tanstack/react-table';
import { Box } from '@mui/material';
import { TableHeaderCell } from './TableHeaderCell';


interface ITableHeader<T> {
  table: Table<T>;
  stickyLefts: Record<string, number>;
}

export function TableHeader<T>({ table, stickyLefts }: ITableHeader<T>) {
  return (
    <Box
      sx={{
        display: 'flex',
        height: 40,
        backgroundColor: 'action.hover',
        borderBottom: '1px solid #ddd',
      }}
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
