import 'package:flutter/material.dart';
import '/Screen/colors.dart' as colors;

class HourlyWidget extends StatelessWidget {
  const HourlyWidget({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Container(
          margin: const EdgeInsets.only(top: 50, left: 30, right: 30),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Image.asset(
                'assets/weather/Clear-cloudy.png',
                width: 40,
                height: 40,
              ),
            ],
          ),
        ),
        Positioned(
          child: Container(
            margin: const EdgeInsets.only(top: 10, left: 30, right: 30),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    RichText(
                      textAlign: TextAlign.center,
                      text: TextSpan(
                        style: TextStyle(
                          fontFamily: 'SFProDisplay',
                          fontSize: 25,
                          fontWeight: FontWeight.w700,
                          color: colors.AppColor.homePageTitle,
                        ),
                        children: [
                          const TextSpan(
                            text: '27',
                          ),
                          TextSpan(
                            text: '°',
                            style: TextStyle(
                              fontFamily: 'SFProDisplay',
                              fontSize: 25,
                              fontWeight: FontWeight.w700,
                              color: colors.AppColor.homePageTitle,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
                Container(
                  margin: const EdgeInsets.only(top: 10),
                  child: Row(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Text(
                        'Now',
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          fontFamily: 'SFProDisplay',
                          fontSize: 15,
                          fontWeight: FontWeight.w600,
                          color: colors.AppColor.homePageTitle,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }
}
