import 'package:easy_rich_text/easy_rich_text.dart';
import 'package:flutter/material.dart';
import 'package:flutter_switch/flutter_switch.dart';
import 'package:provider/provider.dart';

import '../../../common/object_util.dart';
import '../../../controllers/client_controller.dart';
import '../../../models/client.dart';
import '../../../shard/constants.dart';
import '../../../shard/responsive.dart';

class ClientAdd extends StatefulWidget {
  const ClientAdd({Key? key}) : super(key: key);
  @override
  State<ClientAdd> createState() => _ClientAddState();
}

class _ClientAddState extends State<ClientAdd> {
  late ClientController clientController;
  final nameController = TextEditingController();
  final typeController = TextEditingController();

  bool status = false;

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (context) => ClientController(),
      child: Scaffold(
        appBar: AppBar(
          title: const Text(""),
          backgroundColor: secondaryColor,
        ),
        body: _consumer(context),
      ),
    );
  }

  Widget _consumer(BuildContext context) {
    return Consumer<ClientController>(
      builder: (context, clientController, child) {
        this.clientController = clientController;
        return _scaffold(context, clientController);
      },
    );
  }

  Widget _scaffold(BuildContext context, ClientController clientController,) {
    return Container(
      padding: const EdgeInsets.all(defaultPadding),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(8),
        color: secondaryColor,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          getName(context),
          getType(context),
          getExposeYn(context),
          getBtnAddHost(context),
        ],
      ),
    );
  }

  getName(BuildContext context) {
    return Container(
      margin: const EdgeInsets.all(8),
      child: TextField(
        controller: nameController,
        decoration: const InputDecoration(
          border: OutlineInputBorder(),
          hintText: 'input client name',
        ),
      ),
    );
  }

  getType(BuildContext context) {
    return Container(
      margin: const EdgeInsets.all(8),
      child: TextField(
        controller: typeController,
        decoration: const InputDecoration(
          border: OutlineInputBorder(),
          hintText: 'input type',
        ),
      ),
    );
  }

  getExposeYn(BuildContext context) {
    return Container(
      margin: const EdgeInsets.all(8),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.end,
        children: [
          EasyRichText(
            "노출 여부",
            defaultStyle: TextStyle(
              color: Colors.green.shade300,
              fontSize: !Responsive.isDesktop(context) ? 10 : 15,
            ),
            overflow: TextOverflow.ellipsis,
          ),
          const SizedBox(width: 10,),
          FlutterSwitch(
            value: status,
            onToggle: (val) {
              setState(() {
                status = val;
              });
            },
          ),
        ],
      ),
    );
  }


  getBtnAddHost(BuildContext context) {
    return Container(
      margin: const EdgeInsets.all(8),
      child: ElevatedButton.icon(
        style: TextButton.styleFrom(
          padding: EdgeInsets.symmetric(
            horizontal: defaultPadding,
            vertical: defaultPadding / (Responsive.isMobile(context) ? 2 : 1),
          ),
        ),
        onPressed: () {
          try {
            Client client = Client();
            client.name = nameController.text;
            client.type = typeController.text;
            clientController.registerClient(client, response: (result) {
              if (isExists(result)) {
                Navigator.pop(context);
              }
            });
          } catch (error) {
            print(error);
          }
        },
        icon: const Icon(Icons.add),
        label: const Text("Add Host"),
      ),
    );
  }

}