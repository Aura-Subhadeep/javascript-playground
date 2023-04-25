// Get the search button element by its id
const inputBox = document.getElementById('input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.getElementById('weather-img');
const temperature = document.getElementById('temperature');
const weather_desc = document.getElementById('weather-description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');
const home_section = document.getElementById('home-section');
const error_img = document.getElementById("error-img")

// Define an async function that takes a city name as a parameter and checks the weather data for that city using an API
async function checkWeather(city){
    // Define the API key and the URL for the weather API
    const api_key = "502e4b01e6f4404abb099c1c44822bc5"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    // Fetch the weather data from the API and convert it to JSON format
    const weather_data = await fetch(`${url}`).then(response => response.json());

    // If the API returns a 404 error code, that means the city is not found
    if(weather_data.cod === `404`) {
        // Hide the home section and show the error image
        home_section.style.display = "none"
        error_img.style.display = "flex"
        return;
    }
    else {
        // Otherwise, show the home section and hide the error image
        home_section.style.display = "block"
        error_img.style.display = "none"
    }

    // Display the temperature in Celsius by subtracting 273.15 from the Kelvin value
    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    // Display the weather description as it is
    weather_desc.innerHTML = `${weather_data.weather[0].description}`;
    // Display the humidity percentage as it is
    humidity.innerHTML = `${weather_data.main.humidity}%`;
    // Display the wind speed in kilometers per hour by rounding it
    wind_speed.innerHTML = `${Math.round(weather_data.wind.speed)}Km/H`;

    // Use a switch statement to change the weather image source based on the weather main value
    switch(weather_data.weather[0].main){
        case 'Clouds':
            weather_img.src = "/Weather_app/assets/Cloudy.png";
            break;
        case 'Rain':
            weather_img.src = "/Weather_app/assets/rain.png";
            break;
        case 'Haze':
            weather_img.src = "/Weather_app/assets/wind.png";
            break;
        case 'Clear':
            weather_img.src = "/Weather_app/assets/sun.png";
            break;
        case 'Snow':
            weather_img.src = "/Weather_app/assets/sun.png";
            break;
        case 'Mist':
            weather_img.src = "/Weather_app/assets/wind.png";
            break;
    }

    // Log the weather data to the console for debugging purposes
    console.log(weather_data)
}

// Add a click event listener to the search button that calls the checkWeather function with the input box value as an argument
searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value);
});