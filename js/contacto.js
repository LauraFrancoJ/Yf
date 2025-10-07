let mapa = L.map('mapa').setView([39.52947, 2.50748], 16)
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mapa);
L.marker([39.52947, 2.50748]).addTo(mapa).bindPopup('Yf taller').openPopup()