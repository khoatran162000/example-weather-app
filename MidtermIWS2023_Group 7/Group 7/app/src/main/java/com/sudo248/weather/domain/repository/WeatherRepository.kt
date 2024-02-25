package com.sudo248.weather.domain.repository

import com.sudo248.weather.domain.core.DataState
import com.sudo248.weather.domain.entity.DailyWeather
import com.sudo248.weather.domain.entity.HourlyWeather
import com.sudo248.weather.domain.entity.Weather

interface WeatherRepository {
    suspend fun getWeatherDaily(day: Int, locationKey: String): DataState<List<DailyWeather>, Exception>
    suspend fun getWeatherHourly(hour: Int, locationKey: String): DataState<List<HourlyWeather>, Exception>
    suspend fun getWeatherDailyOneDay(locationKey: String): DataState<DailyWeather, Exception>
    suspend fun getWeatherDetail(locationKey: String): DataState<Weather, Exception>
}