
var cacheStorageKey = 'minimal-pwa-1'
var cacheList=[
  '/0114-PWA-project/index.html',
  '/0114-PWA-project/main.css'
]
self.addEventListener('install',e =>{
  e.waitUntil(
    caches.open(cacheStorageKey)
    .then(cache => cache.addAll(cacheList))
    .then(() => self.skipWaiting())
  )
})
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function(response){
            if(response){
                return response;
            }
            var requestToCache = event.request.clone();
            return fetch(requestToCache).then(
              function(response){
                if(!response || response.status !== 200){
                  return response;
                }
                var responseToCache = response.clone();
                caches.open(cacheStorageKey)
                  .then(function(cache){
                    cache.put(requestToCache, responseToCache);
                  });
                return response;
              }
            );
        })
    );
});
