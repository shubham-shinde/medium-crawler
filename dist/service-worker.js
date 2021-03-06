importScripts("/precache-manifest.41ddc7ca4828e0830dd9b774b0f3a476.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");


// workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest)

self.addEventListener('fetch', function (event) {
  console.log('fetch', event.request)

  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        // Cache hit - return response
        if (response) {
          return response
        }
        return fetch(event.request)
      }
      )
  )
})

const dataCacheConfig = {
  cacheName: 'data-data'
}

new workbox.routing.NavigationRoute(new workbox.strategies.CacheFirst())

workbox.routing.registerNavigationRoute(workbox.precaching.getCacheKeyForURL('/index.html'))

