let reset = document.querySelector('.reset')
let city = document.querySelector('.city')
let weather = document.querySelector('.weather')
let search = document.querySelector('.search')
let error = document.querySelector('.error')
let cityName = document.querySelector('.name')
let temp = document.querySelector('.temp')
let sky = document.querySelector('.sky')
let weatherIcon = document.querySelector('.weather__icon')

const apiKey = "&appid=e0d205557e828d92fd63cceb03ae392f"
const api = 'https://api.openweathermap.org/data/2.5/weather?q='

search.addEventListener('click', getData)
reset.addEventListener('click', () => {
    city.value = ''
    error.innerHTML = ''
})

function getData() {
    if (city.value !== "") {
        if (valid(city)) {
            fetch(api + city.value + apiKey)
                .then(data => checkError(data))
                .then(jsonData => result(jsonData))
                .catch((requestError) => {
                    console.log("Error:", requestError)
                })
        } else {
            error.innerHTML = "Enter only letters"
        }
    } else {
        error.innerHTML = "Enter city"
    }
}

function valid(item) {
    if (!item.value.match(/^[a-zA-Z_ ]*$/)) {
        return false;
    } else {
        return true;
    }
}

function checkError(data) {
    if (data.status >= 200 && data.status <= 299) {
        return data.json();
    } else {
        error.innerHTML = data.statusText;
    }
}

function result(json) {
    if (json) {
        error.innerHTML = ''
        weather.classList.add('show')
        cityName.innerHTML = json.name
        temp.innerHTML = parseInt(json.main.temp - 273).toString() + "&#8451"
        sky.innerHTML = json.weather[0].main
        weatherIcon.setAttribute('src', 'http://openweathermap.org/img/wn/' + json.weather[0].icon + '@2x.png')
    } else {
        weather.classList.remove('show')
    }
}