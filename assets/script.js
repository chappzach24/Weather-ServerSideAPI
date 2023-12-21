//&deg; symbol

var api = "https://api.openweathermap.org/data/2.5/";
var APIKey = "&appid=bb3db924a5328b1a5ee83d1241a27223";
var units = "&units=imperial";
var historyArr =  JSON.parse(localStorage.getItem("inputHistory")) || [];
var weatherIcon = document.getElementById("weatherIcon")
var userInput;

const now = new Date();
const currentDateTime = now.toLocaleString();

console.log(currentDateTime); // output: "7/20/2021, 2:28:15 PM" (will vary depending on your time zone)

// Function to save user input
function saveInput() {
  // Get user input
  userInput = document.getElementById("userInput").value;

  if(userInput === ''){
    return
  }

  runData(userInput);
  saveToStorage(userInput)
  // Clear the input field
  document.getElementById("userInput").value = "";
}

function runData(y) {
  runCurrent(y);
  runForecast(y);
}

//fetch for current weather
function runCurrent(x) {
  var url = api + "weather?q=" + x + APIKey + units;

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      
      if(data.message === 'city not found'){
        return
      }
      let currentDay = data.main
      console.log(`current temp: ${currentDay.temp}, current wind: ${data.wind.speed}`);
      console.log(data);
      weatherDOM(data, userInput, currentDateTime);
    })
}

//fetch for 5 day forcast
function runForecast(a) {
  var url = api + "forecast?q=" + a + APIKey + units;

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if(data.message === 'city not found'){
        return
      }
      console.log(data);
      let dayArray = []
      let days = ["Day 1", "Day 2", "Day 3","Day 4","Day 5"]
      for (hour of data.list){
        if (hour.dt_txt.split(" ")[1] === "12:00:00"){
          dayArray.push(hour)
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

// Function to update the history list
function updateHistory() {
  var historyList = document.getElementById("historyList");
  historyList.innerHTML = "";

  

  // Display the history in the list
  historyArr.forEach(function (item) {
    var li = document.createElement("li");
    li.textContent = item;
    historyList.appendChild(li);
  });
}

function weatherDOM(data, userInput, currentDateTime){
  var currentTime = document.getElementById("currentTime")
  currentTime.textContent = currentDateTime;

  var iconUrl = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;

  var currentstate = document.getElementById("state")
  currentstate.textContent = userInput;

  weatherIcon.setAttribute("src", iconUrl)
  weatherIcon.style.width

  var currentTemp = document.getElementById("temp1")
  currentTemp.textContent = data.main.temp;

  var currentWind = document.getElementById("wind1")
  currentWind.textContent = data.wind.speed;

  var currentHum = document.getElementById("humidity1")
  currentHum.textContent = data.main.humidity;

}

function forcastDOM(dayArray){
  // day 2 of forecast
  var day2Time = document.getElementById("day2")
  day2Time.textContent = dayArray[0].clouds.dt_txt;
  console.log(typeof (dayArray[0].clouds.dt_txt))

  var day2Temp = document.getElementById("temp2")
  day2Temp.textContent = dayArray[0].main.temp;


}

updateHistory()
