import 'package:flutter/material.dart';
import 'package:weatherapp_starter_project/Widgets/search_data.dart';
import 'package:weatherapp_starter_project/Widgets/search_result.dart';
import 'colors.dart' as color;

class Search extends StatefulWidget {
  const Search({Key? key}) : super(key: key);

  @override
  State<Search> createState() => _SearchState();
}

class _SearchState extends State<Search> {
  @override
  Widget build(BuildContext context) {
    double myHeight = MediaQuery.of(context).size.height;
    double myWidth = MediaQuery.of(context).size.width;
    return Scaffold(
      body: Container(
        color: color.AppColor.homePageBackground,
        child: Column(
          children: [
            Container(
              alignment: Alignment.topLeft,
              padding: const EdgeInsets.only(top: 65, left: 25),
              width: MediaQuery.of(context).size.width,
              height: 50,
            ),
            Expanded(
                child: Container(
              decoration: BoxDecoration(
                color: color.AppColor.secondPageBackground,
                borderRadius: const BorderRadius.only(
                  topLeft: Radius.circular(30),
                  topRight: Radius.circular(30),
                ),
              ),
              child: Column(
                children: [
                  const SizedBox(
                    height: 20,
                  ),
                  Row(
                    children: [
                      const SizedBox(
                        width: 30,
                      ),
                      Text(
                        "Search",
                        style: TextStyle(
                          fontFamily: 'SFProDisplay',
                          fontSize: 25,
                          fontWeight: FontWeight.w700,
                          color: color.AppColor.homePageTitle,
                        ),
                      ),
                      Expanded(child: Container()),
                      Row(
                        children: [
                          const SizedBox(
                            width: 30,
                          ),
                          Text(
                            "Cancel",
                            style: TextStyle(
                              fontFamily: 'SFProDisplay',
                              fontSize: 13,
                              color: color.AppColor.homePageTitle,
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(
                        width: 30,
                      ),
                    ],
                  ),
                  const SizedBox(
                    height: 10,
                  ),
                  Positioned(
                    child: Container(
                      alignment: Alignment.center,
                      margin: const EdgeInsets.symmetric(
                        horizontal: 25,
                      ),
                      height: 40,
                      decoration: BoxDecoration(
                        color: color.AppColor.searchContainerBackground,
                        borderRadius: BorderRadius.circular(30),
                      ),
                      child: Padding(
                        padding:
                            EdgeInsets.symmetric(horizontal: myWidth * 0.05),
                        child: TextFormField(
                          decoration: InputDecoration(
                              border: InputBorder.none,
                              icon: Image.asset(
                                'assets/icons/3031293.png',
                                height: myHeight * 0.02,
                                color: color.AppColor.homePageTitle
                                    .withOpacity(0.4),
                              ),
                              hintText: "Search city, country, or location",
                              hintStyle: TextStyle(
                                color: color.AppColor.homePageTitle
                                    .withOpacity(0.5),
                              )),
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(
                    height: 10,
                  ),
                  Container(
                    height: 180,
                    width: MediaQuery.of(context).size.width,
                    margin: const EdgeInsets.symmetric(
                      horizontal: 25,
                    ),
                    child: Stack(
                      children: [
                        Container(
                          width: MediaQuery.of(context).size.width,
                          height: 180,
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(20),
                            color: color.AppColor.clearCloudyBackground,
                          ),
                          child: Container(
                            padding: const EdgeInsets.only(
                              top: 15,
                              left: 17,
                            ),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  "My Location",
                                  style: TextStyle(
                                    fontFamily: 'SFProDisplay',
                                    fontSize: 20,
                                    fontWeight: FontWeight.w700,
                                    color: color.AppColor.homePageTitle,
                                  ),
                                ),
                                const SizedBox(
                                  height: 2,
                                ),
                                Text(
                                  "Hanoi",
                                  style: TextStyle(
                                    fontFamily: 'SFProDisplay',
                                    fontSize: 12,
                                    fontWeight: FontWeight.w600,
                                    color: color.AppColor.homePageTitle,
                                  ),
                                ),
                                Text(
                                  "27°",
                                  style: TextStyle(
                                    fontFamily: 'SFProDisplay',
                                    fontSize: 25,
                                    fontWeight: FontWeight.w600,
                                    color: color.AppColor.homePageTitle,
                                  ),
                                ),
                                Text(
                                  "Mostly Clear",
                                  style: TextStyle(
                                    fontFamily: 'SFProDisplay',
                                    fontSize: 10,
                                    fontWeight: FontWeight.w600,
                                    color: color.AppColor.homePageTitle
                                        .withOpacity(0.8),
                                  ),
                                ),
                                const SizedBox(
                                  height: 10,
                                ),
                                Image.asset(
                                  'assets/weather/Clear-cloudy.png',
                                  height: myHeight * 0.05,
                                ),
                                Text(
                                  "H: 29°  L: 19°",
                                  style: TextStyle(
                                    fontFamily: 'SFProDisplay',
                                    fontSize: 10,
                                    fontWeight: FontWeight.w600,
                                    color: color.AppColor.homePageTitle,
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                  Expanded(
                    child: GridView(
                        padding: const EdgeInsets.only(
                          top: 10,
                          left: 25,
                          right: 25,
                          bottom: 25,
                        ),
                        gridDelegate:
                            const SliverGridDelegateWithMaxCrossAxisExtent(
                                maxCrossAxisExtent: 200,
                                childAspectRatio: 1,
                                crossAxisSpacing: 10,
                                mainAxisSpacing: 10),
                        children: RESULT_SEARCH
                            .map((searchResult) => SearchResult(
                                  searchResult.title,
                                  searchResult.color,
                                  searchResult.temp,
                                  searchResult.condi,
                                  searchResult.highlow,
                                ))
                            .toList()),
                  )
                ],
              ),
            )),
          ],
        ),
      ),
    );
  }
}
