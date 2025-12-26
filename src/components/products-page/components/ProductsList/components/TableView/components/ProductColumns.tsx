'use client'

import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { ColumnDef } from '@tanstack/react-table';
import { Box, Button, Checkbox, Typography } from '@mui/material';

import { Product } from '@/types/Product';
import { ProductRating } from '@/components/shared/ProductRating';

export const useProductColumns = (): ColumnDef<Product>[] => {
  const router = useRouter();

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
          sx={{ '&.Mui-checked': { color: '#fff' } }}
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
          sx={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 1 }}
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
      size: 100,
      minSize: 100,
      enableResizing: true,
      enableSorting: false,
      meta: { align: 'center' },
      cell: ({ row }) => (
        <>
          <Button
            size='small'
            variant='contained'
            onClick={e => {
              e.stopPropagation();
              handleOpenProduct(row.original.id);
            }}
          >
            View
          </Button>
        </>
      ),
    },
  ];

  return columns;
};
