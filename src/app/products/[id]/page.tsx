import { Box, Container, SxProps } from '@mui/material';
import { getProductById } from '@/lib';
import { ImageCarousel } from '@/components/product-details-page/ImageCarousel';
import { ProductInfo } from '@/components/product-details-page/ProductInfo';
import { ProductAdditional } from '@/components/product-details-page/ProductAdditional';
import { ProductBreadcrumbs } from '@/components/product-details-page/ProductBreadcrumbs';
import { Theme } from '@emotion/react';

const productsPage = {
  mainBox: {
    display: 'flex',
    gap: 4,
    flexDirection: { xs: 'column', md: 'row' },
  },
  carouselBox: { flex: 1, maxWidth: { md: '50%' } },
  infoBox: { flex: 1 },
} satisfies Record<string, SxProps<Theme>>;

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
      <ProductBreadcrumbs productTitle={product.title} />
      <Box sx={productsPage.mainBox}>
        <Box sx={productsPage.carouselBox}>
          <ImageCarousel images={product.images} title={product.title} />
        </Box>

        <Box sx={productsPage.infoBox}>
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
