package com.sudo248.weather.data.model.responses.weather

import com.sudo248.weather.data.model.responses.Value

data class Past24HourTemperatureDeparture(
    val Imperial: Value,
    val Metric: Value
)