'use client';

import { Box, Typography, Button } from '@mui/material';
import { Product } from '@/types/Product';
import { ProductRating } from '../shared/ProductRating';
import { listTableStyles } from './ProductsListTable.styles';

// const columns = [
//   {
//     key: 'image',
//     label: 'Image',
//     width: 'minmax(80px, 80px)',
//     align: 'left',
//   },

//   { key: 'title', label: 'Title', width: 'minmax(160px, 1fr)', align: 'left' },

//   {
//     key: 'price',
//     label: 'Price',
//     width: 'minmax(70px, 120px)',
//     align: 'center',
//   },

//   {
//     key: 'rating',
//     label: 'Rating',
//     width: 'minmax(140px, 180px)',
//     align: 'center',
//   },

//   {
//     key: 'action',
//     label: 'Action',
//     width: 'minmax(80px, 120px)',
//     align: 'center',
//   },
// ];

// export const ProductsListTable = ({
//   products,
//   onOpenProduct,
// }: {
//   products: Product[];
//   onOpenProduct?: (product: Product) => void;
// }) => {
//   const gridTemplateColumns = columns.map(c => c.width).join(' ');

//   return (
//     <Box>
//       {/* HEADER */}
//       <Box sx={{ ...listTableStyles.header, gridTemplateColumns }}>
//         {columns.map(col => (
//           <Typography
//             key={col.key}
//             sx={{ textAlign: col.align, fontWeight: 600 }}
//             noWrap
//           >
//             {col.label}
//           </Typography>
//         ))}
//       </Box>

//       {/* ROWS */}
//       {products.map(product => (
//         <Box
//           key={product.id}
//           sx={{ ...listTableStyles.row, gridTemplateColumns }}
//           onClick={() => onOpenProduct?.(product)}
//         >
//           {/* IMAGE */}
//           <Box
//             component='img'
//             src={product.images?.[0]}
//             alt={product.title}
//             sx={listTableStyles.image}
//           />

//           {/* TITLE */}
//           <Typography sx={listTableStyles.title} noWrap>
//             {product.title}
//           </Typography>

//           {/* PRICE */}
//           <Typography sx={listTableStyles.price}>${product.price}</Typography>

//           {/* RATING */}
//           <Box sx={listTableStyles.rating}>
//             <ProductRating
//               value={product.rating?.rate ?? 0}
//               count={product.rating?.count}
//               size='small'
//               align='center'
//             />
//           </Box>

//           {/* ACTION */}
//           <Button
//             variant='contained'
//             size='small'
//             sx={listTableStyles.actionBtn}
//             onClick={e => {
//               e.stopPropagation();
//               onOpenProduct?.(product);
//             }}
//           >
//             View
//           </Button>
//         </Box>
//       ))}
//     </Box>
//   );
// };

const columns = [
  {
    key: 'image',
    label: 'Image',
    width: 'minmax(80px, 80px)',
    align: 'center',
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
    render: (product: Product) => (
      <Typography>${product.price}</Typography>
    ),
  },

  {
    key: 'rating',
    label: 'Rating',
    width: 'minmax(140px, 180px)',
    align: 'center',
    render: (product: Product) => (
      <Box>
        <ProductRating
          value={product.rating?.rate ?? 0}
          count={product.rating?.count}
          size='small'
          align='center'
        />
      </Box>
    ),
  },

  {
    key: 'action',
    label: 'Action',
    width: 'minmax(80px, 120px)',
    align: 'center',
    render: (product: Product, onOpenProduct?: (product: Product) => void) => (
      <Button
        variant='contained'
        size='small'
        onClick={e => {
          e.stopPropagation();
          onOpenProduct?.(product);
        }}
      >
        View
      </Button>
    ),
  },
];


export const ProductsListTable = ({
  products,
  onOpenProduct,
}: {
  products: Product[];
  onOpenProduct?: (product: Product) => void;
}) => {
  const gridTemplateColumns = columns.map(c => c.width).join(' ');

  return (
    <Box>
      <Box sx={{ ...listTableStyles.header, gridTemplateColumns }}>
        {columns.map(col => (
          <Typography
            key={col.key}
            sx={{ textAlign: col.align, fontWeight: 600 }}
            noWrap
          >
            {col.label}
          </Typography>
        ))}
      </Box>

      {products.map(product => (
        <Box
          key={product.id}
          sx={{ ...listTableStyles.row, gridTemplateColumns }}
          onClick={() => onOpenProduct?.(product)}
        >
          {columns.map(col => (
            <Box key={col.key} sx={{ textAlign: col.align }}>
              {col.render(product, onOpenProduct)}
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
};
