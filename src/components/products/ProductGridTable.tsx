import { Box, Typography, Button, SxProps, Theme } from '@mui/material';
import { Product } from '@/types/Product';
import { ProductRating } from '../ui/ProductRating';
import { theme } from '@/styles/theme';

interface ProductGridTableProps {
  products: Product[];
  onOpenProduct?: (product: Product) => void;
}

const columns = [
  { key: 'image', label: 'Image', width: '60px', align: 'center' },
  {
    key: 'title',
    label: 'Title',
    width: 'minmax(160px, 1fr)',
    align: 'center',
  },
  {
    key: 'price',
    label: 'Price',
    width: 'minmax(40px, 80px)',
    align: 'center',
  },
  {
    key: 'rating',
    label: 'Rating',
    width: 'minmax(120px, 160px)',
    align: 'center',
  },
  {
    key: 'action',
    label: 'Action',
    width: 'minmax(40px, 80px)',
    align: 'center',
  },
];

const gridBaseStyles: SxProps<Theme> = {
  display: 'grid',
  gap: 2,
  px: 1,
  py: 1,
  alignItems: 'center',
};

export const ProductGridTable = ({
  products,
  onOpenProduct,
}: ProductGridTableProps) => {
  const gridTemplateColumns = columns.map(c => c.width).join(' ');

  return (
    <Box>
      <Box
        sx={{
          ...gridBaseStyles,
          gridTemplateColumns,
          borderBottom: '2px solid',
          borderColor: 'divider',
          fontWeight: 700,
        }}
      >
        {columns.map(col => (
          <Typography
            key={col.key}
            sx={{
              textAlign: col.align,
              fontWeight: 600,
              color: theme.palette.primary.main,
            }}
            noWrap
          >
            {col.label}
          </Typography>
        ))}
      </Box>

      {products.map(product => (
        <Box
          key={product.id}
          sx={{
            ...gridBaseStyles,
            gridTemplateColumns,
            borderBottom: '1px solid',
            borderColor: 'divider',
            cursor: 'pointer',
            '&:hover': { bgcolor: 'action.hover' },
          }}
        >
          <Box
            component='img'
            src={product.image}
            alt={product.title}
            sx={{
              width: 60,
              height: 60,
              objectFit: 'contain',
              justifySelf: 'center',
            }}
          />

          <Typography noWrap>{product.title}</Typography>

          <Typography align='center'>${product.price}</Typography>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 0.5,
            }}
          >
            <ProductRating
              value={product.rating?.rate ?? 0}
              count={product.rating?.count}
              size='small'
            />
          </Box>

          <Button
            variant='contained'
            size='small'
            sx={{ justifySelf: 'center' }}
            onClick={() => onOpenProduct?.(product)}
          >
            View
          </Button>
        </Box>
      ))}
    </Box>
  );
};
