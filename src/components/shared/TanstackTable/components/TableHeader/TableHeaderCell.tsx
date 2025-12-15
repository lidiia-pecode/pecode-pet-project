import { ColumnMeta } from '@/types/TanstackTable';
import { flexRender, Header } from '@tanstack/react-table';
import { ArrowDropDown, ArrowDropUp, UnfoldMore } from '@mui/icons-material';
import { Box } from '@mui/material';
import { tableHeaderCellStyles as styles } from './TableHeader.styles';

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
  const isSortable = header.column.getCanSort();
  const align =
    (header.column.columnDef.meta as ColumnMeta)?.align ?? 'flex-start';

  return (
    <Box
      sx={{
        ...styles.base,
        ...(isPinned ? styles.pinned : styles.unpinned),
        ...(isSortable ? styles.sortable : {}),
        width: header.getSize(),
        justifyContent: align,
        left: stickyLeft,
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
          sx={styles.sortIconWrapper}
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
