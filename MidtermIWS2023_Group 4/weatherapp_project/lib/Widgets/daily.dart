import 'package:flutter/material.dart';
import '/Screen/colors.dart' as colors;

class DailyWidget extends StatelessWidget {
  const DailyWidget({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.end,
      children: [
        Container(
          margin: const EdgeInsets.only(top: 10, left: 30, right: 30),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Today',
                style: TextStyle(
                  fontFamily: 'SFProDisplay',
                  fontSize: 20,
                  fontWeight: FontWeight.w600,
                  color: colors.AppColor.homePageTitle,
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
