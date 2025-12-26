import { Box } from '@mui/material';

import { styles } from './ColumnResizer.styles';
import { Header } from '@tanstack/react-table';


interface IColumnResizer<T> {
  header: Header<T, unknown>;
}

export function ColumnResizer<T>({ header }: IColumnResizer<T>) {
  return (
    <Box
      onMouseDown={header.getResizeHandler()}
      onTouchStart={header.getResizeHandler()}
      sx={styles.box}
    />
  );
}
