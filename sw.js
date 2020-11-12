self.addEventListener ('message', event=>{
    this.clients.matchAll().then(clients=>{
        clients.forEach(client=>client.postMessage('Enchanté, je suis le service worker')) ;
    }) ;
}) ;

self.addEventListener('fetch', event=>{
    event.respondWith(new Response('PWA!!!!')) ;
}) ;

self.addEventListener('install', event=>{
    event.waitUntil(
        caches.open('v1').then(function(cache) {
            return cache.addAll([
                '/sw-test/',
                '/sw-test/index.html',
                '/sw-test/script.js',
                '/sw-test/image-list.js',
                '/sw-test/star-wars-logo.jpg',
                '/sw-test/images/',
                '/sw-test/images/icons/',
                '/sw-test/images/icons/icon-72x72.png',
                '/sw-test/images/icons/icon-96x96.png',
                '/sw-test/images/icons/icon-128x128.png',
                '/sw-test/images/icons/icon-256x256.png',
                '/sw-test/images/icons/icon-512x512.png'
            ]);
        })
    ) ;
}) ;