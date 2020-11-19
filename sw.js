self.addEventListener('fetch', event=>{
    console.log(event.request.url);/*
    console.log(new Response('PWA!!!!'));/*
    event.respondWith(caches.match(event.request)
        .catch(function() {
            return fetch(event.request);
        }));*/
});

self.addEventListener("fetch", (event) => {
    const url = event.request.url;
    if (url.indexOf("GalerieRepos/galerie.json") ===0) {
        event.respondWith(
            fetch(event.request).then((response) => {
                if (response.status === 200) {
                    console.info("Formatting data");
                    return response.json().then((json) => {
                        const formattedResponse = json.map((j) =>
                            ({  title: j.title}));
                        return new Response(JSON.stringify(formattedResponse));
                    });
                } else {
                    console.error("Service Worker","Error when fetching",event.request.url);
                    return response;
                }
            }));
    }});

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
                '/images/icons/icon-512x512.png',
                'GalerieRepos/galerie.json',
                'https://cdn.jsdelivr.net/npm/pwacompat@2.0.9/pwacompat.min.js',
                'https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css',
                'https://code.jquery.com/jquery-3.5.1.slim.min.js',
                'https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js',
                'https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.min.js',
                'https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js'
            ]);
        })
        /*Promise.resolve('Install phase succeed')*/
    );
});

/*self.addEventListener ('message', event=>{
    this.clients.matchAll().then(clients=>{
        clients.forEach(client=>client.postMessage('Enchanté, je suis le service worker'));
    });
});*/

/*self.addEventListener('fetch', event=>{
    event.respondWith(
        fetch(event.request).then(Response)
    );
});*/

