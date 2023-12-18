var api = 'https://api.openweathermap.org/data/2.5/weather?q='
let city = "Gahanna";
var APIKey = "&appid=bb3db924a5328b1a5ee83d1241a27223";
var units = "&units=imperial";

var url = api + city + APIKey + units;

// Function to save user input
function saveInput() {
  // Get user input
  var userInput = document.getElementById("userInput").value;

  // Check if the input is not empty
  if (userInput.trim() !== "") {
    // Save the input to localStorage (you can use other storage options as well)
    var history = localStorage.getItem("inputHistory")
      ? JSON.parse(localStorage.getItem("inputHistory"))
      : [];
    history.push(userInput);
    localStorage.setItem("inputHistory", JSON.stringify(history));

    // Clear the input field
    document.getElementById("userInput").value = "";

    // Update the history list
    updateHistory();
  }
}

// Function to update the history list
function updateHistory() {
  var historyList = document.getElementById("historyList");
  historyList.innerHTML = "";

  // Retrieve the input history from localStorage
  var history = localStorage.getItem("inputHistory")
    ? JSON.parse(localStorage.getItem("inputHistory"))
    : [];

  // Display the history in the list
  history.forEach(function (item) {
    var li = document.createElement("li");
    li.textContent = item;
    historyList.appendChild(li);
  });
}

// Load the initial history on page load
window.onload = function () {
  updateHistory();
};

fetch(url)
  .then(function (response) {
    return response.json();
  })
  

