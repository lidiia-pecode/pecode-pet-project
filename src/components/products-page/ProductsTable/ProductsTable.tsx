/* eslint-disable react-hooks/incompatible-library */
'use client';

import dayjs from 'dayjs';
import {
  Cell,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  Row,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import {
  Box,
  Typography,
  Button,
  Menu,
  MenuItem,
  Checkbox,
  IconButton,
  Pagination,
} from '@mui/material';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import { useRouter } from 'next/navigation';
import { Product } from '@/types/Product';
import { ProductRating } from '../shared/ProductRating';
import { memo, useMemo, useState } from 'react';
import { ArrowDropDown, ArrowDropUp, UnfoldMore } from '@mui/icons-material';

type ProductColumnMeta = {
  align?: 'flex-start' | 'center';
};

const TableCell = memo(
  ({ cell, width }: { cell: Cell<Product, unknown>; width: number }) => {
    return (
      <Box
        sx={{
          width,
          display: 'flex',
          alignItems: 'center',
          justifyContent:
            (cell.column.columnDef.meta as ProductColumnMeta)?.align ??
            'flex-start',
          px: 1,
          borderRight: '1px solid #f0f0f0',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
        }}
      >
        {flexRender(cell.column.columnDef.cell, cell.getContext())}
      </Box>
    );
  }
);
TableCell.displayName = 'TableCell';

const TableRow = memo(
  ({
    row,
    columnWidths,
  }: {
    row: Row<Product>;
    columnWidths: Record<string, number>;
  }) => {
    return (
      <Box sx={{ display: 'flex', borderBottom: '1px solid #eee', height: 80 }}>
        {row.getVisibleCells().map(cell => (
          <TableCell
            key={cell.id}
            cell={cell}
            width={columnWidths[cell.column.id]}
          />
        ))}
      </Box>
    );
  }
);

TableRow.displayName = 'TableRow';

export const ProductsTable = ({ products }: { products: Product[] }) => {
  const router = useRouter();

  const handleOpenProduct = (id: number) => router.push(`/products/${id}`);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 8,
  });

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  const columns = useMemo<ColumnDef<Product>[]>(
    () => [
      {
        id: 'image',
        header: () => 'Image',
        size: 100,
        minSize: 80,
        meta: { align: 'flex-start' },
        enableSorting: false,
        cell: ({ row }) => (
          <Box
            component='img'
            src={row.original.images?.[0]}
            alt={row.original.title}
            sx={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 1 }}
          />
        ),
      },
      {
        accessorKey: 'title',
        header: () => 'Title',
        size: 300,
        minSize: 160,
        meta: { align: 'flex-start' },
        sortDescFirst: false,
        cell: info => <Typography noWrap>{info.getValue<string>()}</Typography>,
      },
      {
        accessorKey: 'price',
        header: () => 'Price',
        size: 100,
        minSize: 100,
        meta: { align: 'center' },
        sortDescFirst: true,
        cell: info => <Typography>${info.getValue<number>()}</Typography>,
      },
      {
        accessorFn: row => row.rating.rate,
        id: 'rating',
        header: () => 'Rating',
        size: 140,
        minSize: 120,
        meta: { align: 'center' },
        sortDescFirst: true,
        cell: info => (
          <ProductRating value={info.getValue<number>()} showCount={false} />
        ),
      },

      {
        accessorFn: row => row.rating.count,
        id: 'reviews',
        header: () => 'Reviews',
        size: 110,
        minSize: 110,
        meta: { align: 'center' },
        sortDescFirst: true,
        cell: info => <Typography>{info.getValue<number>()}</Typography>,
      },
      {
        accessorKey: 'updatedAt',
        id: 'date',
        header: () => 'Date',
        size: 140,
        minSize: 100,
        meta: { align: 'center' },
        sortDescFirst: true,
        cell: info => (
          <Typography>
            {dayjs(info.getValue<string>(), 'DD/MM/YYYY').format('DD/MM/YYYY')}
          </Typography>
        ),
      },
      {
        id: 'action',
        header: () => 'Action',
        size: 100,
        minSize: 80,
        meta: { align: 'center' },
        enableSorting: false,
        cell: ({ row }) => (
          <Button
            size='small'
            variant='contained'
            onClick={e => {
              e.stopPropagation();
              handleOpenProduct(row.original.id);
            }}
          >
            View
          </Button>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: products,
    columns,
    columnResizeMode: 'onChange',
    state: {
      columnVisibility,
      sorting,
      pagination,
    },
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });


  return (
    <Box>
      <Box>
        <IconButton onClick={handleOpenMenu}>
          <ViewColumnIcon />
        </IconButton>
        <Menu anchorEl={anchorEl} open={open} onClose={handleCloseMenu}>
          <MenuItem>
            <Checkbox
              checked={table.getIsAllColumnsVisible()}
              onChange={table.getToggleAllColumnsVisibilityHandler()}
            />
            Toggle All
          </MenuItem>
          {table.getAllLeafColumns().map(column => (
            <MenuItem key={column.id}>
              <Checkbox
                checked={column.getIsVisible()}
                onChange={column.getToggleVisibilityHandler()}
              />
              {column.id}
            </MenuItem>
          ))}
        </Menu>
      </Box>
      <Box sx={{ overflowX: 'auto', width: '100%' }}>
        <Box sx={{ width: table.getTotalSize() }}>
          {/* HEADER */}
          <Box
            sx={{
              display: 'flex',
              height: 40,
              backgroundColor: 'action.hover',
              borderBottom: '1px solid #ddd',
            }}
          >
            {table.getHeaderGroups().map(group =>
              group.headers.map(header => (
                <Box
                  key={header.id}
                  sx={{
                    width: header.getSize(),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent:
                      (header.column.columnDef.meta as ProductColumnMeta)
                        ?.align ?? 'flex-start',
                    px: 1,
                    position: 'relative',
                    borderRight: '1px solid #ddd',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                  onClick={
                    header.column.getCanSort()
                      ? header.column.getToggleSortingHandler()
                      : undefined
                  }
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}

                  {header.column.getCanSort() && (
                    <Box
                      component='span'
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        ml: 0.5,
                      }}
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

                  {/* RESIZER */}
                  <Box
                    onMouseDown={header.getResizeHandler()}
                    onTouchStart={header.getResizeHandler()}
                    sx={{
                      position: 'absolute',
                      right: 0,
                      top: 0,
                      height: '100%',
                      width: '6px',
                      cursor: 'col-resize',
                      zIndex: 10,
                      '&:hover': {
                        backgroundColor: 'primary.main',
                        opacity: 0.3,
                      },
                    }}
                  />
                </Box>
              ))
            )}
          </Box>

          {/* ROWS */}
          {table.getRowModel().rows.map(row => (
            <TableRow
              key={row.id}
              row={row}
              columnWidths={Object.fromEntries(
                table.getAllColumns().map(col => [col.id, col.getSize()])
              )}
            />
          ))}
        </Box>
      </Box>

      <Box mt={2} display='flex' justifyContent='center'>
        <Pagination
          count={table.getPageCount()}
          page={table.getState().pagination.pageIndex + 1}
          onChange={(_, page) => table.setPageIndex(page - 1)}
          color='primary'
        />
      </Box>
    </Box>
  );
};
