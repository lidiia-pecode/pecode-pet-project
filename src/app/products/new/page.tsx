import { NewCategoryForm } from '@/components/new/NewCategoryForm';
import { NewProductForm } from '@/components/new/NewProductForm';
import { Box, Container, Typography } from '@mui/material';

export default function CreateProductPage() {
  return (
    <Container maxWidth='xl'>
      <Typography
        variant='h4'
        sx={{
          textAlign: 'center',
          mb: 4,
        }}
      >
        Manage Products & Categories
      </Typography>

      <Box
        sx={{
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
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 800 }}>
          <NewProductForm />
        </Box>

        <Box sx={{ width: '100%', maxWidth: 800 }}>
          <NewCategoryForm />
        </Box>
      </Box>
    </Container>
  );
}
