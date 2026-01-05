/* eslint-disable react-hooks/incompatible-library */
'use client';

import { useEffect, useState } from 'react';
import {
  getCoreRowModel,
  useReactTable,
  RowSelectionState,
  ColumnDef,
  getSortedRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table';
import { Box, Pagination } from '@mui/material';

import { styles } from './TanstackTable.styles';
import { usePinnedColumns } from '@/hooks/tanstackTable';
import { useColumnDrag } from '@/hooks/tanstackTable';
import { useEffectiveTableState } from '@/hooks/tanstackTable';

import { TableHeader } from './components/TableHeader';
import { TableRow } from './components/TableRow';
import { TableToolbar } from './components/TableMenu';
import { ColumnMenu } from './components/TableMenu';
import { TableSkeletonRow } from './components/TableRow';
import { TableStateProps } from '@/types/TanstackTable';
import { useDeleteProduct } from '@/hooks/products/useProducts';
import { useProductsStore } from '@/store/productsStore';
import { Product } from '@/types/Product';
import { useGlobalStore } from '@/store/globalStore'; // Add this import

type Props<T extends { id: number }> = {
  data: T[];
  isLoading?: boolean;
  totalCount: number;
  columns: ColumnDef<T, unknown>[];
  stateProps?: TableStateProps;
};

export function TanstackTable<T extends { id: number }> ({
  data,
  columns,
  isLoading = false,
  totalCount = 0,
  stateProps,
}: Props<T>) {
  const {
    sorting,
    setSorting,
    columnVisibility,
    setColumnVisibility,
    columnOrder,
    setColumnOrder,
    pageSelections,
    setPageSelection,
    page,
    setPage,
    pageSize,
  } = useEffectiveTableState(stateProps);

  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const { mutateAsync: deleteProduct } = useDeleteProduct();
  const handleOpenMenu = (e: React.MouseEvent<HTMLElement>) =>
    setMenuAnchor(e.currentTarget);
  const handleCloseMenu = () => setMenuAnchor(null);

  const [rowSelection, setRowSelectionState] = useState<RowSelectionState>(
    pageSelections?.[page] || {}
  );

  useEffect(() => {
    setRowSelectionState(pageSelections?.[page] || {});
  }, [page, pageSelections]);

  const handleRowSelectionChange = (
    updaterOrValue:
      | RowSelectionState
      | ((old: RowSelectionState) => RowSelectionState)
  ) => {
    const newSelection =
      typeof updaterOrValue === 'function'
        ? updaterOrValue(rowSelection)
        : updaterOrValue;
    setRowSelectionState(newSelection);
    setPageSelection?.(page, newSelection);
  };

  const table = useReactTable({
    data,
    columns,
    columnResizeMode: 'onChange',
    state: {
      columnVisibility,
      columnOrder,
      rowSelection,
      sorting,
      pagination: { pageIndex: page, pageSize },
    },
    enableRowSelection: true,
    manualSorting: !!stateProps?.sorting,
    manualPagination: !!stateProps?.page,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
    onRowSelectionChange: handleRowSelectionChange,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
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

  const totalPages = Math.ceil(totalCount / pageSize);
  const selectedRowsCount = pageSelections
    ? Object.values(pageSelections).reduce(
        (sum, sel) => sum + Object.keys(sel).length,
        0
      )
    : Object.keys(rowSelection).length;

  const handleClearSelection = () => {
    setRowSelectionState({});
    if (setPageSelection && pageSelections) {
      Object.keys(pageSelections).forEach(p => setPageSelection(Number(p), {}));
    }
  };

  const handleBulkDelete = async () => {
    const selectedRowData = table
      .getSelectedRowModel()
      .flatRows.map(row => row.original as unknown as Product); // Cast to Product for name access

    if (!selectedRowData.length) return;

    const setSuccess = useGlobalStore.getState().setSuccess;
    const setError = useGlobalStore.getState().setError;

    const results = await Promise.allSettled(
      selectedRowData.map(product =>
        deleteProduct({ id: product.id, showGlobalAlerts: false })
      )
    );

    const successfulDeletes: Product[] = [];
    const failedDeletes: Product[] = [];

    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        successfulDeletes.push(selectedRowData[index]);
      } else {
        failedDeletes.push(selectedRowData[index]);
      }
    });

    if (successfulDeletes.length > 0) {
      setSuccess(
        `${successfulDeletes.length} products deleted successfully.` +
          (successfulDeletes.length === selectedRowData.length
            ? ''
            : ` Deleted: ${successfulDeletes.map(p => `"${p.title}"`).join(', ')}`)
      );
    }

    if (failedDeletes.length > 0) {
      setError(
        `${failedDeletes.length} products could not be deleted. They might be in use.` +
          ` Failed: ${failedDeletes.map(p => `"${p.title}"`).join(', ')}`
      );
    }

    handleClearSelection();
  };

  const addMultipleToCart = useProductsStore(s => s.addMultipleToCart);

  const selectedRows = table
    .getSelectedRowModel()
    .flatRows.map(row => row.original as unknown as Product);

  const handleBulkAddToCart = () => {
    addMultipleToCart(selectedRows);
    handleClearSelection();
  };

  return (
    <Box>
      <TableToolbar
        selectedRowsCount={selectedRowsCount}
        totalRowsCount={totalCount}
        onOpenColumnMenu={handleOpenMenu}
        onClearRowSelection={handleClearSelection}
        onBulkDelete={handleBulkDelete}
        onBulkAddToCart={handleBulkAddToCart}
      />

      <ColumnMenu
        table={table}
        menuAnchor={menuAnchor}
        onClose={handleCloseMenu}
        pinnedColumns={pinnedColumns}
        isPinned={isPinned}
        sensors={sensors}
        handleDragEnd={handleDragEnd}
        setColumnOrder={setColumnOrder}
      />

      <Box sx={styles.container}>
        <Box sx={{ width: table.getTotalSize() }}>
          <TableHeader table={table} stickyLefts={stickyLefts} />

          {isLoading ? (
            <TableSkeletonRow table={table} rows={6} />
          ) : (
            table
              .getRowModel()
              .rows.map(row => (
                <TableRow
                  key={row.id}
                  row={row}
                  columnWidths={columnWidths}
                  stickyLefts={stickyLefts}
                />
              ))
          )}
        </Box>
      </Box>

      {!stateProps?.page && (
        <Pagination
          count={totalPages}
          page={page + 1}
          onChange={(_, value) => setPage(value - 1)}
        />
      )}
    </Box>
  );
}
