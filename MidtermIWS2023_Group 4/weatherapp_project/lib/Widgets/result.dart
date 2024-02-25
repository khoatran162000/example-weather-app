import 'package:flutter/material.dart';

class Result {
  final String id;
  final String title;
  final Color color;
  final String temp;
  final String condi;
  final String highlow;

  const Result(
      {required this.id,
      required this.title,
      required this.temp,
      required this.condi,
      required this.highlow,
      this.color = Colors.white});
}
