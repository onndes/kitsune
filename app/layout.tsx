// app/layout.tsx
import { ReactNode } from 'react'
import { StoreProvider } from './StoreProvider'
import { Roboto } from 'next/font/google'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import ThemeWrapper from './ThemeWrapper'

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
})

export default function Layout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <AppRouterCacheProvider>
          <StoreProvider>
            <ThemeWrapper>
              <section>
                {/* <Nav /> */}

                {/* <Header /> */}

                <main>{children}</main>

                {/* <Footer /> */}
              </section>
            </ThemeWrapper>
          </StoreProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
