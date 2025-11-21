import { Box, Container } from '@mui/material';
import { getProductById } from '@/lib';
import { ImageCarousel } from '@/components/productDetails-page/ImageCarousel';
import { ProductInfo } from '@/components/productDetails-page/ProductInfo';
import { ProductAdditional } from '@/components/productDetails-page/ProductAdditional';
import { ProductBreadcrumbs } from '@/components/productDetails-page/ProductBreadcrumbs';

interface ProductPageProps {
  params: { id: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = params instanceof Promise ? await params : params;
  const idString = resolvedParams.id;

  const product = await getProductById(Number(idString));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <Container maxWidth='lg'>
      <ProductBreadcrumbs
        productTitle={product.title}
        sx={{ display: { xs: 'block', md: 'none' }, mb: 4 }}
      />
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
