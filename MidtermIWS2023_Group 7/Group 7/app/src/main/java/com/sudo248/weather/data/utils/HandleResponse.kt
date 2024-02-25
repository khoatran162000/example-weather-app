package com.sudo248.weather.data.utils

import com.sudo248.weather.domain.common.Failure
import org.json.JSONObject
import retrofit2.Response


/**
 * **Created by**
 *
 * @author *Sudo248*
 * @since 20:12 - 17/03/2023
 */

fun <T> handlerResponse(response: Response<T>): T {
    if (response.isSuccessful) {
        return if (response.body() != null) {
            response.body()!!
        } else {
            throw Failure.ApiFailure.BadRequest(message = "Response body required not null")
        }
    } else {
        val messageError = response.errorBody()?.string()?.let {
            JSONObject(it).getString("error")
        }
        val code = response.code()
        throw Failure.ApiFailure.getInstance(statusCode = code, message = messageError)
    }
}