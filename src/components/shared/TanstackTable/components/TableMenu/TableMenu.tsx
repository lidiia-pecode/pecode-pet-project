'use client';

import {
  Menu,
  MenuItem,
  Checkbox,
  ListItemIcon,
  Divider,
  Typography,
} from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { Table, Column, ColumnOrderState } from '@tanstack/react-table';
import {
  DndContext,
  closestCenter,
  DragEndEvent,
  SensorDescriptor,
  SensorOptions,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Dispatch, SetStateAction } from 'react';
import { TableMenuItem } from './TableMenuItem';

interface IColumnMenu<T> {
  table: Table<T>;
  menuAnchor: HTMLElement | null;
  onClose: () => void;
  pinnedColumns: Column<T, unknown>[];
  isPinned: (id: string) => boolean;
  sensors: SensorDescriptor<SensorOptions>[];
  handleDragEnd: (event: DragEndEvent) => void;
  setColumnOrder: Dispatch<SetStateAction<ColumnOrderState>>;
}

export function ColumnMenu<T>({
  table,
  menuAnchor,
  onClose,
  isPinned,
  sensors,
  handleDragEnd,
  setColumnOrder,
}: IColumnMenu<T>) {
  return (
    <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={onClose}>
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
          onClose();
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
            <TableMenuItem
              key={col.id}
              column={col}
              isPinned={isPinned(col.id)}
            />
          ))}
        </SortableContext>
      </DndContext>
    </Menu>
  );
}
