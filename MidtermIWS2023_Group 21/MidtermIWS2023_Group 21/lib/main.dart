import 'package:flutter/material.dart';
import 'package:weather_app_nhom21/homePage.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Weather',
      theme: ThemeData(
          textTheme: Theme.of(context)
              .textTheme
              .apply(bodyColor: Color.fromARGB(255, 255, 255, 255), displayColor: Color.fromARGB(255, 119, 172, 215))),
      debugShowCheckedModeBanner: false,
      home: HomePage(),
    );
  }
}
