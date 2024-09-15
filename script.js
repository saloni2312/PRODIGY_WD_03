// Replace this API key with your actual OpenWeatherMap API key
const apiKey = '2d06c82809976ed7d6ad3d38b0148f26';

// Function to fetch and display the weather
function getWeather() {
    const location = document.getElementById('location').value;
    const units = document.getElementById('celsius').checked ? 'metric' : 'imperial';
    
    if (location === '') {
        alert('Please enter a city');
        return;
    }
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units}&appid=${apiKey}`;
    
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => displayWeather(data, units))
        .catch(error => {
            alert(error.message);
        });
}

// Function to display the weather data
function displayWeather(data, units) {
    const weatherResult = document.getElementById('weather-result');
    const tempUnit = units === 'metric' ? '°C' : '°F';
    const windSpeedUnit = units === 'metric' ? 'm/s' : 'mph';

    weatherResult.innerHTML = `
        <h2>Weather in ${data.name}</h2>
        <p class="weather-detail">Temperature: ${data.main.temp} ${tempUnit}</p>
        <p class="weather-detail">Feels Like: ${data.main.feels_like} ${tempUnit}</p>
        <p class="weather-detail">Humidity: ${data.main.humidity}%</p>
        <p class="weather-detail">Wind Speed: ${data.wind.speed} ${windSpeedUnit}</p>
        <p class="weather-detail">Description: ${data.weather[0].description}</p>
    `;
}

// Adding event listener for Enter key
document.getElementById('location').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        getWeather();
    }
});
