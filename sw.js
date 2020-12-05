const cacheName = "galerie";
const files = [
    '/',
    '/script.js',
    '/images/icons/icon-72x72.png',
    '/images/icons/icon-96x96.png',
    '/images/icons/icon-128x128.png',
    '/images/icons/icon-256x256.png',
    '/images/icons/icon-512x512.png',
    'https://cdn.jsdelivr.net/npm/pwacompat@2.0.9/pwacompat.min.js',
    'https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css',
    'https://code.jquery.com/jquery-3.5.1.slim.min.js',
    'https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js',
    'https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.min.js',
    'https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/localforage/1.7.3/localforage.min.js'
    ];

self.addEventListener("install", e => {
    caches.open(cacheName).then(cache => {
        cache.addAll(files);
    });
});
self.addEventListener("activate", e => {
    e.waitUntil(
        caches.keys().then(function(keyList) {
            return Promise.all(
                keyList.map(function(key) {
                    if (key !== cacheName) {
                        return caches.delete(key);
                    }
                })
            );
        })
    );
});

self.addEventListener("fetch", e => {console.log(e.request.url);});

self.addEventListener("fetch", event => {
    const url = event.request.url;

    if (url.indexOf("https://cranky-mcnulty-e3f846.netlify.app/GalerieRepos/galerie.json") === 0) {
        event.respondWith(
            fetch(event.request).then(response => {
                if (response.status === 200) {
                    console.info("Formatting data");
                    return response.json().then(json => {
                        const formattedResponse = json.map(j => ({
                            title: j.title,
                            src: j.src,
                            fav: j.fav
                        }));
                        return new Response(JSON.stringify(formattedResponse));
                    });
                } else {
                    console.error(
                        "Service Worker",
                        "Error when fetching",
                        event.request.url
                    );
                    return response;
                }
            })
        );
    } else if (url.indexOf("http://localhost:3000/favoris") === 0) {
        event.respondWith(
            fetch(event.request).then(response => {
                console.info("Send data");
                if (response.status === 200) {
                    console.info("Data synchronized");
                } else {
                    console.error(
                        "Service Worker",
                        "Error when fetching",
                        event.request.url
                    );
                }
                return response;
            })
        );
    } else {
        event.respondWith(
            caches
                .open(cacheName)
                .then(cache => cache.match(event.request))
                .then(response => response || fetch(event.request))
        );
    }
});