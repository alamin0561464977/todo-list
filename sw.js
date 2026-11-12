const CACHE_NAME = 'daily-todo-planner-v8';
const APP_FILES = [
    new URL('./', self.registration.scope).href,
    new URL('./index.html', self.registration.scope).href,
    new URL('./manifest.json', self.registration.scope).href,
    new URL('./app-icon.svg', self.registration.scope).href,
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(APP_FILES))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => Promise.all(
                cacheNames
                    .filter((cacheName) => cacheName !== CACHE_NAME)
                    .map((cacheName) => caches.delete(cacheName))
            ))
            .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    const requestUrl = new URL(event.request.url);
    if (requestUrl.origin !== self.location.origin) {
        return;
    }

    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request)
                .then((response) => {
                    if (response.ok) {
                        const responseCopy = response.clone();
                        caches.open(CACHE_NAME).then((cache) => cache.put(APP_FILES[1], responseCopy));
                    }
                    return response;
                })
                .catch(() => caches.match(APP_FILES[1]))
        );
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => cachedResponse || fetch(event.request))
    );
});
