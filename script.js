const apiKey = "bde8adf807e23cb5d5e1574a593da73b"; // OpenWeatherMap API anahtarınız

// Haritayı oluştur
const map = L.map('map').setView([39.92, 32.85], 3); // Başlangıçta Ankara'yı göster (Dünya genelinde zoom out)

// OpenStreetMap katmanını ekle
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Tıklanan konumun hava durumu bilgisini al
map.on('click', function(e) {
    const lat = e.latlng.lat.toFixed(2);
    const lon = e.latlng.lng.toFixed(2);

    // Önceki işaretçiyi temizle
    map.eachLayer(layer => {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });

    // Yeni işaretçi ekle
    const marker = L.marker([lat, lon]).addTo(map)
        .bindPopup("Seçilen Konum")
        .openPopup();

    // Hava durumu verilerini al
    getWeather(lat, lon);
});

// Hava durumu verisini al
function getWeather(lat, lon) {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=metric&lang=tr&appid=${apiKey}`;

    fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
            if (!data || !data.daily) {
                alert("Hava durumu verisi alınamadı!");
                return;
            }

            let weatherInfo = `<h3>Seçilen Konum: ${lat}, ${lon}</h3>`;

            // Günlük hava durumu bilgilerini döngü ile ekleyin
            data.daily.forEach((day, index) => {
                const date = new Date(day.dt * 1000);
                const dayName = new Intl.DateTimeFormat("tr-TR", { weekday: "long" }).format(date);

                weatherInfo += `
                    <div class="day">
                        <h4>${dayName}</h4>
                        <p>🌡 En: ${day.temp.max}°C / Düşük: ${day.temp.min}°C</p>
                        <p>☁️ ${day.weather[0].description}</p>
                        <p>💨 Rüzgar: ${day.wind_speed} m/s</p>
                        <p>💧 Nem: ${day.humidity}%</p>
                    </div>
                `;
            });

            // Hava durumu bilgilerini ekrana yazdır
            document.getElementById("weatherInfo").innerHTML = weatherInfo;
        })
        .catch(error => {
            console.error("Hata:", error);
            alert("Hava durumu verisi alınırken bir hata oluştu.");
        });
}
