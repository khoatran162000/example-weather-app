package com.sudo248.weather.domain.core

import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.coroutineScope
import kotlin.contracts.ExperimentalContracts
import kotlin.contracts.InvocationKind
import kotlin.contracts.contract


/**
 * **Created by**
 *
 * @author *Sudo248*
 * @since 21:17 - 16/02/2023
 */
sealed class DataState<out D, out E : Exception> {

    object Idle : DataState<Nothing, Nothing>()
    object Loading : DataState<Nothing, Nothing>()
    data class Success<out D>(val data: D) : DataState<D, Nothing>()
    data class Error<out E : Exception>(val error: E) : DataState<Nothing, E>()

    val isSuccess: Boolean
        get() = this is Success

    val isError: Boolean
        get() = this is Error

    val isLoading: Boolean
        get() = this is Loading

    fun get() = requireData()

    fun getOrNull() = getDataOrNull()

    fun getDataOrNull(): D? {
        return if (this is Success) this.data
        else null
    }

    fun requireData(): D {
        check(isSuccess) { "${this::class.java.name} is not a Success" }
        return (this as Success).data
    }

    fun error() = requiredError()

    fun getErrorOrNull(): E? {
        return if (this is Error) this.error
        else null
    }

    fun requiredError(): E {
        check(isError) { "${this::class.java.name} is not a Error" }
        return (this as Error).error
    }
}

@OptIn(ExperimentalContracts::class)
suspend inline fun <D> state(crossinline block: suspend CoroutineScope.() -> D): DataState<D, Exception> {
    contract { callsInPlace(block, InvocationKind.AT_MOST_ONCE) }
    return try {
        DataState.Success(coroutineScope { block() })
    } catch (e: Exception) {
        DataState.Error(e)
    }
}

@OptIn(ExperimentalContracts::class)
inline fun <D, E : Exception> DataState<D, E>.onState(
    onSuccess: (data: D) -> Unit,
    onError: (error: E) -> Unit,
    noinline onLoading: (() -> Unit)? = null,
) {
    contract {
        callsInPlace(onSuccess, InvocationKind.AT_MOST_ONCE)
        callsInPlace(onError, InvocationKind.AT_MOST_ONCE)
    }
    when (this) {
        is DataState.Success -> onSuccess(data)
        is DataState.Error -> onError(error)
        else -> onLoading?.invoke()
    }
}

@OptIn(ExperimentalContracts::class)
inline fun <D, E : Exception> DataState<D, E>.onSuccess(block: (D) -> Unit): DataState<D, E> {
    contract { callsInPlace(block, InvocationKind.AT_MOST_ONCE) }
    if (this is DataState.Success) block.invoke(data)
    return this
}

@OptIn(ExperimentalContracts::class)
inline fun <D, E : Exception> DataState<D, E>.onError(block: (E) -> Unit): DataState<D, E> {
    contract { callsInPlace(block, InvocationKind.AT_MOST_ONCE) }
    if (this is DataState.Error) block.invoke(error)
    return this
}

