import { Box, Skeleton } from '@mui/material';
import { Table } from '@tanstack/react-table';
import { SxProps, Theme } from '@mui/material';

interface AutoSkeletonProps<T> {
  table: Table<T>;
  rows?: number;
}

export const tableSkeletonRowStyles = {
  row: {
    display: 'flex',
    height: 80,
    borderBottom: '1px solid #eee',
  },

  cellBase: {
    display: 'flex',
    alignItems: 'center',
    px: 1,
    borderRight: '1px solid #f0f0f0',
    backgroundColor: 'background.paper',
  },

  pinned: {
    position: 'sticky',
    zIndex: 1,
  },

  normal: {
    position: 'relative',
  },
} satisfies Record<string, SxProps<Theme>>;

export function TableSkeletonRow<T>({ table, rows = 6 }: AutoSkeletonProps<T>) {
  const visibleColumns = table.getVisibleLeafColumns();

  const columnWidths = Object.fromEntries(
    visibleColumns.map(col => [col.id, col.getSize()])
  );

  const stickyLefts = visibleColumns.reduce<Record<string, number>>(
    (acc, col) => {
      const isPinned = col.getIsPinned?.() === 'left';
      if (!isPinned) return acc;

      const left = visibleColumns
        .filter(
          c => c.getIsPinned?.() === 'left' && c.getIndex() < col.getIndex()
        )
        .reduce((sum, c) => sum + c.getSize(), 0);

      acc[col.id] = left;
      return acc;
    },
    {}
  );

  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <Box key={rowIndex} sx={tableSkeletonRowStyles.row}>
          {visibleColumns.map(col => {
            const isPinned = stickyLefts[col.id] != null;
            return (
              <Box
                key={col.id}
                sx={{
                  width: columnWidths[col.id],
                  left: stickyLefts[col.id],
                  ...tableSkeletonRowStyles.cellBase,
                  ...(isPinned
                    ? tableSkeletonRowStyles.pinned
                    : tableSkeletonRowStyles.normal),
                }}
              >
                <Skeleton width='80%' height={24} />
              </Box>
            );
          })}
        </Box>
      ))}
    </>
  );
}
