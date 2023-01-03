function formatDate(timestemp) {
    let date = new Date(timestemp)
    let houres = date.getHours()
    if (houres < 10) {
        houres = `0${houres}`
    }
    let minutes = date.getMinutes()
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    let days = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat"
    ]
    let day = days[date.getDay()]
    return `${day} ${houres}:${minutes}`

}

function formatDay(timestemp) {

    let date = new Date(timestemp * 1000)
    let day = date.getDay()
    let days = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat"
    ]
    return days[day]
}





function getForecast(coordinates) {
    console.log(coordinates);
    let apiKey = "fe373f8782df5e411d33720adaa21696"
    let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`
    // let apiUrl = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    console.log(apiUrl)
    axios.get(apiUrl).then(displayForcast());
}

function displayForcast() {

    let forecast = response.data.daily;
    console.log('kkk:', forecast)

    let forecastHtml = ` <div class="row">`

    forecast.forEach(function(forecastDay, index) {
        if (index < 6) {
            forecastHtml = forecastHtml + `
    <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png" width="48" />
        <div class="weather-forecast-temperatures">
            <span class="weather-forecast-temperature-max"> ${Math.round(
                forecastDay.temp.max
              )}° </span>
            <span class="weather-forecast-temperature-min">  ${Math.round(
                forecastDay.temp.min
              )}° </span>
        </div>

    </div>`
        }
    })




    forecastHtml = forecastHtml + `</div>`
    forcastElement.innerHTML = forecastHtml

}


function displayTemperture(response) {
    let cityElement = document.querySelector('#city')
    let descriptionElement = document.querySelector('#description')
    let tempertureElement = document.querySelector('#temperature')
    let humidityElement = document.querySelector('#humidity')
    let windElement = document.querySelector('#wind')
    let dateElement = document.querySelector('#date')
    let iconElement = document.querySelector('#icon')

    celsiusTemperture = response.data.main.temp

    tempertureElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = response.data.name
    descriptionElement.innerHTML = response.data.weather[0].description
    humidityElement.innerHTML = response.data.main.humidity
    windElement.innerHTML = Math.round(response.data.wind.speed)
    dateElement.innerHTML = formatDate(response.data.dt * 1000)
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
    getForecast(response.data.coord);


}

function search(city) {
    let apiKey = "fe373f8782df5e411d33720adaa21696"
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    console.log(apiUrl)
    axios.get(apiUrl).then(displayTemperture)
}

function signUp(event) {
    event.preventDefault();
    let inputElement = document.querySelector("#city-input");
    search(inputElement.value)

}

function displayFahrenheitLink(event) {
    event.preventDefault()
    celsiusLink.classList.remove("active")
    fahrenheitLink.classList.add("active")
    let temperatureElement = document.querySelector("#temperature")
    let fahrenheitElement = (celsiusTemperture * 9) / 5 + 32

    temperatureElement.innerHTML = Math.round(fahrenheitElement)
        // alert(fahrenheitElement)

}

function displayCelsiusLink(event) {
    event.preventDefault()
    celsiusLink.classList.add("active")
    fahrenheitLink.classList.remove("active")
    let temperatureElement = document.querySelector("#temperature")
    temperatureElement.innerHTML = Math.round(celsiusTemperture)
        // alert(fahrenheitElement)

}
let celsiusTemperture = null

let form = document.querySelector("#search-form")
form.addEventListener("submit", signUp)


let fahrenheitLink = document.querySelector("#fahrenheit-link")
fahrenheitLink.addEventListener("click", displayFahrenheitLink)

let celsiusLink = document.querySelector("#celsius-link")
celsiusLink.addEventListener("click", displayCelsiusLink)
search("new york");
// displayForcast();