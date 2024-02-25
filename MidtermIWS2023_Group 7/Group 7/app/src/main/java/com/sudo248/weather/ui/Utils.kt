package com.sudo248.weather.ui

import android.widget.ImageView
import com.bumptech.glide.Glide
import com.sudo248.weather.BuildConfig


/**
 * **Created by**
 *
 * @author *Sudo248*
 * @since 16:50 - 19/03/2023
 */
fun ImageView.loadIconWeather(iconId: Int) {
    Glide.with(this).load(String.format(BuildConfig.ICON_URL, String.format("%02d", iconId))).into(this)
}