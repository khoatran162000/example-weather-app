package com.sudo248.weather.data.model.responses.daily_weather

data class AirAndPollen(
    val Category: String,
    val CategoryValue: Int,
    val Name: String,
    val Type: String,
    val Value: Int
)