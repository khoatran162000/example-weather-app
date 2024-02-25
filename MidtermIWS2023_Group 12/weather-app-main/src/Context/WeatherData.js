import { createContext, useState, useContext, useEffect } from "react";
import { locationContext } from "./locationProvider";
import { initValue } from "../initValue/initValue";
import FilterWeatherData from "../initValue/rederData";

const WeatherDataContext = createContext();

function WeatherDataProvider({ children }) {
    // get location data
    const locationState = useContext(locationContext);
    const [weatherData, setWeatherData] = useState(initValue);

    // call api to get weather data
    useEffect(() => {
        fetch(
            `http://api.weatherapi.com/v1/forecast.json?key=d4424ea4c41047f295e35146232903&q=${locationState.locationState.lat},${locationState.locationState.lon}&days=7&aqi=yes&alerts=no`,
        )
            .then((res) => res.json())
            .then((post) => {
                setWeatherData(FilterWeatherData(post));
            });
    }, [locationState.locationState]);

    return (
        <WeatherDataContext.Provider value={weatherData}>
            {children}
        </WeatherDataContext.Provider>
    );
}

export { WeatherDataProvider, WeatherDataContext };
