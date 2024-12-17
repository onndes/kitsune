import withPWA from 'next-pwa';

const nextConfig = {
  reactStrictMode: true, // Enable React strict mode for improved error handling
  // swcMinify: true, // Enable SWC minification for improved performance
  compiler: {
    removeConsole: process.env.NODE_ENV !== 'development', // Remove console.log in production
  },
};

export default withPWA({
  dest: 'public', // destination directory for the PWA files
  disable: process.env.NODE_ENV === 'development', // disable PWA in the development environment
  register: true, // register the PWA service worker
  skipWaiting: true, // skip waiting for service worker activation
})(nextConfig);

// Old config
// import withPWA from 'next-pwa'

// // Основная конфигурация Next.js
// const nextConfig = {
//   reactStrictMode: true, // Включение React Strict Mode
//   // Добавьте другие настройки Next.js здесь, если необходимо

//   // Настройки для PWA
//   dest: 'public', // Папка для сохранения файлов PWA (сервис-воркер и манифест)
//   disable: process.env.NODE_ENV === 'development', // Отключаем PWA в режиме разработки
// }

// export default withPWA(nextConfig)
