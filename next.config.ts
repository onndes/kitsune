import withPWA from 'next-pwa';
import { RemotePattern } from 'next/dist/shared/lib/image-config';

const nextConfig = {
  reactStrictMode: true, // Enable React strict mode for improved error handling
  // swcMinify: true, // Enable SWC minification for improved performance
  experimental: {
    turbo: {
      resolveAlias: {
        'next-intl/config': './path/to/i18n.ts',
      },
    },
  },
  compiler: {
    removeConsole: process.env.NODE_ENV !== 'development', // Remove console.log in production
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https', // Используйте https, так как это стандарт для этих доменов
        hostname: 'dummyimage.com',
        pathname: '/**', // Разрешает загрузку изображений с любых путей на этом домене
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        pathname: '/**', // Разрешает загрузку изображений с любых путей на этом домене
      },
    ] as RemotePattern[], // Разрешаем загрузку с dummyimage.com
  },
};

export default withPWA({
  dest: 'public', // destination directory for the PWA files
  disable: process.env.NODE_ENV === 'development', // disable PWA in the development environment
  register: true, // register the PWA service worker
  skipWaiting: true, // skip waiting for service worker activation
})(nextConfig);
