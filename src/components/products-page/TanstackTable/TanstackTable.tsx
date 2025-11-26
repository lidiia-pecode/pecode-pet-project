/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import dayjs from 'dayjs';
import {
  ColumnDef,
  ColumnOrderState,
  getCoreRowModel,
  useReactTable,
  RowSelectionState,
} from '@tanstack/react-table';
import { Box, Typography, Button, Checkbox } from '@mui/material';
import { Product } from '@/types/Product';
import { ProductRating } from '../shared/ProductRating';
import { useRouter } from 'next/navigation';
import { useProducts } from '@/hooks/useProducts';
import { useMemo, useState } from 'react';
import { usePinnedColumns } from './hooks/usePinnedColumns';
import { useColumnDrag } from './hooks/useColumnDrag';
import { TableHeader } from './components/TableHeader';
import { TableRow } from './components/TableRow';
import { TableToolbar } from './components/TableToolbar';
import { ColumnMenu } from './components/ColumnMenu';
import { TableSkeletonRow } from './components/TableSkeletonRow';

export type ProductColumnMeta = {
  align?: 'flex-start' | 'center';
  pin?: boolean;
};

export const TanstackTable = () => {
  const { data, isLoading } = useProducts();
  const products = data?.products || [];

  const [columnVisibility, setColumnVisibility] = useState({});
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (e: React.MouseEvent<HTMLElement>) =>
    setMenuAnchor(e.currentTarget);

  const router = useRouter();
  const handleOpenProduct = (id: number) => router.push(`/products/${id}`);

  const columns = useMemo<ColumnDef<Product>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
            sx={{ '&.Mui-checked': { color: '#fff' } }}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
        ),
        size: 60,
        minSize: 60,
        meta: { align: 'center', pin: true },
        enableSorting: false,
        enableResizing: false,
      },
      {
        id: 'image',
        header: 'Image',
        size: 100,
        minSize: 80,
        meta: { align: 'center', pin: true },
        enableSorting: false,
        enableResizing: true,
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
        header: 'Title',
        size: 300,
        minSize: 160,
        enableResizing: true,
        meta: { align: 'flex-start', pin: true },
        cell: info => <Typography noWrap>{info.getValue<string>()}</Typography>,
      },
      {
        accessorKey: 'price',
        header: 'Price',
        size: 100,
        minSize: 100,
        enableResizing: true,
        meta: { align: 'center' },
        cell: info => <Typography>${info.getValue<number>()}</Typography>,
      },
      {
        accessorFn: row => row.rating.rate,
        id: 'rating',
        header: 'Rating',
        size: 140,
        minSize: 140,
        enableResizing: true,
        meta: { align: 'center' },
        cell: info => (
          <ProductRating value={info.getValue<number>()} showCount={false} />
        ),
      },
      {
        accessorFn: row => row.rating.count,
        id: 'reviews',
        header: 'Reviews',
        size: 110,
        minSize: 110,
        enableResizing: true,
        meta: { align: 'center' },
        cell: info => <Typography>{info.getValue<number>()}</Typography>,
      },
      {
        accessorKey: 'updatedAt',
        id: 'date',
        header: 'Date',
        size: 140,
        minSize: 140,
        enableResizing: true,
        meta: { align: 'center' },
        cell: info => (
          <Typography>
            {dayjs(info.getValue<string>()).format('DD/MM/YYYY')}
          </Typography>
        ),
      },
      {
        accessorFn: row => row.category.slug,
        id: 'category',
        header: 'Category',
        size: 140,
        minSize: 110,
        enableResizing: true,
        enableSorting: false,
        meta: { align: 'center' },
        cell: info => <Typography>{info.getValue<string>()}</Typography>,
      },
      {
        id: 'action',
        header: 'Action',
        size: 100,
        minSize: 100,
        enableResizing: true,
        enableSorting: false,
        meta: { align: 'center' },
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
    state: { columnVisibility, columnOrder, rowSelection },
    enableRowSelection: true,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
  });

  const { pinnedColumns, stickyLefts, isPinned } = usePinnedColumns(table);
  const { sensors, handleDragEnd } = useColumnDrag({
    table,
    pinnedColumns,
    columnOrder,
    setColumnOrder,
  });

  const columnWidths = Object.fromEntries(
    table.getAllColumns().map(col => [col.id, col.getSize()])
  );
  const selectedRowsCount = table.getSelectedRowModel().rows.length;
  const totalRowsCount = table.getFilteredRowModel().rows.length;

  return (
    <Box>
      <TableToolbar
        table={table}
        selectedRowsCount={selectedRowsCount}
        totalRowsCount={totalRowsCount}
        onOpenColumnMenu={handleOpenMenu}
      />

      <ColumnMenu
        table={table}
        menuAnchor={menuAnchor}
        onClose={() => setMenuAnchor(null)}
        pinnedColumns={pinnedColumns}
        isPinned={isPinned}
        sensors={sensors}
        handleDragEnd={handleDragEnd}
        setColumnOrder={setColumnOrder}
      />

      <Box sx={{ overflowX: 'auto', width: '100%', position: 'relative' }}>
        <Box sx={{ width: table.getTotalSize() }}>
          <TableHeader table={table} stickyLefts={stickyLefts} />

          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <TableSkeletonRow
                key={i}
                columnWidths={columnWidths}
                stickyLefts={stickyLefts}
              />
            ))
          ) : (
            <>
              {table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  row={row}
                  columnWidths={columnWidths}
                  stickyLefts={stickyLefts}
                />
              ))}
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};
