import { UpdateProductForm } from '@/components/create-update/UpdateProductForm';
import { getProductById } from '@/lib';
import { Box } from '@mui/material';

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
    <Box sx={{ display: 'flex', alignContent: 'center', justifyContent: 'center'}}>
      <UpdateProductForm product={product} />
    </Box>
  );
}
