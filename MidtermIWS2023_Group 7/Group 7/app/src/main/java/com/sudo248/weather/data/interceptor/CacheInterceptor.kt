package com.sudo248.weather.data.interceptor

import android.content.Context
import okhttp3.Cache
import okhttp3.Interceptor
import okhttp3.Response


/**
 * **Created by**
 *
 * @author *Sudo248*
 * @since 07:48 - 20/03/2023
 */
class CacheInterceptor : Interceptor {
    companion object {
        // 1 hour
        const val CACHE_AGE = 60*60
        // 1 day
        const val CACHE_STALE = 60 * 60 * 24
        // 5MB
        private const val CACHE_SIZE = (5*1024*1024).toLong()

        fun getCache(context: Context): Cache {
            return Cache(context.cacheDir, CACHE_SIZE)
        }
    }

    override fun intercept(chain: Interceptor.Chain): Response {
        var request = chain.request()
        request = request.newBuilder().header("Cache-Control", "public, max-age=$CACHE_AGE").build()

        return chain.proceed(request)
    }
}