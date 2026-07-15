const CACHE_NAME = "money-saver-pro-v1.1";


const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./css/style.css",
    "./manifest.json"
];


// Install
self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE_NAME)
        .then(cache => {

            console.log("Caching Money Saver Pro v1.1");

            return cache.addAll(FILES_TO_CACHE);

        })

    );

    self.skipWaiting();

});



// Activate
self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys()
        .then(keys => {

            return Promise.all(

                keys.map(key => {

                    if(key !== CACHE_NAME){

                        console.log("Deleting old cache:", key);

                        return caches.delete(key);

                    }

                })

            );

        })

    );

    self.clients.claim();

});



// Fetch
self.addEventListener("fetch", event => {


    event.respondWith(

        caches.match(event.request)

        .then(response => {


            if(response){

                return response;

            }


            return fetch(event.request)

            .catch(()=>{


                return caches.match("./index.html");


            });


        })

    );


});
