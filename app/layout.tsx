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
import Head from 'next/head';

export const metadata = {
  title: 'KITSUNE',
  description: 'Kitsune shop',
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
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, viewport-fit=cover"
          />
          <meta
            name="theme-color"
            content={initialTheme === 'light' ? '#ffffff' : '#000000'}
          />
          <link rel="manifest" href="./manifest.ts" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="./apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="./apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="512x512"
            href="./apple-touch-icon.png"
          />
          {/* Другие метатеги */}
        </Head>
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
