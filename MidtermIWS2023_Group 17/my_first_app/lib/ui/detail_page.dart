import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:my_first_app/components/weather_item.dart';

import '../constants.dart';


class DetailPage extends StatefulWidget {
  final dailyForecastWeather;

  const DetailPage({Key? key, this.dailyForecastWeather}) : super(key: key);
  
  @override
  State<StatefulWidget> createState() => _DetailPageState();
  }
class _DetailPageState extends State<DetailPage> {
  final Constants _constants = Constants();

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery
        .of(context)
        .size;
    var weatherData = widget.dailyForecastWeather;

//function to get weather
    Map getForecastWeather(int index) {
      int maxWindSpeed = weatherData[index]["day"]["maxwind_kph"].toInt();
      int avgHumidity = weatherData[index]["day"]["avghumidity"].toInt();
      int chanceOfRain = weatherData[index]["day"]["daily_chance_of_rain"]
          .toInt();

      var parsedDate = DateTime.parse(weatherData[index]["date"]);
      var forecastDate = DateFormat('EEEE, d MMMM').format(parsedDate);

      String weatherName = weatherData[index]["day"]["condition"]["text"];
      String weatherIcon = weatherName.replaceAll(' ', '').toLowerCase() +
          ".png";

      int minTemperature = weatherData[index]["day"]["mintemp_c"].toInt();
      int maxTemperature = weatherData[index]["day"]["maxtemp_c"].toInt();

      var forecastData = {
        'maxWindSpeed': maxWindSpeed,
        'avgHumidity': avgHumidity,
        'chanceOfRain': chanceOfRain,
        'forecastDate': forecastDate,
        'weatherName': weatherName,
        'weatherIcon': weatherIcon,
        'minTemperature': minTemperature,
        'maxTemperature': maxTemperature,
      };
      return forecastData;
    }

