import {
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { Column, ColumnOrderState, Table } from '@tanstack/react-table';
import { Dispatch, SetStateAction } from 'react';

interface IUseColumnDrag<T> {
  table: Table<T>;
  pinnedColumns: Column<T, unknown>[];
  columnOrder: ColumnOrderState;
  setColumnOrder: Dispatch<SetStateAction<ColumnOrderState>>;
}

export function useColumnDrag<T> ({
  table,
  pinnedColumns,
  columnOrder,
  setColumnOrder,
}: IUseColumnDrag<T>) {
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
