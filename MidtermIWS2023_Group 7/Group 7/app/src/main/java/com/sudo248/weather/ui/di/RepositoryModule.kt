package com.sudo248.weather.ui.di

import com.sudo248.weather.data.repository.LocationRepositoryImpl
import com.sudo248.weather.data.repository.WeatherRepositoryImpl
import com.sudo248.weather.domain.repository.LocationRepository
import com.sudo248.weather.domain.repository.WeatherRepository
import dagger.Binds
import dagger.Module
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import javax.inject.Singleton


/**
 * **Created by**
 *
 * @author *Sudo248*
 * @since 21:07 - 17/03/2023
 */

@Module
@InstallIn(SingletonComponent::class)
abstract class RepositoryModule {

    @Binds
    abstract fun bindLocationRepository(impl: LocationRepositoryImpl): LocationRepository

    @Binds
    abstract fun bindWeatherRepository(impl: WeatherRepositoryImpl): WeatherRepository
}