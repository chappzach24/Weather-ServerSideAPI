//&deg; symbol

var api = "https://api.openweathermap.org/data/2.5/";
var APIKey = "&appid=bb3db924a5328b1a5ee83d1241a27223";
var units = "&units=imperial";
var historyArr =  JSON.parse(localStorage.getItem("inputHistory")) || [];



// Function to save user input
function saveInput() {
  // Get user input
  var userInput = document.getElementById("userInput").value;

  if(userInput === ''){
    return
  }

  runData(userInput);

  // Clear the input field
  document.getElementById("userInput").value = "";
}

function runData(y) {
  runCurrent(y);
  runForecast(y);
}

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

      saveToStorage(data.name)
      // saveToStorage(data.)
    })
}

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
      console.log(dayArray)
      
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

updateHistory()
