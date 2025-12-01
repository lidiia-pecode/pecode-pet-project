// /* eslint-disable react-hooks/incompatible-library */
// 'use client';

// import {
//   getCoreRowModel,
//   useReactTable,
//   RowSelectionState,
//   SortingState,
// } from '@tanstack/react-table';
// import { Box } from '@mui/material';
// import { useProducts } from '@/hooks/products/useProducts';
// import { useEffect, useState } from 'react';
// import { usePinnedColumns } from '@/hooks/tanstackTable/usePinnedColumns';
// import { useColumnDrag } from '@/hooks/tanstackTable/useColumnDrag';
// import { TableHeader } from './components/TableHeader';
// import { TableRow } from './components/TableRow';
// import { TableToolbar } from './components/TableToolbar';
// import { ColumnMenu } from './components/ColumnMenu';
// import { TableSkeletonRow } from './components/TableSkeletonRow';
// import { useProductsStore } from '@/store/productsStore';
// import { useProductColumns } from './components/ProductColumns';

// export const TanstackTable = () => {
//   const [sorting, setSorting] = useState<SortingState>([]);

//   const { data, isLoading } = useProducts(sorting);
//   const products = data?.products || [];

//   const columns = useProductColumns();

//   const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);

//   const handleOpenMenu = (e: React.MouseEvent<HTMLElement>) =>
//     setMenuAnchor(e.currentTarget);

//   const columnVisibility = useProductsStore(state => state.columnVisibility);
//   const setColumnVisibility = useProductsStore(
//     state => state.setColumnVisibility
//   );

//   const columnOrder = useProductsStore(state => state.columnOrder);
//   const setColumnOrder = useProductsStore(state => state.setColumnOrder);

//   const currentPage = useProductsStore(state => state.currentPage);
//   const pageSelections = useProductsStore(state => state.pageSelections);
//   const setPageSelection = useProductsStore(state => state.setPageSelection);
//   const [rowSelection, setRowSelectionState] = useState<RowSelectionState>(
//     pageSelections[currentPage] || {}
//   );

//   useEffect(() => {
//     setRowSelectionState(pageSelections[currentPage] || {});
//   }, [currentPage, pageSelections]);

//   const table = useReactTable({
//     data: products,
//     columns,
//     columnResizeMode: 'onChange',
//     state: { columnVisibility, columnOrder, rowSelection, sorting },
//     enableRowSelection: true,
//     manualSorting: true,
//     onSortingChange: setSorting,
//     onColumnVisibilityChange: setColumnVisibility,
//     onColumnOrderChange: setColumnOrder,
//     onRowSelectionChange: updaterOrValue => {
//       const newSelection: RowSelectionState =
//         typeof updaterOrValue === 'function'
//           ? updaterOrValue(rowSelection)
//           : updaterOrValue;

//       setRowSelectionState(newSelection);
//       setPageSelection(currentPage, { ...newSelection });
//     },
//     getCoreRowModel: getCoreRowModel(),
//   });

//   const { pinnedColumns, stickyLefts, isPinned } = usePinnedColumns(table);
//   const { sensors, handleDragEnd } = useColumnDrag({
//     table,
//     pinnedColumns,
//     columnOrder,
//     setColumnOrder,
//   });

//   const columnWidths = Object.fromEntries(
//     table.getAllColumns().map(col => [col.id, col.getSize()])
//   );

//   const selectedRowsCount = Object.values(pageSelections).reduce(
//     (sum, selection) => sum + Object.keys(selection).length,
//     0
//   );

//   const handleClearSelection = () => {
//     setRowSelectionState({});
//     Object.keys(pageSelections).forEach(page =>
//       setPageSelection(Number(page), {})
//     );
//   };

//   return (
//     <Box>
//       <TableToolbar
//         selectedRowsCount={selectedRowsCount}
//         totalRowsCount={data?.total || 0}
//         onOpenColumnMenu={handleOpenMenu}
//         onClearRowSelection={handleClearSelection}
//       />

//       <ColumnMenu
//         table={table}
//         menuAnchor={menuAnchor}
//         onClose={() => setMenuAnchor(null)}
//         pinnedColumns={pinnedColumns}
//         isPinned={isPinned}
//         sensors={sensors}
//         handleDragEnd={handleDragEnd}
//         setColumnOrder={setColumnOrder}
//       />

//       <Box sx={{ overflowX: 'auto', width: '100%', position: 'relative' }}>
//         <Box sx={{ width: table.getTotalSize() }}>
//           <TableHeader table={table} stickyLefts={stickyLefts} />

//           {isLoading ? (
//             Array.from({ length: 6 }).map((_, i) => (
//               <TableSkeletonRow
//                 key={i}
//                 columnWidths={columnWidths}
//                 stickyLefts={stickyLefts}
//               />
//             ))
//           ) : (
//             <>
//               {table.getRowModel().rows.map(row => (
//                 <TableRow
//                   key={row.id}
//                   row={row}
//                   columnWidths={columnWidths}
//                   stickyLefts={stickyLefts}
//                 />
//               ))}
//             </>
//           )}
//         </Box>
//       </Box>
//     </Box>
//   );
// };

'use client';

import { useState } from 'react';
import { SortingState } from '@tanstack/react-table';

import { useProducts } from '@/hooks/products/useProducts';
import { useProductColumns } from './components/ProductColumns';
import { TanstackTable } from '../../TanstackTable/TanstackTable';
import { useProductsStore } from '@/store/productsStore';

export const ProductTable = () => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const { data, isLoading } = useProducts(sorting);

  const currentPage = useProductsStore(state => state.currentPage);

  const products = data?.products || [];
  const total = data?.total || 0;

  const columns = useProductColumns();

  const columnVisibility = useProductsStore(state => state.columnVisibility);
  const setColumnVisibility = useProductsStore(
    state => state.setColumnVisibility
  );

  const columnOrder = useProductsStore(state => state.columnOrder);
  const setColumnOrder = useProductsStore(state => state.setColumnOrder);

  const pageSelections = useProductsStore(state => state.pageSelections);
  const setPageSelection = useProductsStore(state => state.setPageSelection);

  return (
    <TanstackTable
      data={products}
      columns={columns}
      isLoading={isLoading}
      totalCount={total}
      stateProps={{
        sorting,
        setSorting,
        columnVisibility,
        setColumnVisibility,
        columnOrder,
        setColumnOrder,
        pageSelections,
        setPageSelection,
        page: currentPage,
      }}
    />
  );
};
