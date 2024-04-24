/* eslint-disable no-restricted-globals */
// Define the name for your cache
const CACHE_NAME = 'image-cache-v1';

self.addEventListener('fetch', event => {
  if (event.request.url.includes('assets')) {
    if (
      event.request.headers.get('accept').includes('image') ||
      // Font & Video
      event.request.headers.get('accept').includes('*/*')
    ) {
      event.respondWith(
        caches.match(event.request).then(response => {
          if (response) {
            return response;
          }
          return fetch(event.request).then(networkResponse => {
            if (networkResponse.status === 200) {
              const responseToCache = networkResponse.clone();
              caches.open(CACHE_NAME).then(cache => {
                cache.put(event.request, responseToCache);
              });
            }
            return networkResponse;
          });
        }),
      );
    }
  }
});
