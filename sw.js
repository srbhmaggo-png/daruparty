// Daru Party Service Worker v4
const CACHE = 'dp-v4';

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.add('/')));
  self.skipWaiting();
});

self.addEventListener('activate', e => e.waitUntil(clients.claim()));

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).catch(() => 
      new Response('App offline. Please reconnect.', {headers: {'Content-Type': 'text/plain'}})
    ))
  );
});

self.addEventListener('push', e => {
  const d = e.data?.json() || {title: 'Daru Party 🥃', body: 'New notification'};
  e.waitUntil(self.registration.showNotification(d.title, {
    body: d.body,
    icon: '/icon.png',
    badge: '/icon.png'
  }));
});
