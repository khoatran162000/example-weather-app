import 'package:flutter/material.dart';
import '/Screen/colors.dart' as colors;

class SearchResult extends StatelessWidget {
  final String title;
  final Color color;
  final String temp;
  final String condi;
  final String highlow;

  const SearchResult(
      this.title, this.color, this.temp, this.condi, this.highlow,
      {super.key});

  @override
  Widget build(BuildContext context) {
    // ignore: unused_local_variable
    Color textColor = colors.AppColor.homePageTitle;
    return Container(
        padding: const EdgeInsets.all(20),
        decoration: BoxDecoration(
          color: color,
          borderRadius: BorderRadius.circular(20),
        ),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Text(
            title,
            style: TextStyle(
              fontFamily: 'SFProDisplay',
              fontSize: 20,
              fontWeight: FontWeight.w700,
              color: textColor = color.computeLuminance() < 0.5
                  ? colors.AppColor.secondPageBackground
                  : colors.AppColor.homePageTitle,
            ),
          ),
          Text(
            temp,
            style: TextStyle(
              fontFamily: 'SFProDisplay',
              fontSize: 25,
              fontWeight: FontWeight.w600,
              color: textColor = color.computeLuminance() < 0.5
                  ? colors.AppColor.secondPageBackground
                  : colors.AppColor.homePageTitle,
            ),
          ),
          Text(
            condi,
            style: TextStyle(
              fontFamily: 'SFProDisplay',
              fontSize: 10,
              fontWeight: FontWeight.w600,
              color: textColor = color.computeLuminance() < 0.5
                  ? colors.AppColor.secondPageBackground.withOpacity(0.8)
                  : colors.AppColor.homePageTitle.withOpacity(0.8),
            ),
          ),
          Image.asset(
            'assets/weather/Cloudy.png',
            height: 40,
          ),
          Text(highlow,
              style: TextStyle(
                fontFamily: 'SFProDisplay',
                fontSize: 10,
                fontWeight: FontWeight.w600,
                color: textColor = color.computeLuminance() < 0.5
                    ? colors.AppColor.secondPageBackground
                    : colors.AppColor.homePageTitle,
              ))
        ]));
  }
}
