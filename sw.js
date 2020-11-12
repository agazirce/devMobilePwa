self.addEventListener('install', event=>{
    event.waitUntil(
        caches.open('v1').then(function(cache) {
            return cache.addAll([
                '/index.html',
                '/script.js',
                '/images/icons/icon-72x72.png',
                '/images/icons/icon-96x96.png',
                '/images/icons/icon-128x128.png',
                '/images/icons/icon-256x256.png',
                '/images/icons/icon-512x512.png'
            ]);
        })
    );
});

self.addEventListener ('message', event=>{
    this.clients.matchAll().then(clients=>{
        clients.forEach(client=>client.postMessage('Enchanté, je suis le service worker'));
    });
});

self.addEventListener('fetch', event=>{
    console.log(new Response('PWA!!!!'));
    event.respondWith(caches.match(event.request)
        .catch(function() {
            return fetch(event.request);
        }));
});

