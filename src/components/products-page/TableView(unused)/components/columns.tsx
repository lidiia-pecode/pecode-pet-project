import { Product } from '@/types/Product';
import { Box, Typography, Button } from '@mui/material';
import { listTableStyles } from '../ProductsTableView.styles';
import { ProductRating } from '../../shared/ProductRating';


export const columns = [
  {
    key: 'image',
    label: 'Image',
    width: 'minmax(80px, 80px)',
    align: 'left',
    render: (product: Product) => (
      <Box
        component='img'
        src={product.images?.[0]}
        alt={product.title}
        sx={listTableStyles.image}
      />
    ),
  },

  {
    key: 'title',
    label: 'Title',
    width: 'minmax(160px, 1fr)',
    align: 'left',
    render: (product: Product) => (
      <Typography sx={listTableStyles.title} noWrap>
        {product.title}
      </Typography>
    ),
  },

  {
    key: 'price',
    label: 'Price',
    width: 'minmax(70px, 120px)',
    align: 'center',
    render: (product: Product) => <Typography>${product.price}</Typography>,
  },

  {
    key: 'rating',
    label: 'Rating',
    width: 'minmax(140px, 180px)',
    align: 'center',
    render: (product: Product) => (
      <ProductRating
        value={product.rating?.rate ?? 0}
        count={product.rating?.count}
        size='small'
        align='center'
      />
    ),
  },

  {
    key: 'action',
    label: 'Action',
    width: 'minmax(80px, 120px)',
    align: 'center',
    render: (product: Product, onOpen?: (id: number) => void) => (
      <Button
        variant='contained'
        size='small'
        onClick={e => {
          e.stopPropagation();
          onOpen?.(product.id);
        }}
      >
        View
      </Button>
    ),
  },
];

export const gridTemplateColumns = columns.map(c => c.width).join(' ');