import { Product } from '@/types/Product';
import { ProductColumnMeta } from '../TanstackTable';
import { flexRender, Header, Table } from '@tanstack/react-table';
import { Box } from '@mui/material';
import { ArrowDropDown, ArrowDropUp, UnfoldMore } from '@mui/icons-material';
import { useProductsStore } from '@/store/productsStore';
import { SORT_OPTIONS, SortOption } from '@/types/Sort';

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

  const sortOption = useProductsStore(state => state.sortOption);
  const setSortOption = useProductsStore(state => state.setSortOption);

  const cycleSort = (columnId: string) => {
    const map: Record<string, { asc: SortOption; desc: SortOption }> = {
      title: {
        asc: SORT_OPTIONS.TITLE_ASC,
        desc: SORT_OPTIONS.TITLE_DESC,
      },
      price: {
        asc: SORT_OPTIONS.PRICE_ASC,
        desc: SORT_OPTIONS.PRICE_DESC,
      },
      rating: {
        asc: SORT_OPTIONS.RATING_ASC,
        desc: SORT_OPTIONS.RATING_DESC,
      },
      reviews: {
        asc: SORT_OPTIONS.REVIEWS_ASC,
        desc: SORT_OPTIONS.REVIEWS_DESC,
      },
      date: {
        asc: SORT_OPTIONS.DATE_ASC,
        desc: SORT_OPTIONS.DATE_DESC,
      },
    };

    const conf = map[columnId];
    if (!conf) return;

    switch (sortOption) {
      case conf.asc:
        setSortOption(conf.desc);
        break;
      case conf.desc:
        setSortOption(SORT_OPTIONS.NONE);
        break;
      default:
        setSortOption(conf.asc);
    }
  };
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
      onClick={() => {
        if (!header.column.getCanSort()) return;
        cycleSort(header.column.id);
      }}
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
