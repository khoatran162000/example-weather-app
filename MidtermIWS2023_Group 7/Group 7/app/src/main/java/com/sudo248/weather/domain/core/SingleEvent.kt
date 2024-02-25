package com.sudo248.weather.domain.core

import androidx.lifecycle.LiveData
import kotlinx.coroutines.flow.StateFlow


/**
 * **Created by**
 * @author *Sudo248*
 * @since 14:44 - 17/02/2023
 */

/**
 * Single event to create event only and only handler once
 *
 * When use [LiveData] to observer or [StateFlow] to collect a data [T] and you want handle that data **once** latest
 *
 *
 */
data class SingleEvent<T>(private val _value: T) {

    private var isHandled = false

    fun getValueIfNotHandled(): T? {
        if (isHandled) return null
        isHandled = true
        return _value
    }

    val value: T?
        get() = getValueIfNotHandled()

    fun requiredValue() = _value

    fun isHandled() = isHandled

    fun reset() {
        isHandled = false
    }
}