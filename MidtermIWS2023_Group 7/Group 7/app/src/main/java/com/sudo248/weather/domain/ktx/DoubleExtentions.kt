package com.sudo248.weather.domain.ktx

fun Double.celsiusToFahrenheit(): Double = this * 1.8 + 32.0

fun Double.fahrenheitToCelsius(): Double = (this - 32.0) / 1.8

fun Double.cToF(): Double = celsiusToFahrenheit()

fun Double.fToC(): Double = fahrenheitToCelsius()

fun Double.format(digit: Int):String {
    return String.format("%.${digit}f", this)
}

fun Double.toCelsius(unit: String = "C"): Double {
    return if (unit == "C") this else this.fToC()
}