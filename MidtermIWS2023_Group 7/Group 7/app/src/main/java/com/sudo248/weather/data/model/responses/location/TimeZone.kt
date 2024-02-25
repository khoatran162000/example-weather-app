package com.sudo248.weather.data.model.responses.location

data class TimeZone(
    val Code: String,
    val GmtOffset: Double,
    val IsDaylightSaving: Boolean,
    val Name: String,
    val NextOffsetChange: String? = null
)