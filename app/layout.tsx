import { ReactNode } from 'react';
import { StoreProvider } from './StoreProvider';
import { Roboto } from 'next/font/google';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ColorModeProvider } from './contexts/ColorModeContext';
import MyAppBar from './components/MyAppBar';
import Indent from './components/Indent';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <ColorModeProvider>
      <html lang="en">
        <body className={roboto.variable}>
          <StoreProvider>
            <AppRouterCacheProvider>
              <section>
                {/* <Nav /> */}
                <MyAppBar />
                <Indent />
                <main>{children}</main>
                <Indent bottom />
                {/* <Footer /> */} 
              </section>
            </AppRouterCacheProvider>
          </StoreProvider>
        </body>
      </html>
    </ColorModeProvider>
  );
}
