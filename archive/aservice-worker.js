const CACHE_NAME = 'pwa-cache-v1';
const urlsToCache = [
  '/',
  '/favicon.ico',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
];

// Установка Service Worker и кэширование ресурсов
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching static assets');
      return cache.addAll(urlsToCache);
    })
  );
});

// Активация Service Worker и удаление старого кэша
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
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

// Обработка запросов (стратегия cache-first с резервным fetch)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Если ресурс есть в кэше, возвращаем его, иначе загружаем из сети
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request)
        .then((response) => {
          // Проверяем, можно ли сохранить ответ в кэше
          if (
            event.request.method === 'GET' &&
            response &&
            response.status === 200 &&
            response.type === 'basic'
          ) {
            const clonedResponse = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, clonedResponse);
            });
          }
          return response;
        })
        .catch((error) => {
          console.error('Fetch failed; returning offline page instead.', error);
          // Можно вернуть оффлайн-страницу из кэша, если она есть
          return caches.match('/');
        });
    })
  );
});

// Обработка push-уведомлений
self.addEventListener('push', (event) => {
  console.log('Push notification received:', event);
  const data = event.data ? event.data.json() : {};

  const title = data.title || 'Push Notification';
  const options = {
    body: data.body || 'You have a new message.',
    icon: '/icons/icon-192x192.png',
    tag: data.tag || 'general',
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// Обработка клика на уведомление
self.addEventListener('notificationclick', (event) => {
  console.log('Notification click received.');
  event.notification.close();

  event.waitUntil(
    clients
      .matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        if (clientList.length > 0) {
          // Фокусируемся на уже открытом окне
          const client = clientList[0];
          return client.focus();
        }
        // Если окна нет, открываем новое
        return clients.openWindow('/');
      })
  );
});
