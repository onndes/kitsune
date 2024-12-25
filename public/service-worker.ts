const CACHE_NAME = 'pwa-cache-v1';
const urlsToCache = [
  '/',
  '/favicon.ico',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
];

// Установка SW и кэширование файлов
self.addEventListener('install', (event: ExtendableEvent) => {
  console.log('Service Worker installing.');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching app shell');
      return cache.addAll(urlsToCache);
    })
  );
});

// Активация SW и удаление старого кэша
self.addEventListener('activate', (event: ExtendableEvent) => {
  console.log('Service Worker activating.');
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Deleting old cache:', cache);
            return caches.delete(cache);
          }
        })
      )
    )
  );
});

// Обработка запросов
self.addEventListener('fetch', (event: FetchEvent) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Обработка push-уведомлений (Firebase)
self.addEventListener('push', (event: PushEvent) => {
  console.log('Push notification received:', event);
  const data = event.data ? event.data.json() : {};

  event.waitUntil(
    self.registration.showNotification(data.title || 'Push Notification', {
      body: data.body || 'You have a new message.',
      icon: '/icons/icon-192x192.png',
      tag: data.tag || 'general',
    })
  );
});
