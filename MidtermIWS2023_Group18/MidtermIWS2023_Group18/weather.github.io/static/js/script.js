let currentCity = "";
let currentUnit = "c";
let hourlyOrWeek = "week";



// hàm này tự động lấy dữ liệu thời tiết của hcm, load trang lần đầu tiên sẽ gọi hàm này
// đây là cái hàm set mặc định giá trị thời tiết của 1 thành phố vào web, khi load lại trang, hoặc mở trang
function initFetchDataDefault() {
    getWeatherData("Ho Chi Minh City", "c", hourlyOrWeek);

}
initFetchDataDefault();



// LẤY DỮ LIỆU THỜI TIẾT THEO THÀNH PHỐ
function getWeatherData(city, unit, hourlyOrWeek) {
    let cityA = city.split(",");
    city = cityA[0];

    
    // gọi api thời tiết gọi đến "weather.visualcrossing.com" để lấy giá trị thời tiết theo thành phố
    fetch(
        `${API_URL}/${city}?unitGroup=metric&key=${API_KEY}&contentType=json`,
        { method: "GET", headers: {} }
    )
        .then((response) => response.json())
        .then((data) => {
           
           // sau khi có data(giá trị thời tiết) thì xử lý
           //32-37: lấy giá trị nhiệt độ của thành phố để xử lý, (theo độ c hoặc độ F) nếu người dùng chọn độ C thì 
           // công thức độ C là dòng 36 còn độ F là dòng 38
            let today = data.currentConditions;
            if (unit === "c") {
                TEMP.innerText = today.temp;
            } else {
                TEMP.innerText = CToF(today.temp);
            }
            
            CURRENT_LOCATION.innerText = data.resolvedAddress; // teen thành phố

            CONDITION.innerText = today.conditions; // đổ dữ liệu vào CONDITION

            RAIN.innerText = "Perc - " + today.precip + "%"; // đổ dữ liệu vào Rain bên html

            UV_INDEX.innerText = today.uvindex;  // đổ dữ liệu vào UV Index bên html
            WIND_SPEED.innerText = today.windspeed + " km/h"; // đổ dữ liệu vào Wind Status bên html
        
            MAIN_ICON.src = getIcon(today.icon);
        
            HUMIDITY.innerText = today.humidity + "%"; // đổ dữ liệu vào Humidity bên html
            updateHumidityStatus(today.humidity);
            VISIBILITY.innerText = today.visibility; // đổ dữ liệu vào Visibility bên html
            updateVisibilityStatus(today.visibility);
            AIR_QUALITY.innerText = today.winddir; // đổ dữ liệu vào Air Quality bên html
            updateAirQualityStatus(today.winddir);
            SUN_RISE.innerText = timeFormat(today.sunrise); // đổ dữ liệu vào SUN RISE bên html
            SUN_SET.innerText = timeFormat(today.sunset); // đổ dữ liệu vào SUN Set bên html
            PRESSURE.innerText = today.pressure; // đổ dữ liệu vào Pressure bên html
            DEW.innerText = today.dew; // đổ dữ liệu vào Dew bên html
            SOLARRADIATION.innerText = today.solarradiation; // đổ dữ liệu vào Solarradiation bên html
            changeBackground(today.icon); // thay đổi backgroud  
            changeLocationBackground(city); // thay đổi ảnh thành phố
            if (hourlyOrWeek === "hourly") {
                updateForecast(data.days[0].hours, unit, "day"); // phần render code tự động cho today bên html
            } else {
                updateForecast(data.days, unit, "week"); // phần render code tự động cho Forecast 4-Day Outlook bên html
            }
            fetchForecastHoursSidebar(data.days, unit, "day") // thời tiết theo 5 giờ
        })
        .catch((err) => {
            alert("City not found in our database");
        });
}

// thời tiết theo 5 giờ
// số lựogn cards sẽ được thay đổi theo mong muốn của mình
function fetchForecastHoursSidebar(data, unit, type) {
    
    HOURS_SIDEBAR_CARDS.innerHTML = "";
    let day = 0;
    let numCards = 4;
    let nextTime = new Date().getHours() ;
    nextTime += 5;
    for (let i = 0; i < numCards; i++) {
        if (nextTime >= 23) {
            day += 1;
            nextTime = 0;
        }
        let dayName = getHour(data[day].hours[nextTime].datetime);
        let iconCondition = data[day].hours[nextTime].icon;
        let iconSrc = getIcon(iconCondition);

        let dayTemp = data[day].hours[nextTime].temp;
        if (unit === "f") {
            dayTemp = CToF(data[day].hours[nextTime].temp);
        }
        let tempUnit = "°C";
        if (unit === "f") {
            tempUnit = "°F";
        }

        let dayNameArr = dayName.split(" ");
        let card = document.createElement("div");
        card.classList.add("flex-column");
        card.classList.add("mr-1");
        card.innerHTML = `
            <p class="small mb-1"><strong>${dayTemp}${tempUnit}</strong></p>
            <div style="width: 30px; height:26px; margin: auto;"><img src="${iconSrc}"></div>
            <p class="mb-0 mt-2"><strong>${dayNameArr[0]}</strong></p>
            <p class="mb-0 text-muted" style="font-size: 0.65rem">${dayNameArr[1]}</p>
        `;
        HOURS_SIDEBAR_CARDS.appendChild(card);
        nextTime += 5;
    }
}

