import { NewCategoryForm } from '@/components/create-update/NewCategoryForm';
import { NewProductForm } from '@/components/create-update/CreateProductForm';
import { Theme } from '@emotion/react';
import { Box, Container, SxProps, Typography } from '@mui/material';

const createProductPage = {
  title: {
    textAlign: 'center',
    mb: 4,
  },
  mainBox: {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      lg: 'row',
    },
    justifyContent: 'center',
    alignItems: {
      xs: 'center',
      lg: 'flex-start',
    },
    gap: {
      xs: 4,
      lg: 6,
    },
  },
  formWrapper: { width: '100%', maxWidth: 800 },
} satisfies Record<string, SxProps<Theme>>;

export default function CreateProductPage() {
  return (
    <Container maxWidth='xl'>
      <Typography variant='h4' sx={createProductPage.title}>
        Manage Products & Categories
      </Typography>

      <Box sx={createProductPage.mainBox}>
        <Box sx={createProductPage.formWrapper}>
          <NewProductForm />
        </Box>

        <Box sx={createProductPage.formWrapper}>
          <NewCategoryForm />
        </Box>
      </Box>
    </Container>
  );
}
