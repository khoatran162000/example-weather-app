package com.sudo248.weather.data

import java.time.LocalDateTime

val LocalDateTime.hourMinutes get() = "${hour}:${String.format("%02d", minute)}"

fun localDateTimeFromString(dateTime: String): LocalDateTime {
    val _dateTime = if (dateTime.contains('+')) {
        dateTime.substringBefore('+')
    } else {
        dateTime.substringBeforeLast('-')
    }
    return LocalDateTime.parse(_dateTime)
}