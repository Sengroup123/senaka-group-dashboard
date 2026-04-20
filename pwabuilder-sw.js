// ✅ Network First - සැමවිටම fresh data!
self.addEventListener('fetch', (event) => {
  
  // Google Sheets requests - NEVER cache කරන්න
  if (event.request.url.includes('docs.google.com') || 
      event.request.url.includes('sheets.googleapis.com')) {
    event.respondWith(
      fetch(event.request)
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // අනිත් files - Network first
  event.respondWith(
    fetch(event.request)
      .then(response => {
        let responseClone = response.clone();
        caches.open('v1').then(cache => {
          cache.put(event.request, responseClone);
        });
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
