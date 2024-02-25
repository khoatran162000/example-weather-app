// ignore_for_file: prefer_const_constructors, use_key_in_widget_constructors, import_of_legacy_library_into_null_safe, unused_import
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:get/get.dart';
import 'package:hmm/src/ui/home/home_binding.dart';
import 'package:hmm/src/ui/home/home_screen.dart';

import 'src/ui/home/onboarding_screen.dart';

void main() {
  SystemChrome.setSystemUIOverlayStyle(
    SystemUiOverlayStyle(statusBarColor: Colors.transparent)
  );
  runApp(App());
 
}

class App extends StatelessWidget{
  @override
  Widget build(BuildContext context) {
     
   
    return GetMaterialApp(
      theme: ThemeData.light(),
      darkTheme: ThemeData(
      brightness: Brightness.dark,
      ),
      themeMode: ThemeMode.system,
       
      debugShowCheckedModeBanner: false,
      initialRoute: '/',
      getPages: [
      GetPage(
        
      name: '/',
      page: () => WelcomeScreen(),
      binding: HomeBinding(
        
      ),
      )
      
     ],
    );
  }
}



