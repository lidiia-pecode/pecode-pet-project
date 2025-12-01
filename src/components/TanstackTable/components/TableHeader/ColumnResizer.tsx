import { Box } from "@mui/material";
import { Header } from "@tanstack/react-table";

interface IColumnResizer<T> {
  header: Header<T, unknown>;
}

export function ColumnResizer<T>({ header }: IColumnResizer<T>) {
  return (
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
}