const apiKey = '';


function getWeather() {
  const city = document.getElementById('city').value;
  if (city === "") {
    alert("Please enter a city");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.cod !== 200) {
        alert("City not found!");
        return;
      }

      const cityName = data.name;
      const temperature = data.main.temp;
      const description = data.weather[0].description;
      const humidity = data.main.humidity;
      const windSpeed = data.wind.speed;
      const iconCode = data.weather[0].icon;

      // Update the content on the page
      document.getElementById('city-name').innerText = cityName;
      document.getElementById('temperature').innerText = `${temperature}°C`;
      document.getElementById('description').innerText = description;
      document.getElementById('humidity').innerText = `Humidity: ${humidity}%`;
      document.getElementById('wind').innerText = `Wind Speed: ${windSpeed} m/s`;
      document.getElementById('weather-icon').src = `http://openweathermap.org/img/w/${iconCode}.png`;

      // Change background based on weather condition
      setBackground(description);
    })
    .catch(error => {
      alert("Error fetching weather data!");
    });
}

function setBackground(weatherCondition) {
  const body = document.body;
  let backgroundUrl;

  if (weatherCondition.includes("clear")) {
    backgroundUrl = "url('https://images.unsplash.com/photo-1541119638723-c51cbe2262aa?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";  // sunny background image URL
  } else if (weatherCondition.includes("cloud")) {
    backgroundUrl = "url('https://images.unsplash.com/photo-1500740516770-92bd004b996e?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"; // cloudy background image URL
  } else if (weatherCondition.includes("rain")) {
    backgroundUrl = "url('https://images.unsplash.com/photo-1496034663057-6245f11be793?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"; // rainy background image URL
  } else if (weatherCondition.includes("snow")) {
    backgroundUrl = "https://images.unsplash.com/photo-1457269449834-928af64c684d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"; // snowy background image URL
  } else {
    backgroundUrl = "https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"; // Default background
  }

  body.style.backgroundImage = backgroundUrl;
  body.style.backgroundSize = "cover";
  body.style.backgroundPosition = "center";
  body.style.transition = "background 1s ease-in-out"; // Smooth transition
}
