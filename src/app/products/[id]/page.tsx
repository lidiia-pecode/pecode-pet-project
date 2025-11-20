import { Box, Container} from '@mui/material';
import { getProduct } from '@/lib';
import { ImageCarousel } from '@/components/productDetails-page/ImageCarousel';
import { ProductInfo } from '@/components/productDetails-page/ProductInfo';
import { ProductAdditional } from '@/components/productDetails-page/ProductAdditional';

interface ProductPageProps {
  params: { id: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = params instanceof Promise ? await params : params;
  const idString = resolvedParams.id;

  console.log('id string:', idString, 'Number(id):', Number(idString));

  const product = await getProduct(Number(idString));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <Container maxWidth='lg'>
      <div>breadcrumbs/breadcrumbs/breadcrumbs/breadcrumbs</div>
      <Box
        sx={{
          display: 'flex',
          gap: 4,
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        <Box sx={{ flex: 1, maxWidth: { md: '50%' } }}>
          <ImageCarousel images={product.images} title={product.title} />
        </Box>

        <Box sx={{ flex: 1 }}>
          <ProductInfo
            title={product.title}
            price={product.price}
            description={product.description}
            rating={product.rating}
          />
          <ProductAdditional id={product.id} category={product.category} />
        </Box>
      </Box>
    </Container>
  );
}
