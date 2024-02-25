import 'package:flutter/material.dart';
import 'package:weatherapp_starter_project/Screen/home.dart';
import 'package:weatherapp_starter_project/Screen/colors.dart' as color;

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: HomeScreen(),
      debugShowCheckedModeBanner: false,
    );
  }
}
