import { Box } from "@mui/material";
import { Header } from "@tanstack/react-table";
import { colResizerStyles } from "./TableHeader.styles";

interface IColumnResizer<T> {
  header: Header<T, unknown>;
}

export function ColumnResizer<T>({ header }: IColumnResizer<T>) {
  return (
    <Box
      onMouseDown={header.getResizeHandler()}
      onTouchStart={header.getResizeHandler()}
      sx={colResizerStyles.box}
    />
  );
}