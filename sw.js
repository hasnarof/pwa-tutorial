const staticCacheName = 'site-static-v2';
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

  /*
    tentang function arrow, 
    self.addEventListener('install', evt => {})
      jadi ini artinya ada fungsi yang dipanggil (callback) dengan argumen evt, untuk dipakai di fungsi di dalam {}

      jika terdengar install, maka callback .... fungsi tanpa nama itu dengan argumen evt
  */

// install event
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

  /*
    nah jadi di sini kita mau bikin cache baru, liat nama staticCacheName nya jadi versi dua. nah pas diinstall dan di activate itu
    bakal ada dua cache nanti yg terdaftar. jadi kalau misal kita mau ambil index.html di cache v2 malah keambil di cache pertama.
    jadi caranya adalah menghapus semua cache yang bukan nama cache sekarang.
    
    
  */
self.addEventListener('activate', evt => {
  //console.log('service worker activated');
  evt.waitUntil(  // promise akan menyelesaikan semuanya sebelum fungsi evt => selesai
    caches.keys().then(keys => { // caches.keys() mendapatkan semua nama cache, jika berhasil maka callback fungsi lagi dgn argumen keys
      //console.log(keys);
      return Promise.all(keys // promise semua key akan di filter
        .filter(key => key !== staticCacheName) // fungsi callback lagi, return true untuk key != staticCacheName
        .map(key => caches.delete(key)) // hasil filteran akan dimap, dihapus key yang dalam filteran.
      );
    })
  );
});

// fetch event
self.addEventListener('fetch', evt => {
  //console.log('fetch event', evt);
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request);
    })
  );
});