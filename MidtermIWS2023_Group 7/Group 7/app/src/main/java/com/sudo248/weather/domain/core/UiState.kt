package com.sudo248.weather.domain.core

/**
 * ## Created by
 * @author **Sudo248**
 * @since 00:00 - 15/08/2022
 */

/**
 * Description for state of screen
 * - [IDLE]: this screen in background
 * - [SUCCESS]: this screen in foreground and run
 * - [LOADING]: this screen in loading
 * - [ERROR]: this screen in error (maybe show a dialog)
 */

enum class UiState {
    /**
     * call [changeState] to change state to [SUCCESS]
     */
    IDLE {
        override fun changeState(newState: UiState?): UiState = newState ?: SUCCESS
    },

    /**
     * call [changeState] to change state to [LOADING]
     */
    SUCCESS {
        override fun changeState(newState: UiState?): UiState = newState ?: LOADING
    },
    /**
     * call [changeState] to change state to [SUCCESS]
     */
    LOADING {
        override fun changeState(newState: UiState?): UiState = newState ?: SUCCESS
    },
    /**
     * call [changeState] to change state to [SUCCESS]
     */
    ERROR {
        override fun changeState(newState: UiState?): UiState = newState ?: SUCCESS
    };

    abstract fun changeState(newState: UiState? = null): UiState

    fun onState(
        idle: () -> Unit = {},
        loading: () -> Unit = {},
        success: () -> Unit = {},
        error: () -> Unit = {}
    ) {
        when (this) {
            SUCCESS -> success()
            LOADING -> loading()
            ERROR -> error()
            else -> idle()
        }
    }
}