const CACHE_NAME = "money-saver-pro-v1.3";

const FILES_TO_CACHE = [
    "/",
    "/index.html",
    "/manifest.json",

    "/css/style.css",

    "/js/app.js",
    "/js/firebase.js",
    "/js/auth.js",
    "/js/settings.js",
    "/js/dashboard.js",
    "/js/goals.js",
    "/js/family.js",
    "/js/stats.js",
    "/js/profile.js",

    "/images/logo.png",
    "/icons/icon-192.png",
    "/icons/icon-512.png"
];


// Install
self.addEventListener("install", (event) => {

    event.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache) => {
            console.log("Caching Money Saver Pro");
            return cache.addAll(FILES_TO_CACHE);
        })
    );

    self.skipWaiting();
});


// Activate
self.addEventListener("activate", (event) => {

    event.waitUntil(

        caches.keys()
        .then((cacheNames) => {

            return Promise.all(

                cacheNames.map((cacheName) => {

                    if(cacheName !== CACHE_NAME){
                        return caches.delete(cacheName);
                    }

                })

            );

        })

    );

    self.clients.claim();
});


// Fetch
self.addEventListener("fetch", (event) => {

    event.respondWith(

        caches.match(event.request)
        .then((cachedResponse)=>{

            return cachedResponse || fetch(event.request);

        })

    );

});
