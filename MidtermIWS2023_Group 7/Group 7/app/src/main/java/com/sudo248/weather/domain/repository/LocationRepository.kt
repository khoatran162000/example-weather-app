package com.sudo248.weather.domain.repository

import com.sudo248.weather.domain.core.DataState
import com.sudo248.weather.domain.entity.Location

interface LocationRepository {
    suspend fun getLocationKey(location: String): DataState<String, Exception>
    suspend fun getCurrentLocation(): DataState<Location, Exception>
}