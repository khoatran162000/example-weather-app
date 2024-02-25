package com.sudo248.weather.data.model.responses.daily_weather

data class DailyWeatherResponse(
    val DailyForecasts: List<DailyForecast>,
    val Headline: Headline
)