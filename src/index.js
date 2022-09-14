function currentDayTime() {
  let now = new Date().toLocaleDateString("en-us", {
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  let seeDayTime = document.querySelector("#daytime");
  seeDayTime.textContent = now;
}

function getWeatherFuture(coordinates) {
  let units = "metric";
  //key for future 5 days weather
  //let apiKey = "562f5cd9cac04a0ceac338ac4e531d8c";
  let apiKey = "bc2cd97eaa209e7d22d8f3c84081655f";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/onecall";
  let apiUrl = `${apiEndPoint}?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(currFutureTemperature);
}

currentDayTime();
function showEnterCity(response) {
  console.log(response);

  let h1 = document.querySelector("#current-city");
  if (response.data.sys.country === "UA") {
    h1.innerHTML = `${response.data.name} - glory to Ukraine!`;
  } else {
    h1.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  }

  let weatherConditions = document.querySelector("#weather-conditions");
  weatherConditions.innerHTML = response.data.weather[0].description;

  let mainIc = response.data.weather[0].icon;
  linkWeath = `https://openweathermap.org/img/wn/${mainIc}@2x.png`;
  let mainWeatherIcon = document.querySelector("#main-weather-icon");
  mainWeatherIcon.setAttribute("src", linkWeath);

  let sunrise = new Date(response.data.sys.sunrise * 1000).toLocaleTimeString(
    "en-us",
    {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }
  );
  let sunriseTimeShow = document.querySelector("#sunrise");
  sunriseTimeShow.innerHTML = `Sunrise at: ${sunrise}`;

  let sunset = new Date(response.data.sys.sunset * 1000).toLocaleTimeString(
    "en-us",
    {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }
  );
  let sunsetTimeShow = document.querySelector("#sunset");
  sunsetTimeShow.innerHTML = `Sunset at: ${sunset}`;

  let curTemperature = document.querySelector("#temperature");
  curTemperature.innerHTML = Math.round(response.data.main.temp);
  let c = document.querySelector("#celsius");
  c.innerHTML = "°C";
  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind: ${response.data.wind.speed} km/h`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  let feelTemp = document.querySelector("#feelTemp");
  feelTemp.innerHTML = `Feels like: ${Math.round(
    response.data.main.feels_like
  )}°`;

  // let faringLink = document.querySelector("#faringates");
  // faringLink.addEventListener("click", function () {
  //  celsLink.classList.remove("active");
  //  faringLink.classList.add("active");
  //  let curTemperature = document.querySelector("#temperature");
  //  curTemperature.innerHTML = Math.round(
  //   response.data.main.temp * (9 / 5) + 32
  //  );
  // });
  //let celsLink = document.querySelector("#celsius");
  //celsLink.addEventListener("click", function () {
  //  faringLink.classList.remove("active");
  // celsLink.classList.add("active");
  // let curTemperature = document.querySelector("#temperature");
  // curTemperature.innerHTML = Math.round(response.data.main.temp);
  // });
  getWeatherFuture(response.data.coord);
}

function search(event) {
  event.preventDefault();
  let input = document.querySelector("#input-type-city");
  let city = input.value;
  let units = "metric";
  let apiKey = "8f8d5f703465caae3978b75cf8f80c67";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
  let url = `${apiEndPoint}?q=${city}&units=${units}&appid=${apiKey}`;
  //let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  console.log(url);
  axios.get(url).then(showEnterCity);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

//block of where I am

function showCurTempOnClick(response) {
  console.log(response);
  let h1 = document.querySelector("#current-city");
  if (response.data.sys.country === "UA") {
    h1.innerHTML = `${response.data.name} - glory to Ukraine!`;
  } else {
    h1.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  }

  let weatherConditions = document.querySelector("#weather-conditions");
  weatherConditions.innerHTML = response.data.weather[0].description;
  let curTemperature = document.querySelector("#temperature");
  curTemperature.innerHTML = Math.round(response.data.main.temp);
  let c = document.querySelector("#celsius");
  c.innerHTML = "°C";

  let sunrise = new Date(response.data.sys.sunrise * 1000).toLocaleTimeString(
    "en-us",
    {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }
  );
  let sunriseTimeShow = document.querySelector("#sunrise");
  sunriseTimeShow.innerHTML = `Sunrise at: ${sunrise}`;

  let sunset = new Date(response.data.sys.sunset * 1000).toLocaleTimeString(
    "en-us",
    {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }
  );
  let sunsetTimeShow = document.querySelector("#sunset");
  sunsetTimeShow.innerHTML = `Sunset at: ${sunset}`;

  let mainIc = response.data.weather[0].icon;
  linkWeath = `https://openweathermap.org/img/wn/${mainIc}@2x.png`;
  let mainWeatherIcon = document.querySelector("#main-weather-icon");
  mainWeatherIcon.setAttribute("src", linkWeath);

  wind.innerHTML = `Wind: ${response.data.wind.speed} km/h`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  let feelTemp = document.querySelector("#feelTemp");
  feelTemp.innerHTML = `Feels like: ${Math.round(
    response.data.main.feels_like
  )}°`;

  // let faringLink = document.querySelector("#faringates");
  // faringLink.addEventListener("click", function () {
  //  celsLink.classList.remove("active");
  //  faringLink.classList.add("active");
  //  let curTemperature = document.querySelector("#temperature");
  // curTemperature.innerHTML = Math.round(
  //   response.data.main.temp * (9 / 5) + 32
  //  );
  // });
  //let celsLink = document.querySelector("#celsius");
  //celsLink.addEventListener("click", function () {
  //faringLink.classList.remove("active");
  // celsLink.classList.add("active");
  // let curTemperature = document.querySelector("#temperature");
  // curTemperature.innerHTML = Math.round(response.data.main.temp);
  // });
  getWeatherFuture(response.data.coord);
}

function showPosition(position) {
  console.log(position);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "8f8d5f703465caae3978b75cf8f80c67";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
  let url = `${apiEndPoint}?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;

  console.log(url);

  axios.get(url).then(showCurTempOnClick);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
getCurrentPosition();

//5 days temperature start
function currFutureTemperature(response) {
  console.log(response);
  let forecastDays = response.data.daily;
  let futureTemperature = document.querySelector("#futureTemperature");
  let forecastHTML = `<div class="row" id="rowForDays">`;

  forecastDays.forEach(function (forecastDay, index) {
    if (index < 6 && index != 0)
      forecastHTML =
        forecastHTML +
        `    
<div class="col" id="oneDay">
  <div class="forecast-day">${new Date(
    forecastDay.dt * 1000
  ).toLocaleDateString("en-us", { weekday: "short" })}</div>
    <img src="https://openweathermap.org/img/wn/${
      forecastDay.weather[0].icon
    }@2x.png"
      alt="" width="60"/>
    <div class="forecast-temperature">
      <span class="forecast-temperature-max" id="tempMax"><strong>${Math.round(
        forecastDay.temp.max
      )}° </strong></span>
      <span class="forecast-temperature-min" id="tempMin">${Math.round(
        forecastDay.temp.min
      )}°</span>
  </div>
</div>
`;
    forecastHTML = forecastHTML + `</div>`;
  });

  futureTemperature.innerHTML = forecastHTML;
}

//5 days temperature end
