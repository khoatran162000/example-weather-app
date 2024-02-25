package com.sudo248.weather.data.mapper

import com.sudo248.weather.data.localDateTimeFromString
import com.sudo248.weather.data.model.responses.daily_weather.DailyForecast
import com.sudo248.weather.data.model.responses.daily_weather.DailyWeatherResponse
import com.sudo248.weather.data.model.responses.daily_weather.Headline
import com.sudo248.weather.domain.entity.DailyWeather
import com.sudo248.weather.domain.ktx.toCelsius


/**
 * **Created by**
 *
 * @author *Sudo248*
 * @since 21:01 - 17/03/2023
 */

fun DailyWeatherResponse.toDomainModel(isGetTextHeadline: Boolean = true): List<DailyWeather> {
    val textHeadline = if(isGetTextHeadline) this.Headline.Text else null
    return this.DailyForecasts.map {
        it.toDomainModel(textHeadline = textHeadline, Headline.MobileLink)
    }
}

fun DailyForecast.toDomainModel(textHeadline: String? = null, link: String? = null): DailyWeather{
    return DailyWeather(
        iconId = this.Day.Icon,
        text = textHeadline ?: this.Day.ShortPhrase,
        dateTime = localDateTimeFromString(this.Date),
        maxTemperature = this.Temperature.Maximum.Value.toCelsius(Temperature.Maximum.Unit),
        minTemperature = this.Temperature.Minimum.Value.toCelsius(Temperature.Minimum.Unit),
        sunRiseTime = localDateTimeFromString(this.Sun.Rise),
        sunSetTime = localDateTimeFromString(this.Sun.Set),
        hoursOfSun = this.HoursOfSun,
        airQuality = this.AirAndPollen[0].Value,
        dayRainProbability = this.Day.RainProbability,
        nightRainProbability = this.Night.RainProbability,
        link = link ?: this.Link
    )
}