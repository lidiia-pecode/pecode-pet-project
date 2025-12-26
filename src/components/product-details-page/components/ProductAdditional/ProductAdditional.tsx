import { Box, Typography, Chip } from '@mui/material';
import { styles } from './ProductAdditional.styles';

interface ProductAdditionalProps {
  id: number;
  category: { name: string };
}

export const ProductAdditional = ({ id, category }: ProductAdditionalProps) => {
  return (
    <Box sx={styles.container}>
      <Typography sx={styles.text}>
        <strong>Product ID:</strong> {id}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography sx={styles.text}>
          <strong>Category:</strong>
        </Typography>
        <Chip
          label={category.name}
          color='primary'
          size='small'
          sx={styles.chip}
        />
      </Box>
    </Box>
  );
};
