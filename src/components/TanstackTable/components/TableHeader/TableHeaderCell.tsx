import { ColumnMeta } from '@/types/TanstackTable';
import { flexRender, Header } from '@tanstack/react-table';
import { ArrowDropDown, ArrowDropUp, UnfoldMore } from '@mui/icons-material';
import { Box } from '@mui/material';

import { ColumnResizer } from './ColumnResizer';

interface ITableHeaderCell<T> {
  header: Header<T, unknown>;
  stickyLeft?: number;
}

export function TableHeaderCell<T>({
  header,
  stickyLeft,
}: ITableHeaderCell<T>) {
  const isPinned = stickyLeft != null;
  const align =
    (header.column.columnDef.meta as ColumnMeta)?.align ?? 'flex-start';

  return (
    <Box
      sx={{
        width: header.getSize(),
        position: isPinned ? 'sticky' : 'relative',
        left: stickyLeft,
        zIndex: isPinned ? 10 : 5,
        backgroundColor: isPinned ? 'primary.main' : 'action.hover',
        color: isPinned ? '#ddd' : 'text.secondary',
        display: 'flex',
        alignItems: 'center',
        justifyContent: align,
        px: 1,
        borderRight: '1px solid #ddd',
        fontWeight: 600,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        cursor: header.column.getCanSort() ? 'pointer' : 'default',
      }}
      onClick={
        header.column.getCanSort()
          ? header.column.getToggleSortingHandler()
          : undefined
      }
    >
      {flexRender(header.column.columnDef.header, header.getContext())}
      {header.column.getCanSort() && (
        <Box
          component='span'
          sx={{ display: 'flex', alignItems: 'center', ml: 0.5 }}
        >
          {header.column.getIsSorted() === 'asc' && (
            <ArrowDropUp fontSize='small' />
          )}
          {header.column.getIsSorted() === 'desc' && (
            <ArrowDropDown fontSize='small' />
          )}
          {header.column.getIsSorted() === false && (
            <UnfoldMore fontSize='small' />
          )}
        </Box>
      )}
      {header.column.columnDef.enableResizing && (
        <ColumnResizer header={header} />
      )}
    </Box>
  );
}
