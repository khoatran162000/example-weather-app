package com.sudo248.weather.data.model.responses.weather

import com.sudo248.weather.data.model.responses.weather.Maximum
import com.sudo248.weather.data.model.responses.weather.Minimum

data class Past6HourRange(
    val Maximum: Maximum,
    val Minimum: Minimum
)