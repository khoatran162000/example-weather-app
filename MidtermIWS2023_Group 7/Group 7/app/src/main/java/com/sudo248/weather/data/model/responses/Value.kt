package com.sudo248.weather.data.model.responses

data class Value(
    val Unit: String = "",
    val UnitType: Int = -1,
    val Value: Double = -1.0,
    val Phrase: String? = null,
)
