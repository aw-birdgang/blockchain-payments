import 'package:flutter/material.dart';

import '../models/menu_model.dart';
import '../pages/client/client_page.dart';
import '../screens/login/login_screen.dart';
import 'auth_controller.dart';

class SideMenuController extends ChangeNotifier {
  final AuthController? _authProvider;

  int currentSelectedIndex = 0;

  void onChangeSelectedMenu(index) {
    for (int i = 0; i < menuModelList.length; i++) {
      if (i == index) {
        //print(menuModelList[i].title.toString() + " selected");
        menuModelList[i].isSelected = true;
      } else {
        menuModelList[i].isSelected = false;
      }
    }
    currentSelectedIndex = index;
    // menuModelList.forEach((element) {
    //   print(element.title.toString() + " - " + element.isselected.toString());
    // });
    notifyListeners();
  }

  final GlobalKey<ScaffoldState> getScaffoldKey = GlobalKey<ScaffoldState>();
  final GlobalKey<ScaffoldState> getViewOrderScaffoldKey = GlobalKey<ScaffoldState>();

  void mainControlMenu() {
    if (!getScaffoldKey.currentState!.isDrawerOpen) {
      getScaffoldKey.currentState!.openDrawer();
    }
  }

  void viewOrderControlMenu() {
    if (!getViewOrderScaffoldKey.currentState!.isDrawerOpen) {
      getViewOrderScaffoldKey.currentState!.openDrawer();
    }
  }

  SideMenuController(this._authProvider) {
    buildMenu();
  }

  final _offline_screen = [const LoginScreen()];

  final _screens = [
    const ClientPage(),
  ];

  final _offline_screens_title = ['Login'];
  final _screens_title = [
    '클라이언트 목록',
  ];

  // final _screens_description = [
  //   // '홈',
  //   '클라이언트 목록',
  //   '계정 목록',
  //   '입금 요청 목록',
  //   '토큰 전송 목록',
  // ];

  final List<MenuModel> _offline_menuModelList = [
    MenuModel("login", "assets/icons/menu_login.svg")
  ];

  final List<MenuModel> _menuModelList = [
    // MenuModel("Dashboard", "assets/icons/menu_dashbord.svg", isselected: true),
    MenuModel("Clients", "assets/icons/menu_task.svg"),
    // MenuModel("Logout", "assets/icons/menu_logout.svg"),
  ];

  List<MenuModel> menuModelList = [];
  var screens_title = [];
  // var screens_description = [];
  var screens = [];
  void buildMenu() {
    if (_authProvider != null && _authProvider!.currentUserModel == null) {
      screens_title = _offline_screens_title;
      menuModelList = _offline_menuModelList;
      screens = _offline_screen;
    } else {
      screens_title = _screens_title;
      // screens_description = _screens_description;
      menuModelList = _menuModelList;
      screens = _screens;
    }
    notifyListeners();
  }
}
