package com.sudo248.weather.data.repository

import android.annotation.SuppressLint
import android.util.Log
import com.google.android.gms.location.FusedLocationProviderClient
import com.google.android.gms.location.Priority
import com.sudo248.weather.domain.core.DataState
import com.sudo248.weather.domain.core.state
import com.sudo248.weather.data.api.LocationApi
import com.sudo248.weather.data.mapper.toDomainModel
import com.sudo248.weather.data.utils.handlerResponse
import com.sudo248.weather.domain.entity.Location
import com.sudo248.weather.domain.repository.LocationRepository
import javax.inject.Inject
import kotlin.coroutines.resume
import kotlin.coroutines.suspendCoroutine


/**
 * **Created by**
 *
 * @author *Sudo248*
 * @since 20:08 - 17/03/2023
 */
class LocationRepositoryImpl @Inject constructor(
    private val locationApi: LocationApi,
    private val fusedLocationProviderClient: FusedLocationProviderClient,
) : LocationRepository {
    override suspend fun getLocationKey(location: String): DataState<String, Exception> = state {
        val response = locationApi.searchLocationByName(name = location)
        val locations = handlerResponse(response)
        locations[0].Key
    }

    override suspend fun getCurrentLocation(): DataState<Location, Exception> = state {
        val location = requestCurrentLocation()
        val response = locationApi.searchLocationByLatLng(latLng = "${location.latitude},${location.longitude}")
        val locationResponse = handlerResponse(response)
        Log.d(
            "Sudoo",
            "getCurrentLocation: $locationResponse"
        )
        locationResponse.toDomainModel()
    }

    @SuppressLint("MissingPermission")
    private suspend fun requestCurrentLocation(): android.location.Location = suspendCoroutine {
        fusedLocationProviderClient.getCurrentLocation(Priority.PRIORITY_HIGH_ACCURACY, null)
            .addOnSuccessListener { location ->
                Log.d(
                    "Sudoo",
                    "requestCurrentLocation: ${location.latitude},${location.longitude}"
                )
                it.resume(location)
            }
    }
}