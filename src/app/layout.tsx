import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import { TanstackProvider } from '../providers/TanstackProvider';
import { EmotionRegistry } from '@/providers/EmotionRegistry';
import { theme } from '../styles/theme';
import { Layout } from '@/components/shared/Layout';
import { Alerts } from '@/components/shared/Alerts';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' data-scroll-behavior='smooth'>
      <body>
        <EmotionRegistry>
          <TanstackProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Layout>
                {children}
                <Alerts />
              </Layout>
            </ThemeProvider>
          </TanstackProvider>
        </EmotionRegistry>
      </body>
    </html>
  );
}
