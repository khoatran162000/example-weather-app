function AirQuality(index) {
    if (index < 2) {
        return {
            index: index,
            text: "Good",
            color: "lime-500",
        };
    } else if (index < 7) {
        return {
            index: index,
            text: "Rather",
            color: "yellow-400",
        };
    } else if ((index = 7)) {
        return {
            index: index,
            text: "Bad",
            color: "red-400",
        };
    } else if (index > 7) {
        return {
            index: index,
            text: "Unhealthy",
            color: "red-900",
        };
    }
}

// check day
function weekDay(index) {
    const today = new Date();
    let todayIndex = today.getDay();
    todayIndex += index;

    if (todayIndex > 12) {
        todayIndex = 0;
    }
    if (todayIndex > 6) {
        todayIndex -= 7;
    }

    switch (todayIndex) {
        case 0:
            return "Sun";
        case 1:
            return "Mon";
        case 2:
            return "Tue";
        case 3:
            return "Wed";
        case 4:
            return "Thu";
        case 5:
            return "Fri";
        case 6:
            return "Sat";
        default:
            return "index flase";
    }
}
function week(data, index) {
    // data is a element at initValue.forecast.forecastday get date, condition,temp
    return {
        date: index === 0 ? "Today" : weekDay(index),
        condition: data.day.condition,
        temp: {
            temp_max: data.day.maxtemp_c,
            temp_min: data.day.mintemp_c,
        },
    };
}
function hour(data) {
    // hour will get time,temp_c,humidity,condition 'weather type, icon', wind,Visibility,uv

    return {
        time: data.time.slice(10),
        temp_c: data.temp_c,
        humidity: data.humidity,
        condition: data.condition,
        wind: {
            wind_kph: data.wind_kph,
            wind_dir: data.wind_dir,
        },
        uv: data.uv,
        visibility: data.vis_km,
    };
}
const FilterWeatherData = (data) => {
    const current = data.current;
    const WeatherData = {
        Now: {
            location: data.location.name,
            time: {
                hour: current.last_updated.slice(10),
                weekDay: weekDay(0),
                date: current.last_updated.slice(0, 10),
            },
            condition: current.condition,
            air_quality: AirQuality(current.air_quality["us-epa-index"]),
            temp_c: current.temp_c,
            humidity: current.humidity,
            visibility: current.vis_km,
            wind: {
                wind_kph: current.wind_kph,
                wind_dir: current.wind_dir,
            },
            uv: current.uv,
            suntype: {
                sunrise: data.forecast.forecastday[0].astro.sunrise,
                sunset: data.forecast.forecastday[0].astro.sunset,
            },
            hourly: data.forecast.forecastday[0].hour.map((item) => hour(item)),
            pressure: current.pressure_mb,
        },
        week: data.forecast.forecastday.map((item, index) => week(item, index)),
    };
    return WeatherData;
};

export default FilterWeatherData;
