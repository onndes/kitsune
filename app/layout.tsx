import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Roboto } from 'next/font/google';
import { headers } from 'next/headers';
import { ReactNode } from 'react';
import '../styles/globals.css';
import { ColorModeProvider } from './contexts/ColorModeContext';
import { StoreProvider } from './StoreProvider';
import Indent from './components/Indent';
import MyAppBarWraper from './components/MyAppBar';
import { DeviceProvider } from './contexts/DeviceContextProps';

export const metadata = {
  title: 'Your metadata App',
  description: 'Description of your metadata app',
};

export const vieport = {
  themeColor: 'light',
};

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export default async function Layout({ children }: { children: ReactNode }) {
  const headersList = await headers();
  const userAgent = headersList.get('user-agent');
  const initialTheme = 'light';
  const isMobile = /iPhone|iPad|Android/i.test(userAgent || '');

  return (
    <ColorModeProvider>
      <html lang="en">
        <head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, viewport-fit=cover"
          />
          <meta
            name="theme-color"
            content={initialTheme === 'light' ? '#ffffff' : '#000000'}
          />
        </head>
        <body className={roboto.variable}>
          <StoreProvider>
            <AppRouterCacheProvider>
              <DeviceProvider isMobile={isMobile}>
                <section>
                  {/* <Nav /> */}
                  <MyAppBarWraper />
                  <Indent />
                  <main>{children}</main>
                  <Indent bottom />
                  {/* <Footer /> */}
                </section>
              </DeviceProvider>
            </AppRouterCacheProvider>
          </StoreProvider>
        </body>
      </html>
    </ColorModeProvider>
  );
}
