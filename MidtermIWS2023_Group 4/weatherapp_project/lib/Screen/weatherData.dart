// ignore_for_file: file_names

import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:weatherapp_starter_project/Screen/weather_model.dart';

class WeatherData {
  Future<Weather> getData(var latitude, var longtitude) async {
    var uriCall = Uri.parse(
        'http://api.weatherapi.com/v1/current.json?key=9d3e102e8d9d4add869133432221903&q=$latitude,$longtitude&aqi=no');
    var response = await http.get(uriCall);
    var body = jsonDecode(response.body);
    return Weather.fromJson(body);
  }
}
