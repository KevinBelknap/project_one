const apiKey = '8cf59100d539bf9363c2f7f6beb01c19';
const newsApiKey ='8aaac5d710ff7de69478231a29c8c791'
const newsApiUrl = "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=8aaac5d710ff7de69478231a29c8c791"
const apiUrl = `http://api.mediastack.com/v1/news?access_key=8aaac5d710ff7de69478231a29c8c791$&languages=en`;

const WapiKey = '3281a39a9dd34bdcb0704239230905';
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
  temperatureEl.textContent = `Temperature: ${data.current.temp_c}°C`;
  conditionEl.textContent = `Condition: ${data.current.condition.text}`;
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
  fetch(newsApiKey)
    .then(response => response.json())
    .then
     console.log(data);
}

const commentForm = document.getElementById("comment-form");
const commentInput = document.getElementById("comment");
const nameInput = document.getElementById("name");
const commentsDiv = document.getElementById("comments");

commentForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Create a new comment div
  const newCommentDiv = document.createElement("div");
  newCommentDiv.classList.add("comment");

  // Add the name and comment text to the div
  const name = nameInput.value.trim();
  const comment = commentInput.value.trim();
  newCommentDiv.innerHTML = `
    <h4>${name}</h4>
    <p>${comment}</p>
  `;

  // Append the new comment div to the comments container
  commentsDiv.appendChild(newCommentDiv);

  // Clear the form inputs
  nameInput.value = "";
  commentInput.value = "";
});
