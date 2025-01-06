import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Roboto } from 'next/font/google';
import Head from 'next/head';
import { headers } from 'next/headers';
import { ReactNode } from 'react';
import '../styles/globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Indent from './components/Indent';
import MyAppBarWraper from './components/MyAppBar';
import { ColorModeProvider } from './contexts/ColorModeContext';
import { DeviceProvider } from './contexts/DeviceContextProps';
import { StoreProvider } from './StoreProvider';
import Footer from './components/Footer/Footer';

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
  preload: true,
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
            href="icons/icon-180x180.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="icons/icon-192x192.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="512x512"
            href="/icons/icon-512x512.png"
          />
          <link rel="preload" href="/icons/icon-192x192.png" as="image" />
          <link rel="preload" href="/icons/icon-256x256.png" as="image" />
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
                  <Footer />
                </section>
              </DeviceProvider>
            </AppRouterCacheProvider>
          </StoreProvider>
        </body>
      </html>
    </ColorModeProvider>
  );
}
