package com.sudo248.weather.data.mapper

import com.sudo248.weather.data.localDateTimeFromString
import com.sudo248.weather.data.model.responses.hourly_weather.HourlyWeatherResponse
import com.sudo248.weather.domain.entity.HourlyWeather
import com.sudo248.weather.domain.ktx.toCelsius


/**
 * **Created by**
 *
 * @author *Sudo248*
 * @since 22:11 - 19/03/2023
 */

fun HourlyWeatherResponse.toDomainModel(): HourlyWeather {
    return HourlyWeather(
        time = localDateTimeFromString(this.DateTime),
        temperature = this.Temperature.Value.toCelsius(Temperature.Unit),
        iconId = this.WeatherIcon,
        windDirect = this.Wind.Direction.Localized,
        windSpeed = this.Wind.Speed.Value
    )
}