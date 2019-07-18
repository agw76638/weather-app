const geo = document.querySelector(".geo");
const weather = document.querySelector(".weather");
const details = document.querySelector(".details");
const forecast = document.querySelector(".forecast")
const API_KEY = "2b8bb66d654f93c0cbd587f06c5b6a04";
const COORDS = "coords";

function getWeather(lat, lng) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function (response) {
        return response.json();
    })
        .then(function (json) {
            const temperature = json.main.temp;
            const place = json.name;
            const country = json.sys.country;
            const icon = json.weather[0].icon;
            const humidity = json.main.humidity
            const wind = json.wind.speed
            const image = new Image();
            image.src = `http://openweathermap.org/img/wn/${icon}@2x.png`
            geo.innerText = `${place}, ${country}`;
            weather.innerText = `${temperature}°C`;
            weather.prepend(image);
            details.innerText = `💧${humidity}% 💨${wind}m/s`
        });
}

function getWeatherForecast(lat, lng) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function (response) {
        return response.json();
    })
        .then(function (json) {
            console.log(json);
        });
}

function getWeatherMap() {

}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSocces(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
    getWeatherForecast(latitude, longitude);
}

function handleGeoError() {
    weather.innerText = "error"
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSocces, handleGeoError)
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