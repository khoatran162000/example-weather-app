package com.sudo248.weather.ui.activity.main

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.sudo248.weather.domain.core.UiState
import com.sudo248.weather.domain.core.SingleEvent
import com.sudo248.weather.domain.core.onError
import com.sudo248.weather.domain.core.onSuccess
import com.sudo248.weather.domain.entity.DailyWeather
import com.sudo248.weather.domain.entity.HourlyWeather
import com.sudo248.weather.domain.entity.Location
import com.sudo248.weather.domain.entity.Weather
import com.sudo248.weather.domain.repository.LocationRepository
import com.sudo248.weather.domain.repository.WeatherRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.*
import javax.inject.Inject
import kotlin.coroutines.CoroutineContext


/**
 * **Created by**
 *
 * @author *Sudo248*
 * @since 21:14 - 17/03/2023
 */
@HiltViewModel
class MainViewModel @Inject constructor(
    private val locationRepo: LocationRepository,
    private val weatherRepo: WeatherRepository,
) : ViewModel(), CoroutineScope {

    override val coroutineContext: CoroutineContext
        get() = Dispatchers.Main.immediate + SupervisorJob()

    private val _stateScreen = MutableLiveData(UiState.IDLE)
    val stateScreen: LiveData<UiState> = _stateScreen

    fun setState(state: UiState) {
        _stateScreen.postValue(state)
    }

    private val _location = MutableLiveData<Location>()
    val location: LiveData<Location> = _location

    private val _weatherDetail = MutableLiveData<Weather>()
    val weatherDetail: LiveData<Weather> = _weatherDetail

    private val _weather5Days = MutableLiveData<List<DailyWeather>>()
    val weather5Days: LiveData<List<DailyWeather>> = _weather5Days

    private val _weather4Hours = MutableLiveData<List<HourlyWeather>>()
    val weather4Hours: LiveData<List<HourlyWeather>> = _weather4Hours

    var error: SingleEvent<String?>? = null

    private lateinit var locationKey: String

    fun loadCurrentWeather() = launch {
        setState(UiState.LOADING)
        val location = withContext(Dispatchers.IO) { locationRepo.getCurrentLocation() }

        if (location.isError) {
            error = SingleEvent(location.getErrorOrNull()?.message)
            setState(UiState.ERROR)
            return@launch
        }
        _location.postValue(location.get())
        locationKey = location.get().key
        getWeather()
    }

    private fun getWeather() = launch {

        setState(UiState.LOADING)
        val weatherDetail = async(Dispatchers.IO) {
            weatherRepo.getWeatherDetail(locationKey)
                .onSuccess {
                    _weatherDetail.postValue(it)
                }
                .onError {
                    error = SingleEvent(it.message)
                }
        }
        val weather5Days = async(Dispatchers.IO) {
            weatherRepo.getWeatherDaily(5, locationKey)
                .onSuccess {
                    _weather5Days.postValue(it)
                }
                .onError {
                    error = SingleEvent(it.message)
                }
        }
        val weather4Hours = async(Dispatchers.IO) {
            weatherRepo.getWeatherHourly(4, locationKey)
                .onSuccess {
                    _weather4Hours.postValue(it)
                }
                .onError {
                    error = SingleEvent(it.message)
                }
        }
        awaitAll(weatherDetail, weather5Days, weather4Hours)
        if (error != null && error?.isHandled() == false) {
            setState(UiState.ERROR)
        } else {
            setState(UiState.SUCCESS)
        }
    }

    override fun onCleared() {
        super.onCleared()
        cancel("onCleared ${this::class.simpleName} -> cancel coroutine ${coroutineContext[CoroutineName]}")
    }
}