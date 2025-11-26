import { Box, Skeleton } from "@mui/material";

interface ITableSkeletonRow {
  columnWidths: Record<string, number>;
  stickyLefts: Record<string, number>;
}

export const TableSkeletonRow = ({
  columnWidths,
  stickyLefts,
}: ITableSkeletonRow) => (
  <Box sx={{ display: 'flex', borderBottom: '1px solid #eee', height: 80 }}>
    {Object.keys(columnWidths).map(colId => (
      <Box
        key={colId}
        sx={{
          width: columnWidths[colId],
          px: 1,
          borderRight: '1px solid #f0f0f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          position: stickyLefts[colId] != null ? 'sticky' : 'relative',
          left: stickyLefts[colId],
          backgroundColor: 'background.paper',
        }}
      >
        <Skeleton width='80%' height={24} />
      </Box>
    ))}
  </Box>
);
