const CACHE_NAME = 'healthcare-v1';
const urlsToCache = [
  '/Healthcare/',
  '/Healthcare/health.html',
  '/Healthcare/manifest.json'
];

// Install event
self.addEventListener('install', event => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache opened');
        return cache.addAll(urlsToCache.map(url => new Request(url, {cache: 'reload'})));
      })
      .catch(err => {
        console.log('Cache open failed:', err);
      })
  );
  self.skipWaiting();
});

// Activate event
self.addEventListener('activate', event => {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// Fetch event - Network first, then cache
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Check if valid response
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // Clone the response
        const responseToCache = response.clone();

        caches.open(CACHE_NAME)
          .then(cache => {
            cache.put(event.request, responseToCache);
          });

        return response;
      })
      .catch(() => {
        // Network failed, try cache
        return caches.match(event.request)
          .then(response => {
            if (response) {
              return response;
            }
            // Return offline page if available
            return caches.match('/Healthcare/health.html');
          });
      })
  );
});

// Push notification
self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : 'Nhắc nhở khám sức khỏe',
    icon: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"%3E%3Crect width="192" height="192" fill="%232563eb" rx="40"/%3E%3Cpath d="M96 40c-15.5 0-28 12.5-28 28 0 12.4 8 22.8 19 26.5V120h18V94.5c11-3.7 19-14.1 19-26.5 0-15.5-12.5-28-28-28z" fill="%23fff"/%3E%3C/svg%3E',
    badge: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"%3E%3Ccircle cx="48" cy="48" r="48" fill="%232563eb"/%3E%3Ctext x="48" y="65" font-size="48" text-anchor="middle" fill="white"%3E⚕%3C/text%3E%3C/svg%3E',
    vibrate: [200, 100, 200],
    tag: 'healthcare-notification',
    requireInteraction: false
  };

  event.waitUntil(
    self.registration.showNotification('HealthCare Pro', options)
  );
});

// Notification click
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/Healthcare/')
  );
});