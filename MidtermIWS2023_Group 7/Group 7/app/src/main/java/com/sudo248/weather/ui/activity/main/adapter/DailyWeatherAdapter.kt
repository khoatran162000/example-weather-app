package com.sudo248.weather.ui.activity.main.adapter

import android.view.LayoutInflater
import android.view.ViewGroup
import com.sudo248.weather.R
import com.sudo248.weather.databinding.ItemShortDailyWeatherBinding
import com.sudo248.weather.domain.entity.DailyWeather
import com.sudo248.weather.ui.loadIconWeather
import java.time.format.TextStyle
import java.util.*


/**
 * **Created by**
 *
 * @author *Sudo248*
 * @since 18:56 - 19/03/2023
 */
class DailyWeatherAdapter : BaseListAdapter<DailyWeather, DailyWeatherAdapter.ViewHolder>() {

    inner class ViewHolder(binding: ItemShortDailyWeatherBinding) :
        BaseViewHolder<DailyWeather, ItemShortDailyWeatherBinding>(binding) {
        override fun onBind(item: DailyWeather) {
            binding.apply {
                imgWeather.loadIconWeather(item.iconId)
                txtTemperatureMax.text = itemView.context.getString(R.string.temperature,
                    "${ item.maxTemperature.toInt() }")
                txtTemperatureMin.text = itemView.context.getString(R.string.temperature,
                    "${item.minTemperature.toInt()}")
                txtDay.text = if (adapterPosition == 0) {
                    itemView.context.getString(R.string.today)
                } else {
                    item.dateTime.dayOfWeek.getDisplayName(TextStyle.SHORT, Locale("vi"))
                }
                txtShortDescriptionWeather.text = item.text
                Locale.ENGLISH
            }
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        return ViewHolder(
            ItemShortDailyWeatherBinding.inflate(
                LayoutInflater.from(parent.context),
                parent,
                false
            )
        )
    }
}