package com.sudo248.weather.data.api

import com.sudo248.weather.BuildConfig
import com.sudo248.weather.data.model.responses.location.LocationResponse
import retrofit2.Response
import retrofit2.http.GET
import retrofit2.http.Query

interface LocationApi {
    @GET(EndPoint.SEARCH_LOCATION_NAME)
    suspend fun searchLocationByName(
        @Query("q") name: String,
        @Query("apikey") apiKey: String = BuildConfig.API_KEY,
    ): Response<List<LocationResponse>>

    // locations/v1/cities/geoposition/search
    // http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=07A6LEBX3MkoX11P3zMi06DUrte6NZWF&q=20.953,105.756
    @GET(EndPoint.SEARCH_LOCATION_LAT_LNG)
    suspend fun searchLocationByLatLng(
        @Query("q") latLng: String,
        @Query("apikey") apiKey: String = BuildConfig.API_KEY,
    ): Response<LocationResponse>

}