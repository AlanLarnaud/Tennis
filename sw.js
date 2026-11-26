const CACHE_NAME = 'tmt-pwa-v1';
const BASE = '/Tennis/';
const APP_SHELL = [
  BASE, BASE + 'index.html', BASE + 'equipes.html', BASE + 'actualites.html',
  BASE + 'club.html', BASE + 'galerie.html', BASE + 'inscriptions.html',
  BASE + 'contact.html', BASE + 'styles.css', BASE + 'app.js',
  BASE + 'manifest.webmanifest', BASE + 'assets/pwa-192.png', BASE + 'assets/pwa-512.png'
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;
  // The admin and live club data are always fetched from the network when online.
  if (url.pathname.startsWith(BASE + 'admin/') || url.pathname === BASE + 'data.json') {
    event.respondWith(fetch(request).catch(() => url.pathname === BASE + 'data.json' ? caches.match(request) : new Response('Cette page nécessite une connexion internet.', {status: 503, headers: {'Content-Type':'text/plain; charset=utf-8'}})));
    return;
  }
  if (!url.pathname.startsWith(BASE)) return;
  event.respondWith(caches.match(request).then(cached => cached || fetch(request).then(response => {
    if (response.ok) { const copy = response.clone(); caches.open(CACHE_NAME).then(cache => cache.put(request, copy)); }
    return response;
  }).catch(() => caches.match(BASE + 'index.html'))));
});
