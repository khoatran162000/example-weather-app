package com.sudo248.weather.data.model.responses.weather

import com.sudo248.weather.data.model.responses.Value

data class Past9Hours(
    val Imperial: Value,
    val Metric: Value
)