package com.sudo248.weather.data.model.responses.weather

data class WeatherResponseItem(
    val ApparentTemperature: ApparentTemperature,
    val Ceiling: Ceiling,
    val CloudCover: Int,
    val DewPoint: DewPoint,
    val EpochTime: Int,
    val HasPrecipitation: Boolean,
    val IndoorRelativeHumidity: Int,
    val IsDayTime: Boolean,
    val Link: String,
    val LocalObservationDateTime: String,
    val MobileLink: String,
    val ObstructionsToVisibility: String,
    val Past24HourTemperatureDeparture: Past24HourTemperatureDeparture,
    val Precip1hr: Precip1hr,
    val PrecipitationSummary: PrecipitationSummary,
    val PrecipitationType: String,
    val Pressure: Pressure,
    val PressureTendency: PressureTendency,
    val RealFeelTemperature: RealFeelTemperature,
    val RealFeelTemperatureShade: RealFeelTemperatureShade,
    val RelativeHumidity: Int,
    val Temperature: Temperature,
    val TemperatureSummary: TemperatureSummary,
    val UVIndex: Int,
    val UVIndexText: String,
    val Visibility: Visibility,
    val WeatherIcon: Int,
    val WeatherText: String,
    val WetBulbTemperature: WetBulbTemperature,
    val Wind: Wind,
    val WindChillTemperature: WindChillTemperature,
    val WindGust: WindGust
)