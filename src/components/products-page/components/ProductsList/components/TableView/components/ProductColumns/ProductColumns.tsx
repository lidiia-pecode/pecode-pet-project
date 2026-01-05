'use client';

import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { ColumnDef } from '@tanstack/react-table';
import { Box, Button, Checkbox, Typography } from '@mui/material';

import { styles } from './ProductColumns.styles';
import { Product } from '@/types/Product';
import { useDeleteProduct } from '@/hooks/products/useProducts';
import { ProductRating } from '@/components/shared/ProductRating';
import { DeleteButton } from '@/components/shared/DeleteButton';
import { AddToCartButton } from '@/components/shared/AddToCartButton';

export const useProductColumns = (): ColumnDef<Product>[] => {
  const router = useRouter();
  const deleteMutation = useDeleteProduct();
  const handleOpenProduct = (id: number) => {
    router.push(`/products/${id}`);
  };

  const columns: ColumnDef<Product>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
          sx={styles.checkboxChecked}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
        />
      ),
      size: 60,
      minSize: 60,
      meta: { align: 'center', pin: true },
      enableSorting: false,
      enableResizing: false,
    },
    {
      id: 'image',
      header: 'Image',
      size: 100,
      minSize: 80,
      meta: { align: 'center', pin: true },
      enableSorting: false,
      enableResizing: true,
      cell: ({ row }) => (
        <Box
          component='img'
          src={row.original.images?.[0]}
          alt={row.original.title}
          sx={styles.image}
        />
      ),
    },
    {
      accessorKey: 'title',
      header: 'Title',
      size: 300,
      minSize: 160,
      enableResizing: true,
      meta: { align: 'flex-start', pin: true },
      cell: info => <Typography noWrap>{info.getValue<string>()}</Typography>,
    },
    {
      accessorKey: 'price',
      header: 'Price',
      size: 100,
      minSize: 100,
      enableResizing: true,
      meta: { align: 'center' },
      cell: info => <Typography>${info.getValue<number>()}</Typography>,
    },
    {
      accessorFn: row => row.rating.rate,
      id: 'rating',
      header: 'Rating',
      size: 140,
      minSize: 140,
      enableResizing: true,
      meta: { align: 'center' },
      cell: info => (
        <ProductRating value={info.getValue<number>()} showCount={false} />
      ),
    },
    {
      accessorFn: row => row.rating.count,
      id: 'reviews',
      header: 'Reviews',
      size: 110,
      minSize: 110,
      enableResizing: true,
      meta: { align: 'center' },
      cell: info => <Typography>{info.getValue<number>()}</Typography>,
    },
    {
      accessorKey: 'updatedAt',
      id: 'date',
      header: 'Date',
      size: 140,
      minSize: 140,
      enableResizing: true,
      meta: { align: 'center' },
      cell: info => (
        <Typography>
          {dayjs(info.getValue<string>()).format('DD/MM/YYYY')}
        </Typography>
      ),
    },
    {
      accessorFn: row => row.category.slug,
      id: 'category',
      header: 'Category',
      size: 140,
      minSize: 110,
      enableResizing: true,
      enableSorting: false,
      meta: { align: 'center' },
      cell: info => <Typography>{info.getValue<string>()}</Typography>,
    },
    {
      id: 'action',
      header: 'Action',
      size: 140,
      minSize: 140,
      enableResizing: true,
      enableSorting: false,
      meta: { align: 'center' },
      cell: ({ row }) => {
        return (
          <Box sx={styles.actionCell}>
            <Button
              variant='contained'
              onClick={e => {
                e.stopPropagation();
                handleOpenProduct(row.original.id);
              }}
            >
              View
            </Button>

            <DeleteButton
              entityName={row.original.title}
              entityType='product'
              loading={deleteMutation.isPending}
              usedInTable={true}
              onConfirm={async () => {
                await deleteMutation.mutateAsync({
                  id: row.original.id,
                });
              }}
            />

            <AddToCartButton
              variant='icon'
              product={{ ...row.original, quantity: 1 }}
            />
          </Box>
        );
      },
    },
  ];

  return columns;
};
