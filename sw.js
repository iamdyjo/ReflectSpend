// ReflectSpend PWA Service Worker (Offline Support & Background Sync)
const CACHE_NAME = 'reflectspend-v3';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './assets/design-tokens.css',
  './assets/icon-192.png',
  './assets/icon-512.png',
  './assets/apple-touch-icon.png',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
  'https://unpkg.com/lucide@latest'
];

// Install: Pre-cache core static assets
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

// Activate: Clean up old cache versions
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: Stale-While-Revalidate Caching Strategy
self.addEventListener('fetch', (e) => {
  // Only handle GET requests for caching
  if (e.request.method !== 'GET') return;

  e.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(e.request).then((cachedResponse) => {
        // Fetch fresh copy from network in background to revalidate cache
        const fetchPromise = fetch(e.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            cache.put(e.request, networkResponse.clone());
          }
          return networkResponse;
        }).catch(() => {
          // Network failed; will rely on cachedResponse or offline fallback
        });

        // Return cached response instantly if available, else wait for network fetch
        return cachedResponse || fetchPromise;
      });
    })
  );
});

// Background Sync Handler for Offline Transactions
self.addEventListener('sync', (e) => {
  if (e.tag === 'sync-pending-transactions') {
    e.waitUntil(
      self.clients.matchAll({ includeUncontrolled: true, type: 'window' }).then((clients) => {
        clients.forEach((client) => {
          client.postMessage({ type: 'POST_SYNC_PENDING' });
        });
      })
    );
  }
});

