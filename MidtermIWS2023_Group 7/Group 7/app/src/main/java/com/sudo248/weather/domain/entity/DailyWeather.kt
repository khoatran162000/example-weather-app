package com.sudo248.weather.domain.entity

import com.sudo248.weather.ui.activity.main.adapter.ItemDiff
import java.time.LocalDateTime

data class DailyWeather(
    val iconId: Int,
    val dateTime: LocalDateTime,
    val text: String,
    val maxTemperature: Double,
    val minTemperature: Double,
    val sunRiseTime: LocalDateTime,
    val sunSetTime: LocalDateTime,
    val hoursOfSun: Double,
    val airQuality: Int,
    val dayRainProbability: Int,
    val nightRainProbability: Int,
    val link: String?
) : ItemDiff {
    var avgTemperature: Double? = null
        get() = field ?: ((maxTemperature + minTemperature) / 2).also { avgTemperature = it }
    val rainProbability: Int
        get() = if (dateTime.hour > 16) nightRainProbability else dayRainProbability

    override fun isContentTheSame(other: ItemDiff): Boolean {
        return this == other
    }

    override fun isItemTheSame(other: ItemDiff): Boolean {
        val otherDailyWeather = other as DailyWeather
        return this.dateTime.second == otherDailyWeather.dateTime.second
    }
}
