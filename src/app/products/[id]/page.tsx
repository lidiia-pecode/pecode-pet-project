'use client'

import { useProduct } from "@/hooks/useProducts"
import { Box, Typography } from "@mui/material";
import { useParams } from "next/navigation";

export default function ProductDetailsPage() {
  const params = useParams();
  const id = Number(params.id);

  const { data: product, isLoading, isError } = useProduct(id);

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError || !product) return <Typography>Product not found</Typography>;

  return (
    <Box>
      <Typography variant='h4' gutterBottom>
        {product.title}
      </Typography>
      <Box
        component='img'
        src={product.image}
        alt={product.title}
        sx={{ maxWidth: 400 }}
      />
      <Typography variant='h6' color='text.secondary'>
        ${product.price}
      </Typography>
      <Typography variant='body1'>{product.description}</Typography>
    </Box>
  );
}