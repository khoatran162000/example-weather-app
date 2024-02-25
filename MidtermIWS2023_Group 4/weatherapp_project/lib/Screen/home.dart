import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:weatherapp_starter_project/Screen/search.dart';
import 'package:weatherapp_starter_project/Screen/weatherData.dart';
import 'package:weatherapp_starter_project/Widgets/daily.dart';
import '../Widgets/hourly.dart';
import 'colors.dart' as color;
import 'package:google_nav_bar/google_nav_bar.dart';

var dayInfo = DateTime.now();
var dateFormat = DateFormat('EEE. d MMM, yyy').format(dayInfo);

// ignore: must_be_immutable
class HomeScreen extends StatelessWidget {
  var client = WeatherData();
  // ignore: prefer_typing_uninitialized_variables
  var data;

  HomeScreen({super.key});

  info() async {
    //var position = await getPosition();
    data = await client.getData('21.03', '105.85');
    return data;
  }

  @override
  Widget build(BuildContext context) {
    double myHeight = MediaQuery.of(context).size.height;
    double myWidth = MediaQuery.of(context).size.width;
    return Scaffold(
        backgroundColor: color.AppColor.homePageBackground,
        bottomNavigationBar: Container(
          color: color.AppColor.secondPageBackground,
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 15, vertical: 20),
            child: GNav(
              backgroundColor: color.AppColor.secondPageBackground,
              color: color.AppColor.homePageTitle,
              activeColor: color.AppColor.homePageTitle.withOpacity(0.8),
              tabBackgroundColor: Colors.grey.withOpacity(0.2),
              gap: 8,
              padding: EdgeInsets.all(15),
              tabs: const [
                GButton(
                  icon: Icons.home,
                  text: 'Home',
                ),
                GButton(
                  icon: Icons.search,
                  text: 'Search',
                ),
              ],
            ),
          ),
        ),
        body: FutureBuilder(
          future: info(),
          builder: ((context, snapshot) {
            return SizedBox(
              height: myHeight,
              width: myWidth,
              child: ListView(
                scrollDirection: Axis.vertical,
                children: [
                  Column(
                    children: [
                      Row(
                        crossAxisAlignment: CrossAxisAlignment.center,
                        children: [
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Padding(
                                  padding: const EdgeInsets.only(
                                      top: 50, left: 40, right: 40),
                                  child: Text(
                                    '${data?.cityName}',
                                    style: TextStyle(
                                      fontFamily: 'SFProDisplay',
                                      fontSize: 25,
                                      fontWeight: FontWeight.w700,
                                      color: color.AppColor.homePageTitle,
                                    ),
                                  ),
                                ),
                                Padding(
                                  padding: const EdgeInsets.only(
                                      left: 40, right: 20),
                                  child: Text(
                                    "${data?.temp}°C",
                                    style: TextStyle(
                                      fontFamily: 'SFProDisplay',
                                      fontSize: 60,
                                      fontWeight: FontWeight.w700,
                                      color: color.AppColor.homePageTitle,
                                    ),
                                  ),
                                ),
                                Padding(
                                  padding: const EdgeInsets.only(
                                      left: 40, right: 20),
                                  child: Text(
                                    "${data?.condition}",
                                    style: TextStyle(
                                      fontFamily: 'SFProDisplay',
                                      fontSize: 18,
                                      fontWeight: FontWeight.w600,
                                      color: color.AppColor.homePageTitle
                                          .withOpacity(0.8),
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.end,
                              children: [
                                Padding(
                                  padding: const EdgeInsets.only(right: 40),
                                  child: Image.asset(
                                    'assets/weather/Cloudy.png',
                                    height: 50,
                                    width: 50,
                                  ),
                                ),
                                Padding(
                                  padding: const EdgeInsets.only(right: 40),
                                  child: Text(
                                    dateFormat,
                                    style: TextStyle(
                                      fontFamily: 'SFProDisplay',
                                      fontSize: 15,
                                      fontWeight: FontWeight.w600,
                                      color: color.AppColor.homePageTitle,
                                    ),
                                  ),
                                ),
                                const SizedBox(
                                  height: 10,
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(
                        height: 10,
                      ),
                      Column(
                        children: [
                          Align(
                            child: SizedBox(
                              width: 80,
                              height: 80,
                              child: Container(
                                decoration: BoxDecoration(
                                  borderRadius: BorderRadius.circular(45),
                                  color: color.AppColor.secondPageBackground,
                                ),
                              ),
                            ),
                          ),
                          Stack(
                            alignment: Alignment.center,
                            children: <Widget>[
                              Image.asset(
                                'assets/bears/bg.png',
                                width: myWidth,
                              ),
                              ClipRRect(
                                child: Image.asset(
                                  'assets/bears/sunny.png',
                                  height: 190,
                                  width: 190,
                                ),
                              ),
                            ],
                          ),
                          Container(
                            height: 900,
                            decoration: BoxDecoration(
                              color: color.AppColor.secondPageBackground,
                              borderRadius: const BorderRadius.only(
                                topLeft: Radius.circular(30),
                                topRight: Radius.circular(30),
                              ),
                            ),
                            child: Column(
                              children: [
                                const HourlyWidget(),
                                const SizedBox(
                                  height: 30,
                                ),
                                const DailyWidget(),
                                const SizedBox(
                                  height: 20,
                                ),
                                Column(
                                  children: [
                                    Column(
                                      children: [
                                        Container(
                                          margin: const EdgeInsets.only(
                                              top: 20,
                                              left: 50,
                                              right: 50,
                                              bottom: 20),
                                          child: Row(
                                            crossAxisAlignment:
                                                CrossAxisAlignment.center,
                                            children: [
                                              Column(
                                                children: [
                                                  Image.asset(
                                                    'assets/icons/Air Quality.png',
                                                    height: 25,
                                                    width: 25,
                                                  ),
                                                  const SizedBox(
                                                    height: 10,
                                                  ),
                                                  Text(
                                                    'UV Index',
                                                    style: TextStyle(
                                                      fontFamily:
                                                          'SFProDisplay',
                                                      fontSize: 15,
                                                      fontWeight:
                                                          FontWeight.w600,
                                                      color: color.AppColor
                                                          .homePageTitle,
                                                    ),
                                                  ),
                                                  const SizedBox(
                                                    height: 5,
                                                  ),
                                                  Text(
                                                    '${data?.uv}',
                                                    style: TextStyle(
                                                      fontFamily:
                                                          'SFProDisplay',
                                                      fontSize: 25,
                                                      fontWeight:
                                                          FontWeight.w700,
                                                      color: color.AppColor
                                                          .homePageTitle,
                                                    ),
                                                  ),
                                                  const SizedBox(
                                                    height: 80,
                                                  ),
                                                  Image.asset(
                                                    'assets/icons/Feels Like.png',
                                                    height: 25,
                                                    width: 25,
                                                  ),
                                                  const SizedBox(
                                                    height: 10,
                                                  ),
                                                  Text(
                                                    'Feels Like',
                                                    style: TextStyle(
                                                      fontFamily:
                                                          'SFProDisplay',
                                                      fontSize: 15,
                                                      fontWeight:
                                                          FontWeight.w600,
                                                      color: color.AppColor
                                                          .homePageTitle,
                                                    ),
                                                  ),
                                                  const SizedBox(
                                                    height: 5,
                                                  ),
                                                  Text(
                                                    '${data?.feelslike}°C',
                                                    style: TextStyle(
                                                      fontFamily:
                                                          'SFProDisplay',
                                                      fontSize: 25,
                                                      fontWeight:
                                                          FontWeight.w700,
                                                      color: color.AppColor
                                                          .homePageTitle,
                                                    ),
                                                  ),
                                                  const SizedBox(
                                                    height: 70,
                                                  ),
                                                  Image.asset(
                                                    'assets/icons/Wind.png',
                                                    height: 25,
                                                    width: 25,
                                                  ),
                                                  const SizedBox(
                                                    height: 10,
                                                  ),
                                                  Text(
                                                    'Wind',
                                                    style: TextStyle(
                                                      fontFamily:
                                                          'SFProDisplay',
                                                      fontSize: 15,
                                                      fontWeight:
                                                          FontWeight.w600,
                                                      color: color.AppColor
                                                          .homePageTitle,
                                                    ),
                                                  ),
                                                  const SizedBox(
                                                    height: 5,
                                                  ),
                                                  Text(
                                                    '${data?.wind}kph',
                                                    style: TextStyle(
                                                      fontFamily:
                                                          'SFProDisplay',
                                                      fontSize: 25,
                                                      fontWeight:
                                                          FontWeight.w700,
                                                      color: color.AppColor
                                                          .homePageTitle,
                                                    ),
                                                  ),
                                                ],
                                              ),
                                              const SizedBox(
                                                width: 110,
                                              ),
                                              Column(
                                                children: [
                                                  Image.asset(
                                                    'assets/icons/Rain.png',
                                                    height: 25,
                                                    width: 25,
                                                  ),
                                                  const SizedBox(
                                                    height: 10,
                                                  ),
                                                  Text(
                                                    'Rainfall',
                                                    style: TextStyle(
                                                      fontFamily:
                                                          'SFProDisplay',
                                                      fontSize: 15,
                                                      fontWeight:
                                                          FontWeight.w600,
                                                      color: color.AppColor
                                                          .homePageTitle,
                                                    ),
                                                  ),
                                                  const SizedBox(
                                                    height: 5,
                                                  ),
                                                  Text(
                                                    '${data?.pricipe}mm',
                                                    style: TextStyle(
                                                      fontFamily:
                                                          'SFProDisplay',
                                                      fontSize: 20,
                                                      fontWeight:
                                                          FontWeight.w700,
                                                      color: color.AppColor
                                                          .homePageTitle,
                                                    ),
                                                  ),
                                                  const SizedBox(
                                                    height: 80,
                                                  ),
                                                  Image.asset(
                                                    'assets/icons/Humidity.png',
                                                    height: 25,
                                                    width: 25,
                                                  ),
                                                  const SizedBox(
                                                    height: 15,
                                                  ),
                                                  Text(
                                                    'Humidity',
                                                    style: TextStyle(
                                                      fontFamily:
                                                          'SFProDisplay',
                                                      fontSize: 15,
                                                      fontWeight:
                                                          FontWeight.w600,
                                                      color: color.AppColor
                                                          .homePageTitle,
                                                    ),
                                                  ),
                                                  const SizedBox(
                                                    height: 5,
                                                  ),
                                                  Text(
                                                    '${data?.humidity}%',
                                                    style: TextStyle(
                                                      fontFamily:
                                                          'SFProDisplay',
                                                      fontSize: 25,
                                                      fontWeight:
                                                          FontWeight.w700,
                                                      color: color.AppColor
                                                          .homePageTitle,
                                                    ),
                                                  ),
                                                  const SizedBox(
                                                    height: 70,
                                                  ),
                                                  Image.asset(
                                                    'assets/icons/Wind.png',
                                                    height: 25,
                                                    width: 25,
                                                  ),
                                                  const SizedBox(
                                                    height: 10,
                                                  ),
                                                  Text(
                                                    'Gust',
                                                    style: TextStyle(
                                                      fontFamily:
                                                          'SFProDisplay',
                                                      fontSize: 15,
                                                      fontWeight:
                                                          FontWeight.w600,
                                                      color: color.AppColor
                                                          .homePageTitle,
                                                    ),
                                                  ),
                                                  const SizedBox(
                                                    height: 10,
                                                  ),
                                                  Text(
                                                    '${data?.gust}kph',
                                                    style: TextStyle(
                                                      fontFamily:
                                                          'SFProDisplay',
                                                      fontSize: 25,
                                                      fontWeight:
                                                          FontWeight.w700,
                                                      color: color.AppColor
                                                          .homePageTitle,
                                                    ),
                                                  ),
                                                ],
                                              ),
                                            ],
                                          ),
                                        ),
                                      ],
                                    ),
                                  ],
                                )
                              ],
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ],
              ),
            );
          }),
        ));
  }
}
