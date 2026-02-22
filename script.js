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
    
}