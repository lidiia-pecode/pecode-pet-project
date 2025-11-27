import { Product } from '@/types/Product';
import { ProductColumnMeta } from '../TanstackTable';
import { flexRender, Header, Table } from '@tanstack/react-table';
import { Box } from '@mui/material';
import { ArrowDropDown, ArrowDropUp, UnfoldMore } from '@mui/icons-material';

interface IColumnResizer {
  header: Header<Product, unknown>;
};

const ColumnResizer = ({ header }: IColumnResizer) => (
  <Box
    onMouseDown={header.getResizeHandler()}
    onTouchStart={header.getResizeHandler()}
    sx={{
      position: 'absolute',
      right: 0,
      top: 0,
      height: '100%',
      width: 6,
      cursor: 'col-resize',
      zIndex: 20,
      '&:hover': { backgroundColor: 'primary.main', opacity: 0.3 },
    }}
  />
);

interface ITableHeaderCell {
  header: Header<Product, unknown>;
  stickyLeft?: number;
};

const TableHeaderCell = ({ header, stickyLeft }: ITableHeaderCell) => {
  const isPinned = stickyLeft != null;
  const align =
    (header.column.columnDef.meta as ProductColumnMeta)?.align ?? 'flex-start';

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
};

interface ITableHeader {
  table: Table<Product>;
  stickyLefts: Record<string, number>;
};

export const TableHeader = ({ table, stickyLefts }: ITableHeader) => (
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
