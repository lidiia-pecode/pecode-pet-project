'use client';

import {
  Menu,
  MenuItem,
  Checkbox,
  ListItemIcon,
  Divider,
  Typography,
} from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { Product } from '@/types/Product';
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
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Dispatch, SetStateAction } from 'react';

interface ISortableMenuItem {
  column: Column<Product, unknown>;
  isPinned: boolean;
}

const SortableMenuItem = ({ column, isPinned }: ISortableMenuItem) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: column.id,
      disabled: isPinned,
    });

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


interface IColumnMenu {
  table: Table<Product>;
  menuAnchor: HTMLElement | null;
  onClose: () => void;
  pinnedColumns: Column<Product, unknown>[];
  isPinned: (id: string) => boolean;
  sensors: SensorDescriptor<SensorOptions>[];
  handleDragEnd: (event: DragEndEvent) => void;
  setColumnOrder: Dispatch<SetStateAction<ColumnOrderState>>;
};

export const ColumnMenu = ({
  table,
  menuAnchor,
  onClose,
  isPinned,
  sensors,
  handleDragEnd,
  setColumnOrder,
}: IColumnMenu) => (
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
          <SortableMenuItem
            key={col.id}
            column={col}
            isPinned={isPinned(col.id)}
          />
        ))}
      </SortableContext>
    </DndContext>
  </Menu>
);
