const apiKey = "bde8adf807e23cb5d5e1574a593da73b"; // Buraya kendi API anahtarını koy

function getWeather() {
    const city = document.getElementById("city").value;
    if (city === "") {
        alert("Lütfen bir şehir adı girin.");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=tr&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                const weatherInfo = `
                    <h3>${data.name}, ${data.sys.country}</h3>
                    <p>🌡 Sıcaklık: ${data.main.temp}°C</p>
                    <p>☁️ Hava Durumu: ${data.weather[0].description}</p>
                    <p>💨 Rüzgar: ${data.wind.speed} m/s</p>
                    <p>💧 Nem: ${data.main.humidity}%</p>
                `;
                document.getElementById("weatherInfo").innerHTML = weatherInfo;
            } else {
                alert("Şehir bulunamadı! Lütfen doğru yazdığınızdan emin olun.");
            }
        })
        .catch(error => console.log("Hata:", error));
}
