import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Roboto } from 'next/font/google';
import { headers } from 'next/headers';
import { ReactNode } from 'react';
import '../styles/globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Indent from './components/Indent';
import MyAppBarWrapper from './components/MyAppBar';
import { ColorModeProvider } from './contexts/ColorModeContext';
import { DeviceProvider } from './contexts/DeviceContextProps';
import { StoreProvider } from './Providers';
import Footer from './components/Footer';
import HeadComponent from './components/Head';

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
  const isMobile = /iPhone|iPad|Android/i.test(userAgent || '');

  return (
    <ColorModeProvider>
      <html lang="en">
        <HeadComponent />
        <body className={roboto.variable}>
          <StoreProvider>
            <AppRouterCacheProvider>
              <DeviceProvider isMobile={isMobile}>
                <section className="app-section">
                  {/* <Nav /> */}
                  <MyAppBarWrapper />
                  <Indent />
                  <main className="main">{children}</main>
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
