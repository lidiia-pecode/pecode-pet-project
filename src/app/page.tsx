import { AuthForm } from '@/components/homepage/AuthForm';
import LogoutButton from '@/components/homepage/LogoutButton';
import { cookies } from 'next/headers';
import { Typography, Stack } from '@mui/material';

export default async function Home() {
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get('access_token')?.value;

  if (!accessToken) {
    return <AuthForm />;
  }

  return (
    <>
      <Typography variant='h4' fontWeight={700}>
        Welcome to Pecode Pet Project
      </Typography>
      
      <Stack direction='row' spacing={2} sx={{ mt: 2 }}>
        <LogoutButton />
      </Stack>
    </>
  );
}
