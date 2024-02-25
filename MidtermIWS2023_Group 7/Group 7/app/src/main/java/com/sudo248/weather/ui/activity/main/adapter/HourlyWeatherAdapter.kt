package com.sudo248.weather.ui.activity.main.adapter

import android.view.LayoutInflater
import android.view.ViewGroup
import com.sudo248.weather.R
import com.sudo248.weather.data.hourMinutes
import com.sudo248.weather.databinding.ItemHourlyWeatherBinding
import com.sudo248.weather.domain.entity.HourlyWeather
import com.sudo248.weather.domain.ktx.format
import com.sudo248.weather.ui.loadIconWeather


/**
 * **Created by**
 *
 * @author *Sudo248*
 * @since 22:24 - 19/03/2023
 */
class HourlyWeatherAdapter : BaseListAdapter<HourlyWeather, HourlyWeatherAdapter.ViewHolder>() {

    inner class ViewHolder(binding: ItemHourlyWeatherBinding) :
        BaseViewHolder<HourlyWeather, ItemHourlyWeatherBinding>(binding) {
        override fun onBind(item: HourlyWeather) {
            binding.apply {
                txtTime.text = if (adapterPosition == 0) {
                    itemView.context.getString(R.string.now)
                } else {
                    item.time.hourMinutes
                }
                txtTemperature.text =
                    itemView.context.getString(R.string.temperature, "${item.temperature.toInt()}")
                txtVelocity.text = itemView.context.getString(
                    R.string.velocity,
                    item.windSpeed.format(2)
                )
                imgWeather.loadIconWeather(item.iconId)
            }
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        return ViewHolder(
            ItemHourlyWeatherBinding.inflate(
                LayoutInflater.from(parent.context),
                parent,
                false
            )
        )
    }

}