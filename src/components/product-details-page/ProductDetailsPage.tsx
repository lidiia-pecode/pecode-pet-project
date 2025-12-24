'use client';

import { Box, Container } from '@mui/material';
import { ProductBreadcrumbs } from './components/ProductBreadcrumbs';
import { ImageCarousel } from './components/ImageCarousel';
import { ProductInfo } from './components/ProductInfo';
import { ProductAdditional } from './components/ProductAdditional';
import { ProductFormWrapper } from '../products-page/ProductsTopBar/components/ProductFormWrapper';
import { styles } from './ProductDetailsPage.styles';
import { Product } from '@/types/Product';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { ActionButton } from '../shared/ActionButton';
import { useModalToggle } from '@/hooks/products/useModal';

interface ProductDetailsPageProps {
  product: Product;
}

export const ProductDetailsPage = ({ product }: ProductDetailsPageProps) => {
  const { isOpen, toggle } = useModalToggle();

  return (
    <Container maxWidth='lg'>
      <ProductBreadcrumbs productTitle={product.title} />
      <Box sx={styles.mainBox}>
        <Box sx={styles.carouselBox}>
          <ImageCarousel images={product.images} title={product.title} />
        </Box>

        <Box sx={styles.infoBox}>
          <ProductInfo
            title={product.title}
            price={product.price}
            description={product.description}
            rating={product.rating}
          />
          <ProductAdditional id={product.id} category={product.category} />
        </Box>

        <ActionButton
          mode='edit'
          entityName='Product'
          icon={<DriveFileRenameOutlineIcon />}
          buttonText='Update'
          open={isOpen}
          size='large'
          onToggle={toggle}
          form={<ProductFormWrapper product={product} onClose={toggle} />}
        />
      </Box>
    </Container>
  );
};
