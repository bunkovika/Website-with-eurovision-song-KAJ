/**
 * The name of the cache used by the service worker.
 * @type {string}
 */
const cacheName = 'v1';

/**
 * Array containing assets to be cached by the service worker.
 * @type {Array<string>}
 */
const cacheAssets = [
    'public/index.html',
    'src/components/app/App.js',
    'src/components/button/Button.js',
    'src/components/carousel/Carousel.js',
    'src/components/carousel/CarouselData.js',
    'src/components/form/AudioUpload.js',
    'src/components/form/CountrySelect.js',
    'src/components/form/Form.js',
    'src/components/form/ImageUpload.js',
    'src/components/header/Header.js',
    'src/indexedDB/IndexedDB.js',

    'src/components/app/App.css',
    'src/components/button/Button.css',
    'src/components/carousel/Carousel.css',
    'src/components/form/Form.css',
    'src/components/header/Header.css',
    'src/index.css'
];

/**
 * Event listener for the 'install' event, triggered when the service worker is installed.
 * Caches the specified assets for offline use.
 * @param {Event} e - The install event.
 */
// eslint-disable-next-line no-restricted-globals
self.addEventListener('install', e => {
    console.log('Service Worker: Installed');

    e.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
                // console.log('Service Worker: Caching Files');
                cache.addAll(cacheAssets);
            })
            // eslint-disable-next-line no-restricted-globals
            .then(() => self.skipWaiting())
    );
});

/**
 * Event listener for the 'activate' event, triggered when the service worker becomes active.
 * Deletes outdated caches to ensure the service worker uses the latest version.
 * @param {Event} e - The activate event.
 */
// eslint-disable-next-line no-restricted-globals
self.addEventListener('activate', e => {
    // console.log('Service Worker: Activated');

    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        // console.log('Service Worker: Clearing Old Caches');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

/**
 * Event listener for the 'fetch' event, triggered when the browser fetches resources.
 * Responds to fetch requests by serving cached resources or fetching from the network.
 * @param {FetchEvent} e - The fetch event.
 */
// eslint-disable-next-line no-restricted-globals
self.addEventListener('fetch', e => {
    // console.log('Service Worker: Fetching');
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
