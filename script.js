const API_KEY = "5f472cba648e816a7fb4f708bd69eaaf"; 
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const cityInput = document.getElementById("cityInput");
const searchButton = document.getElementById("searchButton");
const weatherInfo = document.getElementById("weatherInfo");

searchButton.addEventListener('click', handleSearch);
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
});

async function handleSearch() {
    const city = cityInput.ariaValueMax.trim();

    if (!city) {
        showError('Please enter a city name.');
        return;
    }
    await fetchWeatherData(city);
}

async function fetchWeatherData(city) {
    showLoading();

    try{
        const url = `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error(`City "${city}" not found. Please check spelling.`);
            } else {
                throw new Error(data.message || 'An error occurred');
            }
        }
        displayWeatherData(data);
    }
    catch (error) {
        showError(error.message);
    }
}

function displayWeatherData(data) {
    const cityName = data.name;
    const country = data.sys.country;
    const temp = Math.round(data.main.temp);
    const feelsLike = Math.round(data.main.feels_like);
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;


}

