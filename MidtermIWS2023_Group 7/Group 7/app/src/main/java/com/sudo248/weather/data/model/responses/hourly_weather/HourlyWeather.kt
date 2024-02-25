package com.sudo248.weather.data.model.responses.hourly_weather

import com.sudo248.weather.data.model.responses.Value
import com.sudo248.weather.data.model.responses.daily_weather.Wind
import com.sudo248.weather.data.model.responses.daily_weather.WindGust


/**
 * **Created by**
 *
 * @author *Sudo248*
 * @since 21:12 - 19/03/2023
 */
data class HourlyWeatherResponse(
    val DateTime: String,
    val EpochDateTime: Int,
    val WeatherIcon: Int,
    val IconPhrase: String,
    val HasPrecipitation: Boolean,
    val PrecipitationType: String,
    val PrecipitationIntensity: String,
    val IsDaylight: Boolean,
    val Temperature: Value,
    val RealFeelTemperature: Value,
    val RealFeelTemperatureShade: Value,
    val WetBulbTemperature: Value,
    val DewPoint: Value,
    val Wind: Wind,
    val WindGust: WindGust,
    val RelativeHumidity: Int,
    val IndoorRelativeHumidity: Int,
    val Visibility: Value,
    val Ceiling: Value,
    val UVIndex: Int,
    val UVIndexText: String,
    val PrecipitationProbability: Int,
    val ThunderstormProbability: Int,
    val RainProbability: Int,
    val SnowProbability: Int,
    val IceProbability: Int,
    val TotalLiquid: Value,
    val Rain: Value,
    val Snow: Value,
    val Ice: Value,
    val CloudCover: Int,
    val Evapotranspiration: Value,
    val SolarIrradiance: Value,
    val MobileLink: String,
    val Link: String,
)