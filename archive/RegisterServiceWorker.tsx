'use client'; // Указывает, что компонент должен выполняться на клиенте

import { useEffect } from 'react';

export default function RegisterServiceWorker() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((registration) => {
          console.log('Service Worker зарегистрирован:', registration);
        })
        .catch((error) => {
          console.error('Service Worker не удалось зарегистрировать:', error);
        });
    }
  }, []);

  return null; // Компонент не рендерит UI
}
