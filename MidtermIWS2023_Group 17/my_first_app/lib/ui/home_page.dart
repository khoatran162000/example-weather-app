import 'dart:convert';
import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import 'package:http/http.dart' as http;
import 'package:intl/intl.dart';
import 'package:my_first_app/components/weather_item.dart';
// import 'package:modal_bottom_sheet/modal_bottom_sheet.dart';


import 'package:my_first_app/constants.dart';
import 'package:my_first_app/ui/detail_page.dart'; //Import cho date format, có 1 cái DateFormat(format) {} đặt ở dưới cùng nữa để câu lệnh DateFormat('MMMMEEEEd') không bị lỗi

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final TextEditingController _cityController = TextEditingController();
  final Constants _constants = Constants(); 
  static String API_KEY = "9e1540857d814e5a9b2110554233103";

  String location = 'London'; //Default location
  String weatherIcon = 'heavycloud.png';
  int temperature = 0;
  int windSpeed = 0;
  int humidity = 0;
  int cloud = 0;
  String currentDate = '';

  List hourlyWeatherForecast = [];
  List dailyWeatherForecast = [];

  String currentWeatherStatus = '';

  //Api Call
  String searchWeatherAPI = "https://api.weatherapi.com/v1/forecast.json?key=" +
      API_KEY +
      "&days=7&q=";

  void fetchWeatherData(String searchText) async {
    try {
      var searchResult =
          await http.get(Uri.parse(searchWeatherAPI + searchText)); // Cái này giúp mình tìm được data base dựa trên thành phố mình điền vào(searchText) cứ thử copy cái searchWeatherAPI ở trên rồi điền đại 1 thành phố ở sau dấu "=" là hiểu

      final weatherData = Map<String, dynamic>.from(
          json.decode(searchResult.body) ?? 'No data'); // Used to take the Database from the API key

      var locationData = weatherData["location"]; // Use the formula above to take the Database that match the keyword

      var currentWeather = weatherData["current"];

      setState(() {
        location = getShortLocationName(locationData["name"]); //Ở trên ta lấy 1 biến là location và ở đây ta dùng "name" như 1 từ khóa để lấy data từ Database
        

        var parsedDate =
            DateTime.parse(locationData["localtime"].substring(0, 10));
        var newDate = DateFormat('MMMMEEEEd').format(parsedDate);
        currentDate = newDate;

        //updateWeather
        currentWeatherStatus = currentWeather["condition"]["text"]; // Ở đây ta chỉ cần lấy currentWeather vì nó = weatherDate["current"] vì "current" là
        // nên ta có thể truy cập vào các tập con của nó như "condition" cũng như tệp con của "condition" là "text" mà chỉ cần dùng mỗi currentWeather <Cái này phải đọc database của nó mói hiểu>

        weatherIcon = currentWeatherStatus.replaceAll(' ', '').toLowerCase() +
            ".png"; // Lệnh này giúp ta dùng chính tên của database để biến nó thành tên của ảnh mà ta lưu trong assets
        // Nhưng 1 đặc điểm là ta phải đặt tên ảnh của ta giống với tên trạng thái thời tiết trong database -> chưa tối ưu lắm
        temperature = currentWeather["temp_c"].toInt();
        windSpeed = currentWeather["wind_kph"].toInt();
        humidity = currentWeather["humidity"].toInt();
        cloud = currentWeather["cloud"].toInt();

        //Forecast data
        dailyWeatherForecast = weatherData["forecast"]["forecastday"];
        hourlyWeatherForecast = dailyWeatherForecast[0]["hour"];
        print(dailyWeatherForecast);
      });
    } catch (e) {
      //debugPrint(e);
    }
  }

