'use client';

import { Box, Container } from '@mui/material';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { useRouter } from 'next/navigation';

import { styles } from './ProductDetailsPage.styles';
import { Product } from '@/types/Product';
import { useModalToggle } from '@/hooks/ui/useModal';
import { ProductBreadcrumbs } from './components/ProductBreadcrumbs';
import { ImageCarousel } from './components/ImageCarousel';
import { ProductInfo } from './components/ProductInfo';
import { ProductAdditional } from './components/ProductAdditional';
import { ProductFormWrapper } from '../shared/ProductFormWrapper';
import { ActionButton } from '../shared/ActionButton';

interface ProductDetailsPageProps {
  product: Product;
}

export const ProductDetailsPage = ({ product }: ProductDetailsPageProps) => {
  const { isOpen, toggle } = useModalToggle();
  const router = useRouter();

  return (
    <Container maxWidth='lg'>
      <ProductBreadcrumbs productTitle={product.title} />
      <Box sx={styles.mainBox}>
        <Box sx={styles.carouselBox}>
          <ImageCarousel images={product.images} title={product.title} />
        </Box>

        <Box sx={styles.infoBox}>
          <ProductInfo
            product={product}
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
          form={
            <ProductFormWrapper
              product={product}
              showCategory={false}
              onClose={toggle}
              refetch={router.refresh}
            />
          }
        />
      </Box>
    </Container>
  );
};
