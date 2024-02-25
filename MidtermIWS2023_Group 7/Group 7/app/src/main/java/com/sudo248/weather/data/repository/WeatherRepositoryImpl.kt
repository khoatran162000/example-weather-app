package com.sudo248.weather.data.repository

import com.sudo248.weather.domain.core.DataState
import com.sudo248.weather.domain.core.state
import com.sudo248.weather.data.api.WeatherApi
import com.sudo248.weather.data.mapper.toDomainModel
import com.sudo248.weather.data.utils.handlerResponse
import com.sudo248.weather.domain.entity.DailyWeather
import com.sudo248.weather.domain.entity.HourlyWeather
import com.sudo248.weather.domain.entity.Weather
import com.sudo248.weather.domain.repository.WeatherRepository
import javax.inject.Inject
import javax.inject.Singleton


/**
 * **Created by**
 *
 * @author *Sudo248*
 * @since 20:58 - 17/03/2023
 */

@Singleton
class WeatherRepositoryImpl @Inject constructor(
    private val weatherApi: WeatherApi
) : WeatherRepository {
    override suspend fun getWeatherDaily(
        day: Int,
        locationKey: String
    ): DataState<List<DailyWeather>, Exception> = state {
        val response = weatherApi.getWeatherDaily(locationKey = locationKey, day = day)
        val dailyWeathers = handlerResponse(response)
        if (day == 1) {
            dailyWeathers.toDomainModel()
        } else {
            dailyWeathers.toDomainModel(isGetTextHeadline = false)
        }
    }

    override suspend fun getWeatherHourly(
        hour: Int,
        locationKey: String
    ): DataState<List<HourlyWeather>, Exception> = state {
        val response = weatherApi.getWeatherHourly(locationKey = locationKey, hours = 12)
        val hourlyWeather = handlerResponse(response)
        hourlyWeather.subList(0, hour).map { it.toDomainModel() }
    }

    override suspend fun getWeatherDailyOneDay(locationKey: String): DataState<DailyWeather, Exception> =
        state {
            val response = weatherApi.getWeatherDaily(locationKey = locationKey, day = 1)
            val dailyWeathers = handlerResponse(response)
            dailyWeathers.toDomainModel().first()
        }

    override suspend fun getWeatherDetail(locationKey: String): DataState<Weather, Exception> =
        state {
            val response = weatherApi.getWeatherDetailCurrentDay(locationKey = locationKey)
            val weather = handlerResponse(response)
            weather.toDomainModel().first()
        }
}