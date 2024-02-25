package com.sudo248.weather.data.api


/**
 * **Created by**
 *
 * @author *Sudo248*
 * @since 07:31 - 20/03/2023
 */
object EndPoint {
    const val SEARCH_LOCATION_NAME = "locations/v1/cities/VN/search"
    const val SEARCH_LOCATION_LAT_LNG = "locations/v1/cities/geoposition/search"
    const val DAILY_WEATHER = "forecasts/v1/daily/{numberDays}day/{locationKey}"
    const val CURRENT_DETAIL = "currentconditions/v1/{locationKey}"
    const val HOURLY_WEATHER = "forecasts/v1/hourly/{numberHours}hour/{locationKey}"
}