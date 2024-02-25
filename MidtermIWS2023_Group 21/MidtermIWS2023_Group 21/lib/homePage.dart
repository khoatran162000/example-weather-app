import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_glow/flutter_glow.dart';
import 'package:weather_app_nhom21/dataset.dart';
import 'package:weather_app_nhom21/detailPage.dart';
import 'package:weather_app_nhom21/extraWeather.dart';

Weather currentTemp;
Weather tomorrowTemp;
List<Weather> todayWeather;
List<Weather> sevenDay;
String lat = "21.0277676";
String lon = "105.8341613";
String city = "Hanoi";
class HomePage extends StatefulWidget {
  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {

  getData() async{
    fetchData(lat, lon, city).then((value){
      currentTemp = value[0];
      todayWeather = value[1];
      tomorrowTemp = value[2];
      sevenDay = value[3];
      setState(() {
        
      });
    });
  }

@override
void initState() { 
  super.initState();
  getData();
}

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color.fromARGB(210, 90, 85, 85),
      body: currentTemp==null ? Center(child: CircularProgressIndicator(),):Column(
        children: [CurrentWeather(getData), TodayWeather()],
      ),
    );
  }
}

class CurrentWeather extends StatefulWidget {
  final Function() updateData;
  CurrentWeather(this.updateData);
  @override
  _CurrentWeatherState createState() => _CurrentWeatherState();
}

class _CurrentWeatherState extends State<CurrentWeather> {

bool searchBar = false;
var focusNode = FocusNode();

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: (){
        if(searchBar)
        setState(() {
          searchBar = false;
        });
      },
      child: Container(
        height: MediaQuery.of(context).size.height - 220,
        margin: EdgeInsets.all(2),
        padding: EdgeInsets.only(top: 60, left: 30, right: 30),
        decoration: const BoxDecoration(
    image: DecorationImage(
        image: AssetImage("assets/sky.png"), 
        fit: BoxFit.cover),
        borderRadius: BorderRadius.only(
                    bottomLeft: Radius.circular(45),
                    bottomRight: Radius.circular(45),
                  ),
  ),
        child: Column(
          children: [
            Container(
              child: searchBar?
              TextField(
                focusNode: focusNode,
                decoration: InputDecoration(
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(10)),
                  fillColor: Color.fromARGB(218, 70, 70, 71),
                  filled: true,
                  hintText:"Enter a city name"
                ),
                textInputAction: TextInputAction.search,
                onSubmitted: (value)async{
                  CityModel temp = await fetchCity(value);
                  if(temp==null){
                    showDialog(context: context, builder: (BuildContext context){
                      return AlertDialog(
                        backgroundColor: Color.fromARGB(255, 29, 28, 28),
                        title:Text("City not found"),
                        content: Text("Please check the city name"),
                        actions: [
                          TextButton(onPressed: (){
                            Navigator.of(context).pop();
                          }, child: Text("Ok"))
                        ],
                      );
                    });
                    searchBar = false;
                    return;
                  }
                  city = temp.name;
                  lat = temp.lat;
                  lon = temp.lon;
                  setState(() {
                    
                  });
                  widget.updateData();
                  searchBar = false;
                  setState(() {
                    
                  });
                },
              )
              :Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Icon(
                    CupertinoIcons.map_fill,
                    color: Colors.white,
                  ),
                  Row(
                    children: [
                      Icon(CupertinoIcons.search, color: Colors.white),
                      GestureDetector(
                        onTap: (){
                          searchBar = true;
                          setState(() {
                            
                          });
                          focusNode.requestFocus();
                        },
                        child: Text(
                          " " + city,
                          style: TextStyle(fontWeight: FontWeight.bold, fontSize: 25),
                        ),
                      ),
                    ],
                  ),
                  Icon(Icons.more_vert, color: Colors.white)
                ],
              ),
            ),
           
            Container(
              height: 370,
              child: Stack(
                children: [
                  Image(
                    image: AssetImage(currentTemp.image),
                    fit: BoxFit.fill,
                  ),
                  Positioned(
                    bottom: 0,
                    right: 0,
                    left: 0,
                    child: Align(
                        child: Column(
                      children: [
                        GlowText(
                          currentTemp.current.toString(),
                          style: TextStyle(
                              height: 0.01,
                              fontSize: 90,
                              fontWeight: FontWeight.bold),
                        ),
                        Text(currentTemp.name,
                            style: TextStyle(
                              height: 3.5,
                              color: Color.fromARGB(235, 255, 255, 255),
                              fontSize: 24,
                              fontWeight: FontWeight.bold
                            )),
                       
                      ],
                    )),
                  )
                ],
              ),
            ),
            Divider(
              color: Colors.white,
            ),
            SizedBox(
              height: 3,
            ),
            ExtraWeather(currentTemp)
          ],
        ),
      ),
    );
  }
}

class TodayWeather extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.only(left: 30, right: 30, top: 20),
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                "Today",
                style: TextStyle(fontSize: 25, fontWeight: FontWeight.bold),
              ),
              GestureDetector(
                onTap: () {
                  Navigator.push(context,
                      MaterialPageRoute(builder: (BuildContext context) {
                    return DetailPage(tomorrowTemp,sevenDay);
                  }));
                },
                child: Row(
                  children: [
                    Text(
                      "7 days ",
                      style: TextStyle(fontSize: 18, color: Color.fromARGB(255, 255, 255, 255)),
                    ),
                    Icon(
                      Icons.arrow_forward_ios_outlined,
                      color: Colors.grey,
                      size: 15,
                    )
                  ],
                ),
              )
            ],
          ),
          SizedBox(
            height: 15,
          ),
          Container(
            margin: EdgeInsets.only(
              bottom: 30,
            ),
            child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  WeatherWidget(todayWeather[0]),
                  WeatherWidget(todayWeather[1]),
                  WeatherWidget(todayWeather[2]),
                  WeatherWidget(todayWeather[3])
                ]),
          )
        ],
      ),
    );
  }
}

class WeatherWidget extends StatelessWidget {
  final Weather weather;
  WeatherWidget(this.weather);
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(15),
      decoration: BoxDecoration(
          border: Border.all(width: 0.2, color: Colors.white),
          borderRadius: BorderRadius.circular(35)),
      child: Column(
        children: [
          Text(
            weather.current.toString() + "\u00B0",
            style: TextStyle(fontSize: 20),
          ),
          SizedBox(
            height: 10,
          ),
          Image(
            image: AssetImage(weather.image),
            width: 30,
            height: 30,
          ),
          SizedBox(
            height: 5,
          ),
          Text(
            weather.time,
            style: TextStyle(fontSize: 16, color: Colors.grey),
          )
        ],
      ),
    );
  }
}
