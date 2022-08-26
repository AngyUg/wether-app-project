function currentDayTime() {
  let now = new Date().toLocaleDateString("en-us", {
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  let paragraph = document.querySelector("li.daytime");
  paragraph.textContent = now;
}
currentDayTime();
function currentTemperature() {
  document.querySelector("#celsius").addEventListener("click", function () {
    document.querySelector("#temperature").innerHTML = "19";
  });

  document.querySelector("#faringates").addEventListener("click", function () {
    document.querySelector("#temperature").innerHTML = "66";
  });
}

function showEnterCity(response) {
  console.log(response);
  let h1 = document.querySelector("#id-h1");
  h1.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  let feelings = document.querySelector("#feelings");
  feelings.innerHTML = response.data.weather[0].description;
  let curTemperature = document.querySelector("#temperature");
  curTemperature.innerHTML = Math.round(response.data.main.temp);
  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind: ${response.data.wind.speed} km/h`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector("#faringates").addEventListener("click", function () {
    let curTemperature = document.querySelector("#temperature");
    document.querySelector("#temperature").innerHTML = Math.round(
      response.data.main.temp * (9 / 5) + 32
    );
  });
  document.querySelector("#celsius").addEventListener("click", function () {
    let curTemperature = document.querySelector("#temperature");
    document.querySelector("#temperature").innerHTML = Math.round(
      response.data.main.temp
    );
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
  let h1 = document.querySelector("#id-h1");
  h1.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  let feelings = document.querySelector("#feelings");
  feelings.innerHTML = response.data.weather[0].description;
  let curTemperature = document.querySelector("#temperature");
  curTemperature.innerHTML = Math.round(response.data.main.temp);

  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind: ${response.data.wind.speed} km/h`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector("#faringates").addEventListener("click", function () {
    let curTemperature = document.querySelector("#temperature");
    document.querySelector("#temperature").innerHTML = Math.round(
      response.data.main.temp * (9 / 5) + 32
    );
  });
  document.querySelector("#celsius").addEventListener("click", function () {
    let curTemperature = document.querySelector("#temperature");
    document.querySelector("#temperature").innerHTML = Math.round(
      response.data.main.temp
    );
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

let button = document.querySelector("#curr-button");
button.addEventListener("click", getCurrentPosition);
//block of where I am
