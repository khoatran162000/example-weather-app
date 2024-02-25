const search = document.querySelector(".search-icon");
const form = document.querySelector(".locationInput");
const input = document.querySelector(".search-bar");
const cities = document.querySelectorAll(".location-item");

for (let city of cities) {
  city.addEventListener("click", (e) => {
    e.preventDefault();
    fetchWeatherApi(city.textContent);
    document.documentElement.scrollTop = 0;
  });
}

search.addEventListener("click", (e) => {
  if (input.value.length == 0) {
    alert("Please type city");
  } else {
    e.preventDefault();
    fetchWeatherApi(input.value);
    weather(input.value);
    input.value = "";
  }
  document.documentElement.scrollTop = 0;
});

async function fetchWeatherApi(text) {
  let result = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=976cc8cd002b482088135958231803&q=${text}`
  );
  let data = await result.json();

  result1 = await fetch(
    `https://api.weatherbit.io/v2.0/forecast/daily?city=${text}&key=4e37e62b949f420dbd14f0bc629191af`
  );
  let data1 = await result1.json();
  var i = 0;
  var date = [];
  var minTemp = [];
  var maxTemp = [];
  var cond = [];

  while (i <= 7) {
    date.push(data1["data"][i]["datetime"]);
    minTemp.push(data1["data"][i]["low_temp"]);
    maxTemp.push(data1["data"][i]["high_temp"]);
    cond.push(data1["data"][i]["weather"]["icon"]);
    i += 1;
  }

  let location = data["location"]["name"];
  let temp = data["current"]["temp_c"];
  let time = data["current"]["last_updated"];
  let weatherIcon = data["current"]["condition"]["icon"];
  let weatherCond = data["current"]["condition"]["text"];
  let cloud = data["current"]["cloud"];
  let humid = data["current"]["humidity"];
  let wind = data["current"]["wind_kph"];

  let imgSrc = "https:" + weatherIcon;

  document.getElementById("location").innerHTML = location;
  document.getElementById("temp").innerHTML = temp + "&#176;";
  document.getElementById("present-time").innerHTML = time.slice(-5);
  document.getElementById("date").innerHTML = time.slice(0, 10);
  document.getElementById("weather-icon").innerHTML =
    "<img src=" + imgSrc + ">";
  document.getElementById("weatherCond").innerHTML = weatherCond;
  document.getElementById("cloud").innerHTML = cloud + "%";
  document.getElementById("humid").innerHTML = humid + "%";
  document.getElementById("wind").innerHTML = wind + "km/h";


  function weatherImg(text) {
    let count = weatherCond.search(text);
    return count;
  }
  function backgroundImage() {
    let present = time.slice(-5, -3).split(",");
    let backgr = document.getElementById("container");
    if (present < 6 || present > 17) {
      if (weatherImg("rain") >= 0) {
        backgr.style.backgroundImage = "url('./img/night/rainy-night.jpg')";
      } else if (weatherImg("snow") >= 0) {
        backgr.style.backgroundImage = "url('./img/night/snowy-night.jpg')";
      } else if (weatherImg("cloudy") >= 0) {
        backgr.style.backgroundImage = "url('./img/night/cloudy-night.jpg')";
      } else {
        backgr.style.backgroundImage = "url('./img/night/dry-night.jpg')";
      }
    } else {
      if (weatherImg("rain") >= 0) {
        backgr.style.backgroundImage = "url('./img/day/rainy-day.jpg')";
      } else if (weatherImg("snow") >= 0) {
        backgr.style.backgroundImage = "url('./img/day/snowy-day.jpg')";
      } else if (weatherImg("cloudy") >= 0) {
        backgr.style.backgroundImage = "url('./img/day/cloudy-day.jpg')";
      } else {
        document.querySelectorAll(".text-grey").style.color = "black";
        backgr.style.backgroundImage = "url('./img/day/dry-day.jpg')";
      }
    }
  }
  backgroundImage();

  for (let j = 1; j <= 8; j++) {
    var a = j + "";
    document.getElementById("forecast-date" + a).innerHTML = date[j].slice(-5);
    document.getElementById("min-temp" + a).innerHTML = minTemp[j] + "&#176;";
    document.getElementById("max-temp" + a).innerHTML = maxTemp[j] + "&#176;";
    document.getElementById("weather" + a).innerHTML =
      "<img src=https://www.weatherbit.io/static/img/icons/" +
      cond[j] +
      ".png>";
  }
}

fetchWeatherApi("New York");


