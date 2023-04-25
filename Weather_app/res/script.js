const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.getElementById('weather-img');
const temperature = document.getElementById('temperature');
const weather_desc = document.getElementById('weather-description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');
const home_section = document.getElementById('home-section');
const error_img = document.getElementById("error-img")

async function checkWeather(city){
    const api_key = "502e4b01e6f4404abb099c1c44822bc5"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const weather_data = await fetch(`${url}`).then(response => response.json());

    if(weather_data.cod === `404`) {
        home_section.style.display = "none"
        error_img.style.display = "flex"
        return;
    }
    else {
        home_section.style.display = "block"
        error_img.style.display = "none"
    }

    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    weather_desc.innerHTML = `${weather_data.weather[0].description}`;
    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${Math.round(weather_data.wind.speed)}Km/H`;

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
    }

    console.log(weather_data)
}

searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value);
});