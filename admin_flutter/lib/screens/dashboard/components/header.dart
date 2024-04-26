import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../../controllers/auth_controller.dart';
import '../../../controllers/side_menu_controller.dart';
import '../../../shard/constants.dart';
import '../../../shard/responsive.dart';

class Header extends StatelessWidget {
  final Function fct;
  const Header({Key? key, required this.fct}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        if (!Responsive.isDesktop(context))
          IconButton(
              icon: const Icon(Icons.menu),
              onPressed: () {
                fct();
              }),
        if (!Responsive.isMobile(context))
          Expanded(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(
                  "${context.watch<SideMenuController>().screens_title[context.watch<SideMenuController>().currentSelectedIndex]}",
                  style: Theme.of(context).textTheme.headline6,
                ),
                // Text(
                //   "${context.watch<MenuController>().screens_description[context.watch<MenuController>().currentSelectedIndex]}",
                //   style: Theme.of(context).textTheme.headline6,
                // ),
              ],
            ),
          ),
        if (!Responsive.isMobile(context))
          Spacer(flex: Responsive.isDesktop(context) ? 2 : 1),
        Expanded(flex: 2, child: SearchField()),
        const ProfileCard(),
        const Logout(),
      ],
    );
  }
}

class ProfileCard extends StatelessWidget {
  const ProfileCard({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(left: defaultPadding),
      padding: const EdgeInsets.symmetric(
        horizontal: defaultPadding,
        vertical: defaultPadding / 2,
      ),
      decoration: BoxDecoration(
        color: secondaryColor,
        borderRadius: const BorderRadius.all(Radius.circular(10)),
        border: Border.all(color: Colors.white10),
      ),
      child: Consumer<AuthController>(
        builder: (context, controller, child) {
          return Row(
            children: [
              Image.asset(
                "assets/images/profile_pic.jpg",
                height: 38,
              ),
              if (!Responsive.isMobile(context))
                Padding(
                    padding: const EdgeInsets.symmetric(
                        horizontal: defaultPadding / 2),
                    child: Text(controller.currentUserModel!.email.toString())),
              const Icon(Icons.keyboard_arrow_down),
            ],
          );
        },
      ),
    );
  }
}

class SearchField extends StatelessWidget {
  SearchField({
    Key? key,
  }) : super(key: key);

  var searchController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return TextField(
      onChanged: (value) {
      },
      controller: searchController,
      decoration: const InputDecoration(
        hintText: "Search",
        fillColor: secondaryColor,
        filled: true,
        border: OutlineInputBorder(
          borderSide: BorderSide.none,
          borderRadius: BorderRadius.all(Radius.circular(10)),
        ),
      ),
    );
  }
}



class Logout extends StatelessWidget {
  const Logout({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(left: 16.0),
      child: InkWell(
        onTap: () {
          context.read<AuthController>()
            ..SignOut().then((value) {
              context.read<SideMenuController>()..buildMenu();
            });
        },
        child: Container(
          height: 56, width: 100,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(8.0),
            color: Colors.white.withOpacity(0.05),
            border: Border.all(
              color: Colors.white.withOpacity(0.1),
            )
          ),
          alignment: Alignment.center,
          child: const Text("Sign Out", style: TextStyle(
            color: Colors.white,
          )),
        ),
      ),
    );
  }
}

