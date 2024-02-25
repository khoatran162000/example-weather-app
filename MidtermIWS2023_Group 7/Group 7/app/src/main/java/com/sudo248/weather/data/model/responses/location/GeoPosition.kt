package com.sudo248.weather.data.model.responses.location

import com.sudo248.weather.data.model.responses.location.Elevation

data class GeoPosition(
    val Elevation: Elevation,
    val Latitude: Double,
    val Longitude: Double
)