const API_KEY = 'm8mxIeNAoHR2d1CcM7GgIKnftJTJ1ZAL';
const IP_ADDRESS = '27.73.88.180';

// fetch api get location key by search
const getLocationBySearch = async function (search) {
    const url = `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${search}`
    const response = await fetch(url);
    return response.json();
}

// fetch api get location key by ip address
const getLocationKey = async function (ip_address) {
    const url = `http://dataservice.accuweather.com/locations/v1/cities/ipaddress?apikey=${API_KEY}&q=${ip_address}`
    const response = await fetch(url);
    return response.json();
}

// fetch api get weather today
const getDailyForecasts = async function (location_key) {
    const url = `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${location_key}?apikey=${API_KEY}&details=true`;
    const response = await fetch(url);
    return response.json();
}

// fetch api get weather in 5 days 
const getFiveDailyForecasts = async function (location_key) {
    const url = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${location_key}?apikey=${API_KEY}&details=true`
    const response = await fetch(url)
    return response.json();
}

// fetch api get weather in 12 hours
const get12HoursForecasts = async function (location_key) {
    const url = `http://dataservice.accuweather.com/forecasts/v1/hourly/12hour//${location_key}?apikey=${API_KEY}&details=true`
    const response = await fetch(url)
    return response.json();
}


// convert F to C
const calculateTemperature = (min, max) => {
    if (max == 0) return Math.round(((min + max) - 32) / 1.8, 2);
    return Math.round(((min + max) / 2 - 32) / 1.8, 2);
}

// Get url 
const formatUrl = (index) => +index < 10 ? `https://developer.accuweather.com/sites/default/files/0${index}-s.png`
    : `https://developer.accuweather.com/sites/default/files/${index}-s.png`;

// get name
const getDay = (data) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const d = new Date(data);
    const dayName = days[d.getDay()];
    return dayName;
}

// get hours
const convertHours = data => {
    const hour = new Date(data).getHours();
    if (hour > 12) return `${hour - 12} PM`;
    return `${hour} AM`;
}