//hàm xử lý dự báo thời tiết
// số lượng cards được render tự độgn theo mong muốn
function updateForecast(data, unit, type) {
    WEATHER_CARDS.innerHTML = "";
    let day = 0;
    let numCards = 0;
   // số card theo today or week 
    if (type === "day") {
        numCards = 24;
    } else {
        numCards = 4;
    }

    for (let i = 0; i < numCards; i++) {
        let dayName = getHour(data[day].datetime);
        if (type === "week") {
            dayName = getDayName(data[day].datetime);
        }

        let iconCondition = data[day].icon;
        let iconSrc = getIcon(iconCondition);

        let dayTemp = data[day].temp;
        if (unit === "f") {
            dayTemp = CToF(data[day].temp);
        }
        let tempUnit = "°C";
        if (unit === "f") {
            tempUnit = "°F";
        }

        if (type == "week") {
            let div1 = document.createElement("div");
            div1.classList.add("col-xs-12");
            div1.classList.add("col-sm-12");
            div1.classList.add("col-md-6");
            div1.classList.add("col-lg-6");
            div1.classList.add("col-xl-3");
            div1.classList.add("mb-4");
    
            div1.innerHTML = `
                <div class="card" style="color: #4B515D; border-radius: 20px; border: none;">
                    <div class="card-body p-3">
                        <div class="d-flex text-center">
                            <h6 class="flex-grow-1">${dayName}</h6>
                        </div>
    
                        <div class="d-flex flex-column text-center mt-1 mb-1">
                            <h6 class="display-7 mb-0 font-weight-bold" style="color: #1C2331;"> ${dayTemp}${tempUnit} </h6>
                            <span class="small" style="color: #868B94">${data[day].conditions}</span>
                        </div>
    
                        <div class="d-flex align-items-center">
                            <div class="flex-grow-1" style="font-size: 1rem;">
                                <div class="small"><i class="fas fa-wind fa-fw" style="color: #868B94;"></i>
                                    <span> ${data[day].windspeed} km/h
                                    </span></div>
                                <div class="small"><i class="fas fa-tint fa-fw" style="color: #868B94;"></i>
                                    <span> ${data[day].humidity}% </span>
                                </div>
                                <div class="small"><i class="fas fa-sun fa-fw" style="color: #868B94;"></i>
                                    <span> ${data[day].uvindex}h </span>
                                </div>
                            </div>
                            <div class="small img-mobile" style="width: 70px; height: 57px">
                                <img src="${iconSrc}">
                            </div>
                        </div>
    
                    </div>
                </div>
            `
            WEATHER_CARDS.appendChild(div1);
        } else {
            let card = document.createElement("div");
            card.classList.add("the2");
            card.classList.add("col-lg-2");
            card.classList.add("col-xs-3");
            card.classList.add("col-sm-3");
            card.classList.add("mr-1");

            card.innerHTML = `
                <div class="card2 card-mobile">
                    <h2 class="day-name mt-1">${dayName}</h2>
                    <div class="card-icon">
                    <img src="${iconSrc}" class="day-icon" alt="" />
                    </div>
                    <div class="day-temp">
                    <h2 class="temp">${dayTemp}<span class="thoi-tiet-unit">${tempUnit}</span></h2>
                    
                    </div>
                </div>
                
  		    `;
              WEATHER_CARDS.appendChild(card);
        }
        day++;
    }
}

// thay đổi icon theo tình trạng theo dieu kien
function getIcon(condition) {
    switch (condition) {
        case "partly-cloudy-day":
            return "static/img/27.png";
        case "partly-cloudy-night":
            return "static/img/15.png";
        case "rain":
            return "static/img/39.png";
        case "clear-day":
            return "static/img/26.png";
        case "clear-night":
            return "static/img/10.png";
        default:
            return "static/img/26.png";
    }
}

// thay doi hinh nen theo thoi tiet
function changeBackground(condition) {
    const body = document.querySelector("body");
    let bg = "";
    switch (condition) {
        case "partly-cloudy-day":
            bg = "static/img/pc.webp";
            break;
        case "partly-cloudy-night":
            bg = "static/img/pcn.jpeg";
            break;
        case "rain":
            bg = "static/img/rain.webp";
            break;
        case "clear-day":
            bg = "static/img/cd.jpeg";
            break;
        case "clear-night":
            bg = "static/img/cn.jpeg";
            break;
        default:
            bg = "static/img/pc.webp";
    }
    body.style.backgroundImage = `linear-gradient(rgb(97 97 97 / 50%), rgb(98 97 97 / 50%)),url(${bg})`;
}

