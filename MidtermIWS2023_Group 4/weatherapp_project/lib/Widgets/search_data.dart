import 'result.dart';
import '/Screen/colors.dart' as colors;

// ignore: constant_identifier_names, non_constant_identifier_names
List<Result> RESULT_SEARCH = [
  Result(
      id: "1",
      title: "London",
      temp: "6°",
      condi: "Mostly Cloudy",
      highlow: "H: 10°  L: 3°",
      color: colors.AppColor.cloudyBackground),
  Result(
      id: "2",
      title: "New York",
      temp: "5°",
      condi: "Drizzle",
      highlow: "H: 10°  L: 2°",
      color: colors.AppColor.nightBackground),
  Result(
      id: "3",
      title: "Tokyo",
      temp: "19°",
      condi: "Sunny",
      highlow: "H: 24°  L: 15°",
      color: colors.AppColor.clearCloudyBackground),
  Result(
      id: "4",
      title: "Seoul",
      temp: "19°",
      condi: "Cloudy",
      highlow: "H: 21°  L: 8°",
      color: colors.AppColor.cloudyBackground),
];
