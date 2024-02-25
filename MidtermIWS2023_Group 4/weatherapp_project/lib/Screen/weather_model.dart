class Weather {
  // ignore: prefer_typing_uninitialized_variables
  var cityName;
  // ignore: prefer_typing_uninitialized_variables
  var condition;
  // ignore: prefer_typing_uninitialized_variables
  var temp;
  // ignore: prefer_typing_uninitialized_variables
  var wind;
  // ignore: prefer_typing_uninitialized_variables
  var humidity;
  // ignore: prefer_typing_uninitialized_variables
  var uv;
  // ignore: prefer_typing_uninitialized_variables
  var feelslike;
  // ignore: prefer_typing_uninitialized_variables
  var pricipe;
  // ignore: prefer_typing_uninitialized_variables
  var gust;

  Weather({
    required this.cityName,
    required this.condition,
    required this.temp,
    required this.wind,
    required this.humidity,
    required this.uv,
    required this.feelslike,
    required this.pricipe,
    required this.gust,
  });
  Weather.fromJson(Map<String, dynamic> json) {
    cityName = json['location']['name'];
    condition = json['current']['condition']['text'];
    temp = json['current']['temp_c'].toInt();
    wind = json['current']['wind_kph'];
    humidity = json['current']['humidity'];
    uv = json['current']['uv'];
    feelslike = json['current']['feelslike_c'].toInt();
    pricipe = json['current']['precip_mm'];
    gust = json['current']['gust_kph'];
  }
}
