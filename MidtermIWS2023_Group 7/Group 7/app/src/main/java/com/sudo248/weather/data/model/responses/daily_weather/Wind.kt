package com.sudo248.weather.data.model.responses.daily_weather

import com.sudo248.weather.data.model.responses.Value

data class Wind(
    val Direction: Direction,
    val Speed: Value
)