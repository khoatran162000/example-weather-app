package com.sudo248.weather.domain.entity

import com.sudo248.weather.ui.activity.main.adapter.ItemDiff
import java.time.LocalDateTime


/**
 * **Created by**
 *
 * @author *Sudo248*
 * @since 21:47 - 19/03/2023
 */
data class HourlyWeather(
    val time: LocalDateTime,
    val temperature: Double,
    val iconId: Int,
    val windDirect: String,
    val windSpeed: Double
) : ItemDiff {
    override fun isContentTheSame(other: ItemDiff): Boolean {
        return this == other
    }

    override fun isItemTheSame(other: ItemDiff): Boolean {
        val hourlyWeather = other as HourlyWeather
        return this.time.second == hourlyWeather.time.second
    }
}