function changeLocationBackground(city) {
    const body = document.querySelector(".img-location");
    fetch(
        `https://api.pexels.com/v1/search?query=${city}&per_page=1`,
        { method: "GET", headers: {
            Authorization: API_PEXELS
        } }
    )
        .then((response) => response.json())
        .then((data) => {
            bg = data.photos[0].src.medium;
            body.style.backgroundImage = `linear-gradient(rgb(60 60 60 / 50%), rgb(60 60 60 / 50%)),url(${bg})`;
            body.style.backgroundSize = "100% 100%";
        })
        .catch((err) => {
            alert("City not found in our database");
        });
}

// xử lý giờ, hours from hh:mm:ss
function getHour(time) {
    let hour = time.split(":")[0];
    let min = time.split(":")[1];
    if (hour > 12) {
        hour = hour - 12;
        return `${hour}:${min} PM`;
    } else {
        return `${hour}:${min} AM`;
    }
}

function timeFormat(time) {
    let hour = time.split(":")[0];
    let minute = time.split(":")[1];
    return hour + ":" + minute;
}

// lấy tên của ngày (moday, tuesday, ...)
function getDayName(date) {
    let day = new Date(date);
    return DAYS[day.getDay()];
}

// hàm xử lý trạng thái của độ ẩm
function updateHumidityStatus(humidity) {
    if (humidity <= 30) {
        HUMIDITY_STATUS.innerText = "Low";
    } else if (humidity <= 60) {
        HUMIDITY_STATUS.innerText = "Moderate";
    } else {
        HUMIDITY_STATUS.innerText = "High";
    }
}

// hàm xử lý trạng thái của tầm nhìn (Visibility)
function updateVisibilityStatus(visibility) {
    switch (true) {
        case visibility <= 0.03:
            VISIBILITY_STATUS.innerText = "Dense Fog";
            break;
        case visibility <= 0.16:
            VISIBILITY_STATUS.innerText = "Moderate Fog";
            break;
        case visibility <= 0.35:
            VISIBILITY_STATUS.innerText = "Light Fog";
            break;
        case visibility <= 1.13:
            VISIBILITY_STATUS.innerText = "Very Light Fog";
            break;
        case visibility <= 2.16:
            VISIBILITY_STATUS.innerText = "Light Mist";
            break;
        case visibility <= 5.4:
            VISIBILITY_STATUS.innerText = "Very Light Mist";
            break;
        case visibility <= 10.8:
            VISIBILITY_STATUS.innerText = "Clear Air";
            break;
        default:
            VISIBILITY_STATUS.innerText = "Very Clear Air";
    }
}

// Hàm xử lý lượng mưa
function updateAirQualityStatus(quality) {
    switch (true) {
        case quality <= 50:
            AIR_QUALITY_STATUS.innerText = "Good👌";
            break;
        case quality <= 100:
            AIR_QUALITY_STATUS.innerText = "Moderate😐";
            break;
        case quality <= 150:
            AIR_QUALITY_STATUS.innerText = "Unhealthy for Sensitive Groups😷";
            break;
        case quality <= 200:
            AIR_QUALITY_STATUS.innerText = "Unhealthy😷";
            break;
        case quality <= 250:
            AIR_QUALITY_STATUS.innerText = "Very Unhealthy😨";
            break;
        default:
            AIR_QUALITY_STATUS.innerText = "Hazardous😱";
    }
}

// chuyển từ độ C sang độ F
function CToF(temp) {
    return ((temp * 9) / 5 + 32).toFixed(1);
}

// xử lý sự kiện chuyển đổi từ độ c sang f, ngược lại
F_BTN.addEventListener("click", () => {
    changeUnit("f");
});

C_BTN.addEventListener("click", () => {
    changeUnit("c");
});

function changeUnit(unit) {
    if (currentUnit !== unit) {
        currentUnit = unit;
        TEMP_UNIT.forEach((elem) => {
            elem.innerText = `°${unit.toUpperCase()}`;
        });
        if (unit === "c") {
            C_BTN.classList.add("active");
            F_BTN.classList.remove("active");
        } else {
            C_BTN.classList.remove("active");
            F_BTN.classList.add("active");
        }
        if (currentCity === "") {
            currentCity = "Ho Chi Minh City";
        }
        getWeatherData(currentCity, currentUnit, hourlyOrWeek);
    }
}

// xử lý sự kiện chuyển đổi từ hourly hoặc week
HOURLY_BTN.addEventListener("click", () => {
    changeTimeSpan("hourly");
});

WEEK_BTN.addEventListener("click", () => {
    changeTimeSpan("week");
});

function changeTimeSpan(unit) {
    if (hourlyOrWeek !== unit) {
        hourlyOrWeek = unit;
        if (unit === "hourly") {
            HOURLY_BTN.classList.add("active");
            WEEK_BTN.classList.remove("active");
        } else {
            HOURLY_BTN.classList.remove("active");
            WEEK_BTN.classList.add("active");
        }
        if (currentCity === "") {
            currentCity = "Ho Chi Minh City";
        }
        getWeatherData(currentCity, currentUnit, hourlyOrWeek);
    }
}
