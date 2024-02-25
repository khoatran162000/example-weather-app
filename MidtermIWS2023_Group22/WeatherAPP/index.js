//Biến lưu API tìm kiếm theo tên thành phố
const APP_ID_NAME = 'f1befedef3cbb01183eeb3f46ad7061b';
// Biến lưu API tìm kiếm theo tọa độ
const APP_ID_LAT = '439d4b804bc8187953eb36d2a8c26a02';
//biến lấy class tương ứng
const searchInput = document.querySelector('.search-input');
const cityname = document.querySelector('.city');
const weatherState = document.querySelector('.weather-state');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const sunrise = document.querySelector('.sunrise');
const sunset = document.querySelector('.sunset');
const humidity = document.querySelector('.humidity');
const windSpeed = document.querySelector('.wind-speed');
const day1 = document.querySelector('.day1');
const futureForecast = document.getElementById('future-forecast');
const dateday = document.querySelector('.dateday');
const datehouse = document.querySelector('.datehouse');
const visibility = document.querySelector('.visibility');
// tạo biến mychart
var myChart

searchInput.addEventListener('change', (e) => {
    getInfoWeather(e.target.value)
});

const getInfoWeather = (city) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APP_ID_NAME}&units=metric`)
        .then(async res => {
            const data = await res.json();
            let lat = data.coord.lat;// lấy tọa độ của thành phố
            let lon = data.coord.lon; // lấy tọa độ của thành phố
            // gán giá trị mock từ api sang các biến đã lưu ở trên
            cityname.innerHTML = data.name;
            humidity.innerHTML = data.main.humidity + "%";
            windSpeed.innerHTML = (data.wind.speed).toFixed(2) + "m/s";
            visibility.innerHTML = ((data.visibility) / 1000).toFixed(2) + "Km";
            weatherIcon.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
            getDatafor7days(lat, lon);

        })
}
//hàm convert thời gian khi có 1 số
const addZero = (i) => {
    if (i < 10) { i = "0" + i }
    return i;
}
//hàm lấy thời tiết 7 ngày
const getDatafor7days = (lat, lon) => {
    fetch(`https://openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${APP_ID_LAT}`)
        .then(async res => {
            const data = await res.json();
            console.log('[Search Input]', data);

            let chicago_datetime_str = new Date().toLocaleString("en-US", { timeZone: data.timezone });
            let dateTimee = new Date(chicago_datetime_str);
            let hour = dateTimee.getHours();

            const dates = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
            const datesmonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
            dateday.innerHTML = dates[dateTimee.getDay()] + " , " + dateTimee.getDate() + " " + datesmonth[dateTimee.getMonth()];
            datehouse.innerHTML = addZero(dateTimee.getHours()) + ":" + addZero(dateTimee.getMinutes());

            const b = data.daily;

            futureForecast.innerHTML = getHtmlTableDay(data);
            const a = data.hourly;
            temperature.innerHTML = Math.round(data.current.temp) + "&#176; C";
            const k = data.timezone_offset;

            //cấu truc chart
            let labels = getHourFromData(a, "dt", k);
            let itemData = getDataFromData(a, "temp");
            const datas = {
                labels: labels,
                datasets: [{
                    label: 'Temperature',
                    data: itemData,
                    fill: false,
                    borderColor: '#4BC0C0',
                    tension: 0.1,
                    backgroundColor: 'white',
                }]
            };

            const config = {
                type: 'line',
                data: datas,
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'Hourly forecast',
                            color: 'white',
                            position: 'bottom',
                            font: {
                                size: 20,
                            }
                        }
                    },
                    scales: {
                        x: {
                            ticks: {
                                color: 'white'
                            }
                        },
                        y: {
                            ticks: {
                                color: '#FFFFFF'
                            }
                        },
                    }
                }
            }
            if (myChart) { myChart.destroy(); }
            myChart = new Chart(
                document.getElementById('myChart'),
                config
            )
        });
}
//hàm lấy giờ trong 48h hiện tại
const getHourFromDate = (dateTimeStamp, k) => {
    const date = new Date(dateTimeStamp * 1000 - (25200 - k) * 1000);
    return date.getHours();
}
//hàm lấy ngày khi thực hiện lây 8 ngày  ừ ngày hiện tại
const getDayFromDate = (dateTimeStamp, k) => {
    const date = new Date(dateTimeStamp * 1000 - (25200 - k) * 1000);
    const dates = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    return dates[date.getDay()];
}
//lấy giờ
const getHourFromData = (data, field, k) => {
    console.log("Du lieu", k)
    return data.map(x => getHourFromDate(x[field], k) + "h")
}
//lấy data
const getDataFromData = (data, field) => {
    return data.map(x => x[field])
}
//đổ sữ liệu vào bảng vùng 8 ngày tiếp theo
const getHtmlTableDay = (data) => {
    let table = "";
    let htmlTable = "";
    let htmlTable1 = ""
    let htmlTable2 = ""
    let ab = data.daily;
    for (let i = 0; i < ab.length; i++) {
        if (i < ab.length / 2) {
            htmlTable1 += handleTrTable(getDayFromDate(ab[i].dt, data.timezone_offset), ab[i].temp.max, ab[i].temp.min, ab[i].weather[0].icon) + "\n"
        }
        if (i >= ab.length / 2) {
            htmlTable2 += handleTrTable(getDayFromDate(ab[i].dt, data.timezone_offset), ab[i].temp.max, ab[i].temp.min, ab[i].weather[0].icon) + "\n"
        }
    }

    htmlTable1 = '<div class="table-forecast1">\n<table class="daily-forecast">\n' + htmlTable1 + '</table>\n</div>';
    htmlTable2 = '<div class="table-forecast">\n<table class="daily-forecast">\n' + htmlTable2 + '</table>\n</div>'
    htmlTable = htmlTable1 + "\n" + htmlTable2;
    return htmlTable;
}

const handleTrTable = (day, tempmax, tempmin, weather) => {
    const maxweather = tempmax.toFixed();
    const minweather = tempmin.toFixed();
    return `
					<tr id="daily">
                        <th class="day">${day}</th>
                        <th class="icon">
                            <img src="http://openweathermap.org/img/wn/${weather}@2x.png" trigger="hover"
                                colors="outline:#242424,primary:#efefef">
                            </lord-icon>
                        </th>
                        <td class="average-temp">${maxweather}/${minweather}&#176; C</td>
                    </tr>
	`
}
//hàm load lấy giá trị mặc định Hà Nội
window.onload = function () {
    getInfoWeather("Hà Nội");

};

