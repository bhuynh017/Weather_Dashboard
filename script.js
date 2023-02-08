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
dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);

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
