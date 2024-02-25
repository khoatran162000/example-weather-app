import 'package:flutter/material.dart';
import 'package:hmm/src/ui/home/home_screen.dart';

// ignore: use_key_in_widget_constructors
class WelcomeScreen extends StatefulWidget {
  // const WelcomeScreen({Key? key}) : super(key: key);

  @override
  State<WelcomeScreen> createState() => _WelcomeScreenState();
}

class _WelcomeScreenState extends State<WelcomeScreen> {

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // ignore: prefer_const_constructors
      backgroundColor: Colors.teal[200],
      body: 
      GestureDetector(
        onTap: () {
          Navigator.pushReplacement(
            context, MaterialPageRoute(builder: (context) => HomeScreen())
          );
        },

        // ignore: sized_box_for_whitespace
        child: Container(
          height: MediaQuery.of(context).size.height,
          width: MediaQuery.of(context).size.width,
          child: Center(
            child: Container(
              height: 650,
              width: 650,
              decoration: const BoxDecoration(
                image: DecorationImage(
                  fit: BoxFit.contain,
                  image: AssetImage(
                    'assets/img/Onboarding-01.png',
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}