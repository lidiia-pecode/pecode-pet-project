import { TanstackProvider } from '../providers/TanstackProvider';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../styles/theme';
import { CssBaseline } from '@mui/material';
import { Layout } from '@/components/layout';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <TanstackProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Layout>{children}</Layout>
          </ThemeProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
