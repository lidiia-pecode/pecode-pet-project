import { Column } from '@tanstack/react-table';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import { Checkbox, ListItemIcon, MenuItem, Typography } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

interface ITableMenuItem<T> {
  column: Column<T, unknown>;
  isPinned: boolean;
}

export function TableMenuItem<T>({
  column,
  isPinned,
}: ITableMenuItem<T>) {
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
    <MenuItem ref={setNodeRef} style={style}>
      <ListItemIcon
        {...(!isPinned ? listeners : {})}
        {...(!isPinned ? attributes : {})}
        sx={{ cursor: !isPinned ? 'grab' : 'default' }}
      >
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
}
