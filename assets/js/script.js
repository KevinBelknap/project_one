const apiKey = '8cf59100d539bf9363c2f7f6beb01c19';
const gNewsApiKey = 'b31a28696095a791c50b6b1eced1680e';
const gNewsApiUrl = `https://gnews.io/api/v4/top-headlines?token=${gNewsApiKey}&lang=en`;

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


function getNewsData() {
    fetch(gNewsApiUrl)
        .then(response => response.json())
        .then(data => {
            updateNewsInfo(data.articles);
        })
        .catch(error => {
            console.error('Error fetching news data:', error);
        });
}
function updateNewsInfo(articles) {
    // Check if there are at least 3 articles
    if (articles.length < 3) {
        console.error('Not enough articles');
        return;
    }
    // Populate main article
    populateArticle(articles[0], 'main-article');
    // Populate secondary articles
    populateArticle(articles[1], 'secondary-articles');
    populateArticle(articles[2], 'secondary-articles');
}
function populateArticle(article, elementId) {
    // Create article content
    const title = document.createElement('h3');
    title.textContent = article.title;
    const description = document.createElement('p');
    description.textContent = article.description;
    const link = document.createElement('a');
    link.href = article.url;
    link.textContent = 'Read more...';
    const image = document.createElement('img');
    image.src = article.image;
    // Clear existing content
    const element = document.getElementById(elementId);
    element.innerHTML = '';
    // Append new content
    element.appendChild(image);
    element.appendChild(title);
    element.appendChild(description);
    element.appendChild(link);
}
// Fetch the news data when the page loads
getNewsData();

function updateBreakingNews(articles) {
    const breakingNewsDivs = document.querySelectorAll('.row.small-up-3.medium-up-4.large-up-5 .column');
    
    for (let i = 0; i < breakingNewsDivs.length; i++) {
      if (articles[i]) {
        const imgElement = breakingNewsDivs[i].querySelector('img');
        const linkElement = breakingNewsDivs[i].querySelector('.article-link');
        
        imgElement.src = articles[i].image;
        imgElement.alt = articles[i].title;
        
        linkElement.href = articles[i].url;
      }
    }
  }
  
  function getBreakingNewsData() {
    fetch(gNewsApiUrl)
      .then(response => response.json())
      .then(data => {
        updateBreakingNews(data.articles);
      })
      .catch(error => {
        console.error('Error fetching news data:', error);
      });
  }
  
  getBreakingNewsData();