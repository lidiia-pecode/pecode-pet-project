import { Product } from '@/types/Product';
import { Table } from '@tanstack/react-table';
import { ProductColumnMeta } from '../TanstackTable';

export const usePinnedColumns = (table: Table<Product>) => {
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
