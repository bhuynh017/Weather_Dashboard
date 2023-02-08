// API Variables
var searchHistory = [];
var weatherApiRootUrl = "https://api.openweathermap.org";
var weatherApiKey = "214951dee37be14146c17c73e1722fbc";

// DOM references
var searchForm = document.querySelector("#search-form");
var cityInput = document.querySelector("#city-input");
var currentContainer = document.querySelector("#current");
var forecastContainer = document.querySelector("#forecast");
var HistoryContainer = document.querySelector("#history");

// Timezone
// dayjs.extend(window.dayjs_plugin_utc);
// dayjs.extend(window.dayjs_plugin_timezone);

function renderSearchHistory() {
  HistoryContainer.innerHTML = "";

  for (var i = searchHistory.length - 1; i >= 0; i--) {
    var btn = document.createElement("button");
    btn.setAttribute("type", "button");
    btn.setAttribute("aria-controls", "current forecast");
    btn.classList.add("history-btn", "btn-history");

    btn.setAttribute("data-search", searchHistory[i]);
    btn.textContent = searchHistory[i];
    searchHistoryContainer.append(btn);
  }
}
function appendToHistory(search) {
  if (searchHistory.indexOf(search) !== -1) {
    return;
  }
  searchHistory.push(search);

  localStorage.setItem("search-history", JSON.stringify(searchHistory));
  renderSearchHistory();
}

function initSearchHistory() {
  var storedHistory = localStorage.getItem("search-history");
  if (storedHistory) {
    searchHistory = JSON.parse(storedHistory);
  }
  renderSearchHistory();
}

// displaying the current weather from the data that comes from the api.
function todaysWeather(city, weather, timezone) {
    var date = dayjs().tz(timezone).format('M/D/YYYY');

    var currentTemp = weather.temp;
    var currentWind = weather.wind_speed;
    var currentHumidity = weather.humidity;
    var currentUVI = weather.uvi;
    var iconUrl = `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`;
    var icons = weather.weather[0].description || weather[0].main;

    var card = document.createElement('div');
    var cardBody = document.createElement('div');
    var heading = document.createElement('h2');

    var todayIcon = document.createElement('img');
    var weatherEl = document.createElement('p');
    var windSpeed = document.createElement('p');
    var humidityEl = document.createElement('p');
    var todayUVI = document.createElement('p');
    var uviBadge = document.createElement('button');

    card.setAttribute('class', 'card');
    cardBody.setAttribute('class', 'card-body');
    card.append(cardBody);

    heading.setAttribute('class', 'h3 card-title');
    weatherEl.setAttribute('class', 'card-text');
    windSpeed.setAttribute('class', 'card-text');
    humidityEl.setAttribute('class', 'card-text');

    heading.textContent = `${city} (${date})`;
    todayIcon.setAttribute('src', iconUrl);
    todayIcon.setAttribute('alt', iconDescription);
    todayIcon.setAttribute('class', 'weather-img');
    heading.append(weatherIcon);
    weatherEl.textContent = `Temp: ${tempF}°F`;
    windSpeed.textContent = `Wind: ${windMph} MPH`;
    humidityEl.textContent = `Humidity: ${humidity} %`;
    cardBody.append(heading, weatherEl, windSpeed, humidityEl);

    todayUVI.textContent = 'UV Index: ';
    uviBadge.classList.add('btn', 'btn-sm');

    if (currentUVI < 3) {
        uviBadge.classList.add('btn-success');
      } else if (uvi < 7) {
        uviBadge.classList.add('btn-warning');
      } else {
        uviBadge.classList.add('btn-danger');
      }

      uviBadge.textContent = uvi;
      currentUVI.append(uviBadge);
      cardBody.append(uvEl);
    
      currentContainer.innerHTML = '';
      currentContainer.append(card);
    };

    function renderForecastCard(forecast, timezone) {
        var unixTs = forecast.dt;
        var iconUrl = `https://openweathermap.org/img/w/${forecast.weather[0].icon}.png`;
        var iconDescript = forecast.weather[0].description;
        var temperatureForcast = forecast.temp.day;
        var { humidity } = forecast;
        var windForcast = forecast.wind_speed;

        var col = document.createElement('div');
        var card = document.createElement('div');
        var cardBody = document.createElement('div');
        var cardTitle = document.createElement('h5');
        var weatherIcon = document.createElement('img');
        var tempElement = document.createElement('p');
        var windElement = document.createElement('p');
        var humidElement = document.createElement('p');

        col.append(card);
        card.append(cardBody);
        cardBody.append(cardTitle, weatherIcon, tempElement, windElement, humidElement);