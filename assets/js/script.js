const apiKey = '8cf59100d539bf9363c2f7f6beb01c19';
const newsApiKey ='5e2366fdaaed4cd8a56f4864df96e366'
const newsApiUrl = "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=8aaac5d710ff7de69478231a29c8c791"

const WapiKey = 'e6e9cf82d2a043fa9be232847230905';
const locationEl = document.querySelector('.location');
const temperatureEl = document.querySelector('.temperature');
const conditionEl = document.querySelector('.condition');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

function getWeatherData(location) {
    fetch(`https://api.weatherapi.com/v1/current.json?key=${WapiKey}&q=${location}`)
        .then(response => response.json())
        .then(data => {
            updateWeatherInfo(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

function updateWeatherInfo(data) {
    locationEl.textContent = `Location: ${data.location.name}, ${data.location.country}`;
    temperatureEl.textContent = `Temperature: ${data.current.temp_f}°F`;
    conditionEl.textContent = `Condition: ${data.current.condition.text}`;

    // Create an img element and set its source to the weather icon URL
    const weatherIcon = document.createElement('img');
    weatherIcon.src = `https:${data.current.condition.icon}`;

    // Append the icon to the condition element
    conditionEl.appendChild(weatherIcon);
}

// Set default location
getWeatherData('New York');

// Handle search button click
searchButton.addEventListener('click', () => {
    const location = searchInput.value;
    if (location) {
        getWeatherData(location);
        searchInput.value = '';
    }
});

// Handle enter key press in search input
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const location = searchInput.value;
        if (location) {
            getWeatherData(location);
            searchInput.value = '';
        }
    }
});
