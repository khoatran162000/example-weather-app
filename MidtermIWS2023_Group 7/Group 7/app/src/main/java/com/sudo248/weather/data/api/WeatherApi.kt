package com.sudo248.weather.data.api

import com.sudo248.weather.BuildConfig
import com.sudo248.weather.data.model.responses.daily_weather.DailyWeatherResponse
import com.sudo248.weather.data.model.responses.hourly_weather.HourlyWeatherResponse
import com.sudo248.weather.data.model.responses.weather.WeatherResponse
import retrofit2.Response
import retrofit2.http.GET
import retrofit2.http.Path
import retrofit2.http.Query

interface WeatherApi {
    // http://dataservice.accuweather.com/forecasts/v1/daily/{numberDays}day/{locationKey}
    // http://dataservice.accuweather.com/forecasts/v1/daily/1day/425639?apikey=07A6LEBX3MkoX11P3zMi06DUrte6NZWF&details=true&language=vi-vn
    @GET("forecasts/v1/daily/{numberDays}day/{locationKey}")
    suspend fun getWeatherDaily(
        @Path("locationKey") locationKey: String = "425639",
        @Path("numberDays") day: Int = 1,
        @Query("apikey") apiKey: String = BuildConfig.API_KEY,
        @Query("details") details: Boolean = true,
        @Query("language") language: String = BuildConfig.LANGUAGE,
    ): Response<DailyWeatherResponse>

    // http://dataservice.accuweather.com/currentconditions/v1/{locationKey}
    // http://dataservice.accuweather.com/currentconditions/v1/425639
    @GET(EndPoint.CURRENT_DETAIL)
    suspend fun getWeatherDetailCurrentDay(
        @Path("locationKey") locationKey: String,
        @Query("apikey") apiKey: String = BuildConfig.API_KEY,
        @Query("details") details: Boolean = true,
        @Query("language") language: String = BuildConfig.LANGUAGE,
    ): Response<WeatherResponse>

    @GET(EndPoint.HOURLY_WEATHER)
    suspend fun getWeatherHourly(
        @Path("locationKey") locationKey: String,
        @Path("numberHours") hours: Int,
        @Query("apikey") apiKey: String = BuildConfig.API_KEY,
        @Query("details") details: Boolean = true,
        @Query("language") language: String = BuildConfig.LANGUAGE,
    ): Response<List<HourlyWeatherResponse>>
}