var api = "https://api.openweathermap.org/data/2.5/";
var APIKey = "&appid=bb3db924a5328b1a5ee83d1241a27223";
var units = "&units=imperial";
var historyArr = JSON.parse(localStorage.getItem("inputHistory")) || [];
var weatherIcon = document.getElementById("weatherIcon");
var userInput;

const timeEl = document.querySelector(".time");

// Function to save user input
function saveInput() {
  userInput = document.getElementById("userInput").value;

  document.getElementById("noShowCurrent").classList.remove("hidden");
  document.getElementById("noShowForCast").classList.remove("hidden");

  if (userInput === "") {
    return;
  }

  runData(userInput);
  saveToStorage(userInput);
  document.getElementById("userInput").value = "";
}

function runData(city) {
  runCurrent(city);
  runForecast(city);
}

function Show() {}

//fetch for current weather
function runCurrent(city) {
  var url = api + "weather?q=" + city + APIKey + units;

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data.message === "city not found") {
        return;
      }
      let currentDay = data.main;
      console.log(
        `current temp: ${currentDay.temp}, current wind: ${data.wind.speed}`
      );
      console.log(data);
      weatherDOM(data, city);
    });
}

//fetch for 5 day forecast
function runForecast(city) {
  var url = api + "forecast?q=" + city + APIKey + units;

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data.message === "city not found") {
        return;
      }
      //makes array for forecast to pull data at 12:00
      console.log(data);
      let dayArray = [];
      for (hour of data.list) {
        if (hour.dt_txt.split(" ")[1] === "12:00:00") {
          dayArray.push(hour);
        }
      }
      console.log(dayArray);
      forcastDOM(dayArray);
    });
}

function saveToStorage(city) {
  historyArr.push(city);
  localStorage.setItem("inputHistory", JSON.stringify(historyArr));
  updateHistory();
}

function updateHistory() {
  var historyList = document.getElementById("historyList");
  historyList.innerHTML = "";

  historyArr.forEach(function (item) {
    var btn = document.createElement("button");
    btn.textContent = item;
    btn.addEventListener("click", function () {
      runData(item);
    });

    var li = document.createElement("li");
    li.appendChild(btn);
    historyList.appendChild(li);
  });
}

//weather for current day
function weatherDOM(data, city) {
  var currentTime = document.getElementById("currentTime");
  currentTime.textContent = new Date().toLocaleString();

  var iconcode = data.weather[0].icon;
  var iconUrl = "http://openweathermap.org/img/w/" + iconcode + ".png";

  weatherIcon.setAttribute("src", iconUrl);
  weatherIcon.style.width;

  var currentstate = document.getElementById("state");
  let result = city.toUpperCase();
  currentstate.textContent = result;

  var currentTemp = document.getElementById("temp1");
  currentTemp.textContent = data.main.temp;

  var currentWind = document.getElementById("wind1");
  currentWind.textContent = data.wind.speed;

  var currentHum = document.getElementById("humidity1");
  currentHum.textContent = data.main.humidity;
}

//weather forecast for 5 days
function forcastDOM(dayArray) {
  for (let dayIndex = 0; dayIndex < dayArray.length; dayIndex++) {
    const timeDate = dayArray[dayIndex].dt_txt;
    let newTimeDate = timeDate.split(' ');

    var dayTimeElement = document.getElementById("day" + (dayIndex + 2));
    dayTimeElement.textContent = newTimeDate[0];

    var iconcode = dayArray[dayIndex].weather[0].icon;
    var iconUrl = "http://openweathermap.org/img/w/" + iconcode + ".png";

    var weatherIconElement = document.getElementById("weatherIcon" + (dayIndex + 2));
    weatherIconElement.setAttribute("src", iconUrl);
    weatherIconElement.style.width;

    var tempElement = document.getElementById("temp" + (dayIndex + 2));
    tempElement.textContent = dayArray[dayIndex].main.temp;

    var windElement = document.getElementById("wind" + (dayIndex + 2));
    windElement.textContent = dayArray[dayIndex].wind.speed;

    var humidityElement = document.getElementById("humidity" + (dayIndex + 2));
    humidityElement.textContent = dayArray[dayIndex].main.humidity;
  }
}

// Initial call to update the history
updateHistory();
