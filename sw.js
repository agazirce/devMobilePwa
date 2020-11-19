self.addEventListener('install', event=>{
    event.waitUntil(
        /*caches.open('v1').then(function(cache) {
            return cache.addAll([
                '/index.html',
                '/script.js',
                '/images/icons/icon-72x72.png',
                '/images/icons/icon-96x96.png',
                '/images/icons/icon-128x128.png',
                '/images/icons/icon-256x256.png',
                '/images/icons/icon-512x512.png'
            ]);
        })*/
        Promise.resolve('Install phase succeed')
    );
});

self.addEventListener ('message', event=>{
    this.clients.matchAll().then(clients=>{
        clients.forEach(client=>client.postMessage('Enchanté, je suis le service worker'));
    });
});

self.addEventListener('fetch', event=>{
    console.log(event.request.url);/*
    console.log(new Response('PWA!!!!'));/*
    event.respondWith(caches.match(event.request)
        .catch(function() {
            return fetch(event.request);
        }));*/
});

self.addEventListener('fetch', event=>{
    event.respondWith(
        fetch(event.request).then(Response)
    );
});

self.addEventListener("fetch", (event) => {
    const url = event.request.url;
    if (url.indexOf("https://monNomDeDomaine/images.json") ===0) {
        event.respondWith(
            fetch(event.request).then((response) => {
                if (response.statusText !== "OK") {
                    console.error("Service Worker","Error when fetching",event.request.url);
                    return response;
                }
                console.info("Formatting data");
                return response.json().then((json) => {
                    const formattedResponse = json.map((j) =>
                        ({  name: j.name,
                            description: j.description || "",
                            updated_at: j.updated_at,}));
                    return new Response(JSON.stringify(formattedResponse));
                });
            }));
    }});