// Method này cho phép ta lấy tên viết tắt của địa điểm, và như ta thấy thì nó có 1 biến là String s mà ta sẽ thay bằng locationData["name"] ở trên để lấy dữ liệu API
  static String getShortLocationName(String s) {
    List<String> wordList = s.split(" ");

    if (wordList.isNotEmpty) {
      if (wordList.length > 1) {
        return wordList[0] + " " + wordList[1];
      } // Lệnh này sẽ trả về tên thành phố với 2 từ đầu tiên VD: Sai Gon
      else {
        return wordList[0]; //Còn không thì sẽ chỉ trả về 1 chữ VD: London
      }
    } else {
      return " ";
    }
  }

  @override
  void initState() {
    fetchWeatherData(location);
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    SystemChrome.setEnabledSystemUIMode(SystemUiMode.manual,
        overlays: SystemUiOverlay.values);

    Size size = MediaQuery.of(context).size;

    return Scaffold(
      
      body: Container(
        width: size.width,
        height: size.height,
        padding: const EdgeInsets.only(top: 70, left: 10, right: 10),
        // color: _constants.primaryColor.withOpacity(.1),
        color: Color(0xff0C0926),

        // Create the main big blue box
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Container(
              padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 10),
              height: size.height * .7 - 48,
              decoration: BoxDecoration(
                gradient: _constants.linearGradientBlue,
                boxShadow: [
                  BoxShadow(
                    color: _constants.primaryColor.withOpacity(.5),
                    spreadRadius: 5,
                    blurRadius: 7,
                    offset: const Offset(0, 3),
                  ),
                ],
                borderRadius: BorderRadius.circular(20),
              ),
              child:  Column(
              // crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [

                Row(

                  // The menu box on the top-right
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    Image.asset(
                      "assets/menu.png",
                      width: 40,
                      height: 40,
                    ),

                    
                    Row( // The location selection on the top
                        crossAxisAlignment: CrossAxisAlignment.center,
                        children: [
                          Image.asset(
                            "assets/pin.png",
                            width: 20,
                          ),
                          const SizedBox(
                            width: 2,
                          ),
                          Padding(
                            padding: const EdgeInsets.only(left: 8.0),
                            child: Text(
                              location, // Text = "location" in the database
                              style: const TextStyle(
                                color: Colors.white,
                                fontSize: 16.0,
                              ),
                            ),
                          ),


                          // Dropdown menu when click on the location
                          // IconButton có 2 phần (1 là khi ấn vào sẽ có tác dụng gì, 2 là ấn vào đâu - ở đây là nhấn vào keyboard_arrow_down icon)
                          IconButton(
                            onPressed: () {
                              _cityController.clear();
                              showModalBottomSheet(
                                
                                  context: context,
                                  builder: (context) => SingleChildScrollView(
                                    physics: BouncingScrollPhysics(),
                                      controller:
                                          ModalScrollController.of(context),
                                      child: Container(
                                        
                                        height: size.height * 08,
                                        padding: const EdgeInsets.symmetric(
                                          horizontal: 20,
                                          vertical: 40,
                                        ),
                                        child: Column(children: [
                                          
                                          SizedBox(
                                              width: 70,
                                              child: Divider(
                                                thickness: 3.5,
                                                color: _constants.primaryColor,
                                              )),
                                          const SizedBox(
                                            height: 10,
                                          ),
                                          TextField(
                                            onChanged: (searchText) {
                                              fetchWeatherData(searchText); // Thay đổi locaton dựa theo input mà người dùng nhập vào
                                            },
                                            controller: _cityController,
                                            autofocus: true,
                                            decoration: InputDecoration(
                                                prefixIcon: Icon(
                                                  Icons.search,
                                                  color:
                                                      _constants.primaryColor,
                                                ),
                                                suffix: GestureDetector(
                                                  onTap: () =>
                                                      _cityController.clear(),
                                                  child: Icon(
                                                    Icons.close,
                                                    color:
                                                        _constants.primaryColor,
                                                  ),
                                                ),
                                                hintText:
                                                    'Search a city e.g London',
                                                focusedBorder:
                                                    OutlineInputBorder(
                                                  borderSide: BorderSide(
                                                    color:
                                                        _constants.primaryColor,
                                                  ),
                                                  borderRadius:
                                                      BorderRadius.circular(10),
                                                )),
                                          ),
                                        ],),
                                      ),));
                            },
                            icon: const Icon(
                              Icons.keyboard_arrow_down,
                              color: Colors.white,
                            ),
                          ),
                        ],
                        ),
                        
                        
                        // The profile picture on the Appbar(Outside the main box)
                        ClipRRect(
                          borderRadius: BorderRadius.circular(10),
                          child: Image.asset("assets/profile.png", width: 40, height: 40),
                        ),
                  ],
                ),
              SizedBox(
                height: 160,
                child: Image.asset("assets/" + weatherIcon,),
              ),

              // ----- Big Temperature Text --------
              Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Padding(
                    padding: const EdgeInsets.only(top: 8.0),
                    child: Text(temperature.toString(),
                    style: TextStyle(fontSize: 80,
                    fontWeight: FontWeight.bold,
                    color: Colors.white,),),
                  ),
                  Text('o',
                    style: TextStyle(fontSize: 40,
                    fontWeight: FontWeight.bold,
                    color: Colors.white,)),
                ]
              ),
              Text(currentWeatherStatus, style: const TextStyle(color: Colors.white,
              fontSize: 32.0,
              
              ),),

              Text(currentDate, style: const TextStyle(color: Colors.white,
              fontSize: 16.0,
              ),),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 20, ),
                child: const Divider(
                  color: Colors.white,
                ),
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal:40),

                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    WeatherItem(
                      value: windSpeed.toInt(),
                      unit: 'km/h',
                      imageUrl: 'assets/windspeed.png',
                      
                    ),
              
                    WeatherItem(
                      value: humidity.toInt(),
                      unit: '%',
                      imageUrl: 'assets/humidity.png',
                      
                    ),
              
                    WeatherItem(
                      value: cloud.toInt(),
                      unit: '%',
                      imageUrl: 'assets/cloud.png',
                      
                    ),
                  ],
                ),
              ),
            
              
              ],
            ),
            ),
            Container( // The Botom part of the Home_page - below the big blue box
                padding: const EdgeInsets.only(top: 16.0),
                height: size.height *  .25,
                child: SingleChildScrollView(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Padding(
                        padding: const EdgeInsets.only(top: 24.0, bottom: 16),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            const Text('Today', style: TextStyle(
                              color: Colors.white,
                              fontWeight: FontWeight.bold,
                              fontSize: 26.0,
                      
                            ),),

                            //Ở đây ta dùng GestureDetector thay cho lệnh button nhằm biến text Forecast thành 1 đường dẫn mà không bị gò bó bởi 1 box như button
                             GestureDetector(
                          onTap: ()=> Navigator.push(context, MaterialPageRoute(builder:(_)=> DetailPage(dailyForecastWeather: dailyWeatherForecast,) )), //This will open forecast screen
                          child: Text('Forecasts', style: TextStyle(
                            fontWeight: FontWeight.w500,
                            fontSize: 20, 
                            color: _constants.primaryColor,
                          ),),
                        ),
                          ],
                        ),
                      ),
                     const SizedBox(height: 8,),
                     Padding(
                       padding: const EdgeInsets.only(top: 3.0),
                       child: SizedBox(
                        height: 110,
                        child: ListView.builder(
                          itemCount: hourlyWeatherForecast.length,
                          scrollDirection: Axis.horizontal,
                          physics: const BouncingScrollPhysics(),
                          itemBuilder: (BuildContext context, int index) {
                          String currentTime = DateFormat('HH:mm:ss').format(DateTime.now());
                          String currentHour = currentTime.substring(0,2);
                     
                          String forecastTime = hourlyWeatherForecast[index]["time"].substring(11,16); //Cái này và tương tự với mấy cái dưới dùng index - thì nó sẽ lấy đơn vị theo thứ tự index bắt đầu từ [0] trong database ->
                          // Giải thích: hourlyWeatherForecast đã được khai báo ở trên dòng 85 và ở đây ta dùng [] để tiếp tục lấy tập con của hằng số "hour" trong database (vào database của WeatherAPI sẽ hiểu) 
                          //và mỗi tập con sẽ tương ứng với 1 tiếng - còn subtring(11, 16) để mình lấy mỗi giờ và phút (vì nó nằm ở kí tự số 12 -> 16) thôi chứ k lấy ngày tháng năm (coi database của nó là hiểu)
                          String forecastHour = hourlyWeatherForecast[index]["time"].substring(11,13);
                     
                          String forecastWeatherName = hourlyWeatherForecast[index]["condition"]["text"];
                          String forecastWeatherIcon = forecastWeatherName.replaceAll(' ', '').toLowerCase() + ".png";
                     
                          String forecastTemperature = hourlyWeatherForecast[index]["temp_c"].round().toString();
                          return Container(
                            padding: const EdgeInsets.symmetric(vertical: 15),
                            margin: const EdgeInsets.only(right: 20),
                            width: 65,  
                            decoration: BoxDecoration(
                              color: currentHour == forecastHour ? _constants.chosenColor : _constants.primaryColor,
                              borderRadius: const BorderRadius.all(Radius.circular(50)),
                              boxShadow: [
                                BoxShadow(
                                  offset: const Offset(0, 1),
                                  blurRadius: 5,
                                  color: _constants.primaryColor.withOpacity(.2),
                     
                     
                                ),
                              ],
                              
                     
                            ),
                     
                            child: Column(mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children:[
                                Text(forecastTime, style: TextStyle(
                                  fontSize: 17,
                                  color: _constants.greyColor,
                                  fontWeight: FontWeight.w500,
                     
                                ),),
                                Image.asset('assets/' + forecastWeatherIcon, width:20,),
                                Row(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    Text(forecastTemperature, style: TextStyle(
                                    color: _constants.greyColor,
                                    fontSize: 17,
                                    fontWeight: FontWeight.w600),),
                                    Text('o', style: TextStyle(
                                    color: _constants.greyColor,
                                    fontWeight: FontWeight.w600,
                                    fontSize: 10,
                                    fontFeatures: const [
                                      FontFeature.enable('sups'),
                                    ]
                                    
                                    ,),)
                                  ],
                                )
                     
                              ], ),
                              
                            
                          );
                          },
                        ),
                       ),
                     )
                    ],
                  ),
                ),
              ),

            // Create the Content inside the box
           
          ],
        ),
      ),
    );
  }
  
  void showMaterialModalBottomSheet({required BuildContext context, required SingleChildScrollView Function(dynamic context) builder}) {} // Dùng tạm cho import bottom_modal_sheet

  // DateFormat(format) {}
}



class ModalScrollController {
  static of(context) {}
} // Dùng tạm cho import bottom_modal_sheet
