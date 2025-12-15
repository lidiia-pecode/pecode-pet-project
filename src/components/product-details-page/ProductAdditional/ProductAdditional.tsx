import { Box, Typography, Chip } from '@mui/material';
import { productAdditionalStyles } from './ProductAdditional.styles';

interface ProductAdditionalProps {
  id: number;
  category: { name: string };
}

export const ProductAdditional = ({ id, category }: ProductAdditionalProps) => {
  return (
    <Box sx={productAdditionalStyles.container}>
      <Typography sx={productAdditionalStyles.text}>
        <strong>Product ID:</strong> {id}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography sx={productAdditionalStyles.text}>
          <strong>Category:</strong>
        </Typography>
        <Chip
          label={category.name}
          color='primary'
          size='small'
          sx={productAdditionalStyles.chip}
        />
      </Box>
    </Box>
  );
};
