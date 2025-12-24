import { UpdateProductForm } from '@/components/create-update/UpdateProductForm';
import { getProductById } from '@/lib';
import { Theme } from '@emotion/react';
import { Box, SxProps } from '@mui/material';

const updateProductPage = {
  mainBox: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
  },
} satisfies Record<string, SxProps<Theme>>;

interface ProductPageProps {
  params: { id: string };
}

export default async function UpdateProductPage({ params }: ProductPageProps) {
  const resolvedParams = params instanceof Promise ? await params : params;
  const idString = resolvedParams.id;

  const product = await getProductById(Number(idString));

  if (!product) {
    return <div>Product not found</div>;
  }
  return (
    <Box sx={updateProductPage.mainBox}>
      <UpdateProductForm product={product} />
    </Box>
  );
}
