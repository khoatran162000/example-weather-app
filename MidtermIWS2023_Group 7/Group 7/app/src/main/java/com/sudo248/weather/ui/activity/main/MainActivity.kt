package com.sudo248.weather.ui.activity.main

import android.Manifest
import android.annotation.SuppressLint
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.activity.result.contract.ActivityResultContracts
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import androidx.core.view.isVisible
import androidx.lifecycle.lifecycleScope
import com.airbnb.lottie.LottieDrawable
import com.sudo248.weather.R
import com.sudo248.weather.databinding.ActivityMainBinding
import com.sudo248.weather.domain.ktx.format
import com.sudo248.weather.ui.activity.main.adapter.DailyWeatherAdapter
import com.sudo248.weather.ui.activity.main.adapter.HourlyWeatherAdapter
import com.sudo248.weather.ui.loadIconWeather
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class MainActivity : AppCompatActivity() {
    private val viewModel: MainViewModel by viewModels()
    private val dailyWeatherAdapter = DailyWeatherAdapter()
    private val hourlyWeatherAdapter = HourlyWeatherAdapter()
    lateinit var binding: ActivityMainBinding

    private val locationPermissionRequest = registerForActivityResult(
        ActivityResultContracts.RequestMultiplePermissions()
    ) { permissions ->

        when {
            permissions.getOrDefault(
                Manifest.permission.ACCESS_FINE_LOCATION,
                false
            ) && permissions.getOrDefault(Manifest.permission.ACCESS_COARSE_LOCATION, false) -> {
                viewModel.loadCurrentWeather()
            }
            else -> {
                // No location access granted.
            }
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)
        initView()
        observer()
    }

    fun initView() {
        requestPermission()
        binding.lottieBackground.repeatCount = LottieDrawable.INFINITE
        binding.rcvDailyWeather.adapter = dailyWeatherAdapter
        binding.rcvHourlyWeather.adapter = hourlyWeatherAdapter
    }

    @SuppressLint("StringFormatInvalid", "StringFormatMatches")
    fun observer() {

        viewModel.stateScreen.observe(this) {
            it.onState(
                success = { onStateSuccess() },
                loading = { onStateLoading() },
                error = { onStateError() }
            )
        }

        viewModel.location.observe(this) {
            binding.layoutHeader.txtCity.text = it.name
        }

        viewModel.weatherDetail.observe(this) { weather ->
            binding.apply {
                txtTemperature.text = "${weather.temperature.toInt()}"
                txtDescriptionWeather.text = weather.weatherText
                txtTemperatureFeeling.text =
                    getString(R.string.temperatureC, "${weather.realFeelTemperature.toInt()}")
                txtHumidity.text = getString(R.string.percent, "${weather.relativeHumidity}")
                txtPressure.text = getString(R.string.pressureValue, "${weather.pressure.toInt()}")
                txtWindVelocity.text = getString(R.string.velocity, weather.speedWind.format(1))
                txtUVIndex.text = "${weather.uVIndex}"
                if (imgWeather.isVisible) {
                    imgWeather.loadIconWeather(weather.iconId)
                }
                if (weather.weatherText.lowercase()
                        .contains("mưa") || weather.weatherText.lowercase().contains("rain")
                ) {
                    binding.lottieBackground.visibility = View.VISIBLE
                    binding.lottieBackground.playAnimation()
                } else {
                    binding.lottieBackground.cancelAnimation()
                    binding.lottieBackground.visibility = View.GONE
                }
                if (weather.isDayNight) {
                    binding.root.setBackgroundResource(R.drawable.img_night)
                }
                weather.link?.let { link ->
                    txtMoreDailyWeather.setOnClickListener {
                        openLink(link)
                    }
                }
            }
        }

        viewModel.weather5Days.observe(this) { dailyWeathers ->
            binding.apply {
                txtPercentRain.text = getString(R.string.percent, dailyWeathers[0].rainProbability)
                dailyWeatherAdapter.submitList(dailyWeathers)
            }
        }

        viewModel.weather4Hours.observe(this) {
            hourlyWeatherAdapter.submitList(it)
        }
    }

    private fun requestPermission() {
        when {
            ContextCompat.checkSelfPermission(
                this, Manifest.permission.ACCESS_COARSE_LOCATION
            ) == PackageManager.PERMISSION_GRANTED && ContextCompat.checkSelfPermission(
                this, Manifest.permission.ACCESS_FINE_LOCATION
            ) == PackageManager.PERMISSION_GRANTED -> {
                viewModel.loadCurrentWeather()
            }
            shouldShowRequestPermissionRationale(Manifest.permission.ACCESS_COARSE_LOCATION) -> {
//            // In an educational UI, explain to the user why your app requires this
//            // permission for a specific feature to behave as expected, and what
//            // features are disabled if it's declined. In this UI, include a
//            // "cancel" or "no thanks" button that lets the user continue
//            // using your app without granting the permission.
//            showInContextUI(...)
//                DialogUtils.showConfirmDialog(
//                    this
//                )
            }
            shouldShowRequestPermissionRationale(Manifest.permission.ACCESS_FINE_LOCATION) -> {
//            // In an educational UI, explain to the user why your app requires this
//            // permission for a specific feature to behave as expected, and what
//            // features are disabled if it's declined. In this UI, include a
//            // "cancel" or "no thanks" button that lets the user continue
//            // using your app without granting the permission.
//            showInContextUI(...)
//                DialogUtils.showConfirmDialog(
//                    this
//                )
            }
            else -> {
                locationPermissionRequest.launch(
                    arrayOf(
                        Manifest.permission.ACCESS_COARSE_LOCATION,
                        Manifest.permission.ACCESS_FINE_LOCATION
                    )
                )
            }
        }
    }

    fun onStateLoading() {
        binding.frLoading.visibility = View.VISIBLE
    }

    fun onStateSuccess() {
        binding.frLoading.visibility = View.GONE
        Toast.makeText(this, "Success", Toast.LENGTH_SHORT).show()
    }

    fun onStateError() {
        binding.frLoading.visibility = View.GONE
        if (viewModel.error?.isHandled() == false) {
            Toast.makeText(
                this,
                viewModel.error?.getValueIfNotHandled() ?: "Unknown",
                Toast.LENGTH_SHORT
            ).show()
        }
    }

    private fun openLink(url: String) {
        val intent = Intent(Intent.ACTION_VIEW, Uri.parse(url))
        startActivity(intent)
    }
}