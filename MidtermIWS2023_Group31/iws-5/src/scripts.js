const API_KEY = '05m4IZnp6KiVoVwkbsNk4S9QfjHcMRzh';

const getLocationKey = async function (search) {
    const url = `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${search}`
    const response = await fetch(url);
    return response.json();
}

const getFiveDailyForecasts = async function (location_key) {
    const url = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${location_key}?apikey=${API_KEY}&details=true`
    const response = await fetch(url)
    return response.json();
}

const generateUrl = (index) => +index < 10 ? `https://developer.accuweather.com/sites/default/files/0${index}-s.png`
    : `https://developer.accuweather.com/sites/default/files/${index}-s.png`;

const get12HourForecasts = async function (location_key) {
    try {
        const url = `http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${location_key}?apikey=${API_KEY}`
        const response = await fetch(url)
        return response.json();
    } catch (errors) {
        console.log(errors, 'errors')
    }

}


const getDayName = (data) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const d = new Date(data);
    const dayName = days[d.getDay()];
    return dayName;
}

const getMonthName = date => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const d = new Date(date);
    return monthNames[d.getMonth()];
}
const convertFtoC = (min, max) => {
    if (max == 0) return Math.round(((min + max) - 32) / 1.8, 2);
    return Math.round(((min + max) / 2 - 32) / 1.8, 2);
}
const getDate = (data) => {
    const d = new Date(data);
    const day = d.getDate();
    const year = d.getFullYear();
    const dayName = getDayName(data);
    const monthName = getMonthName(data);
    return `${dayName}, ${day} ${monthName} ${year}`;
}
const convertHours = data => {
    const hour = new Date(data).getHours();
    if (hour > 12) return `${hour - 12} PM`;
    return `${hour} AM`;
}
function app(search = "Hanoi") {
    try {
        getLocationKey(search).then(location => {
            try {
                const cityData = location[0].LocalizedName;
                const locationKey = location[0].Key;
                document.querySelector('.location').textContent = cityData;
                get12HourForecasts(locationKey).then(data => {
                    const listHourForecasts = document.querySelector('.list-hour-forecasts');
                    listHourForecasts.innerHTML = '';
                    for (let i = 0; i < data.length; i++) {
                        if (i > 5) break;
                        const hourElement = document.createElement('div');
                        hourElement.classList.add('col-2', 'col-lg-2', 'col-md-4', 'col-xs-4')
                        if (i == 5) {
                            hourElement.innerHTML = `
                            <div class="card border-0 main-bg mt-3">
                                <div class="card-body text-center p-0 pr-2">
                                    <h6 class="card-subtitle mb-2 text-muted">${convertHours(data[i].DateTime)}</h6>
                                    <img src="${generateUrl(data[i].WeatherIcon)}" class=" medium-icon my-3" />
                                    <h5 class="card-title text-white">${convertFtoC(data[i]?.Temperature?.Value, 0)} °C</h5>
                                </div>
                            </div>`;
                        } else {
                            hourElement.innerHTML = `
                            <div class="card border-0 main-bg mt-3">
                                <div class="card-body text-center border-end p-0 pe-3">
                                    <h6 class="card-subtitle mb-2 text-muted">${convertHours(data[i].DateTime)}</h6>
                                    <img src="${generateUrl(data[i].WeatherIcon)}" class=" medium-icon my-3" />
                                    <h5 class="card-title text-white">${convertFtoC(data[i]?.Temperature?.Value, 0)}  °C</h5>
                                </div>
                            </div>`;
                        }
                        listHourForecasts.appendChild(hourElement);
                    }
                })
                getFiveDailyForecasts(locationKey).then(item => {
                    const forecastList = document.querySelector('.list-forecast');
                    forecastList.innerHTML = "";
                    for (let i = 0; i < item.DailyForecasts.length; i++) {
                        const dataItem = item.DailyForecasts[i];
                        if (i == 0) {
                            document.querySelector('.possibility-rain-today').textContent = dataItem?.Day?.RainProbability;
                            document.querySelector('.temp-today').textContent = convertFtoC(dataItem?.Temperature?.Minimum?.Value, dataItem?.Temperature?.Maximum?.Value);
                            document.querySelector('.real-feel-temp-today').textContent = convertFtoC(dataItem?.RealFeelTemperature?.Minimum?.Value, dataItem?.RealFeelTemperature?.Maximum?.Value);
                            document.querySelector('.wind-today').textContent = dataItem?.Day?.Wind?.Speed?.Value;
                            document.querySelector('.chance-rain-today').textContent = dataItem?.Day?.RainProbability;
                            document.querySelector('.hos-today').textContent = dataItem?.HoursOfSun;
                            document.querySelector('.image-today').src = generateUrl(dataItem?.Day?.Icon);
                        } else {
                            const itemHtml = document.createElement('div');
                            itemHtml.classList.add('d-flex', "justify-content-between", "pb-3", "border-bottom", "mb-4");
                            itemHtml.innerHTML = `
                                <span class="text-secondary">${getDayName(dataItem?.Date)}</span>
                                <div class="d-inline-block">
                                    <img src="${generateUrl(dataItem?.Day?.Icon)}"
                                        class="smallIcon" alt="">
                                    <span>${dataItem?.Day?.IconPhrase}</span>
                                </div>
                                <span><span class="text-secondary fw-bold">${convertFtoC(dataItem?.Temperature?.Minimum?.Value, dataItem?.Temperature?.Maximum?.Value)} °C</span></span>
                            `
                            forecastList.appendChild(itemHtml);
                        }
                    }
                })
            } catch (errors) {
            }
        })
    } catch (errors) {
    }
}

app();

const searchBtn = document.querySelector('.btn-search');
if (searchBtn) {
    searchBtn.addEventListener('click', () => {
        const inputSearch = document.querySelector('.input-search');
        const searchValue = inputSearch.value.trim();
        inputSearch.value = "";
        app(searchValue);
    })
}
document
    .querySelector(".input-search")
    .addEventListener("keyup", function (event) {
        if (event.key == "Enter") {
            const searchValue = document.querySelector('.input-search').value.trim();
            document.querySelector('.input-search').value = "";
            app(searchValue);
        }
    });