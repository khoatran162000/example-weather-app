// ignore_for_file: prefer_const_constructors, avoid_unnecessary_containers, missing_required_param, unnecessary_string_interpolations, deprecated_member_use, prefer_is_empty, unused_local_variable, sized_box_for_whitespace

import 'package:flutter/material.dart';
import 'package:get/get_state_manager/get_state_manager.dart';
import 'package:hmm/src/model/current_weather_data.dart';
import 'package:hmm/src/model/five_days_data.dart';
import 'package:intl/intl.dart';
import 'package:hmm/src/ui/home/home_controller.dart';
import 'package:syncfusion_flutter_charts/charts.dart';
// ignore: use_key_in_widget_constructors
class HomeScreen extends StatelessWidget {
// const HomeScreen({super.key});
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      body: GetBuilder<HomeController>(
       builder: (controller) => Column(
          children: <Widget>[
            Expanded(
             flex: 1,
             child: Container(
              decoration: BoxDecoration(
              image: DecorationImage(
                image: AssetImage('assets/img/BG.png'),
                fit: BoxFit.cover,
              ),
              borderRadius: BorderRadius.only(
              bottomLeft: Radius.circular(25),
              bottomRight: Radius.circular(25),
              ),
              ),
              child: Stack (
                children: <Widget> [
                Container (
                 // padding: EdgeInsets.only (),
                  child: AppBar(
                   backgroundColor: Colors.transparent,
                   elevation: 0,     //brightness
                  ),
                ), 
                Container (  //search
                height: 100,
                padding: EdgeInsets.only (top: 50, left: 20, right: 20), //outside
                child: TextField (
                  onChanged: (value) => controller.city = value,
                  style: TextStyle (
                    color: Colors.grey[50],
                  ),
                  textInputAction: TextInputAction.search,
                  onSubmitted: (value) => controller.updateWeather(),
                  decoration: InputDecoration ( //inside box
                    contentPadding: EdgeInsets.only (top: 5, left: 10, right: 10),
                    suffix:  Icon(
                      Icons.search,
                      color: Colors.teal[100],
                    ), 
                  hintStyle: TextStyle (color: Colors.teal[100]), //search
                  hintText: 'Search'.toUpperCase(),
                  // border: OutlineInputBorder (
                  //   borderRadius: BorderRadius.circular(10),
                  //   borderSide: BorderSide (color: Colors.teal[100]),
                  // ),
                  focusedBorder: OutlineInputBorder (
                    borderRadius: BorderRadius.circular(10),
                    borderSide: BorderSide (color: Colors.white),
                  ),
                  enabledBorder: OutlineInputBorder (
                  borderRadius: BorderRadius.circular(10),
                  borderSide: BorderSide (color: Colors.teal[100]),

                  ),
                  ),
                    
                  ),
                ),
                Align( //2ndbox
                  alignment: Alignment(0.0, 1),
                  child: SizedBox(
                    height: 36,
                    width: 10,
                    child: OverflowBox( 
                      minWidth: 0.0,
                      maxWidth: MediaQuery.of(context).size.width,
                      minHeight: 0.0,
                      maxHeight: (MediaQuery.of(context).size.height / 3 ), //edit
                      child: Stack (
                        children: <Widget> [
                          Container (
                            padding: EdgeInsets.symmetric(horizontal: 15),
                            width: double.infinity,
                            height:  double.infinity,
                            child: Card(
                              color: Color.fromARGB(255, 210, 245, 242),
                              elevation: 7,  //shadow
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(25),
                              ),
                              child: Column (
                                crossAxisAlignment: CrossAxisAlignment.center,
                                children: <Widget> [
                                Container (
                                 padding: EdgeInsets.only(top:15, left:15, right:20, bottom:15),
                                 child: Column (
                                 crossAxisAlignment: CrossAxisAlignment.start,
                                 children: <Widget>[
                                  Center(
                                   child: Text ( //place
                                       (controller.currentWeatherData != null) ? '${controller.currentWeatherData.name}'.toUpperCase(): '',
                                          style: Theme.of(context)
                                              .textTheme
                                              .caption
                                              .copyWith(
                                                color: Color.fromARGB(221, 14, 66, 66),
                                                fontSize: 20,
                                                fontWeight:
                                                    FontWeight.bold,
                                                fontFamily:
                                                    'Ubuntu',
                                              ),
                                   ),
                                  ),
                                  Center( //date
                                    child: Text (
                                      DateFormat().add_MMMMEEEEd()
                                                    .format(DateTime.now()),
                                      style: Theme.of(context)
                                      .textTheme
                                      .caption
                                      .copyWith(
                                        color: Colors.black45,
                                        fontSize: 16,
                                        fontFamily: 'Ubuntu',
                                      ),
                                    ),
                                    
                                  ),
                                 ],
                                 ),
                                ),
                                Divider(),  //below date
                                Row(
                                  mainAxisAlignment: 
                                  MainAxisAlignment.spaceBetween,
                                  children: <Widget> [
                                    Container(
                                      padding: EdgeInsets.only(left: 50),
                                      child: Column (
                                      children: <Widget> [
                                        Text (
                                          (controller.currentWeatherData.weather != null)
                                          ? '${controller.currentWeatherData.weather[0].description}'
                                             : '',
                                          style: Theme.of(context)
                                          .textTheme
                                          .caption
                                          .copyWith(
                                            color: Colors.black45,
                                            fontSize: 15,
                                            fontFamily: 'Ubuntu',
                                          ),

                                        ),
                                        SizedBox(height: 2),  //temperature
                                        Text(
                                          (controller.currentWeatherData.main != null)
                                          ? '${(controller.currentWeatherData.main.temp - 273.15).round().toString()}\u2103'
                                             : '',
                                             style: Theme.of(context)
                                             .textTheme
                                             .headline2
                                             .copyWith(
                                              color: Color.fromARGB(221, 10, 153, 153),
                                              fontFamily: 'Ubuntu',
                                             ),
                                        ),
                                        Text(    //min max tem
                                          (controller.currentWeatherData.main !=null)
                                                      ? 'min: ${(controller.currentWeatherData.main.tempMin - 273.15).round().toString()}\u2103 / max: ${(controller.currentWeatherData.main.tempMax - 273.15).round().toString()}\u2103'
                                                      : '',
                                                  style: Theme.of(context)
                                                      .textTheme
                                                      .caption
                                                      .copyWith(
                                                        color: Colors.black45,
                                                        fontSize: 17,
                                                        fontWeight:
                                                            FontWeight.bold,
                                                        fontFamily:
                                                            'Ubuntu',
                                                      ),

                                        ),
                                      ],
                                      ),
                                    ),
                                    Container( //icon
                                           padding: EdgeInsets.only(right: 20),
                                            child: Column(
                                              mainAxisAlignment:
                                                  MainAxisAlignment.center,
                                                  children: <Widget> [
                                                  Container(
                                                    width: 100,
                                                    height: 90,
                                                    child: Image.network('https://openweathermap.org/img/wn/${controller.currentWeatherData.weather[0].icon}@2x.png'),
                                                  ),
                                                  Container( //m/s
                                                    child: Text(
                                                      (controller.currentWeatherData.wind != null)
                                                      ?'wind ${controller.currentWeatherData.wind.speed} m/s'
                                                      :'',
                                                      style: Theme.of(context).textTheme.caption.copyWith(
                                                        color: Colors.black45,
                                                        fontWeight: FontWeight.bold,
                                                        fontFamily: 'Ubuntu',
                                                      ),
                                                    ),
                                                  ),
                                                  ],
                                            ),
                                      ),
                                  ],

                                  
                                ),
                                ]
                              ),

                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
                ],
              ),
              ),
             ),
            Expanded ( ///other cities
             flex: 2,
             child: Stack(
              children: <Widget>[ 
                Padding (
                  padding:EdgeInsets.symmetric(horizontal: 15),
                  child: Container(
                    padding: EdgeInsets.only(top: 120),
                    child: Align(
                      alignment: Alignment.topLeft,
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: <Widget> [
                          Container(
                            child: Text(
                              'other cities'.toUpperCase(),
                              style: Theme.of(context)
                              .textTheme
                              .caption
                              .copyWith(
                                fontSize: 0,
                              fontFamily: 'Ubuntu',
                              color: Colors.black45,
                              fontWeight: FontWeight.bold,
                              
                              ),
                            ),
                          ),
                            Container( //5boxes
                      
                              height: 130,
                              child: ListView.separated(
                                
                                physics: BouncingScrollPhysics(),
                                
                                scrollDirection: Axis.horizontal,
                                separatorBuilder: (context , index) => VerticalDivider (
                                color: Colors.teal[100],
                                width: 5,
                                ),
                                itemCount: controller.dataList.length,
                                itemBuilder: (context,index) {
                                  CurrentWeatherData data; 
                                  (controller.dataList.length >0)
                                  ?data = controller.dataList[index]
                                  :data = null;
                                  return 
                                  GestureDetector(
                                    onTap: () {
                                      controller.city = '${data.name}';
                                      controller.updateWeather();
                                    },
                                    child: Container(
                                      width: 140,
                                      height: 150,
                                      child: Card (
                                        shape:RoundedRectangleBorder (
                                          borderRadius: BorderRadius.circular(15),
                                        ),
                                        child: Container (
                                          child: Column (
                                            mainAxisAlignment: MainAxisAlignment.center,
                                            children: <Widget> [
                                              Text (
                                                (data != null)
                                                ?'${data.name}'
                                                :'',
                                                style: Theme.of(context)
                                                .textTheme
                                                .caption
                                                .copyWith(
                                                  fontSize:16,
                                                  fontWeight: FontWeight.bold,
                                                  color: Color.fromARGB(255, 76, 133, 127),
                                                  fontFamily: 'Ubuntu', 
                                                )
                                                ),
                                              Text (
                                                (data != null)
                                                ?'${(data.main.temp-273.15).round().toString()}\u2103'
                                                :'',
                                                style: Theme.of(context)
                                                .textTheme
                                                .caption
                                                .copyWith(
                                                  fontSize:16,
                                                  fontWeight: FontWeight.bold,
                                                  color: Colors.teal[200],
                                                  fontFamily: 'Ubuntu', 
                                                )
                                                ),
                                                 Container(
                                                width: 50,
                                                height: 50,
                                                child: Image.network('https://openweathermap.org/img/wn/${data.weather[0].icon}.png'),
                                                // decoration: BoxDecoration(
                                                //   image: DecorationImage (
                                                //     image: AssetImage(
                                                //       'assets/img/clouds.png'
                                                //     ),
                                                    
                                                //     fit: BoxFit.cover,
                                  
                                                //   ),
                                  
                                                // ),
                                              ),
                                              Text (
                                                (data!= null) 
                                                ? '${data.weather[0].description}'
                                                :'',
                                                style: Theme.of(context)
                                                .textTheme
                                                .caption
                                                .copyWith (
                                                  color: Colors.teal[200],
                                                  fontFamily: 'Ubuntu',
                                                  fontSize: 14,
                                                ),
                                                
                                                )
                                              
                                  
                                            ],
                                          ),
                                        ),
                                        
                                  
                                  
                                      ),
                                      
                                    ),
                                  );


                                },


                              ),
                            ),
                            
                           Container(
                            padding: EdgeInsets.only(top: 3),
                            child: Row(
                              mainAxisAlignment: 
                              MainAxisAlignment.spaceBetween,
                              children: <Widget> [
                                Text (
                                  'forecast next 5 days'.toUpperCase(),
                                  style: Theme.of(context)
                                  .textTheme
                                  .caption
                                  .copyWith(
                                    fontSize: 12,
                                    fontWeight: FontWeight.bold,
                                    color: Colors.teal[200]
                                  ),
                                ),
                                Icon(
                                  Icons.next_plan_outlined,
                                  color: Colors.teal[200],
                                  
                                ),


                              ],
                              
                            ),
                           ),

                              Container(
                              width: MediaQuery.of(context).size.width,
                              height: 240,
                              child: Card(
                                elevation: 5,
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(15),
                                ),
                                child: SfCartesianChart(
                                  primaryXAxis: CategoryAxis(),
                                  series: <ChartSeries<FiveDaysData, String>>[
                                    SplineSeries<FiveDaysData, String>(
                                      dataSource: controller.fiveDaysData,
                                      xValueMapper: (FiveDaysData f, _) =>
                                          f.dateTime,
                                      yValueMapper: (FiveDaysData f, _) =>
                                          f.temp,
                                    ),
                                  ],
                                ),
                              ),
                            ),


                        ],

                      ),
                    ),
                  ),
                ),
              ],
             ),

            ),
            
          ],
       ),
      ),
   
  );
 }
}