const render = (search = null) => {
    if (search) {
        getLocationBySearch(search).then((location) => {
            // get data from api
            const cityData = location[0].LocalizedName;
            const countryData = location[0].Country.LocalizedName;
            const locationKey = location[0].Key;

            // render data 
            const listLocationHTML = document.querySelectorAll('.location-text');
            const listCountry = document.querySelectorAll('.country');
            for (let i = 0; i < listLocationHTML.length; i++) {
                listLocationHTML[i].textContent = cityData;
                listCountry[i].textContent = countryData;
            }

            getFiveDailyForecasts(locationKey).then(item => {

                const forecastList = document.querySelector('.header-forecast-list');
                forecastList.innerHTML = '';
                for (let i = 0; i < item.DailyForecasts.length - 1; i++) {
                    // Render data today
                    if (i == 0) {
                        document.querySelector('.temp-day').textContent
                            = calculateTemperature(item.DailyForecasts[i]?.Temperature?.Minimum?.Value, 0);
                        document.querySelector('.temp-night').textContent
                            = calculateTemperature(item.DailyForecasts[i]?.Temperature?.Maximum?.Value, 0);
                        // render data next 3 days
                    } else {
                        const divElement = document.createElement('div');
                        divElement.classList.add('header-forecast-item');
                        divElement.innerHTML = `
                        <div class="forecast-item__img">
                        <img src="${formatUrl(item.DailyForecasts[i]?.Day?.Icon)}" alt="">
                        </div>
                        <div class="forecast-item__text">
                        <p>${getDay(item.DailyForecasts[i].Date)}</p>
                        <p>${item.DailyForecasts[i]?.Day?.IconPhrase}</p>
                        </div>
                        <div class="forecast-item__temp">
                        ${calculateTemperature(item.DailyForecasts[i]?.Temperature?.Minimum?.Value, 0)} | ${calculateTemperature(item.DailyForecasts[i]?.Temperature?.Maximum?.Value, 0)} ℃
                        </div>
                        `
                        forecastList.appendChild(divElement);
                    }

                }
            })
            get12HoursForecasts(locationKey).then(result => {
                const temperatureLists = document.querySelector('.temperature-forecast-list');
                temperatureLists.innerHTML = '';
                const windLists = document.querySelector('.wind-forecast-list');
                windLists.innerHTML = '';
                const precipitationLists = document.querySelector('.precipitation-forecast-list');
                precipitationLists.innerHTML = '';
                for (let i = 0; i < result.length - 6; i++) {
                    const divTemp = document.createElement('div');
                    divTemp.innerHTML = `
                    <div class="temperature-forecast-item">
                    <div class="temperature-item__day">
                        ${convertHours(result[i].DateTime)}
                    </div>
                    <div class="temperature-item__icon">
                        <img src="${formatUrl(result[i].WeatherIcon)}" alt="" class="mediumIcon">
                    </div>
                    <div class="temperature-item__value">
                        ${calculateTemperature(result[i]?.Temperature?.Value, 0)} ℃
                    </div>
                </div>
                    `
                    temperatureLists.appendChild(divTemp);

                    const divWind = document.createElement('div');
                    divWind.innerHTML = `
                    <div class="temperature-forecast-item">
                    <div class="temperature-item__day">
                        ${convertHours(result[i].DateTime)}
                    </div>
                    <div class="temperature-item__icon">
                        <img src="${formatUrl(result[i].WeatherIcon)}" alt="" class="mediumIcon">
                    </div>
                    <div class="temperature-item__value">
                        ${result[i]?.Wind?.Speed?.Value} mi/h
                    </div>
                </div>
                    `
                    windLists.appendChild(divWind);

                    const divPrecipitation = document.createElement('div');
                    divPrecipitation.innerHTML = `
                    <div class="temperature-forecast-item">
                    <div class="temperature-item__day">
                        ${convertHours(result[i].DateTime)}
                    </div>
                    <div class="temperature-item__icon">
                        <img src="${formatUrl(result[i].WeatherIcon)}" alt="" class="mediumIcon">
                    </div>
                    <div class="temperature-item__value">
                        ${result[i]?.PrecipitationProbability} %
                    </div>
                </div>
                    `
                    precipitationLists.appendChild(divPrecipitation);
                }
            })
        })
    } else {
        getLocationKey(IP_ADDRESS).then(location => {
            // get data from api
            const cityData = location.ParentCity.EnglishName;
            const countryData = location.Country.EnglishName;
            const locationKey = location.Key;

            // render data 
            const listLocationHTML = document.querySelectorAll('.location-text');
            const listCountry = document.querySelectorAll('.country');
            for (let i = 0; i < listLocationHTML.length; i++) {
                listLocationHTML[i].textContent = cityData;
                listCountry[i].textContent = countryData;
            }

            getFiveDailyForecasts(locationKey).then(item => {

                const forecastList = document.querySelector('.header-forecast-list');
                forecastList.innerHTML = '';
                for (let i = 0; i < item.DailyForecasts.length - 1; i++) {
                    // Render data today
                    if (i == 0) {
                        document.querySelector('.temp-day').textContent
                            = calculateTemperature(item.DailyForecasts[i]?.Temperature?.Minimum?.Value, 0);
                        document.querySelector('.temp-night').textContent
                            = calculateTemperature(item.DailyForecasts[i]?.Temperature?.Maximum?.Value, 0);
                        // render data next 3 days
                    } else {
                        const divElement = document.createElement('div');
                        divElement.classList.add('header-forecast-item');
                        divElement.innerHTML = `
                        <div class="forecast-item__img">
                        <img src="${formatUrl(item.DailyForecasts[i]?.Day?.Icon)}" alt="">
                        </div>
                        <div class="forecast-item__text">
                        <p>${getDay(item.DailyForecasts[i].Date)}</p>
                        <p>${item.DailyForecasts[i]?.Day?.IconPhrase}</p>
                        </div>
                        <div class="forecast-item__temp">
                        ${calculateTemperature(item.DailyForecasts[i]?.Temperature?.Minimum?.Value, 0)} | ${calculateTemperature(item.DailyForecasts[i]?.Temperature?.Maximum?.Value, 0)} ℃
                        </div>
                        `
                        forecastList.appendChild(divElement);
                    }

                }
            })
            get12HoursForecasts(locationKey).then(result => {
                const temperatureLists = document.querySelector('.temperature-forecast-list');
                temperatureLists.innerHTML = '';
                const windLists = document.querySelector('.wind-forecast-list');
                windLists.innerHTML = '';
                const precipitationLists = document.querySelector('.precipitation-forecast-list');
                precipitationLists.innerHTML = '';
                for (let i = 0; i < result.length - 6; i++) {
                    const divTemp = document.createElement('div');
                    divTemp.innerHTML = `
                    <div class="temperature-forecast-item">
                    <div class="temperature-item__day">
                        ${convertHours(result[i].DateTime)}
                    </div>
                    <div class="temperature-item__icon">
                        <img src="${formatUrl(result[i].WeatherIcon)}" alt="" class="mediumIcon">
                    </div>
                    <div class="temperature-item__value">
                        ${calculateTemperature(result[i]?.Temperature?.Value, 0)} ℃
                    </div>
                </div>
                    `
                    temperatureLists.appendChild(divTemp);

                    const divWind = document.createElement('div');
                    divWind.innerHTML = `
                    <div class="temperature-forecast-item">
                    <div class="temperature-item__day">
                        ${convertHours(result[i].DateTime)}
                    </div>
                    <div class="temperature-item__icon">
                        <img src="${formatUrl(result[i].WeatherIcon)}" alt="" class="mediumIcon">
                    </div>
                    <div class="temperature-item__value">
                        ${result[i]?.Wind?.Speed?.Value} mi/h
                    </div>
                </div>
                    `
                    windLists.appendChild(divWind);

                    const divPrecipitation = document.createElement('div');
                    divPrecipitation.innerHTML = `
                    <div class="temperature-forecast-item">
                    <div class="temperature-item__day">
                        ${convertHours(result[i].DateTime)}
                    </div>
                    <div class="temperature-item__icon">
                        <img src="${formatUrl(result[i].WeatherIcon)}" alt="" class="mediumIcon">
                    </div>
                    <div class="temperature-item__value">
                        ${result[i]?.PrecipitationProbability} %
                    </div>
                </div>
                    `
                    precipitationLists.appendChild(divPrecipitation);
                }
            })

        })
    }
}

render();

const btnSearch = document.querySelector('.btn-search');
if (btnSearch) {
    btnSearch.addEventListener('click', () => {
        const input = document.querySelector('.input-search');
        const searchValue = input.value.trim();
        render(searchValue);
        input.value = '';
    })
}