const API_KEY = "YOUR_API_KEY_HERE"; 
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

}