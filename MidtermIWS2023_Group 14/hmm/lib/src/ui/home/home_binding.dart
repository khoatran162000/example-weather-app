// ignore_for_file: import_of_legacy_library_into_null_safe

import 'package:get/instance_manager.dart';
import 'package:hmm/src/ui/home/home_controller.dart';

class HomeBinding implements Bindings {
  @override
  void dependencies() {
    Get.lazyPut(() => HomeController(city: 'Hanoi'));
  }
}