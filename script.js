// API Variables
var searchHistory = [];
var weatherApiRootUrl = 'https://api.openweathermap.org';
var weatherApiKey = '214951dee37be14146c17c73e1722fbc';

// DOM references
var searchForm = document.querySelector('#search-form');
var cityInput = document.querySelector('#city-input');
var currentContainer = document.querySelector('#current');
var forecastContainer = document.querySelector('#forecast');
var HistoryContainer = document.querySelector('#history');

// Timezone
dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);