const geo = document.querySelector(".geo");
const weather = document.querySelector(".weather");
const details = document.querySelector(".details");
const forecast1 = document.querySelector(".forecast-1");
const forecast2 = document.querySelector(".forecast-2");
const forecast3 = document.querySelector(".forecast-3");
const forecast4 = document.querySelector(".forecast-4");
const forecast5 = document.querySelector(".forecast-5");
const map = document.querySelector(".map");
const API_KEY = "2b8bb66d654f93c0cbd587f06c5b6a04";
const COORDS = "coords";

function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      const temperature = json.main.temp;
      const place = json.name;
      const country = json.sys.country;
      const icon = json.weather[0].icon;
      const humidity = json.main.humidity;
      const wind = json.wind.speed;
      geo.innerText = `${place}, ${country}`;
      weather.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}@2x.png"> <i class="fas fa-temperature-low"></i>${temperature}°C`;
      details.innerHTML = `💧${humidity}% <i class="fas fa-wind"></i>${wind}m/s`;
    });
}

function getWeatherForecast(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      forecast1.innerHTML = `${json.list[3].dt_txt} ${
        json.list[3].main.temp
      }°C ${json.list[3].weather[0].description}`;
      forecast2.innerHTML = `${json.list[4].dt_txt} ${
        json.list[4].main.temp
      }°C ${json.list[4].weather[0].description}`;
      forecast3.innerHTML = `${json.list[5].dt_txt} ${
        json.list[5].main.temp
      }°C ${json.list[5].weather[0].description}`;
      forecast4.innerHTML = `${json.list[6].dt_txt} ${
        json.list[6].main.temp
      }°C ${json.list[6].weather[0].description}`;
      forecast5.innerHTML = `${json.list[7].dt_txt} ${
        json.list[7].main.temp
      }°C ${json.list[7].weather[0].description}`;
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSocces(position) {
  console.log(position);
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
  getWeatherForecast(latitude, longitude);
  getWeatherMap(latitude, longitude);
}

function handleGeoError() {
  weather.innerText = "error";
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSocces, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
    getWeatherForecast(parsedCoords.latitude, parsedCoords.longitude);
  }
}
function init() {
  loadCoords();
}

init();
