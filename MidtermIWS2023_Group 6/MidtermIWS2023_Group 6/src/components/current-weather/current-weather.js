import React from "react";
import "./current-weather.css";

const CurrentWeather = ({ data }) => {
  return (
    <div className="weather">
      <div className="top">
        <div>
          <p className="city">{data.city}</p>
          <p className="weather-description">{data.weather[0].description}</p>
        </div>
        <img
          alt="weather"
          className="weather-icon"
          src={`icons/${data.weather[0].icon}.png`}
        />
      </div>
      <div className="bottom">
        <p className="temperature">{Math.round(data.main.temp)}°C</p>
        <div className="details">
          <div className="current-weather-row">
            <span className="current-weather-label">Feels like</span>
            <span className="current-weather-value">
              {Math.round(data.main.feels_like)}°C
            </span>
          </div>
          <div className="current-weather-row">
            <span className="current-weather-label">Wind</span>
            <span className="current-weather-value">{data.wind.speed} m/s</span>
          </div>
          <div className="current-weather-row">
            <span className="current-weather-label">Humidity</span>
            <span className="current-weather-value">{data.main.humidity}%</span>
          </div>
          <div className="current-weather-row">
            <span className="current-weather-label">Pressure</span>
            <span className="current-weather-value">
              {data.main.pressure} hPa
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
