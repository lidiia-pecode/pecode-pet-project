/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import dayjs from 'dayjs';
import {
  ColumnDef,
  ColumnOrderState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  Row,
  SortingState,
  useReactTable,
  Cell,
  Column,
  RowSelectionState,
  Header,
  Table,
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
  ListItemIcon,
  Divider,
  Chip,
} from '@mui/material';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { ArrowDropDown, ArrowDropUp, UnfoldMore } from '@mui/icons-material';
import { Product } from '@/types/Product';
import { ProductRating } from '../../products-page/shared/ProductRating';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type ProductColumnMeta = {
  align?: 'flex-start' | 'center';
  pin?: boolean;
};

//------- HOOKS -------//

const usePinnedColumns = (table: Table<Product>) => {
  const pinnedColumns = table
    .getAllColumns()
    .filter(col => (col.columnDef.meta as ProductColumnMeta)?.pin);

  const stickyLefts: Record<string, number> = {};
  pinnedColumns.reduce((acc, col) => {
    stickyLefts[col.id] = acc;
    return acc + col.getSize();
  }, 0);

  const isPinned = (id: string) => id in stickyLefts;
  return { pinnedColumns, stickyLefts, isPinned };
};

const useColumnDrag = ({
  table,
  pinnedColumns,
  columnOrder,
  setColumnOrder,
}: {
  table: Table<Product>;
  pinnedColumns: Column<Product, unknown>[];
  columnOrder: ColumnOrderState;
  setColumnOrder: Dispatch<SetStateAction<ColumnOrderState>>;
}) => {
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const allColumns = table.getAllLeafColumns().map(c => c.id);
    const pinnedIds = pinnedColumns.map(c => c.id);
    const nonPinnedIds = columnOrder.length
      ? columnOrder.filter(id => !pinnedIds.includes(id))
      : allColumns.filter(id => !pinnedIds.includes(id));

    const oldIndex = nonPinnedIds.indexOf(active.id as string);
    const newIndex = nonPinnedIds.indexOf(over.id as string);
    setColumnOrder([
      ...pinnedIds,
      ...arrayMove(nonPinnedIds, oldIndex, newIndex),
    ]);
  };

  return { sensors, handleDragEnd };
};

//------- RESIZER -------//

type ColumnResizerProps = {
  header: Header<Product, unknown>;
};

