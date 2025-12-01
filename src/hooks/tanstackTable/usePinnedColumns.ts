import { ColumnMeta } from '@/types/TanstackTable';
import { Table } from '@tanstack/react-table';

export function usePinnedColumns<T>(table: Table<T>) {
  const pinnedColumns = table
    .getAllColumns()
    .filter(col => (col.columnDef.meta as ColumnMeta)?.pin);

  const stickyLefts: Record<string, number> = {};
  let currentLeft = 0;

  for (const col of pinnedColumns) {
    stickyLefts[col.id] = currentLeft;
    currentLeft += col.getSize();
  }

  const isPinned = (id: string) => id in stickyLefts;
  return { pinnedColumns, stickyLefts, isPinned };
}
