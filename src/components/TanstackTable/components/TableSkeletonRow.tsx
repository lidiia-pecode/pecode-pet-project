import { Box, Skeleton } from '@mui/material';
import { Table } from '@tanstack/react-table';

interface AutoSkeletonProps<T> {
  table: Table<T>;
  rows?: number;
}

export function TableSkeletonRow<T>({
  table,
  rows = 6,
}: AutoSkeletonProps<T>) {
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
        <Box
          key={rowIndex}
          sx={{ display: 'flex', borderBottom: '1px solid #eee', height: 80 }}
        >
          {visibleColumns.map(col => (
            <Box
              key={col.id}
              sx={{
                width: columnWidths[col.id],
                px: 1,
                borderRight: '1px solid #f0f0f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                position: stickyLefts[col.id] != null ? 'sticky' : 'relative',
                left: stickyLefts[col.id],
                backgroundColor: 'background.paper',
              }}
            >
              <Skeleton width='80%' height={24} />
            </Box>
          ))}
        </Box>
      ))}
    </>
  );
}
