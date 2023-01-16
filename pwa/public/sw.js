const CACHE_NAME = 'pa-sw-oe-cache'

const urlsToCache = [
    '/',
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');

                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('activate', (event) => {
    // event.waitUntil(self.clients.claim());

    const cacheWhitelist = [CACHE_NAME];

    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    return caches.delete(cacheName);
                    // if (cacheWhitelist.indexOf(cacheName) === -1) {
                    //     return caches.delete(cacheName);
                    // } else {
                    //     return null;
                    // }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request)
            })
            .catch((error) => {
                console.log(error);
            })
    );
});
