import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:weather_app_nhom21/dataset.dart';

class ExtraWeather extends StatelessWidget {
  final Weather temp;
  ExtraWeather(this.temp);

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceAround,
      children: [
        Column(
          children: [
            Icon(
              CupertinoIcons.wind,
              color: Colors.white,
            ),
            SizedBox(
              height: 10,
            ),
            Text(
              temp.wind.toString() + " Km/h",
              style: TextStyle(fontWeight: FontWeight.w700, fontSize: 16),
            ),
            SizedBox(
              height: 10,
            ),
            Text(
              "Wind",
              style: TextStyle(color: Color.fromARGB(220, 255, 255, 255), fontSize: 16, fontWeight: FontWeight.bold),
            )
          ],
        ),
        Column(
          children: [
            Icon(
              CupertinoIcons.drop,
              color: Colors.white,
            ),
            SizedBox(
              height: 10,
            ),
            Text(
              temp.humidity.toString() + " %",
              style: TextStyle(fontWeight: FontWeight.w700, fontSize: 16),
            ),
            SizedBox(
              height: 10,
            ),
            Text(
              "Humidity",
              style: TextStyle(color: Color.fromARGB(220, 255, 255, 255), fontSize: 16, fontWeight: FontWeight.bold),
            )
          ],
        ),
        Column(
          children: [
            Icon(
              CupertinoIcons.sun_max,
              color: Colors.white,
            ),
            SizedBox(
              height: 10,
            ),
            Text(
              temp.uvi.toString() + " %",
              style: TextStyle(fontWeight: FontWeight.w700, fontSize: 16),
            ),
            SizedBox(
              height: 10,
            ),
            Text(
              "UV Index",
              style: TextStyle(color: Color.fromARGB(220, 255, 255, 255), fontSize: 16, fontWeight: FontWeight.bold),
            )
          ],
        )
      ],
    );
  }
}
