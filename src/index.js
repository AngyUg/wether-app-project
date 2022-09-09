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
  linkWeath = `http://openweathermap.org/img/wn/${mainIc}@2x.png`;
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
  sunriseTimeShow.innerHTML = sunrise;

  let sunset = new Date(response.data.sys.sunset * 1000).toLocaleTimeString(
    "en-us",
    {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }
  );
  let sunsetTimeShow = document.querySelector("#sunset");
  sunsetTimeShow.innerHTML = sunset;

  let curTemperature = document.querySelector("#temperature");
  curTemperature.innerHTML = Math.round(response.data.main.temp);
  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind: ${response.data.wind.speed} km/h`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  let feelTemp = document.querySelector("#feelTemp");
  feelTemp.innerHTML = `Feels like: ${Math.round(
    response.data.main.feels_like
  )}°`;

  let faringLink = document.querySelector("#faringates");
  faringLink.addEventListener("click", function () {
    celsLink.classList.remove("active");
    faringLink.classList.add("active");
    let curTemperature = document.querySelector("#temperature");
    curTemperature.innerHTML = Math.round(
      response.data.main.temp * (9 / 5) + 32
    );
  });
  let celsLink = document.querySelector("#celsius");
  celsLink.addEventListener("click", function () {
    faringLink.classList.remove("active");
    celsLink.classList.add("active");
    let curTemperature = document.querySelector("#temperature");
    curTemperature.innerHTML = Math.round(response.data.main.temp);
  });
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

  let sunrise = new Date(response.data.sys.sunrise * 1000).toLocaleTimeString(
    "en-us",
    {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }
  );
  let sunriseTimeShow = document.querySelector("#sunrise");
  sunriseTimeShow.innerHTML = sunrise;

  let sunset = new Date(response.data.sys.sunset * 1000).toLocaleTimeString(
    "en-us",
    {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }
  );
  let sunsetTimeShow = document.querySelector("#sunset");
  sunsetTimeShow.innerHTML = sunset;

  let mainIc = response.data.weather[0].icon;
  linkWeath = `http://openweathermap.org/img/wn/${mainIc}@2x.png`;
  let mainWeatherIcon = document.querySelector("#main-weather-icon");
  mainWeatherIcon.setAttribute("src", linkWeath);

  wind.innerHTML = `Wind: ${response.data.wind.speed} km/h`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  let feelTemp = document.querySelector("#feelTemp");
  feelTemp.innerHTML = `Feels like: ${Math.round(
    response.data.main.feels_like
  )}°`;

  let faringLink = document.querySelector("#faringates");
  faringLink.addEventListener("click", function () {
    celsLink.classList.remove("active");
    faringLink.classList.add("active");
    let curTemperature = document.querySelector("#temperature");
    curTemperature.innerHTML = Math.round(
      response.data.main.temp * (9 / 5) + 32
    );
  });
  let celsLink = document.querySelector("#celsius");
  celsLink.addEventListener("click", function () {
    faringLink.classList.remove("active");
    celsLink.classList.add("active");
    let curTemperature = document.querySelector("#temperature");
    curTemperature.innerHTML = Math.round(response.data.main.temp);
  });
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
