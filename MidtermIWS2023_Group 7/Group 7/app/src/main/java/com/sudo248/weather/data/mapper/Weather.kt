package com.sudo248.weather.data.mapper

import com.sudo248.weather.data.localDateTimeFromString
import com.sudo248.weather.data.model.responses.weather.WeatherResponse
import com.sudo248.weather.data.model.responses.weather.WeatherResponseItem
import com.sudo248.weather.domain.entity.Weather
import com.sudo248.weather.domain.ktx.toCelsius


/**
 * **Created by**
 *
 * @author *Sudo248*
 * @since 21:06 - 17/03/2023
 */

fun WeatherResponseItem.toDomainModel(): Weather {
    return Weather(
        iconId = WeatherIcon,
        isDayNight = IsDayTime,
        date = localDateTimeFromString(this.LocalObservationDateTime),
        weatherText = this.WeatherText,
        temperature = this.Temperature.Metric.Value,
        realFeelTemperature = this.RealFeelTemperature.Metric.Value,
        realFeelTemperatureShade = this.RealFeelTemperatureShade.Metric.Value,
        relativeHumidity = this.RelativeHumidity,
        indoorRelativeHumidity = this.IndoorRelativeHumidity,
        dewPoint = this.DewPoint.Metric.Value,
        directionWind = this.Wind.Direction.Localized,
        speedWind = this.Wind.Speed.Metric.Value,
        uVIndex = this.UVIndex,
        uVIndexText = this.UVIndexText,
        visibility = this.Visibility.Metric.Value,
        obstructionsToVisibility = this.ObstructionsToVisibility,
        cloudCover = this.CloudCover,
        pressure = this.Pressure.Metric.Value,
        past24HourTemperatureDeparture = this.Past24HourTemperatureDeparture.Imperial.Value,
        precipitationSummary = this.PrecipitationSummary.Precipitation.Metric.Value,
        link = this.Link
    )
}

fun WeatherResponse.toDomainModel(): List<Weather>{
    return this.map { it.toDomainModel() }
}