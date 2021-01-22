const staticCacheName = 'site-static';
const assets = [
  '/',
  '/index.html',
  '/js/app.js',
  '/js/ui.js',
  '/js/materialize.min.js',
  '/css/styles.css',
  '/css/materialize.min.css',
  '/img/dish.png',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://fonts.gstatic.com/s/materialicons/v47/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2'
];

        /* #3 Life Cycle Service Worker
        di install dulu, tiap sw berubah maka install akan ter fire / ter ignite
        lalu ada antriannya untuk activate ( di google dev tools), jadi yg lama masih dipakai, yg baru silakan kita activate
        jadi deh
        */ 

// install event

        /* #2
        jika kita mau merubah sw, saat kita change dan save, install ini akan terpanggil. jadi misal kalau kita mau nambah precaching,
        kita harus online dulu, refresh, udah deh (karena otomatis terinstall, dia mendeteksi ada perubahan sw)
        */ 
self.addEventListener('install', evt => {
  //console.log('service worker installed');
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log('caching shell assets');
      cache.addAll(assets);
    })
  );
});

// activate event
self.addEventListener('activate', evt => {
  //console.log('service worker activated');
});

// fetch event

        /* #1
        jadi di sini itu saat nge mendengar fetch, event diisi dengan (merespon dengan) mengecek jika ada request yang match dengan
        pre caching nya, jika ada return cacheRes (ini isinya udah merupakan isi dari request cache (misal request index, isi nya adalah sc index.html)).
        jika belum ada di precaching, maka akan nge fetch request biasa.

        kemudian lihat ke install
        */ 
self.addEventListener('fetch', evt => {
  //console.log('fetch event', evt);
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request);
    })
  );
});