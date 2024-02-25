const API_KEY = 'Wi6NHxCWerlZjcVZk4F2APG6yMODqweQ';

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

const get12HoursForecast = async function (location_key) {
    const url = `http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${location_key}?apikey=${API_KEY}&details=true`
    const response = await fetch(url)
    return response.json();
}


const getUrl = (index) => +index < 10 ? `https://developer.accuweather.com/sites/default/files/0${index}-s.png`
    : `https://developer.accuweather.com/sites/default/files/${index}-s.png`;



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
const getHours = (data) => {
    return `${new Date(data).getHours()}:00`
}
const renderTodayTab = async (location_key) => {
    get12HoursForecast(location_key).then(todayData=>{
        const todayList = document.querySelector('.today-list');
        todayList.innerHTML = '';
        for(let i=0;i<todayData.length-6;i++) {
            const todayItem = document.createElement('div');
            todayItem.classList.add('col-4', 'mt-2');
            todayItem.innerHTML = `
            <div class="card card-small mb-3">
            <div class="row g-0">
              <div class="col-md-6 d-flex align-items-center justify-content-center">
                <img src="${getUrl(todayData[i].WeatherIcon)}" class="img-fluid rounded-start" alt="...">
              </div>
              <div class="col-md-6">
                <div class="card-body">
                  <h5 class="card-title">${getHours(todayData[i].DateTime)}</h5>
                  <p class="card-text">${todayData[i].IconPhrase}</p>
                  <p class="card-text fw-bold text-danger">${convertFtoC(todayData[i].Temperature.Value, todayData[i].Temperature.Value)} °C</p>
                </div>
              </div>
            </div>
            `
            todayList.appendChild(todayItem);
        }
        console.log(todayData,'todayData')
    })
}

const renderForecastTab = (data) => {
    document.querySelector('.card-body').classList.remove('visually-hidden');
    document.querySelector('.spinner-box').classList.add('visually-hidden');
    const dataList = document.querySelector('.data-list');
    dataList.innerHTML = "";
    for (let i = 0; i < data.DailyForecasts.length; i++) {
        const dataItem = data.DailyForecasts[i];
        if (i == 0) {
            document.querySelector('.celsius-today').textContent = convertFtoC(dataItem?.Temperature?.Maximum?.Value, dataItem?.Temperature?.Minimum?.Value);
            document.querySelector('.description-today').textContent = dataItem?.Day?.LongPhrase;
            document.querySelector('.humidity-today').textContent = dataItem?.Day?.RainProbability;
            document.querySelector('.wind-today').textContent = dataItem?.Day?.Wind?.Speed?.Value;
        } else {
            const itemHtml = document.createElement('div');
            itemHtml.classList.add('col-6', "text-center", "d-flex", "justify-content-center", "mt-4");
            itemHtml.innerHTML = `
    <div class="card shadow rounded my-card" style="width: 18rem;">
    <h5 class="card-title pt-3">${getDate(dataItem?.Date)}</h5>
    <div class="text-center">
        <img src="${getUrl(dataItem?.Day?.Icon)}"
            class="card-img-top image-item" alt="...">
    </div>
    <div class="card-body">
        <p class="card-text fw-bold">Temperature: ${convertFtoC(dataItem?.Temperature?.Maximum?.Value, dataItem?.Temperature?.Minimum?.Value)}°C</p>
        <p class="card-text fw-bold">Humidity: ${dataItem?.Day?.RainProbability}%</p>
        <p class="card-text fw-bold">Wind: ${dataItem?.Day?.Wind?.Speed?.Value} mi/h</p>
    </div>
</div>
        `
            dataList.appendChild(itemHtml);
        }
    }
}
function app(search = "Hanoi") {
    try {
        document.querySelector('.card-body').classList.add('visually-hidden');
        document.querySelector('.spinner-box').classList.remove('visually-hidden');

        getLocationKey(search).then(location => {
            try {
                const cityData = location[0].LocalizedName;
                const countryData = location[0].Country.LocalizedName;
                const locationKey = location[0].Key;
                document.querySelector('.location').textContent = cityData;
                document.querySelector('.country').textContent = countryData;
                getFiveDailyForecasts(locationKey).then(item => {
                    renderForecastTab(item);
                })
                renderTodayTab(locationKey);
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