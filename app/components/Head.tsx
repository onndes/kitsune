// components/HeadComponent.tsx
import Head from 'next/head';

const HeadComponent = () => {
  return (
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, viewport-fit=cover"
      />
      <meta name="theme-color" content="#ffffff" />
      <link rel="manifest" href="./manifest.ts" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/image/icons/icon-180x180.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href="/image/icons/icon-192x192.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="512x512"
        href="/image/icons/icon-512x512.png"
      />
      <link rel="preload" href="/image/icons/icon-192x192.png" as="image" />
      <link rel="preload" href="/image/icons/icon-256x256.png" as="image" />
      {/* Другие метатеги */}
    </Head>
  );
};

export default HeadComponent;
