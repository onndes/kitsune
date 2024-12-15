// Подключаем плагин для PWA
import withPWA from 'next-pwa'

module.exports = withPWA({
  reactStrictMode: true,
  pwa: {
    dest: 'public', // Папка, куда будут сохраняться файлы PWA
    disable: process.env.NODE_ENV === 'development', // Отключаем в процессе разработки
  },
})

// module.exports = {
//   async headers() {
//     return [
//       {
//         source: '/(.*)',
//         headers: [
//           {
//             key: 'X-Content-Type-Options',
//             value: 'nosniff',
//           },
//           {
//             key: 'X-Frame-Options',
//             value: 'DENY',
//           },
//           {
//             key: 'Referrer-Policy',
//             value: 'strict-origin-when-cross-origin',
//           },
//         ],
//       },
//       {
//         source: '/sw.js',
//         headers: [
//           {
//             key: 'Content-Type',
//             value: 'application/javascript; charset=utf-8',
//           },
//           {
//             key: 'Cache-Control',
//             value: 'no-cache, no-store, must-revalidate',
//           },
//           {
//             key: 'Content-Security-Policy',
//             value: "default-src 'self'; script-src 'self'",
//           },
//         ],
//       },
//     ]
//   },
// }

// // @ts-check

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   /* config options here */
// }

// module.exports = nextConfig
