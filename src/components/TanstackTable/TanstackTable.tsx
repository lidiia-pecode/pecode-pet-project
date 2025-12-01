/* eslint-disable react-hooks/incompatible-library */
'use client';

import {
  getCoreRowModel,
  useReactTable,
  RowSelectionState,
  SortingState,
  ColumnDef,
  getSortedRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table';
import { Box, Pagination } from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { usePinnedColumns } from '@/hooks/tanstackTable/usePinnedColumns';
import { useColumnDrag } from '@/hooks/tanstackTable/useColumnDrag';

import { TableHeader } from './components/TableHeader';
import { TableRow } from './components/TableRow';
import { TableToolbar } from './components/TableToolbar';
import { ColumnMenu } from './components/TableMenu';
import { TableSkeletonRow } from './components/TableSkeletonRow';

type Props<TData> = {
  data: TData[];
  isLoading?: boolean;
  totalCount?: number;

  columns: ColumnDef<TData, unknown>[];

  page?: number;
  pageSize?: number;

  sorting?: SortingState;
  setSorting?: Dispatch<SetStateAction<SortingState>>;

  columnVisibility?: Record<string, boolean>;
  setColumnVisibility?: Dispatch<SetStateAction<Record<string, boolean>>>;

  columnOrder?: string[];
  setColumnOrder?: Dispatch<SetStateAction<string[]>>;

  pageSelections?: Record<number, RowSelectionState>;
  setPageSelection?: (page: number, selection: RowSelectionState) => void;
};

export function TanstackTable<TData>({
  data,
  columns,
  isLoading = false,
  totalCount = 0,

  page,
  pageSize = 8,

  sorting,
  setSorting,

  columnVisibility,
  setColumnVisibility,

  columnOrder,
  setColumnOrder,

  pageSelections,
  setPageSelection,
}: Props<TData>) {
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const [internalSorting, setInternalSorting] = useState<SortingState>([]);
  const effectiveSorting = sorting ?? internalSorting;
  const setEffectiveSorting = setSorting ?? setInternalSorting;

  const handleOpenMenu = (e: React.MouseEvent<HTMLElement>) =>
    setMenuAnchor(e.currentTarget);

  const handleCloseMenu = () => setMenuAnchor(null);

  const [internalPage, setInternalPage] = useState<number>(0);
  const effectivePage = page ?? internalPage;
  const isInternalPagination = page == null;
  const totalPages = Math.ceil(totalCount / pageSize);

  const [internalColumnVisibility, setInternalColumnVisibility] = useState<
    Record<string, boolean>
  >({});
  const [localColumnOrder, setLocalColumnOrder] = useState<string[]>([]);

  const effectiveColumnVisibility =
    columnVisibility ?? internalColumnVisibility;
  const setEffectiveColumnVisibility =
    setColumnVisibility ?? setInternalColumnVisibility;

  const effectiveColumnOrder = columnOrder ?? localColumnOrder;
  const setEffectiveColumnOrder = setColumnOrder ?? setLocalColumnOrder;

  const [rowSelection, setRowSelectionState] = useState<RowSelectionState>(
    pageSelections?.[effectivePage] ?? {}
  );

  useEffect(() => {
    if (pageSelections) {
      setRowSelectionState(pageSelections[effectivePage] || {});
    }
  }, [effectivePage, pageSelections]);

  const handleRowSelectionChange = (
    updaterOrValue:
      | RowSelectionState
      | ((old: RowSelectionState) => RowSelectionState)
  ) => {
    const newSelection: RowSelectionState =
      typeof updaterOrValue === 'function'
        ? updaterOrValue(rowSelection)
        : updaterOrValue;

    setRowSelectionState(newSelection);

    if (setPageSelection) {
      setPageSelection(effectivePage, newSelection);
    }
  };

  const table = useReactTable({
    data,
    columns,
    columnResizeMode: 'onChange',
    state: {
      columnVisibility: effectiveColumnVisibility,
      columnOrder: effectiveColumnOrder,
      rowSelection,
      sorting: effectiveSorting,
      pagination: { pageIndex: effectivePage, pageSize },
    },
    enableRowSelection: true,
    manualSorting: !!sorting,
    manualPagination: !isInternalPagination,
    onSortingChange: setEffectiveSorting,
    onColumnVisibilityChange: setEffectiveColumnVisibility,
    onColumnOrderChange: setEffectiveColumnOrder,
    onRowSelectionChange: handleRowSelectionChange,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const { pinnedColumns, stickyLefts, isPinned } = usePinnedColumns(table);
  const { sensors, handleDragEnd } = useColumnDrag({
    table,
    pinnedColumns,
    columnOrder: effectiveColumnOrder,
    setColumnOrder: setEffectiveColumnOrder,
  });

  const columnWidths = Object.fromEntries(
    table.getAllColumns().map(col => [col.id, col.getSize()])
  );

  const selectedRowsCount = pageSelections
    ? Object.values(pageSelections).reduce(
        (sum, selection) => sum + Object.keys(selection).length,
        0
      )
    : Object.keys(rowSelection).length;

  const handleClearSelection = () => {
    setRowSelectionState({});
    if (setPageSelection && pageSelections) {
      Object.keys(pageSelections).forEach(page =>
        setPageSelection(Number(page), {})
      );
    }
  };

  return (
    <Box>
      <TableToolbar
        selectedRowsCount={selectedRowsCount}
        totalRowsCount={totalCount}
        onOpenColumnMenu={handleOpenMenu}
        onClearRowSelection={handleClearSelection}
      />

      <ColumnMenu
        table={table}
        menuAnchor={menuAnchor}
        onClose={handleCloseMenu}
        pinnedColumns={pinnedColumns}
        isPinned={isPinned}
        sensors={sensors}
        handleDragEnd={handleDragEnd}
        setColumnOrder={setEffectiveColumnOrder}
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

      {!page && (
        <Pagination
          count={totalPages}
          page={effectivePage + 1}
          onChange={(_, value) => setInternalPage(value - 1)}
        />
      )}
    </Box>
  );
}
