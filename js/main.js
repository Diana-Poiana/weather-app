
import { apiKey } from './config.js';
import { apiRequestAddress } from './config.js';

const preloader = document.querySelector('.card__preloader');
const cardWidget = document.querySelector('.card__widget');

const button = document.getElementById('button');
const input = document.getElementById('input');
const noPermission = document.getElementById('access-denied');

// asking permission

navigator.permissions.query({ name: 'geolocation' })
  .then(permissionStatus => {
    console.log(permissionStatus.state);
    if (permissionStatus.state === 'granted') {
      localStorage.setItem('geoPermission', 'granted');
      getWeatherByGeolocation();
    } else if (permissionStatus.state === 'prompt') {
      localStorage.setItem('geoPermission', 'granted');
      getWeatherByGeolocation();
    } else if (permissionStatus.state === 'denied') {
      cardWidget.style.display = 'none';
      preloader.style.display = 'none';
      noPermission.style.display = 'block';
    }
  })
  .catch(error => console.error('Permission query error:', error));



// update HTML document

function updateWeatherContent(data) {
  const temperature = data.main.temp;
  const weatherDescription = data.weather[0].description;
  const iconCode = data.weather[0].icon;
  const weatherIconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
  const humidity = data.main.humidity;
  const windSpeed = data.wind.speed;

  const locationElement = document.getElementById('location');
  locationElement.innerText = data.name;

  const temperatureElement = document.getElementById('temperature');
  temperatureElement.innerText = `${Math.round(temperature) - 273}°C`;

  const weatherDescriptionElement = document.getElementById('weather-description');
  weatherDescriptionElement.innerText = weatherDescription;

  const humidityElement = document.getElementById('humidity');
  humidityElement.innerText = `${humidity}%`;

  const windElement = document.getElementById('wind-speed');
  windElement.innerText = `${windSpeed} km/hr`;

  const weatherIconElement = document.getElementById('weather-icon');
  weatherIconElement.setAttribute('src', weatherIconUrl);
}

function errorDetection(error) {
  console.error(error);
}

// get info from api functions

function getWeatherInfoByGeolocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  fetch(`${apiRequestAddress}?lat=${lat}&lon=${lon}&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => updateWeatherContent(data))
    .then(loaderHider)
    .catch(error => console.error(error));
}

function getWeatherByLocation(locationRequest) {
  fetch(`${apiRequestAddress}?q=${locationRequest}&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => updateWeatherContent(data))
    .catch(error => console.error(error));
}

function getWeatherByGeolocation() {
  navigator.geolocation.getCurrentPosition(getWeatherInfoByGeolocation, errorDetection);
}

// hide loading div

function loaderHider() {
  preloader.style.display = 'none';
  cardWidget.style.display = 'block';
}

// event listeners

button.addEventListener('click', (event) => {
  event.preventDefault();
  const locationRequest = input.value;
  if (locationRequest) {
    getWeatherByLocation(locationRequest);
    input.value = '';
  }
});

input.addEventListener('keyup', (event) => {
  event.preventDefault();
  if (event.key === 'Enter') {
    button.click();
  }
});



