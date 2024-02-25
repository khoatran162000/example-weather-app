// ignore_for_file: import_of_legacy_library_into_null_safe, unnecessary_overrides, unnecessary_string_interpolations, avoid_print, avoid_function_literals_in_foreach_calls, unused_element

import 'package:flutter/material.dart';
import 'package:get/get_state_manager/get_state_manager.dart';
import 'package:hmm/src/model/current_weather_data.dart';
import 'package:hmm/src/model/five_days_data.dart';
import 'package:hmm/src/service/weather_service.dart';

class HomeController extends GetxController {
  String city;
  String searchText;

  CurrentWeatherData currentWeatherData = CurrentWeatherData();
  List<CurrentWeatherData> dataList = [];
  List<FiveDaysData> fiveDaysData = [];

  HomeController({@required this.city});

  @override
  void onInit() {
    initState();
    getTopFiveCities();
    super.onInit();
  }

  void updateWeather() {
    initState();
  }

  void initState() {
    getCurrentWeatherData();
    getFiveDaysData();
  }

  void getCurrentWeatherData() {
    WeatherService(city: '$city').getCurrentWeatherData(
      
        onSuccess: (data) {
          currentWeatherData = data;
          update();
        },
        
        onError: (error) => {
              print(error),
              update(),
        },
    );
  }

  void getTopFiveCities() { 
    List<String> cities = ['Paris', 'Los Angeles', 'Seoul', 'Hanoi', 'Tokyo'];
    cities.forEach((c) {
      WeatherService(city: '$c').getCurrentWeatherData(onSuccess: (data) {
        dataList.add(data);
        update();
      }, onError: (error) {
        print(error);
        update();
      });
    });
  }

  void getFiveDaysData() {
    WeatherService(city: '$city').getFiveDaysThreeHoursForcastData(
        onSuccess: (data) {
      fiveDaysData = data;
      update();
    }, onError: (error) {
      print(error);
      update();
    });
  }
}