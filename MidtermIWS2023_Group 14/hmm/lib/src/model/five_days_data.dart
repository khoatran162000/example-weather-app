// ignore_for_file: unnecessary_string_interpolations

class FiveDaysData {
  final String dateTime;
  final int temp;

  FiveDaysData({this.dateTime, this.temp});

  factory FiveDaysData.fromJson(dynamic json) {
    if (json == null) {
      return FiveDaysData();
    }

    var f = json['dt_txt'].split(' ')[0].split('-')[2];
    var l = json['dt_txt'].split(' ')[1].split(':')[0];
    var fandl = '$f-$l';
    return FiveDaysData(
      dateTime: '$fandl',
      temp: (double.parse(json['main']['temp'].toString()) - 273.15).round(),
    );
  }
}