window.addEventListener('DOMContentLoaded', function () {
  const preloader = document.querySelector('.card__preloader');
  const cardWidget = document.querySelector('.card__widget');

  preloader.style.display = 'none';
  cardWidget.style.display = 'block';
});

// modal window

const modalWindow = document.getElementById('modal');
const allowLocationBtn = document.getElementById('allowed');
const denyLocationBtn = document.getElementById('denied');
const cardInfo = document.getElementById('card-info');
const accessDenied = document.getElementById('access-denied');

// window.onload = openModalWindow;

// function openModalWindow() {
//   modalWindow.style.display = 'block';
// }

// if access denied

// denyLocationBtn.onclick = function () {
//   modalWindow.style.display = 'none';
//   cardInfo.style.display = 'none';
//   accessDenied.style.display = 'block';
// };

// if access allowed, take user geo position, close modal window

const apiKey = 'f990b6370ad73721dfde441e1c3c5700';

allowLocationBtn.onclick = function app() {

  modalWindow.style.display = 'none';

  function showWeather(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
      .then(response => response.json())
      .then(data => {
        const temperature = data.main.temp;
        const weatherDescription = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const weatherIconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;
        const location = data.name;

        // for HTML

        const locationElement = document.getElementById('location');
        locationElement.innerText = location;

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
      })
      .catch(error => console.error(error));
  }
  navigator.geolocation.getCurrentPosition(showWeather, error);
};

// location entered manually, press enter on keyboard

const input = document.getElementById('input');

input.addEventListener('keyup', function (event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    button.click();
    input.value = '';
  }
});

// main function

const button = document.getElementById('button');

button.onclick = function () {
  const locationRequest = document.getElementById('input').value;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${locationRequest}&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      const temperature = data.main.temp;
      const weatherDescription = data.weather[0].description;
      const iconCode = data.weather[0].icon;
      const weatherIconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
      const humidity = data.main.humidity;
      const windSpeed = data.wind.speed;
      const location = locationRequest;

      // for HTML

      const locationElement = document.getElementById('location');
      locationElement.innerText = location;

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
    })
    .catch(error => console.error(error));

  input.value = '';
};

function error(error) {
  console.log(error);
}