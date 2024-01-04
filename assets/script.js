//&deg; symbol

var api = "https://api.openweathermap.org/data/2.5/";
var APIKey = "&appid=bb3db924a5328b1a5ee83d1241a27223";
var units = "&units=imperial";
var historyArr = JSON.parse(localStorage.getItem("inputHistory")) || [];
var weatherIcon = document.getElementById("weatherIcon");
var userInput;

const timeEl = document.querySelector(".time");
const questPanel = document.getElementById("quesPanel");

const now = new Date();
const currentDateTime = now.toLocaleString();

console.log(currentDateTime); // output: "7/20/2021, 2:28:15 PM"

// Function to save user input
function saveInput() {
  // Get user input
  userInput = document.getElementById("userInput").value;

  document.getElementById("noShowCurrent").classList.remove("hidden");
  document.getElementById("noShowForCast").classList.remove("hidden");

  if (userInput === "") {
    return;
  }

  runData(userInput);
  saveToStorage(userInput);
  // Clear the input field
  document.getElementById("userInput").value = "";
}

function runData(y) {
  runCurrent(y);
  runForecast(y);
}

function Show() {}

//fetch for current weather
function runCurrent(x) {
  var url = api + "weather?q=" + x + APIKey + units;

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
      weatherDOM(data, userInput, currentDateTime);
    });
}

//fetch for 5 day forcast
function runForecast(a) {
  var url = api + "forecast?q=" + a + APIKey + units;

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data.message === "city not found") {
        return;
      }
      //makes array for forcast to pull data at 12:00
      console.log(data);
      let dayArray = [];
      let days = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"];
      for (hour of data.list) {
        if (hour.dt_txt.split(" ")[1] === "12:00:00") {
          dayArray.push(hour);
        }
      }
      console.log(dayArray);
      forcastDOM(dayArray);
      // forcastDOM(data);
    });
}

function saveToStorage(city) {
  // // Check if the input is not empty

  // Save the input to localStorage (you can use other storage options as well)
  historyArr.push(city);
  localStorage.setItem("inputHistory", JSON.stringify(historyArr));

  // Update the history list
  updateHistory();
}

function updateHistory() {
  var historyList = document.getElementById("historyList");
  historyList.innerHTML = "";

  // Display the history as buttons in the list
  historyArr.forEach(function (item) {
    var btn = document.createElement("button");
    btn.textContent = item;
    btn.addEventListener("click", function () {
      runData(item);
    });

    //makes user input into a button
    var li = document.createElement("li");
    li.appendChild(btn);
    historyList.appendChild(li);
  });
}


// Function to update the history list
// function updateHistory(userInput) {
//   var historyList = document.getElementById("historyList");
//   historyList.innerHTML = "";

//   // Display the history in the list
//   historyArr.forEach(function (item) {
//     var li = document.createElement("li");
//     li.textContent = item;
//     historyList.appendChild(li);
//   });
// }

//weather for current day
function weatherDOM(data, userInput, currentDateTime) {
  var currentTime = document.getElementById("currentTime");
  currentTime.textContent = currentDateTime;

  var iconcode = data.weather[0].icon;
  var iconUrl = "http://openweathermap.org/img/w/" + iconcode + ".png";

  weatherIcon.setAttribute("src", iconUrl);
  weatherIcon.style.width;

  var currentstate = document.getElementById("state");
  let result = userInput.toUpperCase();
  currentstate.textContent = result;

  var currentTemp = document.getElementById("temp1");
  currentTemp.textContent = data.main.temp;

  var currentWind = document.getElementById("wind1");
  currentWind.textContent = data.wind.speed;

  var currentHum = document.getElementById("humidity1");
  currentHum.textContent = data.main.humidity;
}


