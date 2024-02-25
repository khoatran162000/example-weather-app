const key = '3f98dd441c7ee20946bc874d360ca885';

const requestCity = async (city) => {
    const baseURL = 'https://api.openweathermap.org/data/2.5/weather'
    const query = `?q=${city}&appid=${key}`;

    const response = await fetch(baseURL + query);
    listDataByHour(city);

    const data = await response.json();
    return data;
}

const listDataByHour = async (city) => {
    const baseURL = 'https://api.openweathermap.org/data/2.5/forecast'
    const query = `?q=${city}&appid=${key}`;

    const response = await fetch(baseURL + query);
    const data = await response.json();
    let listCard = document.getElementsByClassName('list-weather')[0];
    const tempListData = [data.list[3], data.list[11], data.list[19], data.list[27], data.list[35]];
    let listEle = [];

    tempListData.forEach((ele) => {
        ele.time = ele.dt_txt.substring(0, ele.dt_txt.indexOf(' '));
        ele.imgLink = ele.weather[0].icon;
        ele.temperature = ele.main.temp;
        listEle.push(`<div class="box-weather">
            <p>${ele.time}</p>
            <div>
                <img src="http://openweathermap.org/img/wn/${ele.imgLink}@2x.png" />
                <span>${spitOutCelcius(ele.temperature)}&deg;C</span>
            </div>
        </div>`)
    })
    listCard.innerHTML = listEle.join(" ");
    return data;
}

function closePopup() {
    document.getElementsByClassName('popup-error')[0].classList.add('d-none-popup')
}
