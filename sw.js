self.addEventListener("install", function (e) {
    e.waitUntil(
        caches.open("pwa-coder").then(function (cache) {
            cache.addAll(["/", "/index.html", "/css/style.css"]);
        })
    );
});

// estrategia de cache
self.addEventListener("fetch", function (e) {
    e.respondWith(
        caches.match(e.request).then(function (res) {
            if (res) {
                return res;
            } else {
                return fetch(e.request);
            }
        })
    );
});