//weather forcast for 5 days
function forcastDOM(dayArray) {
  // day 2 of forecast

  const timeDate = dayArray[0].dt_txt;
  let newTimeDate = timeDate.split(' ')
  console.log(newTimeDate);

  var day2Time = document.getElementById("day2");
  day2Time.textContent = newTimeDate[0];

  var iconcode = dayArray[0].weather[0].icon;
  var iconUrl2 = "http://openweathermap.org/img/w/" + iconcode + ".png";

  weatherIcon2.setAttribute("src", iconUrl2);
  weatherIcon2.style.width;

  var day2Temp = document.getElementById("temp2");
  day2Temp.textContent = dayArray[0].main.temp;

  var day2Wind = document.getElementById("wind2");
  day2Wind.textContent = dayArray[0].wind.speed;

  var day2Hum = document.getElementById("humidity2");
  day2Hum.textContent = dayArray[0].main.humidity;

  // day 3

  const timeDate3 = dayArray[1].dt_txt;
  let newTimeDate3 = timeDate3.split(' ')
  console.log(newTimeDate3);

  var day2Time = document.getElementById("day3");
  day2Time.textContent = newTimeDate3[0];

  var iconcode = dayArray[1].weather[0].icon;
  var iconUrl3 = "http://openweathermap.org/img/w/" + iconcode + ".png";

  weatherIcon3.setAttribute("src", iconUrl3);
  weatherIcon3.style.width;

  var day3Temp = document.getElementById("temp3");
  day3Temp.textContent = dayArray[1].main.temp;

  var day3Wind = document.getElementById("wind3");
  day3Wind.textContent = dayArray[1].wind.speed;

  var day3Hum = document.getElementById("humidity3");
  day3Hum.textContent = dayArray[1].main.humidity;

  //day 4
  const timeDate4 = dayArray[2].dt_txt;
  let newTimeDate4 = timeDate4.split(' ');

  var day2Time = document.getElementById("day4");
  day2Time.textContent = newTimeDate4[0];

  var iconcode = dayArray[2].weather[0].icon;
  var iconUrl4 = "http://openweathermap.org/img/w/" + iconcode + ".png";

  weatherIcon4.setAttribute("src", iconUrl4);
  weatherIcon4.style.width;

  var day4Temp = document.getElementById("temp4");
  day4Temp.textContent = dayArray[2].main.temp;

  var day4Wind = document.getElementById("wind4");
  day4Wind.textContent = dayArray[2].wind.speed;

  var day4Hum = document.getElementById("humidity4");
  day4Hum.textContent = dayArray[2].main.humidity;

  //day 5

  const timeDate5 = dayArray[3].dt_txt;
  let newTimeDate5 = timeDate5.split(' ');

  var day2Time = document.getElementById("day5");
  day2Time.textContent = newTimeDate5[0];

  var iconcode = dayArray[3].weather[0].icon;
  var iconUrl5 = "http://openweathermap.org/img/w/" + iconcode + ".png";

  weatherIcon5.setAttribute("src", iconUrl5);
  weatherIcon5.style.width;


  var day5Temp = document.getElementById("temp5");
  day5Temp.textContent = dayArray[3].main.temp;

  var day5Wind = document.getElementById("wind5");
  day5Wind.textContent = dayArray[3].wind.speed;

  var day5Hum = document.getElementById("humidity5");
  day5Hum.textContent = dayArray[3].main.humidity;

  //day 6

  const timeDate6 = dayArray[4].dt_txt;
  let newTimeDate6 = timeDate6.split(' ');

  var day2Time = document.getElementById("day6");
  day2Time.textContent = newTimeDate6[0];

  var iconcode = dayArray[4].weather[0].icon;
  var iconUrl6 = "http://openweathermap.org/img/w/" + iconcode + ".png";

  weatherIcon6.setAttribute("src", iconUrl6);
  weatherIcon6.style.width;

  var day6Temp = document.getElementById("temp6");
  day6Temp.textContent = dayArray[4].main.temp;

  var day6Wind = document.getElementById("wind6");
  day6Wind.textContent = dayArray[4].wind.speed;

  var day6Hum = document.getElementById("humidity6");
  day6Hum.textContent = dayArray[4].main.humidity;
}

updateHistory();