    return Scaffold(
      backgroundColor: _constants.primaryColor,
      appBar: AppBar(
        title: const Text('Forecasts'),
        centerTitle: true,
        backgroundColor: _constants.primaryColor,
        elevation: 0.0,
        actions: [
          Padding(
            padding: const EdgeInsets.only(right: 8.0),
            child: IconButton(onPressed: () {
              print("Settings Tapped!");
            }, icon: const Icon(Icons.settings)),
          )
        ],
      ),
      body: Stack(
        alignment: Alignment.center,
        clipBehavior: Clip.none,
        children: [
          Positioned(
            bottom: 0,
            left: 0,
            child: Container(
              height: size.height * .75,
              width: size.width,
              decoration: const BoxDecoration(
                  // color: Colors.white,
                  color: Color(0xff0C0926),
                  borderRadius: BorderRadius.only(
                    topLeft: Radius.circular(50),
                    topRight: Radius.circular(50),
                  )
              ),
              child: Stack(
                clipBehavior: Clip.none,
                children: [
                  Positioned(
                    top: -50,
                    right: 20,
                    left: 20,
                    child: Container(
                      height: 300,
                      width: size.width * .7,
                      decoration: BoxDecoration(
                        gradient: const LinearGradient(
                            begin: Alignment.topLeft,
                            end: Alignment.center,
                            colors: [
                              Color(0xff00D1FF),
                              Color(0xff0648F1),
                            ]),
                        boxShadow: [
                          BoxShadow(
                            color: Colors.blue.withOpacity(.05),
                            offset: Offset(0, 25),
                            blurRadius: 10,
                            spreadRadius: -15,
                          ),
                        ],
                        borderRadius: BorderRadius.circular(15),
                      ),
                      child: Stack(
                        clipBehavior: Clip.none,
                        children: [
                          Positioned(
                            top: 05,
                            left: 20,
                            child: Image.asset("assets/" +
                                getForecastWeather(1)["weatherIcon"]),
                            width: 150,),
                          Positioned(
                            top: 175,
                            left: 30,
                            child: Padding(
                              padding: const EdgeInsets.only(bottom: 10.0),
                              child: Text(
                                getForecastWeather(1)["weatherName"],
                                style: const TextStyle(
                                  color: Colors.white,
                                  fontSize: 19,
                                ),),
                            ),),
                          Positioned(
                            bottom: 20,
                            left: 20,
                            child: Container(
                              width: size.width * .8,
                              padding: const EdgeInsets.symmetric(
                                  horizontal: 20),
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment
                                    .spaceBetween,
                                children: [
                                  WeatherItem(
                                    value: getForecastWeather(
                                        1)["maxWindSpeed"],
                                    unit: "km/h",
                                    imageUrl: "assets/windspeed.png",
                                  ),
                                  WeatherItem(
                                    value: getForecastWeather(1)["avgHumidity"],
                                    unit: "%",
                                    imageUrl: "assets/humidity.png",
                                  ),
                                  WeatherItem(
                                    value: getForecastWeather(
                                        1)["chanceOfRain"],
                                    unit: "%",
                                    imageUrl: "assets/lightrain.png",
                                  ), //WeatherItem
                                ],
                              ), //Row
                            ), //Container
                          ), //Positioned
                          Positioned(
                            top: 20,
                                right: 20,
                            child: Row(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(getForecastWeather(1)["maxTemperature"].toString(), style: TextStyle(
                                  fontSize: 80,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.white,
                                ),), //TextStyle, Text
                                Text('o', style: TextStyle(
                                  fontSize: 40,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.white,
                                ),), //TextStyle, Text
                              ],
                            ), //Row
                          ), //Positioned
                          Positioned(
                            top: 320,
                            left: 0,
                            child: SizedBox(
                              height: 400,
                              width: size.width * .9,
                              child: ListView(
                                physics: const BouncingScrollPhysics(),
                                children: [
                                   //Card
                                  Card(
                                    color: Color(0xff050416),
                                    elevation: 3.0,
                                    margin: const EdgeInsets.only(bottom: 20),
                                    child: Padding(
                                      padding: const EdgeInsets.all(14.0),
                                      child: Column(
                                        mainAxisAlignment: MainAxisAlignment.spaceAround,
                                        children: [
                                          Row(
                                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                            crossAxisAlignment: CrossAxisAlignment.center,
                                            children: [
                                              Padding(
                                                padding: const EdgeInsets.only(bottom: 10.0),
                                                child: Text(getForecastWeather(1)["forecastDate"], style: const TextStyle(
                                                    color: Color(0xff2864FF)
                                                ),),
                                              ), //TextStyle, Text
                                              Row(
                                                crossAxisAlignment: CrossAxisAlignment.start,
                              mainAxisAlignment: MainAxisAlignment.center,
                                                children: [
                                                  Text(getForecastWeather(1)["minTemperature"].toString(),
                                                    style: TextStyle(
                                                      color: _constants.greyColor.withOpacity(.7),
                                                      fontSize: 30,
                                                      fontWeight: FontWeight.w600,
                                                    ),), //TextStyle, Text
                                                  Text('o',
                                                    style: TextStyle(
                                                      color: _constants.greyColor.withOpacity(.7),
                                                      fontSize: 16,
                                                      fontWeight: FontWeight.w600,
                                                      fontFeatures: const [
                                                        FontFeature.enable('sups'),
                                                      ],
                                                    ),), //TextStyle, Text
                                                ],
                                              ), //Row
                                              Row(
                                                crossAxisAlignment: CrossAxisAlignment.start,
                              mainAxisAlignment: MainAxisAlignment.center,
                                                children: [
                                                  Text(getForecastWeather(1)["maxTemperature"].toString(),
                                                    style: TextStyle(
                                                      color: Colors.white,
                                                      fontSize: 30,
                                                      fontWeight: FontWeight.w600,
                                                    ),), //TextStyle, Text
                                                  Text('o',
                                                    style: TextStyle(
                                                      color: Colors.white,
                                                      fontSize: 16,
                                                      fontWeight: FontWeight.w600,
                                                      fontFeatures: const [
                                                        FontFeature.enable('sups'),
                                                      ],
                                                    ),), //TextStyle, Text
                                                ],
                                              ), //Row
                                            ],
                                          ), //Row
                                          const SizedBox(height: 10,),
                                          Row(
                                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                            children: [
                                              Row(
                                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                                children: [
                                                  Image.asset('assets/' + getForecastWeather(1)["weatherIcon"], width: 30,),
                                                  const SizedBox(width: 5,),
                                                  Text(getForecastWeather(1)["weatherName"], style: const TextStyle(
                                                    fontSize: 16,
                                                    color: Color(0xffd9dadb),
                                                  ),), //TextStyle, Text
                                                ],
                                              ), //Row
                                              Row(
                                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                                children: [
                                                  Text(getForecastWeather(1)["chanceOfRain"].toString() + "%", style: const TextStyle(
                                                    fontSize: 16,
                                                    color: Color(0xffd9dadb),
                                                  ),),
                                                  const SizedBox(width: 5,),
                                                  Image.asset('assets/lightrain.png', width: 30,),
                                                  //TextStyle, Text
                                                ],
                                              ), //Row
                                            ],
                                          ) //Row
                                        ],
                                      ), //Column
                                    ), //Padding
                                  ),
                                  Card(
                                     color: Color(0xff050416),
                                    elevation: 3.0,
                                    margin: const EdgeInsets.only(bottom: 20),
                                    child: Padding(
                                      padding: const EdgeInsets.all(14.0),
                                      child: Column(
                                        mainAxisAlignment: MainAxisAlignment.spaceAround,
                                        children: [
                                          Row(
                                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                            crossAxisAlignment: CrossAxisAlignment.center,
                                            children: [
                                              Padding(
                                                padding: const EdgeInsets.only(bottom: 12.0),
                                                child: Text(getForecastWeather(2)["forecastDate"], style: const TextStyle(
                                                    color: Color(0xff2864FF)
                                                ),),
                                              ), //TextStyle, Text
                                              Row(
                                                crossAxisAlignment: CrossAxisAlignment.start,
                              mainAxisAlignment: MainAxisAlignment.center,
                                                children: [
                                                  Text(getForecastWeather(2)["minTemperature"].toString(),
                                                    style: TextStyle(
                                                      color: _constants.greyColor.withOpacity(.7).withOpacity(.7),
                                                      fontSize: 30,
                                                      fontWeight: FontWeight.w600,
                                                    ),), //TextStyle, Text
                                                  Text('o',
                                                    style: TextStyle(
                                                      color: _constants.greyColor.withOpacity(.7),
                                                      fontSize: 16,
                                                      fontWeight: FontWeight.w600,
                                                      fontFeatures: const [
                                                        FontFeature.enable('sups'),
                                                      ],
                                                    ),), //TextStyle, Text
                                                ],
                                              ), //Row
                                              Row(
                                                crossAxisAlignment: CrossAxisAlignment.start,
                              mainAxisAlignment: MainAxisAlignment.center,
                                                children: [
                                                  Text(getForecastWeather(2)["maxTemperature"].toString(),
                                                    style: TextStyle(
                                                      color: Colors.white,
                                                      fontSize: 30,
                                                      fontWeight: FontWeight.w600,
                                                    ),), //TextStyle, Text
                                                  Text('o',
                                                    style: TextStyle(
                                                      color: Colors.white,
                                                      fontSize: 16,
                                                      fontWeight: FontWeight.w600,
                                                      fontFeatures: const [
                                                        FontFeature.enable('sups'),
                                                      ],
                                                    ),), //TextStyle, Text
                                                ],
                                              ), //Row
                                            ],
                                          ), //Row
                                          const SizedBox(height: 10,),
                                          Row(
                                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                            children: [
                                              Row(
                                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                                children: [
                                                  Image.asset('assets/' + getForecastWeather(2)["weatherIcon"], width: 30,),
                                                  const SizedBox(width: 5,),
                                                  Text(getForecastWeather(0)["weatherName"], style: const TextStyle(
                                                    fontSize: 16,
                                                    color: Color(0xffd9dadb),
                                                  ),), //TextStyle, Text
                                                ],
                                              ), //Row
                                              Row(
                                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                                children: [
                                                  Text(getForecastWeather(2)["chanceOfRain"].toString() + "%", style: const TextStyle(
                                                    fontSize: 16,
                                                    color: Color(0xffd9dadb),
                                                  ),),
                                                  const SizedBox(width: 5,),
                                                  Image.asset('assets/lightrain.png', width: 30,),
                                                  //TextStyle, Text
                                                ],
                                              ), //Row
                                            ],
                                          ) //Row
                                        ],
                                      ), //Column
                                    ), //Padding
                                  ),
                                  Card(
                                     color: Color(0xff050416),
                                    elevation: 3.0,
                                    margin: const EdgeInsets.only(bottom: 20),
                                    child: Padding(
                                      padding: const EdgeInsets.all(14.0),
                                      child: Column(
                                        mainAxisAlignment: MainAxisAlignment.spaceAround,
                                        children: [
                                          Row(
                                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                            crossAxisAlignment: CrossAxisAlignment.center,
                                            children: [
                                              Padding(
                                                padding: const EdgeInsets.only(bottom: 12.0),
                                                child: Text(getForecastWeather(3)["forecastDate"], style: const TextStyle(
                                                    color: Color(0xff2864FF)
                                                ),),
                                              ), //TextStyle, Text
                                              Row(
                                                crossAxisAlignment: CrossAxisAlignment.start,
                              mainAxisAlignment: MainAxisAlignment.center,
                                                children: [
                                                  Text(getForecastWeather(3)["minTemperature"].toString(),
                                                    style: TextStyle(
                                                      color: _constants.greyColor.withOpacity(.7),
                                                      fontSize: 30,
                                                      fontWeight: FontWeight.w600,
                                                    ),), //TextStyle, Text
                                                  Text('o',
                                                    style: TextStyle(
                                                      color: _constants.greyColor.withOpacity(.7),
                                                      fontSize: 16,
                                                      fontWeight: FontWeight.w600,
                                                      fontFeatures: const [
                                                        FontFeature.enable('sups'),
                                                      ],
                                                    ),), //TextStyle, Text
                                                ],
                                              ), //Row
                                              Row(
                                                crossAxisAlignment: CrossAxisAlignment.start,
                              mainAxisAlignment: MainAxisAlignment.center,
                                                children: [
                                                  Text(getForecastWeather(3)["maxTemperature"].toString(),
                                                    style: TextStyle(
                                                      color: Colors.white,
                                                      fontSize: 30,
                                                      fontWeight: FontWeight.w600,
                                                    ),), //TextStyle, Text
                                                  Text('o',
                                                    style: TextStyle(
                                                      color: Colors.white,
                                                      fontSize: 16,
                                                      fontWeight: FontWeight.w600,
                                                      fontFeatures: const [
                                                        FontFeature.enable('sups'),
                                                      ],
                                                    ),), //TextStyle, Text
                                                ],
                                              ), //Row
                                            ],
                                          ), //Row
                                          const SizedBox(height: 10,),
                                          Row(
                                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                            children: [
                                              Row(
                                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                                children: [
                                                  Image.asset('assets/' + getForecastWeather(3)["weatherIcon"], width: 30,),
                                                  const SizedBox(width: 5,),
                                                  Text(getForecastWeather(3)["weatherName"], style: const TextStyle(
                                                    fontSize: 16,
                                                    color: Color(0xffd9dadb),
                                                  ),), //TextStyle, Text
                                                ],
                                              ), //Row
                                              Row(
                                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                                children: [
                                                  Text(getForecastWeather(3)["chanceOfRain"].toString() + "%", style: const TextStyle(
                                                    fontSize: 16,
                                                    color: Color(0xffd9dadb),
                                                  ),),
                                                  const SizedBox(width: 5,),
                                                  Image.asset('assets/lightrain.png', width: 30,),
                                                  //TextStyle, Text
                                                ],
                                              ), //Row
                                            ],
                                          ) //Row
                                        ],
                                      ), //Column
                                    ), //Padding
                                  ),
                                ],
                              ), //ListView
                            ), //SizeBox
                          ), //Positioned
                        ],
                      ), //Stack
                    ), //Container
                  ), //Positioned
                ],
              ), //Stack
            ), //Container
          ), //Positioned
        ],
      ), //Stack
    ); //Scafford
  }
}
  
  @override
  State<StatefulWidget> createState() {
    // TODO: implement createState
    throw UnimplementedError();
  }
 
 