const ColumnResizer = ({ header }: ColumnResizerProps) => (
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

// ------------------------
// TableHeader + HeaderCell
// ------------------------

type TableHeaderCellProps = {
  header: Header<Product, unknown>;
  stickyLeft?: number;
};

const TableHeaderCell = ({ header, stickyLeft }: TableHeaderCellProps) => {
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

type TableHeaderProps = {
  table: Table<Product>;
  stickyLefts: Record<string, number>;
};

const TableHeader = ({ table, stickyLefts }: TableHeaderProps) => (
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

// ------------------------
// TableCell
// ------------------------
const TableCell = ({
  cell,
  width,
  stickyLeft,
}: {
  cell: Cell<Product, unknown>;
  width: number;
  stickyLeft?: number;
}) => {
  const isPinned = stickyLeft != null;
  const align =
    (cell.column.columnDef.meta as ProductColumnMeta)?.align ?? 'flex-start';

  return (
    <Box
      sx={{
        width,
        display: 'flex',
        alignItems: 'center',
        justifyContent: align,
        px: 1,
        borderRight: '1px solid #f0f0f0',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        position: isPinned ? 'sticky' : 'relative',
        left: stickyLeft,
        backgroundColor: isPinned ? 'background.paper' : 'inherit',
        zIndex: isPinned ? 2 : 1,
      }}
    >
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </Box>
  );
};

// ------------------------
// TableRow
// ------------------------
const TableRow = ({
  row,
  columnWidths,
  stickyLefts,
}: {
  row: Row<Product>;
  columnWidths: Record<string, number>;
  stickyLefts: Record<string, number>;
}) => (
  <Box sx={{ display: 'flex', borderBottom: '1px solid #eee', height: 80 }}>
    {row.getVisibleCells().map(cell => (
      <TableCell
        key={cell.id}
        cell={cell}
        width={columnWidths[cell.column.id]}
        stickyLeft={stickyLefts[cell.column.id]}
      />
    ))}
  </Box>
);

// ------------------------
// SortableMenuItem
// ------------------------
const SortableMenuItem = ({
  column,
  isPinned,
}: {
  column: Column<Product, unknown>;
  isPinned: boolean;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: column.id, disabled: isPinned });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: isPinned ? 'default' : 'grab',
    opacity: isPinned ? 0.7 : 1,
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  };

  return (
    <MenuItem ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <ListItemIcon>
        <DragIndicatorIcon
          fontSize='small'
          sx={{ opacity: isPinned ? 0.3 : 1 }}
        />
      </ListItemIcon>
      <Checkbox
        checked={column.getIsVisible()}
        onChange={column.getToggleVisibilityHandler()}
        onClick={e => e.stopPropagation()}
      />
      <Typography
        sx={{
          fontWeight: isPinned ? 600 : 400,
          color: isPinned ? 'primary.main' : 'inherit',
        }}
      >
        {column.id} {isPinned && '(pinned)'}
      </Typography>
    </MenuItem>
  );
};

// ------------------------
// ProductsTable
// ------------------------
export const ProductsTable = ({ products }: { products: Product[] }) => {
  const router = useRouter();
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 8,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (e: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(e.currentTarget);
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
    state: { columnVisibility, sorting, pagination, columnOrder, rowSelection },
    enableRowSelection: true,
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onColumnOrderChange: setColumnOrder,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // ------------------------
  // Pinned columns
  // ------------------------
  const { pinnedColumns, stickyLefts, isPinned } = usePinnedColumns(table);

  // ------------------------
  // DnD Kit
  // ------------------------
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
      {/* Toolbar */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <IconButton onClick={handleOpenMenu}>
          <ViewColumnIcon />
        </IconButton>
        {selectedRowsCount > 0 && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Chip
              label={`${selectedRowsCount} of ${totalRowsCount} row(s) selected`}
              color='primary'
              variant='outlined'
              size='small'
            />
            <Button
              size='small'
              variant='outlined'
              onClick={() => table.resetRowSelection()}
            >
              Clear Selection
            </Button>
          </Box>
        )}
      </Box>

      {/* Column Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem>
          <Checkbox
            checked={table.getIsAllColumnsVisible()}
            onChange={table.getToggleAllColumnsVisibilityHandler()}
          />
          Toggle All
        </MenuItem>
        <MenuItem
          onClick={() => {
            setColumnOrder([]);
            setAnchorEl(null);
          }}
        >
          <ListItemIcon>
            <RestartAltIcon fontSize='small' />
          </ListItemIcon>
          <Typography variant='body2' color='primary'>
            Reset Column Order
          </Typography>
        </MenuItem>
        <Divider />
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={table
              .getAllLeafColumns()
              .filter(c => !isPinned(c.id))
              .map(c => c.id)}
            strategy={verticalListSortingStrategy}
          >
            {table.getAllLeafColumns().map(col => (
              <SortableMenuItem
                key={col.id}
                column={col}
                isPinned={isPinned(col.id)}
              />
            ))}
          </SortableContext>
        </DndContext>
      </Menu>

      {/* Table */}
      <Box sx={{ overflowX: 'auto', width: '100%', position: 'relative' }}>
        <Box sx={{ width: table.getTotalSize() }}>
          {/* Header */}
          <TableHeader table={table} stickyLefts={stickyLefts} />

          {/* Rows */}
          {table.getRowModel().rows.map(row => (
            <TableRow
              key={row.id}
              row={row}
              columnWidths={columnWidths}
              stickyLefts={stickyLefts}
            />
          ))}
        </Box>
      </Box>

      {/* Pagination */}
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
