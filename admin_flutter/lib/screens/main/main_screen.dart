import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../controllers/auth_controller.dart';
import '../../controllers/side_menu_controller.dart';
import '../../shard/constants.dart';
import '../../shard/responsive.dart';
import '../dashboard/components/header.dart';
import 'components/side_menu.dart';

class MainScreen extends StatelessWidget {
  const MainScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    var authprovider = Provider.of<AuthController>(context);

    return Scaffold(
      key: context.read<SideMenuController>().getScaffoldKey,
      drawer: const SideMenu(),
      body: SafeArea(
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            if (Responsive.isDesktop(context))
              const Expanded(
                child: SideMenu(),
              ),
            Expanded(
              // It takes 5/6 part of the screen
              flex: 4,
              child: Padding(
                padding: const EdgeInsets.all(defaultPadding),
                child: Column(
                  children: [
                    if (authprovider.currentUserModel != null)
                      Header(fct: () {
                        context.read<SideMenuController>().mainControlMenu();
                      }),
                    const SizedBox(height: defaultPadding),
                    Expanded(
                      child: Container(
                        child: context.watch<SideMenuController>().screens[
                        context.watch<SideMenuController>().currentSelectedIndex
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
