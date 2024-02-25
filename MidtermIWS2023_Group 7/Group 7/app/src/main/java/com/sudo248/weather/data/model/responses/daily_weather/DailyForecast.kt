package com.sudo248.weather.data.model.responses.daily_weather

data class DailyForecast(
    val AirAndPollen: List<AirAndPollen>,
    val Date: String,
    val Day: Day,
    val DegreeDaySummary: DegreeDaySummary,
    val EpochDate: Int,
    val HoursOfSun: Double,
    val Link: String,
    val MobileLink: String,
    val Moon: Moon,
    val Night: Night,
    val RealFeelTemperature: RealFeelTemperature,
    val RealFeelTemperatureShade: RealFeelTemperatureShade,
    val Sources: List<String>,
    val Sun: Sun,
    val Temperature: Temperature
)