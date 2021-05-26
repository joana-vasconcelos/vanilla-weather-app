function showWeatherConditions(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#temperature").innerHTML =
    Math.round(celsiusTemperature);
  maxTemperature = response.data.main.temp_max;
  document.querySelector("#max-current-temp").innerHTML = `<strong>${Math.round(
    maxTemperature
  )} </strong>`;
  minTemperature = response.data.main.temp_min;
  document.querySelector("#min-current-temp").innerHTML =
    Math.round(minTemperature);
  document.querySelector("#country").innerHTML = response.data.sys.country;
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed * (18 / 5)
  );
  document.querySelector("#current-sky").innerHTML =
    response.data.weather[0].description;

  let iconElement = document.querySelector("#weather-icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function searchCity(city) {
  let units = "metric";
  let apiKey = "0d9bd7b9270c9eee20fc452755853c0d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeatherConditions);
}

function submitCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
   fahrenheit.classList.remove("active");
   celsius.classList.add("active");
  searchCity(city);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
   fahrenheit.classList.remove("active");
   celsius.classList.add("active");
  let units = "metric";
  let apiKey = "0d9bd7b9270c9eee20fc452755853c0d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeatherConditions);
}

function changeToCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

searchCity("Lisbon");

let searchForm = document.querySelector("#search-city-form");
searchForm.addEventListener("submit", submitCity);

let currentLocation = document.querySelector("#location-pin");
currentLocation.addEventListener("click", changeToCurrentLocation);

function showDate(date) {
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let weekDay = weekDays[currentDate.getDay()];
  let day = currentDate.getDate();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[currentDate.getMonth()];

  return `${weekDay}  ${day}  ${month}`;
}

let currentDate = new Date();
let dayMonth = document.querySelector("#day-month");
dayMonth.innerHTML = showDate(currentDate);

function showTime(time) {
  let hours = currentDate.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}h${minutes}`;
}

let hourMinutes = document.querySelector("#hour-minute");
hourMinutes.innerHTML = showTime(currentDate);

// Temperature conversions

function changeToFahrenheit(event) {
  event.preventDefault();
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let temperature = document.querySelector("#temperature");
  let fahrenheitTemperature = celsiusTemperature * (9 / 5) + 32;
  let minFahrenheit = minTemperature * (9 / 5) + 32;
  temperature.innerHTML = Math.round(fahrenheitTemperature);
  document.querySelector("#min-current-temp").innerHTML =
    Math.round(minFahrenheit);
  let maxFahrenheit = maxTemperature * (9 / 5) + 32;
  document.querySelector("#max-current-temp").innerHTML = `<strong>${Math.round(
    maxFahrenheit
  )} </strong>`;
}

function changeToCelsius(event) {
  event.preventDefault();
  fahrenheit.classList.remove("active");
  celsius.classList.add("active");
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(celsiusTemperature);
  document.querySelector("#min-current-temp").innerHTML =
    Math.round(minTemperature);
  document.querySelector("#max-current-temp").innerHTML = `<strong>${Math.round(
    maxTemperature
  )} </strong>`;
}

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", changeToFahrenheit);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", changeToCelsius);

let celsiusTemperature = null;
let maxTemperature = null;
let minTemperature = null;
