import 'package:flutter/material.dart';

class Constants {
  final primaryColor = const Color(0xff2352CB);
  final secondaryColor = const Color(0xffa1c6fd);
  final tertiaryColor = const Color(0xff205cf1);
  final chosenColor = const Color(0xff0038FF);
  final blackColor = const Color(0xff1a1d26);

  final greyColor = const Color(0xffd9dadb);

  final Shader shader = const LinearGradient(
    colors: <Color>[Color(0xffABCFF2), Color(0xff9AC6F3)],
  ).createShader(const Rect.fromLTWH(0.0, 0.0, 200.0, 70.0));

  final linearGradientBlue =  const LinearGradient(
      begin: Alignment.topCenter,
      end: Alignment.bottomCenter,
      colors: [  Color(0xff07B9E0), Color(0xff06C7F1), Color(0xff0648F1)],
      stops: [0.0, 0.2, 1.0]
  );
    final linearChosenBlue =  const LinearGradient(
      begin: Alignment.topCenter,
      end: Alignment.bottomCenter,
      colors: [  Color(0xff0648F1), Color(0xff00D1FF)],
      stops: [0.0, 1.0]
  );
  final linearGradientPurple =  const LinearGradient(
      begin: Alignment.bottomRight,
      end: Alignment.topLeft,
      colors: [Color(0xff51087E), Color(0xff6C0BA9)],
      stops: [0.0,1.0]
  );
}