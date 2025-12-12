import { NewCategoryForm } from '@/components/new/NewCategoryForm';
import { NewProductForm } from '@/components/new/NewProductForm';
import { Container, Typography } from '@mui/material';

export default function CreateProductPage() {
  return (
    <>
      <Typography variant='h4' sx={{margin: '0 auto 24px', width: 'fit-content'}}>
        Manage Products & Categories
      </Typography>

      <Container
        maxWidth='lg'
        sx={{ display: 'flex', gap: 8, alignContent: 'start', p: 0 }}
      >
        <NewProductForm />
        <NewCategoryForm />
      </Container>
    </>
  );
}
